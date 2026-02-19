import {
  ChevronUp,
  Edit2,
  Filter,
  Grid,
  List,
  PlusCircle,
  RotateCcw,
  Sliders,
  User,
} from "feather-icons-react/build/IconComponents";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setToogleHeader } from "../../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import Select from "react-select";
import BankSettingList from "../../../core/modals/settings/banksettinglist";
import EditBankSettingList from "../../../core/modals/settings/editbanksettinglist";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SettingsSideBar from "../settingssidebar";
import { all_routes } from "../../../Router/all_routes";

const BankSetting = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

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

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const oldandlatestvalue = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];
  const options = [
    { value: "chooseName", label: "Choose Name" },
    { value: "mathew", label: "Mathew" },
    { value: "johnSmith", label: "John Smith" },
    { value: "andrew", label: "Andrew" },
  ];
  const banklist = [
    { value: "chooseBank", label: "Choose Bank" },
    { value: "hdfc", label: "HDFC" },
    { value: "swissBank", label: "Swiss Bank" },
    { value: "canaraBank", label: "Canara Bank" },
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
        <div className="content settings-content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Settings</h4>
                <h6>Manage your settings on portal</h6>
              </div>
            </div>
            <ul className="table-top-head">
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
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="settings-page-wrap w-50">
                  <div className="setting-title">
                    <h4>Bank Account</h4>
                  </div>
                  <div className="page-header bank-settings justify-content-end">
                    <Link
                      to={route.banksettingslist}
                      className="btn-list me-2 active"
                    >
                      <List className="feather-user" />
                    </Link>
                    <Link to={route.banksettingsgrid} className="btn-grid">
                      <Grid className="feather-user" />
                    </Link>
                    <div className="page-btn">
                      <Link
                        to="#"
                        className="btn btn-added"
                        data-bs-toggle="modal"
                        data-bs-target="#add-account"
                      >
                        <PlusCircle className="me-2" />
                        Add New Account
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card table-list-card">
                        <div className="card-body">
                          <div className="table-top">
                            <div className="search-set">
                              <div className="search-input">
                                <div className="search-set">
                                  <div className="search-input">
                                    <input
                                      type="text"
                                      placeholder="Search"
                                      className="form-control form-control-sm formsearch"
                                    />
                                    <Link to className="btn btn-searchset">
                                      <i
                                        data-feather="search"
                                        className="feather-search"
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="search-path">
                              <div className="d-flex align-items-center">
                                <Link
                                  className={`btn btn-filter ${
                                    isFilterVisible ? "setclose" : ""
                                  }`}
                                  id="filter_search"
                                >
                                  <Filter
                                    className="filter-icon"
                                    onClick={toggleFilterVisibility}
                                  />
                                  <span onClick={toggleFilterVisibility}>
                                    <ImageWithBasePath
                                      src="assets/img/icons/closes.svg"
                                      alt="img"
                                    />
                                  </span>
                                </Link>
                              </div>
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
                          {/* /Filter */}
                          <div
                            className={`card${
                              isFilterVisible ? " visible" : ""
                            }`}
                            id="filter_inputs"
                            style={{
                              display: isFilterVisible ? "block" : "none",
                            }}
                          >
                            <div className="card-body pb-0">
                              <div className="row">
                                <div className="col-lg-4 col-sm-6 col-12">
                                  <div className="input-blocks">
                                    <User className="info-img" />
                                    <Select
                                      options={options}
                                      className="select"
                                      placeholder="Choose a Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-12">
                                  <div className="input-blocks">
                                    <Edit2 className="info-img" />
                                    <Select
                                      options={banklist}
                                      className="select"
                                      placeholder="Choose a Bank"
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
                            <table className="table  datanew">
                              <thead>
                                <tr>
                                  <th className="no-sort">
                                    <label className="checkboxs">
                                      <input type="checkbox" id="select-all" />
                                      <span className="checkmarks" />
                                    </label>
                                  </th>
                                  <th>Name</th>
                                  <th>Bank</th>
                                  <th>Branch</th>
                                  <th>Account No</th>
                                  <th>IFSC</th>
                                  <th>Created On</th>
                                  <th className="no-sort">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                    </label>
                                  </td>
                                  <td>Mathew</td>
                                  <td>HDFC</td>
                                  <td>Bringham</td>
                                  <td>**** **** 1832</td>
                                  <td>124547</td>
                                  <td>12 Jul 2023</td>
                                  <td className="action-table-data">
                                    <div className="edit-delete-action">
                                      <Link
                                        className="me-2 p-2"
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-account"
                                      >
                                        <i
                                          data-feather="edit"
                                          className="feather-edit"
                                        />
                                      </Link>
                                      <Link
                                        onClick={showConfirmationAlert}
                                        className="confirm-text p-2"
                                        to="#"
                                      >
                                        <i
                                          data-feather="trash-2"
                                          className="feather-trash-2"
                                        />
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                    </label>
                                  </td>
                                  <td>Toby Lando</td>
                                  <td>SBI</td>
                                  <td>Leicester</td>
                                  <td>**** **** 1596</td>
                                  <td>156723</td>
                                  <td>17 Aug 2023</td>
                                  <td className="action-table-data">
                                    <div className="edit-delete-action">
                                      <Link
                                        className="me-2 p-2"
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-account"
                                      >
                                        <i
                                          data-feather="edit"
                                          className="feather-edit"
                                        />
                                      </Link>
                                      <Link
                                        onClick={showConfirmationAlert}
                                        className="confirm-text p-2"
                                        to="#"
                                      >
                                        <i
                                          data-feather="trash-2"
                                          className="feather-trash-2"
                                        />
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                    </label>
                                  </td>
                                  <td>John Smith</td>
                                  <td>KVB</td>
                                  <td>Bristol</td>
                                  <td>**** **** 1982</td>
                                  <td>198367</td>
                                  <td>08 Sep 2023</td>
                                  <td className="action-table-data">
                                    <div className="edit-delete-action">
                                      <Link
                                        className="me-2 p-2"
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-account"
                                      >
                                        <i
                                          data-feather="edit"
                                          className="feather-edit"
                                        />
                                      </Link>
                                      <Link
                                        onClick={showConfirmationAlert}
                                        className="confirm-text p-2"
                                        to="#"
                                      >
                                        <i
                                          data-feather="trash-2"
                                          className="feather-trash-2"
                                        />
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                    </label>
                                  </td>
                                  <td>Andrew</td>
                                  <td>Swiss Bank</td>
                                  <td>Nottingham</td>
                                  <td>**** **** 1796</td>
                                  <td>186730</td>
                                  <td>21 Oct 2023</td>
                                  <td className="action-table-data">
                                    <div className="edit-delete-action">
                                      <Link
                                        className="me-2 p-2"
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-account"
                                      >
                                        <i
                                          data-feather="edit"
                                          className="feather-edit"
                                        />
                                      </Link>
                                      <Link
                                        onClick={showConfirmationAlert}
                                        className="confirm-text p-2"
                                        to="#"
                                      >
                                        <i
                                          data-feather="trash-2"
                                          className="feather-trash-2"
                                        />
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                    </label>
                                  </td>
                                  <td>Robert</td>
                                  <td>Canara Bank</td>
                                  <td>Norwich</td>
                                  <td>**** **** 1645</td>
                                  <td>146026</td>
                                  <td>03 Nov 2023</td>
                                  <td className="action-table-data">
                                    <div className="edit-delete-action">
                                      <Link
                                        className="me-2 p-2"
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-account"
                                      >
                                        <i
                                          data-feather="edit"
                                          className="feather-edit"
                                        />
                                      </Link>
                                      <Link
                                        onClick={showConfirmationAlert}
                                        className="confirm-text p-2"
                                        to="#"
                                      >
                                        <i
                                          data-feather="trash-2"
                                          className="feather-trash-2"
                                        />
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BankSettingList />
      <EditBankSettingList />
    </div>
  );
};

export default BankSetting;
