import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../core/breadcrumbs";
import { Link } from "react-router-dom";
import { Edit } from "react-feather";
import "react-datepicker/dist/react-datepicker.css";
import StockTransferModal from "../../core/modals/stocks/stocktransferModal";
import Table from "../../core/pagination/datatable";
// Temporarily disabled employee discount functionality
// import { fetchEmployeeDiscounts, updateEmployeeDiscount } from "../Api/EmployeeDis";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EmployeeDiscountModal from "../../core/modals/employee/EmployeeDiscountModal";

const EmployeeDiscount = () => {
  const [employeeDiscounts, setEmployeeDiscounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Temporarily disabled
    // loadEmployeeDiscounts();
    
    // Set empty array instead of fetching data
    setEmployeeDiscounts([]);
  }, []);

  const loadEmployeeDiscounts = async () => {
    try {
      // Temporarily disabled
      // const data = await fetchEmployeeDiscounts();
      // setEmployeeDiscounts([...data].reverse());
      
      // Set empty array instead
      setEmployeeDiscounts([]);
    } catch (error) {
      console.error("Error loading employee discounts:", error);
    }
  };

  const handleEditClick = (record) => {
    setSelectedDiscount(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDiscount(null);
  };

  const handleUpdateDiscount = async () => {
    try {
      // Create the updated data but don't assign it to a variable since it's not used
      // const updatedData = {
      //   ...selectedDiscount,
      //   discount: parseFloat(discount)
      // };
      
      // Temporarily disabled
      // await updateEmployeeDiscount(updatedData);
      // await loadEmployeeDiscounts();
      
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Success!",
        text: "Employee discount updated successfully",
        icon: "success",
        confirmButtonText: "OK"
      });
      
      handleCloseModal();
    } catch (error) {
      console.error("Error updating employee discount:", error);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Error!",
        text: "Failed to update employee discount",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const handleDownloadPDF = () => {
    return employeeDiscounts.map(discount => ({
      "Employee Name": discount.userDto.firstName,
      "Discount": `${discount.discount}%`
    }));
  };

  const handleDownloadExcel = () => {
    return employeeDiscounts.map(discount => ({
      "Employee Name": discount.userDto.firstName,
      "Discount": `${discount.discount}%`
    }));
  };

  const handleRefresh = () => {
    // Temporarily disabled
    // loadEmployeeDiscounts();
    
    // Set empty array instead
    setEmployeeDiscounts([]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredDiscounts = employeeDiscounts.filter(discount => 
    discount.userDto.firstName.toLowerCase().includes(searchTerm)
  );

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "userDto",
      render: (userDto) => userDto.firstName,
      sorter: (a, b) => a.userDto.firstName.localeCompare(b.userDto.firstName),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      render: (discount) => `${discount}%`,
      sorter: (a, b) => a.discount - b.discount,
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
              onClick={() => handleEditClick(record)}
            >
              <Edit className="feather-edit" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Employee Discount"
          subtitle="Manage your employee discount"
          addButton="Add New"
          showImport={false}
          onDownloadPDF={handleDownloadPDF}
          onDownloadExcel={handleDownloadExcel}
          onRefresh={handleRefresh}
        />
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    className="form-control form-control-sm formsearch"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Link to className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table
                className="table datanew"
                columns={columns}
                dataSource={filteredDiscounts}
                onDownloadPDF={handleDownloadPDF}
                onDownloadExcel={handleDownloadExcel}
              />
            </div>
          </div>
        </div>
      </div>

      <EmployeeDiscountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDiscount={selectedDiscount}
        onUpdate={handleUpdateDiscount}
      />
      <StockTransferModal onSave={loadEmployeeDiscounts} />
    </div>
  );
};

export default EmployeeDiscount;
