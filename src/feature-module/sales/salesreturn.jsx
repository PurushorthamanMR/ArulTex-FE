import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../core/img/imagewithbasebath'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../core/pagination/datatable'
import Swal from 'sweetalert2';
import { fetchPayouts } from '../Api/Payout.Api';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const formatDateTime = (dateTime) => {
  if (!dateTime) return "N/A";
  const date = new Date(dateTime);
  if (isNaN(date)) return "Invalid Date";
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const SalesReturn = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [payoutRecords, setPayoutRecords] = useState([]);
  const [allPayoutRecords, setAllPayoutRecords] = useState([]);
  const [filteredPayoutRecords, setFilteredPayoutRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [latestZReportTime, setLatestZReportTime] = useState(null);
  const [zReportDates, setZReportDates] = useState([]);
  const [selectedZReportTime, setSelectedZReportTime] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    filterAndPaginateData();
  }, [latestZReportTime, allPayoutRecords, searchTerm, selectedZReportTime, currentPage]);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      await fetchPayoutData();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to load initial data: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPayoutData = async () => {
    try {
      const response = await fetchPayouts(1, 1000);
      if (response.content && Array.isArray(response.content)) {
        console.log("All Payout Records:", response.content);
        setAllPayoutRecords(response.content);

        // Find the latest Z-Report time from all records
        const allZReportTimes = response.content
          .filter(payout => payout.generatedDateTime !== null)
          .map(payout => payout.generatedDateTime)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => new Date(b) - new Date(a));

        if (allZReportTimes.length > 0) {
          const latestZReport = allZReportTimes[0];
          console.log("Latest Z-Report Time:", latestZReport);
          setLatestZReportTime(latestZReport);
          console.log("All Z-Report Dates:", allZReportTimes);
          setZReportDates(allZReportTimes);
        } else {
          console.log("No Z-Report found, showing all payout records.");
          setLatestZReportTime(null);
          setZReportDates([]);
        }
      } else {
        setAllPayoutRecords([]);
        setFilteredPayoutRecords([]);
        setPayoutRecords([]);
        setLatestZReportTime(null);
        setZReportDates([]);
        Swal.fire({
          title: "Warning!",
          text: "No payout data received from the server.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch payout data: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
      setAllPayoutRecords([]);
      setFilteredPayoutRecords([]);
      setPayoutRecords([]);
      setLatestZReportTime(null);
      setZReportDates([]);
    }
  };

  const filterAndPaginateData = () => {
    let filteredData = [...allPayoutRecords];

    const zReportTimeToUse = selectedZReportTime === "All" ? latestZReportTime : selectedZReportTime;

    if (zReportTimeToUse) {
      if (selectedZReportTime === "All") {
        const startDate = new Date(zReportTimeToUse);
        const endDate = new Date();

        filteredData = filteredData.filter((payout) => {
          const payoutDateTime = new Date(payout.dateTime);
          if (isNaN(payoutDateTime) || isNaN(startDate) || isNaN(endDate)) {
            console.warn("Invalid date format:", payout.dateTime, zReportTimeToUse);
            return false;
          }
          const shouldInclude = payoutDateTime >= startDate && payoutDateTime <= endDate;
          console.log(
            "Filtering payout (All):",
            payout.dateTime,
            "Period:",
            zReportTimeToUse,
            "to",
            "Now",
            "Include:",
            shouldInclude
          );
          return shouldInclude;
        });
      } else {
        const zReportIndex = zReportDates.indexOf(zReportTimeToUse);
        const previousZReportTime =
          zReportIndex < zReportDates.length - 1 ? zReportDates[zReportIndex + 1] : null;
        const endDate = new Date(zReportTimeToUse);
        const startDate = previousZReportTime ? new Date(previousZReportTime) : null;

        filteredData = filteredData.filter((payout) => {
          const payoutDateTime = new Date(payout.dateTime);
          if (isNaN(payoutDateTime) || isNaN(endDate)) {
            console.warn("Invalid date format:", payout.dateTime, zReportTimeToUse, previousZReportTime);
            return false;
          }
          if (startDate && !isNaN(startDate)) {
            const shouldInclude = payoutDateTime <= endDate && payoutDateTime > startDate;
            console.log(
              "Filtering payout:",
              payout.dateTime,
              "Period:",
              previousZReportTime || "Start",
              "to",
              zReportTimeToUse,
              "Include:",
              shouldInclude
            );
            return shouldInclude;
          } else {
            const shouldInclude = payoutDateTime <= endDate;
            console.log(
              "Filtering payout:",
              payout.dateTime,
              "Period:",
              "Start",
              "to",
              zReportTimeToUse,
              "Include:",
              shouldInclude
            );
            return shouldInclude;
          }
        });
      }
    }

    // Remove the filter that was causing the issue
    // We want to show all records after the Z-Report date, regardless of whether they have generatedDateTime

    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter((payout) => {
        const userName = payout.userDto
          ? `${payout.userDto.firstName} ${payout.userDto.lastName}`
          : "";
        return (
          (payout.amount && payout.amount.toString().includes(searchTerm)) ||
          (payout.dateTime && payout.dateTime.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (userName && userName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
    }

    setFilteredPayoutRecords(filteredData);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    setPayoutRecords(paginatedData);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleZReportFilterChange = (e) => {
    const value = e.target.value;
    setSelectedZReportTime(value);
    setCurrentPage(1);
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Payout List", 14, 15);
      doc.text(
        `Last Z-Report: ${latestZReportTime ? formatDateTime(latestZReportTime) : "N/A"}`,
        14,
        25
      );

      const tableColumn = ["User Name", "DateTime", "Amount", "Category"];
      const tableRows = filteredPayoutRecords.map((payout) => [
        payout.userDto ? `${payout.userDto.firstName} ${payout.userDto.lastName}` : "N/A",
        formatDateTime(payout.dateTime),
        payout.amount || "",
        payout.payoutCategoryDto ? payout.payoutCategoryDto.payoutCategory : "N/A",
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });

      doc.save("payout_list_zreport.pdf");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to generate PDF: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const exportToExcel = () => {
    try {
      if (!filteredPayoutRecords || filteredPayoutRecords.length === 0) {
        Swal.fire({
          title: "No Data",
          text: "There are no payout records to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const worksheetData = filteredPayoutRecords.map((payout) => ({
        "User Name": payout.userDto ? `${payout.userDto.firstName} ${payout.userDto.lastName}` : "N/A",
        DateTime: formatDateTime(payout.dateTime),
        Amount: payout.amount || "",
        Category: payout.payoutCategoryDto ? payout.payoutCategoryDto.payoutCategory : "N/A",
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Payout");

      worksheet["!cols"] = [{ wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 15 }];

      XLSX.writeFile(workbook, "payout_list_zreport.xlsx");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to export to Excel: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userDto",
      render: (userDto) => (userDto ? `${userDto.firstName} ${userDto.lastName}` : "N/A"),
      sorter: (a, b) => {
        const nameA = a.userDto ? `${a.userDto.firstName} ${a.userDto.lastName}` : "";
        const nameB = b.userDto ? `${b.userDto.firstName} ${b.userDto.lastName}` : "";
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: "DateTime",
      dataIndex: "dateTime",
      render: (dateTime) => formatDateTime(dateTime),
      sorter: (a, b) => new Date(a.dateTime) - new Date(b.dateTime),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Category",
      dataIndex: "payoutCategoryDto",
      render: (payoutCategoryDto) => (payoutCategoryDto ? payoutCategoryDto.payoutCategory : "N/A"),
      sorter: (a, b) => {
        const categoryA = a.payoutCategoryDto ? a.payoutCategoryDto.payoutCategory : "";
        const categoryB = b.payoutCategoryDto ? b.payoutCategoryDto.payoutCategory : "";
        return categoryA.localeCompare(categoryB);
      },
    }
  ];

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>PDF</Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="collapse-tooltip" {...props}>Collapse</Tooltip>
  );

  const totalCount = filteredPayoutRecords.length;
  const totalAmount = filteredPayoutRecords.reduce((sum, payout) => sum + (payout.amount || 0), 0);

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  const zReportTimeToUse = selectedZReportTime === "All" ? latestZReportTime : selectedZReportTime;
  const zReportIndex = zReportDates.indexOf(zReportTimeToUse);
  const previousZReportTime = zReportIndex < zReportDates.length - 1 ? zReportDates[zReportIndex + 1] : null;
  const periodStartDisplay = selectedZReportTime === "All" ? formatDateTime(latestZReportTime) : (previousZReportTime ? formatDateTime(previousZReportTime) : "Start");
  const periodEndDisplay = selectedZReportTime === "All" ? "Now" : formatDateTime(zReportTimeToUse);

  return (
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
          <div className="add-item d-flex flex-column">
              <div className="page-title">
              <h4>Payout List</h4>
              <h6>Payout Records Around Z-Report</h6>
            </div>
            <div className="mt-2">
              <p>
                <strong>Last Z-Report:</strong>{" "}
                {latestZReportTime ? formatDateTime(latestZReportTime) : "N/A"}
              </p>
              <p>
                <strong>Total Count:</strong> {totalCount}
              </p>
              <p>
                <strong>Total Payout Amount:</strong> {totalAmount}
              </p>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                <Link onClick={exportToPDF}>
                    <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                <Link onClick={exportToExcel}>
                    <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                <Link onClick={() => fetchPayoutData()}>
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    id="collapse-header"
                    className={data ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setToogleHeader(!data));
                  }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-top">
              <div className="search-set d-flex align-items-center">
                <div className="search-input me-3">
                    <input
                      type="text"
                      placeholder="Search"
                      className="form-control form-control-sm formsearch"
                    value={searchTerm}
                    onChange={handleSearch}
                    />
                  <Link to="#" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
                <div className="filter-set">
                  <select
                    className="form-control form-control-sm"
                    value={selectedZReportTime}
                    onChange={handleZReportFilterChange}
                  >
                    <option value="All">All (After Latest Z-Report)</option>
                    {zReportDates.map((date, index) => (
                      <option key={index} value={date}>
                        {formatDateTime(date)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
                      </div>
            <div className="table-responsive">
              {payoutRecords.length === 0 ? (
                <div className="text-center">
                  <p>
                    No payout records found between {periodStartDisplay} and {periodEndDisplay}.
                  </p>
                </div>
              ) : (
                <Table
                  className="table datanew"
                  columns={columns}
                  dataSource={payoutRecords}
                  rowKey={(record) => record.id}
                  pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredPayoutRecords.length,
                    onChange: (page) => setCurrentPage(page),
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesReturn
