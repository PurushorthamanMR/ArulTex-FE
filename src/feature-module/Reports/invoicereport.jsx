import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye } from "react-feather";
import { fetchTransactions } from "../Api/TransactionApi";
import { fetchBranches } from "../Api/BranchApi";
import { fetchUsers } from "../Api/UserApi";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import Table from "../../core/pagination/datatable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import "../../style/scss/pages/_invoicereport.scss";

const Invoicereport = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [branchOptions, setBranchOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const priceSymbol = localStorage.getItem("priceSymbol") || "$";

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const branchesResponse = await fetchBranches();
        const branches = (branchesResponse.payload || []).map((branch) => ({
          value: branch.branchName,
          label: branch.branchName,
        }));
        setBranchOptions(branches);

        const usersResponse = await fetchUsers(1, 100, true);
        const users = (usersResponse.payload || []).map((user) => ({
          value: user.firstName,
          label: `${user.firstName} ${user.lastName || ""}`,
        }));
        setUserOptions(users);
      } catch (error) {
        console.error("Error loading dropdown data:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to load dropdown data: " + error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await fetchTransactions(currentPage, pageSize, {
          sortBy: "id",
          sortOrder: "desc",
        });
        setTransactions(response.content);
        setFilteredTransactions(response.content);
        setTotalElements(response.totalElements);
      } catch (error) {
        console.error("Error in loadTransactions:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch transactions: " + error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        setTransactions([]);
        setFilteredTransactions([]);
        setTotalElements(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [currentPage, pageSize]);

  useEffect(() => {
    handleFilter();
  }, [selectedBranch, selectedUser, searchTerm, transactions]);

  const formatTransactionId = (id) => {
    return id ? String(id).padStart(10, "0") : "N/A";
  };

  const handleFilter = () => {
    let filtered = [...transactions];

    if (selectedBranch) {
      filtered = filtered.filter((t) => t.branchDto?.branchName === selectedBranch);
    }

    if (selectedUser) {
      filtered = filtered.filter((t) => t.userDto?.firstName === selectedUser);
    }

    if (searchTerm) {
      const value = searchTerm.toLowerCase();
      filtered = filtered.filter((transaction) => {
        const branchName = transaction.branchDto?.branchName?.toLowerCase() || "";
        const shopName = transaction.shopDetailsDto?.name?.toLowerCase() || "";
        const userName = transaction.userDto?.firstName?.toLowerCase() || "";
        const customerName = transaction.customerDto?.name?.toLowerCase() || "";
        const transactionId = formatTransactionId(transaction.id).toLowerCase();

        return (
          branchName.includes(value) ||
          shopName.includes(value) ||
          userName.includes(value) ||
          customerName.includes(value) ||
          transactionId.includes(value)
        );
      });
    }

    setFilteredTransactions(filtered);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Transaction Report", 14, 15);

      const tableColumn = [
        "Transaction ID",
        "Branch Name",
        "Shop Name",
        "User Name",
        "Customer Name",
        "Total Amount",
        "Date Time",
      ];
      const tableRows = filteredTransactions.map((transaction) => [
        formatTransactionId(transaction.id),
        transaction.branchDto?.branchName || "N/A",
        transaction.shopDetailsDto?.name || "N/A",
        transaction.userDto?.firstName || "N/A",
        transaction.customerDto?.name || "N/A",
        `${priceSymbol}${parseFloat(transaction.totalAmount || 0).toFixed(2)}`,
        transaction.dateTime ? new Date(transaction.dateTime).toLocaleString() : "N/A",
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });

      doc.save("transaction_report.pdf");
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
      if (!filteredTransactions || filteredTransactions.length === 0) {
        Swal.fire({
          title: "No Data",
          text: "There are no transactions to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const worksheetData = filteredTransactions.map((transaction) => ({
        "Transaction ID": formatTransactionId(transaction.id),
        "Branch Name": transaction.branchDto?.branchName || "N/A",
        "Shop Name": transaction.shopDetailsDto?.name || "N/A",
        "User Name": transaction.userDto?.firstName || "N/A",
        "Customer Name": transaction.customerDto?.name || "N/A",
        "Total Amount": `${priceSymbol}${parseFloat(transaction.totalAmount || 0).toFixed(2)}`,
        "Date Time": transaction.dateTime
          ? new Date(transaction.dateTime).toLocaleString()
          : "N/A",
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

      worksheet["!cols"] = [
        { wch: 15 },
        { wch: 20 },
        { wch: 20 },
        { wch: 15 },
        { wch: 20 },
        { wch: 15 },
        { wch: 25 },
      ];

      XLSX.writeFile(workbook, "transaction_report.xlsx");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to export to Excel: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRefresh = async () => {
    try {
      setFilteredTransactions([]);
      setSearchTerm("");
      setSelectedBranch("");
      setSelectedUser("");
      setCurrentPage(1);
      const response = await fetchTransactions(1, pageSize, {
        sortBy: "id",
        sortOrder: "desc",
      });
      setTransactions(response.content);
      setFilteredTransactions(response.content);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error("Error in handleRefresh:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to refresh transactions: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      render: (id) => formatTransactionId(id),
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Branch Name",
      dataIndex: "branchDto",
      render: (branchDto) => branchDto?.branchName || "N/A",
      sorter: (a, b) =>
        (a.branchDto?.branchName || "").localeCompare(b.branchDto?.branchName || ""),
    },
    {
      title: "Shop Name",
      dataIndex: "shopDetailsDto",
      render: (shopDetailsDto) => shopDetailsDto?.name || "N/A",
      sorter: (a, b) =>
        (a.shopDetailsDto?.name || "").localeCompare(b.shopDetailsDto?.name || ""),
    },
    {
      title: "User Name",
      dataIndex: "userDto",
      render: (userDto) => userDto?.firstName || "N/A",
      sorter: (a, b) =>
        (a.userDto?.firstName || "").localeCompare(b.userDto?.firstName || ""),
    },
    {
      title: "Customer Name",
      dataIndex: "customerDto",
      render: (customerDto) => customerDto?.name || "N/A",
      sorter: (a, b) =>
        (a.customerDto?.name || "").localeCompare(b.customerDto?.name || ""),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => `${priceSymbol}${parseFloat(totalAmount || 0).toFixed(2)}`,
    },
    {
      title: "Date Time",
      dataIndex: "dateTime",
      render: (dateTime) => (dateTime ? new Date(dateTime).toLocaleString() : "N/A"),
      sorter: (a, b) =>
        new Date(a.dateTime || 0).getTime() - new Date(b.dateTime || 0).getTime(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <td className="action-table-data text-center">
          <div className="edit-delete-action d-flex justify-content-center align-items-center">
            <Link
              className="p-2"
              to="#"
              onClick={() => handleViewDetails(record)}
              style={{ textDecoration: 'none' }}
            >
              <Eye className="action-eye" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Pdf
    </Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="collapse-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex flex-column">
            <div className="page-title">
              <h4>Transaction Report</h4>
              <h6>Manage Your Transaction Report</h6>
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
                <Link onClick={handleRefresh}>
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
                <div className="search-path d-flex align-items-center gap-2">
                  <div className="search-input">
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
                  <div style={{ width: "200px" }}>
                    <Select
                      className="select"
                      options={branchOptions}
                      placeholder="Select Branch"
                      value={
                        selectedBranch
                          ? { value: selectedBranch, label: selectedBranch }
                          : null
                      }
                      onChange={(selected) =>
                        setSelectedBranch(selected ? selected.value : "")
                      }
                      isClearable
                    />
                  </div>
                  <div style={{ width: "200px" }}>
                    <Select
                      className="select"
                      options={userOptions}
                      placeholder="Select User"
                      value={
                        selectedUser
                          ? { value: selectedUser, label: selectedUser }
                          : null
                      }
                      onChange={(selected) =>
                        setSelectedUser(selected ? selected.value : "")
                      }
                      isClearable
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredTransactions}
                rowKey={(record) => record.id}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalElements,
                  onChange: (page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                  },
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  pageSizeOptions: ["10", "20", "50", "100"],
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Transaction Details */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Transaction Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction ? (
            <div className="receipt">
              <div className="receipt-details">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Transaction ID:</strong>{" "}
                      {formatTransactionId(selectedTransaction.id)}
                    </p>
                    <p>
                      <strong>Date & Time:</strong>{" "}
                      {selectedTransaction.dateTime
                        ? new Date(selectedTransaction.dateTime).toLocaleString()
                        : "N/A"}
                    </p>
                    {selectedTransaction.manualDiscount > 0 && (
                      <p>
                        <strong>Manual Discount:</strong> {priceSymbol} {parseFloat(selectedTransaction.manualDiscount || 0).toFixed(2)}
                      </p>
                    )}
                    <p style={{color: 'red'}}>
                      <strong style={{color: 'black'}}>Balance Amount:</strong> {priceSymbol} {parseFloat(selectedTransaction.balanceAmount || 0).toFixed(2)}
                    </p>
                    <p style={{color: 'green'}}>
                      <strong style={{color: 'black'}}>Total Amount:</strong> {priceSymbol} {parseFloat(selectedTransaction.totalAmount || 0).toFixed(2)}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${selectedTransaction.status?.toLowerCase() === "completed"
                            ? "badge-linesuccess"
                            : "badge-linedanger"
                          }`}
                      >
                        {selectedTransaction.status || "N/A"}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Branch Name:</strong>{" "}
                      {selectedTransaction.branchDto?.branchName || "N/A"}
                    </p>
                    <p>
                      <strong>Shop Name:</strong>{" "}
                      {selectedTransaction.shopDetailsDto?.name || "N/A"}
                    </p>
                    {selectedTransaction.taxAmount > 0 && (
                      <p>
                        <strong>Tax Amount:</strong> {priceSymbol} {parseFloat(selectedTransaction.taxAmount || 0).toFixed(2)}
                      </p>
                    )}
                    {selectedTransaction.employeeDiscount > 0 && (
                      <p>
                        <strong>Employee Discount:</strong> {priceSymbol} {parseFloat(selectedTransaction.employeeDiscount || 0).toFixed(2)}
                      </p>
                    )}                    
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <h6>User Information</h6>
                    <p>
                      <strong>First Name:</strong>{" "}
                      {selectedTransaction.userDto?.firstName || "N/A"}
                    </p>
                    <p>
                      <strong>Last Name:</strong>{" "}
                      {selectedTransaction.userDto?.lastName || "N/A"}
                    </p>
                    <p>
                      <strong>Role:</strong>{" "}
                      {selectedTransaction.userDto?.userRoleDto?.userRole || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedTransaction.customerDto?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Mobile Number:</strong>{" "}
                      {selectedTransaction.customerDto?.mobileNumber || "N/A"}
                    </p>
                  </div>
                </div>

                <hr />

                <h6>Transaction Items</h6>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Barcode</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTransaction.transactionDetailsList &&
                        selectedTransaction.transactionDetailsList.length > 0 ? (
                        selectedTransaction.transactionDetailsList.map((item, index) => (
                          <tr key={index}>
                            <td>{item.productDto?.name || "N/A"}</td>
                            <td>{item.productDto?.barcode || "N/A"}</td>
                            <td>{priceSymbol}{parseFloat(item.unitPrice || 0).toFixed(2)}</td>
                            <td>{item.quantity || 0}</td>
                            <td>{priceSymbol}{parseFloat(item.discount || 0).toFixed(2)}</td>
                            <td>
                              {priceSymbol}{parseFloat((item.unitPrice * item.quantity) - (item.discount || 0)).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <hr />

                <h6>Payment Methods</h6>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Payment Type</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTransaction.transactionPaymentMethod &&
                        selectedTransaction.transactionPaymentMethod.length > 0 ? (
                        selectedTransaction.transactionPaymentMethod.map(
                          (payment, index) => (
                            <tr key={index}>
                              <td>{payment.paymentMethodDto?.type || "N/A"}</td>
                              <td>{priceSymbol}{parseFloat(payment.amount || 0).toFixed(2)}</td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td colSpan="2" className="text-center">
                            No payment methods found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p>No transaction selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Invoicereport;