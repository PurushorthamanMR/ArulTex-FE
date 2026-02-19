import React, { useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom/dist";
import { all_routes } from "../../Router/all_routes";
import {
  Edit,
  FileText,
  Filter,
  Grid,
  List,
  MoreVertical,
  PlusCircle,
  RotateCcw,
  Sliders,
  Trash2,
  Users,
} from "feather-icons-react/build/IconComponents";
import Select from "react-select";
import AddDepartment from "../../core/modals/hrm/adddepartment";
import EditDepartment from "../../core/modals/hrm/editdepartment";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ChevronUp } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";

const DepartmentGrid = () => {
  const route = all_routes;

  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

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
                    className={data ? "active" : ""}
                    onClick={() => {
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
                data-bs-target="#add-department"
              >
                <PlusCircle className="me-2" />
                Add New Department
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
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
                    <Link to={route.departmentgrid} className="btn-list">
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
            </div>
          </div>
          {/* /product list */}
          <div className="employee-grid-widget">
            <div className="row">
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="active">UI/UX</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Mitchum Daniel</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 07</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-01.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-02.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                            <span>+4</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="active">HR</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Susan Lopez</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 05</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="inactive">Admin</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-03.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Robert Grossman</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 06</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="active">Admin</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-06.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Janet Hembre</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 04</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="inactive">Technician</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-04.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Russell Belle</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 08</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="active">Support</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-05.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Edward K. Muniz</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 04</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="inactive">Engineering</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-07.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Susan Moore</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 10</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+6</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="inactive">Admin</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-08.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Lance Jackson</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 03</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="inactive">PHP Development</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-11.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Mitchum Daniel</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 09</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="active">React</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <i data-feather="edit" className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-12.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Susan Moore</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 07</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="active">Angular</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-09.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Lance Jackson</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 07</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="dep-name">
                      <h5 className="active">NodeJS</h5>
                    </div>
                    <div className="profile-head-action">
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i
                            data-feather="more-vertical"
                            className="feather-user"
                          />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-department"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info department-profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-13.jpg"
                        alt=""
                      />
                    </div>
                    <h4>Robert Grossman</h4>
                  </div>
                  <ul className="team-members">
                    <li>Total Members: 07</li>
                    <li>
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-03.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-04.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-06.jpg"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/users/user-05.jpg"
                              alt=""
                            />
                            <span>+3</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row custom-pagination">
              <div className="col-md-12">
                <div className="paginations d-flex justify-content-end mb-3">
                  <span>
                    <i className="fas fa-chevron-left" />
                  </span>
                  <ul className="d-flex align-items-center page-wrap">
                    <li>
                      <Link to="#" className="active">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link to="#">2</Link>
                    </li>
                    <li>
                      <Link to="#">3</Link>
                    </li>
                    <li>
                      <Link to="#">4</Link>
                    </li>
                  </ul>
                  <span>
                    <i className="fas fa-chevron-right" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddDepartment />
      <EditDepartment />
    </div>
  );
};

export default DepartmentGrid;
