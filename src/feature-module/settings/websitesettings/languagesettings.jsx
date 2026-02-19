import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setToogleHeader } from "../../../core/redux/action";
import {
  ChevronUp,
  Download,
  RotateCcw,
} from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import Select from "react-select";
import { Filter } from "react-feather";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SettingsSideBar from "../settingssidebar";
import { all_routes } from "../../../Router/all_routes";

const LanguageSettings = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const languageOptions = [
    { value: "selectLanguage", label: "Select Language" },
    { value: "english", label: "English" },
    { value: "arabic", label: "Arabic" },
    { value: "chinese", label: "Chinese" },
  ];

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
                    <h4>Language</h4>
                  </div>
                  <div className="page-header justify-content-end">
                    <ul className="table-top-head me-auto">
                      <li>
                        <OverlayTrigger placement="top" overlay={renderTooltip}>
                          <Link
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/pdf.svg"
                              alt="img"
                            />
                          </Link>
                        </OverlayTrigger>
                      </li>
                      <li>
                        <OverlayTrigger
                          placement="top"
                          overlay={renderExcelTooltip}
                        >
                          <Link
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/excel.svg"
                              alt="img"
                            />
                          </Link>
                        </OverlayTrigger>
                      </li>
                      <li>
                        <OverlayTrigger
                          placement="top"
                          overlay={renderPrinterTooltip}
                        >
                          <Link
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                          >
                            <i
                              data-feather="printer"
                              className="feather-rotate-ccw"
                            />
                          </Link>
                        </OverlayTrigger>
                      </li>
                    </ul>
                    <div className="page-btn d-flex align-items-center ms-0">
                      <div className="select-language">
                        <Select
                          options={languageOptions}
                          className="select"
                          placeholder="Select Language"
                        />
                      </div>
                      <Link to="#" className="btn btn-added ms-3">
                        Add Translation
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
                                <Link to="#" className="btn btn-searchset">
                                  <i
                                    data-feather="search"
                                    className="feather-search"
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="search-path">
                              <div className="d-flex align-items-center">
                                <Link className="btn btn-secondary" to="#">
                                  <Filter className="filter-icon me-1" />
                                  Import Sample
                                </Link>
                              </div>
                            </div>
                          </div>
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
                                  <th>Language</th>
                                  <th>Code</th>
                                  <th>RTL</th>
                                  <th>Total</th>
                                  <th>Done</th>
                                  <th>Progress</th>
                                  <th>Status</th>
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
                                  <td>
                                    <div className="language-name d-flex align-items-center">
                                      <ImageWithBasePath
                                        src="assets/img/icons/flag-01.svg"
                                        className="me-2"
                                        alt=""
                                      />
                                      English
                                    </div>
                                  </td>
                                  <td>en</td>
                                  <td>
                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                      <input
                                        type="checkbox"
                                        id="user1"
                                        className="check"
                                        defaultChecked="true"
                                      />
                                      <label
                                        htmlFor="user1"
                                        className="checktoggle"
                                      />
                                    </div>
                                  </td>
                                  <td>2145</td>
                                  <td>1815</td>
                                  <td>
                                    <div className="position-relative">
                                      <div className="progress attendance language-progress">
                                        <div
                                          className="progress-bar progress-bar-warning"
                                          role="progressbar"
                                        >
                                          <span>80%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-linesuccess">
                                      Active
                                    </span>
                                  </td>
                                  <td className="action-table-data">
                                    <div className="edit-delete-action language-action">
                                      <Link
                                        to="#"
                                        className="me-2 language-import"
                                      >
                                        <Download className="feather-download" />
                                      </Link>
                                      <div className="custom-control custom-checkbox">
                                        <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                                          <input
                                            type="checkbox"
                                            defaultChecked="true"
                                          />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <Link
                                        to={route.languagesettings}
                                        className="btn btn-secondary me-2"
                                      >
                                        Web
                                      </Link>
                                      <Link
                                        to="#"
                                        className="btn btn-secondary me-2"
                                      >
                                        App
                                      </Link>
                                      <Link
                                        to="#"
                                        className="btn btn-secondary me-2"
                                      >
                                        Admin
                                      </Link>
                                      <Link
                                        onClick={showConfirmationAlert}
                                        className="confirm-text p-0"
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
                                  <td>
                                    <div className="language-name d-flex align-items-center">
                                      <ImageWithBasePath
                                        src="assets/img/icons/flag-02.svg"
                                        className="me-2"
                                        alt=""
                                      />
                                      Arabic
                                    </div>
                                  </td>
                                  <td>Ar</td>
                                  <td>
                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                      <input
                                        type="checkbox"
                                        id="user2"
                                        className="check"
                                        defaultChecked=""
                                      />
                                      <label
                                        htmlFor="user2"
                                        className="checktoggle"
                                      />
                                    </div>
                                  </td>
                                  <td>2045</td>
                                  <td>2045</td>
                                  <td>
                                    <div className="position-relative">
                                      <div className="progress attendance language-progress">
                                        <div
                                          className="progress-bar progress-bar-success"
                                          role="progressbar"
                                        >
                                          <span>100%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-linedanger">
                                      Inactive
                                    </span>
                                  </td>
                                  <td className="action-table-data">
                                    <div className="edit-delete-action language-action">
                                      <Link
                                        to="#"
                                        className="me-2 language-import"
                                      >
                                        <Download className="feather-download" />
                                      </Link>
                                      <div className="custom-control custom-checkbox">
                                        <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <Link
                                        to={route.languagesettings}
                                        className="btn btn-secondary me-2"
                                      >
                                        Web
                                      </Link>
                                      <Link
                                        to="#"
                                        className="btn btn-secondary me-2"
                                      >
                                        App
                                      </Link>
                                      <Link
                                        to="#"
                                        className="btn btn-secondary me-2"
                                      >
                                        Admin
                                      </Link>
                                      <Link
                                        onClick={showConfirmationAlert}
                                        className="confirm-text p-0"
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
                                  <td>
                                    <div className="language-name d-flex align-items-center">
                                      <ImageWithBasePath
                                        src="assets/img/icons/flag-03.svg"
                                        className="me-2"
                                        alt=""
                                      />
                                      Chinese
                                    </div>
                                  </td>
                                  <td>zh</td>
                                  <td>
                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                      <input
                                        type="checkbox"
                                        id="user3"
                                        className="check"
                                        defaultChecked=""
                                      />
                                      <label
                                        htmlFor="user3"
                                        className="checktoggle"
                                      />
                                    </div>
                                  </td>
                                  <td>2245</td>
                                  <td>295</td>
                                  <td>
                                    <div className="position-relative">
                                      <div className="progress attendance language-progress">
                                        <div
                                          className="progress-bar progress-bar-violet"
                                          role="progressbar"
                                        >
                                          <span>5%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-linesuccess">
                                      Active
                                    </span>
                                  </td>
                                  <td className="action-table-data">
                                    <div className="edit-delete-action language-action">
                                      <Link
                                        to="#"
                                        className="me-2 language-import"
                                      >
                                        <Download className="feather-download" />
                                      </Link>
                                      <div className="custom-control custom-checkbox">
                                        <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                                          <input
                                            type="checkbox"
                                            defaultChecked=""
                                          />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <Link
                                        to={route.languagesettings}
                                        className="btn btn-secondary me-2"
                                      >
                                        Web
                                      </Link>
                                      <Link
                                        to="#"
                                        className="btn btn-secondary me-2"
                                      >
                                        App
                                      </Link>
                                      <Link
                                        to="#"
                                        className="btn btn-secondary me-2"
                                      >
                                        Admin
                                      </Link>
                                      <Link
                                        onClick={showConfirmationAlert}
                                        className="confirm-text p-0"
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
                                  <td>
                                    <div className="language-name d-flex align-items-center">
                                      <ImageWithBasePath
                                        src="assets/img/icons/flag-04.svg"
                                        className="me-2"
                                        alt=""
                                      />
                                      Hindi
                                    </div>
                                  </td>
                                  <td>hi</td>
                                  <td>
                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                      <input
                                        type="checkbox"
                                        id="user4"
                                        className="check"
                                        defaultChecked=""
                                      />
                                      <label
                                        htmlFor="user4"
                                        className="checktoggle"
                                      />
                                    </div>
                                  </td>
                                  <td>2535</td>
                                  <td>1145</td>
                                  <td>
                                    <div className="position-relative">
                                      <div className="progress attendance language-progress">
                                        <div
                                          className="progress-bar progress-bar-violet-two"
                                          role="progressbar"
                                        >
                                          <span>40%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-linesuccess">
                                      Active
                                    </span>
                                  </td>
                                  <td className="action-table-data">
                                    <div className="edit-delete-action language-action">
                                      <Link
                                        to="#"
                                        className="me-2 language-import"
                                      >
                                        <Download className="feather-download" />
                                      </Link>
                                      <div className="custom-control custom-checkbox">
                                        <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                                          <input
                                            type="checkbox"
                                            defaultChecked="true"
                                          />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <Link
                                        to={route.languagesettings}
                                        className="btn btn-secondary me-2"
                                      >
                                        Web
                                      </Link>
                                      <Link
                                        to="#"
                                        className="btn btn-secondary me-2"
                                      >
                                        App
                                      </Link>
                                      <Link
                                        to="#"
                                        className="btn btn-secondary me-2"
                                      >
                                        Admin
                                      </Link>
                                      <Link
                                        onClick={showConfirmationAlert}
                                        className="confirm-text p-0"
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
    </div>
  );
};

export default LanguageSettings;
