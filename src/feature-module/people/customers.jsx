import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit } from "feather-icons-react/build/IconComponents";
import Table from "../../core/pagination/datatable";
import Swal from "sweetalert2";
import CustomerModal from "../../core/modals/peoples/customerModal";
import { saveCustomer, fetchCustomers, updateCustomer, updateCustomerStatus } from "../Api/customerApi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { ChevronUp, PlusCircle, RotateCcw } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
import "../../style/scss/pages/_categorylist.scss";

const Customers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchCustomersData();
    }
  }, [showActive, currentPage, pageSize]);

  const loadInitialData = async () => {
    setIsLoading(true);
    await fetchCustomersData();
    setIsLoading(false);
  };

  const fetchCustomersData = async () => {
    try {
      setIsLoading(true);
      const status = showActive ? true : false;
      const data = await fetchCustomers(currentPage, pageSize, status);
      if (data && data.payload) {
        const normalizedData = data.payload.map(customer => ({
          ...customer,
          isActive: customer.isActive === 1 || customer.isActive === true
        }));
        setAllCustomers(normalizedData);
        setCustomers(normalizedData);
        setTotalRecords(data.totalRecords);
      } else {
        setAllCustomers([]);
        setCustomers([]);
        setTotalRecords(0);
        Swal.fire({
          title: "Warning!",
          text: "No customer data received from the server.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch customers: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterData = (customersData, query) => {
    if (query.trim() !== "") {
      const filteredData = customersData.filter(customer =>
        (customer.name && customer.name.toLowerCase().includes(query.toLowerCase())) ||
        (customer.mobileNumber && customer.mobileNumber.toLowerCase().includes(query.toLowerCase()))
      );
      setCustomers(filteredData);
    } else {
      setCustomers(customersData);
    }
  };

  const handleSaveCustomer = async (customerData) => {
    try {
      // Check for duplicate customer name
      const existingCustomerByName = allCustomers.find(customer => 
        customer.name.toLowerCase() === customerData.name.toLowerCase()
      );
      
      if (existingCustomerByName) {
        Swal.fire({
          title: "Error!",
          text: "A customer with this name already exists.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: { confirmButton: "btn btn-danger" },
        });
        return;
      }

      // Check for duplicate mobile number
      const existingCustomerByMobile = allCustomers.find(customer => 
        customer.mobileNumber === customerData.mobileNumber
      );
      
      if (existingCustomerByMobile) {
        Swal.fire({
          title: "Error!",
          text: "A customer with this mobile number already exists.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: { confirmButton: "btn btn-danger" },
        });
        return;
      }

      const customerDataWithActive = { ...customerData, isActive: 1 };
      const result = await saveCustomer(customerDataWithActive);
      if (result) {
        await fetchCustomersData();
        setSelectedCustomer(null);
        Swal.fire({
          title: "Success!",
          text: "Customer has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: { confirmButton: "btn btn-success" },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add customer: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: { confirmButton: "btn btn-danger" },
      });
    }
  };

  const handleUpdateCustomer = async (customerData) => {
    try {
      // Check for duplicate customer name (excluding current customer)
      const existingCustomerByName = allCustomers.find(customer => 
        customer.name.toLowerCase() === customerData.name.toLowerCase() &&
        customer.id !== customerData.id
      );
      
      if (existingCustomerByName) {
        Swal.fire({
          title: "Error!",
          text: "A customer with this name already exists.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: { confirmButton: "btn btn-danger" },
        });
        return;
      }

      // Check for duplicate mobile number (excluding current customer)
      const existingCustomerByMobile = allCustomers.find(customer => 
        customer.mobileNumber === customerData.mobileNumber &&
        customer.id !== customerData.id
      );
      
      if (existingCustomerByMobile) {
        Swal.fire({
          title: "Error!",
          text: "A customer with this mobile number already exists.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: { confirmButton: "btn btn-danger" },
        });
        return;
      }

      const result = await updateCustomer(customerData);
      if (result) {
        await fetchCustomersData();
        setSelectedCustomer(null);
        Swal.fire({
          title: "Success!",
          text: "Customer has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: { confirmButton: "btn btn-success" },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update customer: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: { confirmButton: "btn btn-danger" },
      });
    }
  };

  const handleToggleStatus = (customerId, currentStatus) => {
    setTogglingId(customerId);
    const newStatusText = currentStatus ? 'Inactive' : 'Active';

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change this customer to ${newStatusText}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const newStatus = currentStatus ? 0 : 1;
          const response = await updateCustomerStatus(customerId, newStatus);
          if (response && response.success !== false) {
            await fetchCustomersData();
            Swal.fire({
              title: "Success!",
              text: `Customer status changed to ${newStatusText}.`,
              icon: "success",
              confirmButtonText: "OK",
              customClass: { confirmButton: "btn btn-success" },
            });
          } else {
            throw new Error(response?.message || "Failed to update status");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to update customer status: " + error.message,
            icon: "error",
            confirmButtonText: "OK",
            customClass: { confirmButton: "btn btn-danger" },
          });
        }
      }
      setTogglingId(null);
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterData(allCustomers, value);
  };

  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text(`Customer List (${showActive ? 'Active' : 'Inactive'})`, 14, 15);

      const tableColumn = ["Customer Name", "Mobile Number"];
      const tableRows = customers.map(customer => [
        customer.name || "",
        customer.mobileNumber || ""
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });

      doc.save(`customer_list_${showActive ? 'active' : 'inactive'}.pdf`);
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
      if (!customers || customers.length === 0) {
        Swal.fire({
          title: "No Data",
          text: "There are no customers to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const worksheetData = customers.map(customer => ({
        "Customer Name": customer.name || "",
        "Mobile Number": customer.mobileNumber || ""
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

      worksheet["!cols"] = [{ wch: 20 }, { wch: 15 }];

      XLSX.writeFile(workbook, `customer_list_${showActive ? 'active' : 'inactive'}.xlsx`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to export to Excel: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleAddClick = () => {
    setSelectedCustomer(null);
  };

  const handleEditClick = (record) => {
    setSelectedCustomer(record);
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      render: (text) => <Link to="#">{text}</Link>,
      sorter: (a, b) => (a.name || '').length - (b.name || '').length,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      sorter: (a, b) => (a.mobileNumber || '').length - (b.mobileNumber || '').length,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <div className={`form-check form-switch ${togglingId === record.id ? 'toggling' : ''}`}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={isActive}
            onChange={() => handleToggleStatus(record.id, isActive)}
            disabled={togglingId === record.id}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-units"
              onClick={() => handleEditClick(record)}
            >
              <Edit className="feather-edit" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>Collapse</Tooltip>
  );

  if (isLoading) {
    return (
      <div className="page-wrapper">
        {/* You can add a loading spinner or message here if desired */}
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex flex-column">
            <div className="page-title">
              <h4>Customer List</h4>
              <h6>Manage Your Customers</h6>
            </div>
            <div className="status-toggle-btns mt-2">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                  onClick={() => {
                    setShowActive(true);
                    setCurrentPage(1);
                  }}
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`btn ${!showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                  onClick={() => {
                    setShowActive(false);
                    setCurrentPage(1);
                  }}
                >
                  Inactive
                </button>
              </div>
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
                <Link onClick={() => fetchCustomersData()}>
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
          <div className="page-btn">
            <Link
              to="#"
              className="btn btn-added"
              data-bs-toggle="modal"
              data-bs-target="#add-units"
              onClick={handleAddClick}
            >
              <PlusCircle className="me-2 iconsize" />
              Add New 
            </Link>
          </div>
        </div>
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
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
              </div>
            </div>
            <div className="table-responsive">
              <Table
                className="table datanew"
                columns={columns}
                dataSource={customers}
                rowKey={(record) => record.id}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalRecords,
                  showSizeChanger: true,
                  onChange: handleTableChange,
                  onShowSizeChange: onShowSizeChange,
                  pageSizeOptions: ["10", "20", "50", "100"],
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <CustomerModal
        onSave={handleSaveCustomer}
        onUpdate={handleUpdateCustomer}
        selectedCustomer={selectedCustomer}
      />
    </div>
  );
};

export default Customers;