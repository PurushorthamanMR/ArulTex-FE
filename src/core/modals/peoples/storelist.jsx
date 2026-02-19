import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit } from "react-feather";
import Table from "../../../core/pagination/datatable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Breadcrumbs from "../../breadcrumbs";
import BranchModal from "./branchModal";
import { fetchBranches, saveBranch, updateBranch, updateBranchStatus } from "../../../feature-module/Api/BranchApi";

const StoreList = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [showActive, setShowActive] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      loadBranches();
    }
  }, [showActive, currentPage, pageSize]);

  const loadInitialData = async () => {
    setIsLoading(true);
    await loadBranches();
    setIsLoading(false);
  };

  const loadBranches = async () => {
    try {
      setIsLoading(true);
      const response = await fetchBranches(currentPage, pageSize, showActive);
      if (response && response.payload) {
        const normalizedData = response.payload.map(branch => ({
          ...branch,
          isActive: branch.isActive === 1 || branch.isActive === true
        }));
        setFilteredBranches(normalizedData);
        setTotalRecords(response.totalRecords || 0);
      } else {
        setFilteredBranches([]);
        setTotalRecords(0);
        Swal.fire({
          title: "Warning!",
          text: "No branch data received from the server.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to load branches: ' + error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleStatusToggle = (status) => {
    setShowActive(status);
    setCurrentPage(1);
  };

  const handleToggleStatus = (branchId, currentStatus) => {
    setTogglingId(branchId);
    const newStatusText = currentStatus ? 'Inactive' : 'Active';

    MySwal.fire({
      title: 'Are you sure?',
      text: `Do you want to change this branch to ${newStatusText}?`,
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
          const response = await updateBranchStatus(branchId, newStatus);
          if (response) {
            await loadBranches();
            MySwal.fire({
              title: "Success!",
              text: `Branch status changed to ${newStatusText}.`,
              icon: "success",
              confirmButtonText: "OK",
              customClass: { confirmButton: "btn btn-success" },
            });
          } else {
            throw new Error("Failed to update status");
          }
        } catch (error) {
          MySwal.fire({
            title: "Error!",
            text: error.response?.data?.errorDescription || "Failed to update branch status",
            icon: "error",
            confirmButtonText: "OK",
            customClass: { confirmButton: "btn btn-danger" },
          });
        }
      }
      setTogglingId(null);
    });
  };

  const columns = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      sorter: (a, b) => a.branchName.length - b.branchName.length,
    },
    {
      title: "Branch Code",
      dataIndex: "branchCode",
      sorter: (a, b) => a.branchCode.length - b.branchCode.length,
    },
    {
      title: "Country",
      dataIndex: "countryDto",
      render: (countryDto) => countryDto?.countryName || '-',
      sorter: (a, b) => (a.countryDto?.countryName || '').length - (b.countryDto?.countryName || '').length,
    },
    {
      title: "Shop Details",
      dataIndex: "shopDetailsDto",
      render: (shopDetailsDto) => shopDetailsDto?.name || '-',
      sorter: (a, b) => (a.shopDetailsDto?.name || '').length - (b.shopDetailsDto?.name || '').length,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      sorter: (a, b) => a.contactNumber.length - b.contactNumber.length,
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
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
            <div className="input-block add-lists"></div>
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-branch"
              onClick={() => setSelectedBranch(record)}
            >
              <Edit className="feather-edit" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  const handleSaveBranch = async (branchData) => {
    try {
      const saveData = {
        ...branchData,
        countryDto: { id: branchData.countryDto.value },
        shopDetailsDto: { id: branchData.shopDetailsDto.value },
        isActive: 1
      };

      await saveBranch(saveData);
      await loadBranches();

      Swal.fire({
        title: 'Success',
        text: 'Branch saved successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || "Failed to save branch",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUpdateBranch = async (branchData) => {
    try {
      const updateData = {
        ...branchData,
        id: selectedBranch.id,
        countryDto: { id: branchData.countryDto.value },
        shopDetailsDto: { id: branchData.shopDetailsDto.value },
        isActive: selectedBranch.isActive
      };

      await updateBranch(updateData);
      await loadBranches();
      setSelectedBranch(null);

      Swal.fire({
        title: 'Success',
        text: 'Branch updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || "Failed to update branch",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleDownloadPDF = () => {
    return filteredBranches.map(branch => ({
      'Branch Name': branch.branchName,
      'Branch Code': branch.branchCode,
      'Country': branch.countryDto?.countryName || '-',
      'Shop Details': branch.shopDetailsDto?.name || '-',
      'Address': branch.address,
      'Contact Number': branch.contactNumber,
      'Email Address': branch.emailAddress
    }));
  };

  const handleDownloadExcel = () => {
    return filteredBranches.map(branch => ({
      'Branch Name': branch.branchName,
      'Branch Code': branch.branchCode,
      'Country': branch.countryDto?.countryName || '-',
      'Shop Details': branch.shopDetailsDto?.name || '-',
      'Address': branch.address,
      'Contact Number': branch.contactNumber,
      'Email Address': branch.emailAddress
    }));
  };

  const handleRefresh = () => {
    loadBranches();
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    loadBranches();
  };

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
        <Breadcrumbs
          maintitle="Branch List"
          subtitle="Manage Your Branch"
          addButton="Add New"
          buttonDataToggle="modal"
          buttonDataTarget="#add-branch"
          onDownloadPDF={handleDownloadPDF}
          onDownloadExcel={handleDownloadExcel}
          onRefresh={handleRefresh}
        />

        <div className="page-header">
          <div className="add-item d-flex flex-column">
            <div className="status-toggle-btns mt-2">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                  onClick={() => handleStatusToggle(true)}
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`btn ${!showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                  onClick={() => handleStatusToggle(false)}
                >
                  Inactive
                </button>
              </div>
            </div>
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
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm}
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
                dataSource={filteredBranches}
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
      <BranchModal
        onSave={handleSaveBranch}
        onUpdate={handleUpdateBranch}
        selectedBranch={selectedBranch}
      />
    </div>
  );
};

export default StoreList;