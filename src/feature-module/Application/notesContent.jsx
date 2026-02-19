import React from "react";
import { Filter } from "react-feather";
import { Link } from "react-router-dom";
import Select from "react-select";
const NotesContent = () => {
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
          <div className="form-sort select-bluk ">
            <Select
              className="select"
              options={optionsBulk}
              defaultValue={optionsBulk[0]}
            />
          </div>
          <Link to="#" className="btn btn-added">
            Apply
          </Link>
          <div className="search-set">
            <div className="search-input">
              <Link to="#" className="btn btn-searchset">
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
          <div className="section-notes-slider">
            <div className="row">
              <div className="notes-content">
                <div className="notes-header">
                  <h3>Important Notes </h3>
                </div>
                <div className="notes-close">
                  <Link to="#">
                    <i className="fas fa-times" /> Close{" "}
                  </Link>
                </div>
              </div>
              <div className="col-md-12" id="notes-important">
                <div className="notes-slider owl-carousel">
                  <div className="notes-card">
                    <div className="notes-card-body">
                      <p className="badged">
                        <i className="fas fa-circle" /> Low
                      </p>
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
                    <div className="notes-slider-content">
                      <h4>
                        <Link to="#">Plan a trip to another country</Link>
                      </h4>
                      <p>
                        Space, the final frontier. These are the voyages of the
                        Starship Enterprise.
                      </p>
                    </div>
                    <div className="notes-slider-widget">
                      <div className="notes-logo">
                        <Link to="#">
                          <span>
                            <img
                              src="./assets/img/profiles/profile-01.png"
                              alt="Profile"
                              className="img-fluid"
                            />
                          </span>
                        </Link>
                        <div className="d-flex">
                          <span className="low-square">
                            <i className="fas fa-square" />
                          </span>
                          <p> Personal</p>
                        </div>
                      </div>
                      <div className="notes-star-delete">
                        <Link to="#">
                          <span>
                            <i className="fas fa-star" />
                          </span>
                        </Link>
                        <Link to="#">
                          <span>
                            <i data-feather="trash-2" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="notes-card medium">
                    <div className="notes-card-body">
                      <p className="badged medium">
                        <i className="fas fa-circle" /> Medium
                      </p>
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
                    <div className="notes-slider-content">
                      <h4>
                        <Link to="#">Improve touch typing</Link>
                      </h4>
                      <p>
                        Well, the way they make shows is, they make one show.
                      </p>
                    </div>
                    <div className="notes-slider-widget">
                      <div className="notes-logo">
                        <Link to="#">
                          <span>
                            <img
                              src="./assets/img/profiles/profile-02.png"
                              alt="Profile"
                              className="img-fluid"
                            />
                          </span>
                        </Link>
                        <div className="d-flex">
                          <span className="medium-square">
                            <i className="fas fa-square" />
                          </span>
                          <p className="medium"> Work</p>
                        </div>
                      </div>
                      <div className="notes-star-delete">
                        <Link to="#">
                          <span>
                            <i className="fas fa-star" />
                          </span>
                        </Link>
                        <Link to="#">
                          <span>
                            <i data-feather="trash-2" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="notes-card high">
                    <div className="notes-card-body">
                      <p className="badged high">
                        <i className="fas fa-circle" /> High
                      </p>
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
                    <div className="notes-slider-content">
                      <h4>
                        <Link to="#">Learn calligraphy</Link>
                      </h4>
                      <p>
                        Calligraphy, the art of beautiful handwriting. The term
                        may derive from the Greek words.{" "}
                      </p>
                    </div>
                    <div className="notes-slider-widget">
                      <div className="notes-logo">
                        <Link to="#">
                          <span>
                            <img
                              src="./assets/img/profiles/profile-03.png"
                              alt="Profile"
                              className="img-fluid"
                            />
                          </span>
                        </Link>
                        <div className="d-flex">
                          <span className="high-square">
                            <i className="fas fa-square" />
                          </span>
                          <p className="high"> Social</p>
                        </div>
                      </div>
                      <div className="notes-star-delete">
                        <Link to="#">
                          <span>
                            <i className="fas fa-star" />
                          </span>
                        </Link>
                        <Link to="#">
                          <span>
                            <i data-feather="trash-2" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="notes-card medium">
                    <div className="notes-card-body">
                      <p className="badged medium">
                        <i className="fas fa-circle" /> Medium
                      </p>
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
                    <div className="notes-slider-content">
                      <h4>
                        <Link to="#">Improve touch typing</Link>
                      </h4>
                      <p>
                        Well, the way they make shows is, they make one show.
                      </p>
                    </div>
                    <div className="notes-slider-widget">
                      <div className="notes-logo">
                        <Link to="#">
                          <span>
                            <img
                              src="./assets/img/profiles/profile-02.png"
                              alt="Profile"
                              className="img-fluid"
                            />
                          </span>
                        </Link>
                        <div className="d-flex">
                          <span className="medium-square">
                            <i className="fas fa-square" />
                          </span>
                          <p className="medium"> Work</p>
                        </div>
                      </div>
                      <div className="notes-star-delete">
                        <Link to="#">
                          <span>
                            <i className="fas fa-star" />
                          </span>
                        </Link>
                        <Link to="#">
                          <span>
                            <i data-feather="trash-2" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-card-body" id="notes-trash">
            <div className="row">
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged medium">
                      <i className="fas fa-circle" /> Medium
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Backup Files EOD</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      25 Jul 2023
                    </p>
                    <p>
                      Project files should be took backup before end of the day.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-26.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="medium-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="medium"> Work</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged high">
                      <i className="fas fa-circle" /> High
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Download Server Logs</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      27 Jul 2023
                    </p>
                    <p>
                      Server log is a text document that contains a record of
                      all activity.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-27.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="high-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="high"> Social</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged low">
                      <i className="fas fa-circle" /> Low
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Team meet at Starbucks</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      13 Aug 2023
                    </p>
                    <p>
                      Meeting all teamets at Starbucks for identifying them all.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-28.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="low-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="low"> Personal</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged high">
                      <i className="fas fa-circle" /> High
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Create a compost pile</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      23 Aug 2023
                    </p>
                    <p>
                      Compost pile refers to fruit and vegetable scraps, used
                      tea, coffee grounds etc..
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-29.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="high-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="high"> Social</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged low">
                      <i className="fas fa-circle" /> Low
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Take a hike at a local park</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      04 Sep 2023
                    </p>
                    <p>
                      Hiking involves a long energetic walk in a natural
                      environment.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-30.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="low-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="low"> Personal</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged medium">
                      <i className="fas fa-circle" /> Medium
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Research a topic interested</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      17 Sep 2023
                    </p>
                    <p>
                      Research a topic interested by listen actively and
                      attentively.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-31.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="medium-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="medium"> Work</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
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
          <div className="section-card-body pt-0" id="notes-trash2">
            <div className="row">
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged medium">
                      <i className="fas fa-circle" /> Medium
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Backup Files EOD</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      25 Jul 2023
                    </p>
                    <p>
                      Project files should be took backup before end of the day.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-26.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="medium-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="medium"> Work</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged high">
                      <i className="fas fa-circle" /> High
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Download Server Logs</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      27 Jul 2023
                    </p>
                    <p>
                      Server log is a text document that contains a record of
                      all activity.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-27.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="high-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="high"> Social</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged low">
                      <i className="fas fa-circle" /> Low
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Team meet at Starbucks</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      13 Aug 2023
                    </p>
                    <p>
                      Meeting all teamets at Starbucks for identifying them all.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-28.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="low-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="low"> Personal</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged high">
                      <i className="fas fa-circle" /> High
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Create a compost pile</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      23 Aug 2023
                    </p>
                    <p>
                      Compost pile refers to fruit and vegetable scraps, used
                      tea, coffee grounds etc..
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-29.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="high-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="high"> Social</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged low">
                      <i className="fas fa-circle" /> Low
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Take a hike at a local park</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      04 Sep 2023
                    </p>
                    <p>
                      Hiking involves a long energetic walk in a natural
                      environment.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-30.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="low-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="low"> Personal</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged medium">
                      <i className="fas fa-circle" /> Medium
                    </p>
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Research a topic interested</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      17 Sep 2023
                    </p>
                    <p>
                      Research a topic interested by listen actively and
                      attentively.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-31.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="medium-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="medium"> Work</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
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
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-end">
              <Link to="#" className="btn btn-cancel notes-trash-btn">
                <span>
                  {" "}
                  <i data-feather="trash-2" className="feather-trash-2" />
                </span>
                Restore all
              </Link>
            </div>
          </div>
          <div className="section-card-body pt-0" id="notes-trash3">
            <div className="row">
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged medium">
                      <i className="fas fa-circle" /> Medium
                    </p>
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
                        data-bs-target="#delete-note-units"
                      >
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Backup Files EOD</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      25 Jul 2023
                    </p>
                    <p>
                      Project files should be took backup before end of the day.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-31.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="medium-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="medium"> Work</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged high">
                      <i className="fas fa-circle" /> High
                    </p>
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
                        data-bs-target="#delete-note-units"
                      >
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Download Server Logs</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      27 Jul 2023
                    </p>
                    <p>
                      Server log is a text document that contains a record of
                      all activity.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-29.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="high-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="high"> Social</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="notes-card notes-card-details w-100">
                  <div className="notes-card-body">
                    <p className="badged low">
                      <i className="fas fa-circle" /> Low
                    </p>
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
                        data-bs-target="#delete-note-units"
                      >
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
                  <div className="notes-wrap-content">
                    <h4>
                      <Link to="#">Team meet at Starbucks</Link>
                    </h4>
                    <p className="wrap-cal">
                      <i data-feather="calendar" className="feather-calendar" />{" "}
                      13 Aug 2023
                    </p>
                    <p>
                      Meeting all teamets at Starbucks for identifying them all.
                    </p>
                  </div>
                  <div className="notes-slider-widget notes-widget-profile">
                    <div className="notes-logo">
                      <Link to="#">
                        <span>
                          <img
                            src="./assets/img/users/user-30.jpg"
                            alt="Profile"
                            className="img-fluid"
                          />
                        </span>
                      </Link>
                      <div className="d-flex">
                        <span className="low-square">
                          <i className="fas fa-square" />
                        </span>
                        <p className="low"> Personal</p>
                      </div>
                    </div>
                    <div className="notes-star-delete">
                      <Link to="#">
                        <span>
                          <i data-feather="star" />
                        </span>
                      </Link>
                      <Link to="#">
                        <span>
                          <i data-feather="trash-2" />
                        </span>
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

export default NotesContent;
