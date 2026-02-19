import React, { useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/dist";
import {
  ChevronUp,
  FileText,
  Filter,
  Grid,
  List,
  PlusCircle,
  RotateCcw,
  Sliders,
  Users,
} from "feather-icons-react/build/IconComponents";
import Select from "react-select";
import { all_routes } from "../../Router/all_routes";
import { useSelector } from "react-redux";
import Table from "../../core/pagination/datatable";
import AddDepartmentList from "../../core/modals/hrm/adddepartmentlist";
import EditDepartmentList from "../../core/modals/hrm/editdepartmentlist";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const DepartmentList = () => {
  const route = all_routes;
  const dataSource = useSelector((state) => state.departmentlist_data);

  const oldandlatestvalue = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];
  const departmentsector = [
    { value: "Choose Department", label: "Choose Department" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "HR", label: "HR" },
    { value: "Admin", label: "Admin" },
    { value: "Engineering", label: "Engineering" },
  ];
  const hodlist = [
    { value: "Choose HOD", label: "Choose HOD" },
    { value: "Mitchum Daniel", label: "Mitchum Daniel" },
    { value: "Susan Lopez", label: "Susan Lopez" },
  ];
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
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
  const renderPrinterTooltip = (props) => (
    <Tooltip id="printer-tooltip" {...props}>
      Printer
    </Tooltip>
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department.length - b.department.length,
    },
    {
      title: "HOD",
      dataIndex: "hod",
      sorter: (a, b) => a.hod.length - b.hod.length,
    },
    {
      title: "HOD",
      dataIndex: "hod",
      render: (text, record) => (
        <span className="userimgname">
          <Link to="/profile">
            <ImageWithBasePath
              alt=""
              src={record.img}
              className="product-img"
            />
          </Link>
          <Link to="/profile">{text}</Link>
        </span>
      ),
      sorter: (a, b) => a.hod.length - b.hod.length,
    },
    {
      title: "Members",
      dataIndex: "members",
      render: () => (
        <ul className="team-members">
          <li>
            <Link to="#" title="John Doe" className="team-members">
              <ImageWithBasePath alt="" src="assets/img/users/user-01.jpg" />
            </Link>
          </li>
          <li>
            <Link to="#" title="Richard Miles">
              <ImageWithBasePath alt="" src="assets/img/users/user-02.jpg" />
            </Link>
          </li>
          <li>
            <Link to="#" title="Richard Miles">
              <ImageWithBasePath alt="" src="assets/img/users/user-03.jpg" />
            </Link>
          </li>
          <li className="dropdown avatar-dropdown">
            <Link to="#" className="all-users dropdown-toggle">
              +3
            </Link>
          </li>
        </ul>
      ),
      sorter: (a, b) => a.members.length - b.members.length,
    },
    {
      title: "Total Members",
      dataIndex: "totalmembers",
      sorter: (a, b) => a.totalmembers.length - b.totalmembers.length,
    },

    {
      title: "Creaded On",
      dataIndex: "creadedon",
      sorter: (a, b) => a.creadedon.length - b.creadedon.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={`badge ${
            text === "Active" ? "badge-linesuccess" : "badge-inactive"
          }`}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-department"
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link
              className="confirm-text p-2"
              to="#"
              onClick={showConfirmationAlert}
            >
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                // onClick={confirmText}
              ></i>
            </Link>
          </div>
        </td>
      ),
    },
  ];
  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          className: "btn btn-success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else {
        MySwal.close();
      }
    });
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Department</h4>
                <h6>Manage your departments</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                  <Link>
                    <ImageWithBasePath
                      src="assets/img/icons/pdf.svg"
                      alt="img"
                    />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <ImageWithBasePath
                      src="assets/img/icons/excel.svg"
                      alt="img"
                    />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <i data-feather="printer" className="feather-printer" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
            <div className="page-btn">
              <a
                href=""
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-department"
              >
                <PlusCircle className="me-2" />
                Add New Department
              </a>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body pb-0">
              <div className="table-top table-top-new">
                <div className="search-set mb-0">
                  <div className="total-employees">
                    <h6>
                      <Users />
                      Total Employees <span>21</span>
                    </h6>
                  </div>
                  <div className="search-input">
                    <Link to="" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                    <input type="search" className="form-control" />
                  </div>
                </div>
                <div className="search-path d-flex align-items-center search-path-new">
                  <div className="d-flex">
                    <Link className="btn btn-filter" id="filter_search">
                      <Filter
                        className="filter-icon"
                        onClick={toggleFilterVisibility}
                      />
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/closes.svg"
                          alt="img"
                        />
                      </span>
                    </Link>
                    <Link to={route.departmentlist} className="btn-list">
                      <List />
                    </Link>
                    <Link to={route.departmentgrid} className="btn-grid active">
                      <Grid />
                    </Link>
                  </div>
                  <div className="form-sort">
                    <Sliders className="info-img" />
                    <Select
                      className="select"
                      options={oldandlatestvalue}
                      placeholder="Newest"
                    />
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div
                className={`card${isFilterVisible ? " visible" : ""}`}
                id="filter_inputs"
                style={{ display: isFilterVisible ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <i data-feather="file-text" className="info-img" />
                        <FileText className="info-img" />
                        <Select
                          className="select"
                          options={departmentsector}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Users className="info-img" />
                        <Select
                          className="select"
                          options={hodlist}
                          placeholder="Choose HOD"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                      <div className="input-blocks">
                        <Link className="btn btn-filters ms-auto">
                          {" "}
                          <i
                            data-feather="search"
                            className="feather-search"
                          />{" "}
                          Search{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className="table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <AddDepartmentList />
      <EditDepartmentList />
    </div>
  );
};

export default DepartmentList;
