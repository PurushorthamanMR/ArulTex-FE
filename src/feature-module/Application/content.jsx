import React from "react";
import { Filter } from "react-feather";
import { Link } from "react-router-dom";
import Select from "react-select";
const Content = () => {
  const optionsBulk = [
    { value: "bulkActions", label: "Bulk Actions" },
    { value: "deleteMarked", label: "Delete Marked" },
    { value: "unmarkAll", label: "Unmark All" },
    { value: "markAll", label: "Mark All" },
  ];

  const optionsRecent = [
    { value: "recent", label: "Recent" },
    { value: "lastModified", label: "Last Modified" },
    { value: "lastModifiedByMe", label: "Last Modified by me" },
  ];
  return (
    <>
      <div className="section-bulk-wrap">
        <div className="bulk-action-type">
          <div className="form-sort select-bluk">
            <Select
              className="select"
              options={optionsBulk}
              defaultValue={optionsBulk[0]}
            />
          </div>
          <Link to className="btn btn-added ">
            Apply
          </Link>
          <div className="search-set">
            <div className="search-input">
              <Link to className="btn btn-searchset">
                <i data-feather="search" className="feather-search" />
              </Link>
              <div id="DataTables_Table_0_filter" className="dataTables_filter">
                <label>
                  {" "}
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    placeholder="Search"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-sort">
          <Filter className="feather-filter" />
          <Select
            className="select"
            options={optionsRecent}
            defaultValue={optionsRecent[0]}
          />
        </div>
      </div>
      <div className="tab-content" id="v-pills-tabContent">
        <div
          className="tab-pane fade active show"
          id="v-pills-profile"
          role="tabpanel"
          aria-labelledby="v-pills-profile-tab"
        >
          <div className="sections-notes-slider">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="accordion-card-one accordion todo-accordion"
                  id="accordionExample"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingOne">
                      <div
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-controls="collapseOne"
                      >
                        <div className="notes-content todo-today-content">
                          <div className="notes-header todo-today-header">
                            <span>
                              <i
                                data-feather="calendar"
                                className="feather-calendar"
                              />
                            </span>
                            <h3>Today</h3>
                            <h6>1</h6>
                          </div>
                        </div>
                        <div className="todo-drop-down">
                          <Link to="#">
                            <span>
                              <i className="fas fa-chevron-down" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="todo-widget">
                          <div className="todo-wrapper-list">
                            <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                              <label className="checkboxs">
                                <input type="checkbox" />
                                <span className="checkmarks" />
                              </label>
                              <div className="todo-wrapper-list-content">
                                <h4>Meeting with Shaun Park at 4:50pm</h4>
                                <p>Discuss about new project</p>
                              </div>
                            </div>
                            <div className="notes-card-body d-flex align-items-center">
                              <p className="badge bg-outline-danger badge-lg me-2 mb-0">
                                <i className="fas fa-circle" /> High
                              </p>
                              <p className="badge bg-outline-secondary badge-lg me-2 mb-0">
                                {" "}
                                New
                              </p>
                            </div>
                            <div className=" todo-profile d-flex align-items-center">
                              <img
                                src="./assets/img/users/user-24.jpg"
                                alt="Img"
                                className="img-fluid"
                              />
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-v" />
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit" />
                                  </span>
                                  Edit
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-note-units"
                                >
                                  <span>
                                    <i data-feather="trash-2" />
                                  </span>
                                  Delete
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star" />
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye" />
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-card-one accordion todo-accordion"
                  id="accordionExample2"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingTwo">
                      <div
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-controls="collapseTwo"
                      >
                        <div className="notes-content todo-today-content">
                          <div className="notes-header todo-today-header">
                            <span>
                              <i
                                data-feather="calendar"
                                className="feather-calendar"
                              />
                            </span>
                            <h3>Yesterday</h3>
                          </div>
                          <div className="todo-drop-down">
                            <Link to="#">
                              <span>
                                <i className="fas fa-chevron-down" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample2"
                    >
                      <div className="accordion-body">
                        <div className="todo-widget">
                          <div className="todo-wrapper-list">
                            <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                              <label className="checkboxs">
                                <input type="checkbox" />
                                <span className="checkmarks" />
                              </label>
                              <div className="todo-wrapper-list-content">
                                <h4>Team meet at Starbucks</h4>
                                <p>Identify the implementation team</p>
                              </div>
                            </div>
                            <div className="notes-card-body d-flex align-items-center">
                              <p className="badge bg-outline-danger badge-lg me-2 mb-0">
                                <i className="fas fa-circle" /> High
                              </p>
                              <p className="badge bg-outline-info badge-lg me-2 mb-0">
                                {" "}
                                Pending
                              </p>
                            </div>
                            <div className=" todo-profile d-flex align-items-center">
                              <Link
                                to="#"
                                className="todo-star star-todo-inbox"
                              >
                                <span>
                                  <i
                                    data-feather="star"
                                    className="feather-star me-3"
                                  />
                                </span>
                              </Link>
                              <img
                                src="./assets/img/avatar/avatar-2.jpg"
                                alt="Img"
                                className="img-fluid"
                              />
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-v" />
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit" />
                                  </span>
                                  Edit
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-note-units"
                                >
                                  <span>
                                    <i data-feather="trash-2" />
                                  </span>
                                  Delete
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star" />
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye" />
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="todo-wrapper-list">
                            <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                              <label className="checkboxs">
                                <input type="checkbox" />
                                <span className="checkmarks" />
                              </label>
                              <div className="todo-wrapper-list-content">
                                <h4>Meet Lisa to discuss project details</h4>
                                <p>Discuss about additional features</p>
                              </div>
                            </div>
                            <div className="notes-card-body d-flex align-items-center">
                              <p className="badge bg-outline-secondary badge-lg me-2 mb-0">
                                <i className="fas fa-circle" /> Medium
                              </p>
                              <p className="badge bg-outline-warning badge-lg me-2 mb-0">
                                {" "}
                                InProgress
                              </p>
                            </div>
                            <div className=" todo-profile d-flex align-items-center">
                              <img
                                src="./assets/img/users/user-11.jpg"
                                alt="Img"
                                className="img-fluid"
                              />
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-v" />
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit" />
                                  </span>
                                  Edit
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-note-units"
                                >
                                  <span>
                                    <i data-feather="trash-2" />
                                  </span>
                                  Delete
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star" />
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye" />
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="todo-wrapper-list">
                            <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                              <label className="checkboxs">
                                <input type="checkbox" defaultChecked />
                                <span className="checkmarks" />
                              </label>
                              <div className="todo-wrapper-list-content todo-strike-content">
                                <h4>Download Complete</h4>
                                <p>
                                  Install console machines and prerequiste
                                  softwares
                                </p>
                              </div>
                            </div>
                            <div className="notes-card-body d-flex align-items-center">
                              <p className="badge bg-outline-warning badge-lg me-2 mb-0">
                                <i className="fas fa-circle" /> Low
                              </p>
                              <p className="badge bg-outline-success badge-lg me-2 mb-0">
                                {" "}
                                Completed
                              </p>
                            </div>
                            <div className=" todo-profile d-flex align-items-center">
                              <img
                                src="./assets/img/users/user-02.jpg"
                                alt="Img"
                                className="img-fluid"
                              />
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-v" />
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit" />
                                  </span>
                                  Edit
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-note-units"
                                >
                                  <span>
                                    <i data-feather="trash-2" />
                                  </span>
                                  Delete
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star" />
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye" />
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-card-one accordion todo-accordion"
                  id="accordionExample4"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingFour">
                      <div
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-controls="collapseFour"
                      >
                        <div className="notes-content todo-today-content">
                          <div className="notes-header todo-today-header">
                            <span>
                              <i
                                data-feather="calendar"
                                className="feather-calendar"
                              />
                            </span>
                            <h3>25/07/2023</h3>
                          </div>
                          <div className="todo-drop-down">
                            <Link to="#">
                              <span>
                                <i className="fas fa-chevron-down" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample4"
                    >
                      <div className="accordion-body">
                        <div className="todo-widget">
                          <div className="todo-wrapper-list">
                            <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                              <label className="checkboxs">
                                <input type="checkbox" />
                                <span className="checkmarks" />
                              </label>
                              <div className="todo-wrapper-list-content">
                                <h4>New User Registered</h4>
                                <p>Add new user</p>
                              </div>
                            </div>
                            <div className="notes-card-body d-flex align-items-center">
                              <p className="badge bg-outline-danger badge-lg me-2 mb-0">
                                <i className="fas fa-circle" /> High
                              </p>
                              <p className="badge bg-outline-info badge-lg me-2 mb-0">
                                {" "}
                                Pending
                              </p>
                            </div>
                            <div className=" todo-profile d-flex align-items-center">
                              <img
                                src="./assets/img/users/user-25.jpg"
                                alt="Img"
                                className="img-fluid"
                              />
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-v" />
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit" />
                                  </span>
                                  Edit
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-note-units"
                                >
                                  <span>
                                    <i data-feather="trash-2" />
                                  </span>
                                  Delete
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star" />
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye" />
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="todo-wrapper-list">
                            <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                              <label className="checkboxs">
                                <input type="checkbox" />
                                <span className="checkmarks" />
                              </label>
                              <div className="todo-wrapper-list-content">
                                <h4>Fix issues in new project</h4>
                                <p>Unit test had done and bug fixed</p>
                              </div>
                            </div>
                            <div className="notes-card-body d-flex align-items-center">
                              <p className="badge bg-outline-danger badge-lg me-2 mb-0">
                                <i className="fas fa-circle" /> High
                              </p>
                              <p className="badge bg-outline-warning badge-lg me-2 mb-0">
                                {" "}
                                InProgress
                              </p>
                            </div>
                            <div className=" todo-profile d-flex align-items-center">
                              <img
                                src="./assets/img/users/user-04.jpg"
                                alt="Img"
                                className="img-fluid"
                              />
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-v" />
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit" />
                                  </span>
                                  Edit
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-note-units"
                                >
                                  <span>
                                    <i data-feather="trash-2" />
                                  </span>
                                  Delete
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star" />
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye" />
                                  </span>
                                  View
                                </Link>
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
        <div
          className="tab-pane fade "
          id="v-pills-home"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <div className="sections-notes-slider">
            <div className="row">
              <div className="todo-widget">
                <div className="todo-wrapper-list">
                  <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="todo-wrapper-list-content">
                      <h4>Team meet at Starbucks</h4>
                      <p>Identify the implementation team</p>
                    </div>
                  </div>
                  <div className="notes-card-body d-flex align-items-center">
                    <p className="badge bg-outline-danger badge-lg me-2 mb-0">
                      <i className="fas fa-circle" /> High
                    </p>
                    <p className="badge bg-outline-info badge-lg me-2 mb-0">
                      {" "}
                      Pending
                    </p>
                  </div>
                  <div className=" todo-profile d-flex align-items-center">
                    <img
                      src="./assets/img/users/user-03.jpg"
                      alt="Img"
                      className="img-fluid"
                    />
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </Link>
                    <div className="dropdown-menu notes-menu dropdown-menu-end">
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-note-units"
                      >
                        <span>
                          <i data-feather="edit" />
                        </span>
                        Edit
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#delete-note-units"
                      >
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                        Delete
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="star" />
                        </span>
                        Not Important
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#view-note-units"
                      >
                        <span>
                          <i data-feather="eye" />
                        </span>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="todo-wrapper-list">
                  <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="todo-wrapper-list-content">
                      <h4>Meet Lisa to discuss project details</h4>
                      <p>Discuss about additional features</p>
                    </div>
                  </div>
                  <div className="notes-card-body d-flex align-items-center">
                    <p className="badge bg-outline-secondary badge-lg me-2 mb-0">
                      <i className="fas fa-circle" /> Medium
                    </p>
                    <p className="badge bg-outline-warning badge-lg me-2 mb-0">
                      {" "}
                      InProgress
                    </p>
                  </div>
                  <div className=" todo-profile d-flex align-items-center">
                    <img
                      src="./assets/img/users/user-04.jpg"
                      alt="Img"
                      className="img-fluid"
                    />
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </Link>
                    <div className="dropdown-menu notes-menu dropdown-menu-end">
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-note-units"
                      >
                        <span>
                          <i data-feather="edit" />
                        </span>
                        Edit
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#delete-note-units"
                      >
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                        Delete
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="star" />
                        </span>
                        Not Important
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#view-note-units"
                      >
                        <span>
                          <i data-feather="eye" />
                        </span>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="todo-wrapper-list">
                  <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                    <label className="checkboxs active">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="todo-wrapper-list-content todo-strike-content">
                      <h4>Download Complete</h4>
                      <p>Install console machines and prerequiste softwares</p>
                    </div>
                  </div>
                  <div className="notes-card-body d-flex align-items-center">
                    <p className="badge bg-outline-warning badge-lg me-2 mb-0">
                      <i className="fas fa-circle" /> Low
                    </p>
                    <p className="badge bg-outline-success badge-lg me-2 mb-0">
                      {" "}
                      Completed
                    </p>
                  </div>
                  <div className=" todo-profile d-flex align-items-center">
                    <img
                      src="./assets/img/users/user-05.jpg"
                      alt="Img"
                      className="img-fluid me-0"
                    />
                    <Link to="#" className="inbox-call-profile">
                      Calls
                    </Link>
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </Link>
                    <div className="dropdown-menu notes-menu dropdown-menu-end">
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-note-units"
                      >
                        <span>
                          <i data-feather="edit" />
                        </span>
                        Edit
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#delete-note-units"
                      >
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                        Delete
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="star" />
                        </span>
                        Not Important
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#view-note-units"
                      >
                        <span>
                          <i data-feather="eye" />
                        </span>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="v-pills-messages"
          role="tabpanel"
          aria-labelledby="v-pills-messages-tab"
        >
          <div className="sections-notes-slider">
            <div className="row">
              <div className="todo-widget">
                <div className="todo-wrapper-list">
                  <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="todo-wrapper-list-content">
                      <h4>Team meet at Starbucks</h4>
                      <p>Identify the implementation team</p>
                    </div>
                  </div>
                  <div className="notes-card-body d-flex align-items-center">
                    <p className="badge bg-outline-danger badge-lg me-2 mb-0">
                      <i className="fas fa-circle" /> High
                    </p>
                    <p className="badge bg-outline-info badge-lg me-2 mb-0">
                      {" "}
                      Pending
                    </p>
                  </div>
                  <div className=" todo-profile d-flex align-items-center">
                    <Link to="#" className="todo-star">
                      <span>
                        <i className="fas fa-star me-3" />
                      </span>
                    </Link>
                    <img
                      src="./assets/img/users/user-05.jpg"
                      alt="Img"
                      className="img-fluid"
                    />
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </Link>
                    <div className="dropdown-menu notes-menu dropdown-menu-end">
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-note-units"
                      >
                        <span>
                          <i data-feather="edit" />
                        </span>
                        Edit
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#delete-note-units"
                      >
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                        Delete
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="star" />
                        </span>
                        Not Important
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#view-note-units"
                      >
                        <span>
                          <i data-feather="eye" />
                        </span>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="todo-wrapper-list">
                  <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="todo-wrapper-list-content">
                      <h4>Meet Lisa to discuss project details</h4>
                      <p>Discuss about additional features</p>
                    </div>
                  </div>
                  <div className="notes-card-body d-flex align-items-center">
                    <p className="badge bg-outline-secondary badge-lg me-2 mb-0">
                      <i className="fas fa-circle" /> Medium
                    </p>
                    <p className="badge bg-outline-warning badge-lg me-2 mb-0">
                      {" "}
                      InProgress
                    </p>
                  </div>
                  <div className=" todo-profile d-flex align-items-center">
                    <img
                      src="./assets/img/users/user-06.jpg"
                      alt="Img"
                      className="img-fluid"
                    />
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </Link>
                    <div className="dropdown-menu notes-menu dropdown-menu-end">
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-note-units"
                      >
                        <span>
                          <i data-feather="edit" />
                        </span>
                        Edit
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#delete-note-units"
                      >
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                        Delete
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="star" />
                        </span>
                        Not Important
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#view-note-units"
                      >
                        <span>
                          <i data-feather="eye" />
                        </span>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="todo-wrapper-list">
                  <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                    <label className="checkboxs active">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="todo-wrapper-list-content todo-strike-content">
                      <h4>Download Complete</h4>
                      <p>Install console machines and prerequiste softwares</p>
                    </div>
                  </div>
                  <div className="notes-card-body d-flex align-items-center">
                    <p className="badge bg-outline-warning badge-lg me-2 mb-0">
                      <i className="fas fa-circle" /> Low
                    </p>
                    <p className="badge bg-outline-success badge-lg me-2 mb-0">
                      {" "}
                      Completed
                    </p>
                  </div>
                  <div className=" todo-profile d-flex align-items-center">
                    <img
                      src="./assets/img/users/user-07.jpg"
                      alt="Img"
                      className="img-fluid"
                    />
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </Link>
                    <div className="dropdown-menu notes-menu dropdown-menu-end">
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-note-units"
                      >
                        <span>
                          <i data-feather="edit" />
                        </span>
                        Edit
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#delete-note-units"
                      >
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                        Delete
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="star" />
                        </span>
                        Not Important
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#view-note-units"
                      >
                        <span>
                          <i data-feather="eye" />
                        </span>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="v-pills-settings"
          role="tabpanel"
          aria-labelledby="v-pills-settings-tab"
        >
          <div className="sections-notes-slider">
            <div className="row">
              <div className="todo-widget">
                <div className="todo-wrapper-list">
                  <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="todo-wrapper-list-content">
                      <h4>Team meet at Starbucks</h4>
                      <p>Identify the implementation team</p>
                    </div>
                  </div>
                  <div className="notes-card-body d-flex align-items-center">
                    <p className="badge bg-outline-danger badge-lg me-2 mb-0">
                      <i className="fas fa-circle" /> High
                    </p>
                    <p className="badge bg-outline-info badge-lg me-2 mb-0">
                      {" "}
                      Pending
                    </p>
                  </div>
                  <div className=" todo-profile d-flex align-items-center">
                    <img
                      src="./assets/img/users/user-08.jpg"
                      alt="Img"
                      className="img-fluid"
                    />
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </Link>
                    <div className="dropdown-menu notes-menu dropdown-menu-end">
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="edit" />
                        </span>
                        Permanent Delete
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                        Restore Task
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="todo-wrapper-list">
                  <div className="input-block add-lists todo-inbox-check todo-inbox-check-list">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="todo-wrapper-list-content">
                      <h4>Meet Lisa to discuss project details</h4>
                      <p>Discuss about additional features</p>
                    </div>
                  </div>
                  <div className="notes-card-body d-flex align-items-center">
                    <p className="badge bg-outline-secondary badge-lg me-2 mb-0">
                      <i className="fas fa-circle" /> Medium
                    </p>
                    <p className="badge bg-outline-warning badge-lg me-2 mb-0">
                      {" "}
                      InProgress
                    </p>
                  </div>
                  <div className=" todo-profile d-flex align-items-center">
                    <img
                      src="./assets/img/users/user-09.jpg"
                      alt="Img"
                      className="img-fluid"
                    />
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </Link>
                    <div className="dropdown-menu notes-menu dropdown-menu-end">
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="edit" />
                        </span>
                        Permanent Delete
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                        Restore Task
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row custom-pagination">
        <div className="col-md-12">
          <div className="paginations d-flex justify-content-end">
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
    </>
  );
};

export default Content;
