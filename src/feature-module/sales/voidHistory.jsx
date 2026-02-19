import React, { useState, useEffect } from "react";
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import Table from "../../core/pagination/datatable";
import { getAllVoidHistory, getVoidHistoryByDate, getVoidHistoryByUserId } from '../Api/VoidHistoryApi';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VoidHistory = () => {
  const [voidHistory, setVoidHistory] = useState([]);
  const [allVoidHistory, setAllVoidHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const priceSymbol = localStorage.getItem("priceSymbol") || "$";

  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const loadVoidHistoryData = async () => {
    try {
      setIsLoading(true);
      let response;
      let history = [];
      let totalRecords = 0;

      if (selectedDate) {
        // Always send date as YYYY-MM-DD in local time
        const dateStr = selectedDate.getFullYear() + '-' +
          String(selectedDate.getMonth() + 1).padStart(2, '0') + '-' +
          String(selectedDate.getDate()).padStart(2, '0');
        response = await getVoidHistoryByDate(currentPage, pageSize, dateStr);
        if (response && response.responseDto) {
          history = response.responseDto.payload;
          totalRecords = response.responseDto.totalRecords;
        }
        // If user is also selected, filter on frontend
        if (selectedUser) {
          history = history.filter(item => item.userDto && item.userDto.id === selectedUser.value);
          totalRecords = history.length;
        }
      } else if (selectedUser) {
        response = await getVoidHistoryByUserId(currentPage, pageSize, selectedUser.value);
        if (response && response.responseDto) {
          history = response.responseDto.payload;
          totalRecords = response.responseDto.totalRecords;
        }
      } else {
        response = await getAllVoidHistory(currentPage, pageSize);
        if (response && response.responseDto) {
          history = response.responseDto.payload;
          totalRecords = response.responseDto.totalRecords;
        }
      }

      setAllVoidHistory(history);
      setVoidHistory(history);
      setTotalRecords(totalRecords);
      // Build unique user list from history
      const uniqueUsersMap = {};
      history.forEach(item => {
        if (item.userDto && item.userDto.id) {
          uniqueUsersMap[item.userDto.id] = `${item.userDto.firstName} ${item.userDto.lastName}`;
        }
      });
      const uniqueUsers = Object.entries(uniqueUsersMap).map(([id, label]) => ({ value: Number(id), label }));
      setUsers(uniqueUsers);
    } catch (error) {
      console.error('Error loading void history:', error);
      setAllVoidHistory([]);
      setVoidHistory([]);
      setTotalRecords(0);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // When user or date filter changes, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, selectedUser]);

  // Load data when any filter or pagination changes
  useEffect(() => {
    loadVoidHistoryData();
  }, [currentPage, pageSize, selectedDate, selectedUser]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterData(query);
  };

  const filterData = (query) => {
    let filteredData = [...allVoidHistory];
    
    if (query.trim() !== '') {
      filteredData = filteredData.filter(item =>
        item.itemName?.toLowerCase().includes(query.toLowerCase()) ||
        item.price?.toString().includes(query) ||
        item.quantity?.toString().includes(query) ||
        item.total?.toString().includes(query) ||
        item.userDto?.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        item.userDto?.lastName?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setVoidHistory(filteredData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Void History", 14, 15);
      const tableColumn = ["Item Name", "Price", "Quantity", "Total", "User", "Date"];
      const tableRows = voidHistory.map(item => [
        item.itemName || "",
        `${priceSymbol}${item.price?.toFixed(2) || "0.00"}`,
        item.quantity?.toString() || "0",
        `${priceSymbol}${item.total?.toFixed(2) || "0.00"}`,
        `${item.userDto?.firstName || ""} ${item.userDto?.lastName || ""}`,
        item.dateTime ? new Date(item.dateTime).toLocaleString() : ''
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });
      doc.save("void_history.pdf");
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const exportToExcel = () => {
    try {
      const worksheetData = voidHistory.map(item => ({
        "Item Name": item.itemName || "",
        "Price": `${priceSymbol}${item.price?.toFixed(2) || "0.00"}`,
        "Quantity": item.quantity || 0,
        "Total": `${priceSymbol}${item.total?.toFixed(2) || "0.00"}`,
        "User": `${item.userDto?.firstName || ""} ${item.userDto?.lastName || ""}`,
        "Date": item.dateTime ? new Date(item.dateTime).toLocaleString() : ''
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Void History");
      XLSX.writeFile(workbook, "void_history.xlsx");
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

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

  const columns = [
    { 
      title: "Item Name", 
      dataIndex: "itemName", 
      sorter: (a, b) => (a.itemName || '').localeCompare(b.itemName || '')
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `${priceSymbol}${price?.toFixed(2) || "0.00"}`,
      sorter: (a, b) => (a.price || 0) - (b.price || 0)
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => (a.quantity || 0) - (b.quantity || 0)
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (total) => `${priceSymbol}${total?.toFixed(2) || "0.00"}`,
      sorter: (a, b) => (a.total || 0) - (b.total || 0)
    },
    {
      title: "User",
      dataIndex: "userDto",
      render: (userDto) => `${userDto?.firstName || ""} ${userDto?.lastName || ""}`,
      sorter: (a, b) => 
        `${a.userDto?.firstName || ""} ${a.userDto?.lastName || ""}`.localeCompare(
          `${b.userDto?.firstName || ""} ${b.userDto?.lastName || ""}`
        )
    },
    {
      title: "Date",
      dataIndex: "dateTime",
      render: (dateTime) => dateTime ? new Date(dateTime).toLocaleString() : '',
      sorter: (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
    }
  ];

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex flex-column">
            <div className="page-title">
              <h4>Void History</h4>
              <h6>View voided items history</h6>
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
                <Link onClick={() => loadVoidHistoryData()}>
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
              <div className="search-set">
                <div className="search-path d-flex align-items-center gap-2" style={{ width: '100%' }}>
                  <div className="search-input">
                    <input
                      type="text"
                      placeholder="Search"
                      className="form-control form-control-sm formsearch"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <Link to className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                  </div>
                  <div style={{ width: '200px' }}>
                    <Select
                      className="select"
                      options={users}
                      placeholder="Select User"
                      value={selectedUser}
                      onChange={setSelectedUser}
                      isClearable
                    />
                  </div>
                  <div style={{ width: '200px' }}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={setSelectedDate}
                      className="form-control form-control-sm"
                      placeholderText="Select Date"
                      dateFormat="yyyy-MM-dd"
                      isClearable
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table 
                columns={columns} 
                dataSource={voidHistory} 
                rowKey={(record) => record.id}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalRecords,
                  onChange: handlePageChange,
                  onShowSizeChange: handlePageSizeChange,
                  showSizeChanger: true
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoidHistory;