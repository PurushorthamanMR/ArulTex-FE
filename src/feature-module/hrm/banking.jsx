import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../core/pagination/datatable";
import Swal from "sweetalert2";
import { fetchBanking } from "../Api/BankingApi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "../../style/scss/pages/_categorylist.scss";

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

const Banking = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [bankingRecords, setBankingRecords] = useState([]);
  const [allBankingRecords, setAllBankingRecords] = useState([]);
  const [filteredBankingRecords, setFilteredBankingRecords] = useState([]);
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
  }, [latestZReportTime, allBankingRecords, searchTerm, selectedZReportTime, currentPage]);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      await fetchBankingData();
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

  const fetchBankingData = async () => {
    try {
      const response = await fetchBanking(1, 1000);
      if (response.content && Array.isArray(response.content)) {
        console.log("All Banking Records:", response.content);
        setAllBankingRecords(response.content);

        const transactionsWithZReport = response.content.filter(
          (banking) => banking.generatedDateTime !== null
        );

        if (transactionsWithZReport.length > 0) {
          const sortedZReports = transactionsWithZReport
            .map((t) => t.generatedDateTime)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort((a, b) => new Date(b) - new Date(a));
          const latestZReport = sortedZReports[0];
          console.log("Latest Z-Report Time:", latestZReport);
          setLatestZReportTime(latestZReport);
          console.log("All Z-Report Dates:", sortedZReports);
          setZReportDates(sortedZReports);
        } else {
          console.log("No Z-Report found, showing all banking records.");
          setLatestZReportTime(null);
          setZReportDates([]);
        }
      } else {
        setAllBankingRecords([]);
        setFilteredBankingRecords([]);
        setBankingRecords([]);
        setLatestZReportTime(null);
        setZReportDates([]);
        Swal.fire({
          title: "Warning!",
          text: "No banking data received from the server.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch banking data: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
      setAllBankingRecords([]);
      setFilteredBankingRecords([]);
      setBankingRecords([]);
      setLatestZReportTime(null);
      setZReportDates([]);
    }
  };

  const filterAndPaginateData = () => {
    let filteredData = [...allBankingRecords];

    const zReportTimeToUse = selectedZReportTime === "All" ? latestZReportTime : selectedZReportTime;

    if (zReportTimeToUse) {
      if (selectedZReportTime === "All") {
        const startDate = new Date(zReportTimeToUse);
        const endDate = new Date();

        filteredData = filteredData.filter((banking) => {
          const bankingDateTime = new Date(banking.dateTime);
          if (isNaN(bankingDateTime) || isNaN(startDate) || isNaN(endDate)) {
            console.warn("Invalid date format:", banking.dateTime, zReportTimeToUse);
            return false;
          }
          const shouldInclude = bankingDateTime >= startDate && bankingDateTime <= endDate;
          console.log(
            "Filtering banking (All):",
            banking.dateTime,
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

        filteredData = filteredData.filter((banking) => {
          const bankingDateTime = new Date(banking.dateTime);
          if (isNaN(bankingDateTime) || isNaN(endDate)) {
            console.warn("Invalid date format:", banking.dateTime, zReportTimeToUse, previousZReportTime);
            return false;
          }
          if (startDate && !isNaN(startDate)) {
            const shouldInclude = bankingDateTime <= endDate && bankingDateTime > startDate;
            console.log(
              "Filtering banking:",
              banking.dateTime,
              "Period:",
              previousZReportTime || "Start",
              "to",
              zReportTimeToUse,
              "Include:",
              shouldInclude
            );
            return shouldInclude;
          } else {
            const shouldInclude = bankingDateTime <= endDate;
            console.log(
              "Filtering banking:",
              banking.dateTime,
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

    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter((banking) => {
        const userName = banking.userDto
          ? `${banking.userDto.firstName} ${banking.userDto.lastName}`
          : "";
        return (
          (banking.amount && banking.amount.toString().includes(searchTerm)) ||
          (banking.dateTime && banking.dateTime.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (userName && userName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
    }

    setFilteredBankingRecords(filteredData);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    setBankingRecords(paginatedData);
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
      doc.text("Banking List", 14, 15);
      doc.text(
        `Last Z-Report: ${latestZReportTime ? formatDateTime(latestZReportTime) : "N/A"}`,
        14,
        25
      );

      const tableColumn = ["User Name", "DateTime", "Amount"];
      const tableRows = filteredBankingRecords.map((banking) => [
        banking.userDto ? `${banking.userDto.firstName} ${banking.userDto.lastName}` : "N/A",
        formatDateTime(banking.dateTime),
        banking.amount || "",
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });

      doc.save("banking_list_zreport.pdf");
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
      if (!filteredBankingRecords || filteredBankingRecords.length === 0) {
        Swal.fire({
          title: "No Data",
          text: "There are no banking records to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const worksheetData = filteredBankingRecords.map((banking) => ({
        "User Name": banking.userDto ? `${banking.userDto.firstName} ${banking.userDto.lastName}` : "N/A",
        DateTime: formatDateTime(banking.dateTime),
        Amount: banking.amount || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Banking");

      worksheet["!cols"] = [{ wch: 20 }, { wch: 25 }, { wch: 15 }];

      XLSX.writeFile(workbook, "banking_list_zreport.xlsx");
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

  const totalCount = filteredBankingRecords.length;
  const totalAmount = filteredBankingRecords.reduce((sum, banking) => sum + (banking.amount || 0), 0);

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
              <h4>Banking List</h4>
              <h6>Banking Records Around Z-Report</h6>
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
                <strong>Total Banking Amount:</strong> {totalAmount}
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
                <Link onClick={() => fetchBankingData()}>
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
              {bankingRecords.length === 0 ? (
                <div className="text-center">
                  <p>
                    No banking records found between {periodStartDisplay} and {periodEndDisplay}.
                  </p>
                </div>
              ) : (
                <Table
                  className="table datanew"
                  columns={columns}
                  dataSource={bankingRecords}
                  rowKey={(record) => record.id}
                  pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredBankingRecords.length,
                    onChange: (page) => setCurrentPage(page),
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banking;