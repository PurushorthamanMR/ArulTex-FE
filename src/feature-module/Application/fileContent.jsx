import React from "react";
import { ChevronRight, Filter, FileText, Calendar } from "react-feather";
import { Link } from "react-router-dom";
import Select from "react-select";

import { Edit, Grid, Layout, List, Search, Star, Trash2 } from "react-feather";
import ImageWithBasePath from "../../core/img/imagewithbasebath";

const FileContent = () => {
  const options1 = [
    { value: "lastModified", label: "Last Modified" },
    { value: "lastModifiedByMe", label: "Last Modified by Me" },
    { value: "lastOpenedByMe", label: "Last Opened by Me" },
  ];

  const options2 = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "sortByRelevance", label: "Sort By Relevance" },
    { value: "sortBySize", label: "Sort By Size" },
    { value: "orderAscending", label: "Order Ascending" },
    { value: "orderDescending", label: "Order Descending" },
    { value: "uploadTime", label: "Upload Time" },
  ];

  const options3 = [
    { value: "recent", label: "Recent" },
    { value: "lastWeek", label: "Last Week" },
    { value: "lastMonth", label: "Last Month" },
  ];

  const options4 = [
    { value: "allFileTypes", label: "All File types" },
    { value: "folders", label: "Folders" },
    { value: "pdf", label: "PDF" },
    { value: "images", label: "Images" },
    { value: "videos", label: "Videos" },
    { value: "audios", label: "Audios" },
    { value: "excel", label: "Excel" },
  ];
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="section-bulk-wrap">
            <div className="bulk-action-type col-lg-6 col-md-6">
              <div className="form-sort select-bluk">
                <Select className="select" options={options2} />
              </div>
              <div
                className="search-set me-2"
                id="dropdownSort"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <div className="search-input">
                  <Link to className="btn btn-searchset">
                    <Search className="feather-search" />
                  </Link>
                  <div className="dataTables_filter">
                    <label>
                      {" "}
                      <input
                        type="search"
                        className="form-control form-control-sm width-auto"
                        placeholder="Search"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div
                className="dropdown-menu search-dropdown"
                aria-labelledby="dropdownMenuClickable"
              >
                <div className="search-info">
                  <h6>
                    <span>
                      <Search className="feather-16" />
                    </span>
                    Recent Searches
                  </h6>
                  <ul className="search-tags">
                    <li>
                      <Link to="#">Filename</Link>
                    </li>
                    <li>
                      <Link to="#">Excel Files</Link>
                    </li>
                  </ul>
                </div>
                <div className="search-info">
                  <h6>Search Results</h6>
                  <p className="d-flex align-items-center justify-content-between">
                    Sportsmodel.pdf <ChevronRight className="feather-16" />
                  </p>
                  <p className="d-flex align-items-center justify-content-between">
                    Projectdetails.xls
                    <ChevronRight className="feather-16" />
                  </p>
                </div>
              </div>
            </div>
            <div className="d-sm-flex align-items-center col-lg-6 col-md-6 justify-content-end">
              <div className="form-sort me-3">
                <Filter className="fa-filter" />
                <Select className="select" options={options3} />
              </div>
              <div className="form-sort">
                <FileText className="fa-filter" />
                <Select className="select" options={options4} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Overview */}
      <div className="overview seprator-lg">
        <h4 className="mb-2">Overview</h4>
        <div className="row g-3">
          <div className="col-sm-6 col-md-3">
            <div className="detail">
              <Link
                to="#"
                className="d-flex align-items-center justify-content-center bg-light-orange bg p-4"
              >
                <span className="d-flex align-items-center justify-content-center">
                  <ImageWithBasePath
                    src="assets/img/icons/folder.svg"
                    alt="Folder"
                  />
                </span>
              </Link>
              <div className="d-flex align-items-center justify-content-between info">
                <h6>
                  <Link to="#">Folders</Link>
                </h6>
                <span>300 Files</span>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="detail">
              <Link
                to="#"
                className="d-flex align-items-center justify-content-center bg-light-red bg p-4"
              >
                <span className="d-flex align-items-center justify-content-center">
                  <ImageWithBasePath
                    src="assets/img/icons/pdf-02.svg"
                    alt="Folder"
                  />
                </span>
              </Link>
              <div className="d-flex align-items-center justify-content-between info">
                <h6>
                  <Link to="#">PDF</Link>
                </h6>
                <span>50 Files</span>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="detail">
              <Link
                to="#"
                className="d-flex align-items-center justify-content-center bg-light-green bg p-4"
              >
                <span className="d-flex align-items-center justify-content-center">
                  <ImageWithBasePath
                    src="assets/img/icons/image.svg"
                    alt="Folder"
                  />
                </span>
              </Link>
              <div className="d-flex align-items-center justify-content-between info">
                <h6>
                  <Link to="#">Images</Link>
                </h6>
                <span>240 Files</span>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="detail">
              <Link
                to="#"
                className="d-flex align-items-center justify-content-center bg-light-red bg p-4"
              >
                <span className="d-flex align-items-center justify-content-center">
                  <ImageWithBasePath
                    src="assets/img/icons/video.svg"
                    alt="Folder"
                  />
                </span>
              </Link>
              <div className="d-flex align-items-center justify-content-between info">
                <h6>
                  <Link to="#">Videos</Link>
                </h6>
                <span>30 Files</span>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="detail">
              <Link
                to="#"
                className="d-flex align-items-center justify-content-center bg-light-orange bg p-4"
              >
                <span className="d-flex align-items-center justify-content-center">
                  <ImageWithBasePath
                    src="assets/img/icons/audio.svg"
                    alt="Folder"
                  />
                </span>
              </Link>
              <div className="d-flex align-items-center justify-content-between info">
                <h6>
                  <Link to="#">Audios</Link>
                </h6>
                <span>100 Files</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Overview */}
      {/* Accordian */}
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item seprator-lg">
          <h4
            className="accordion-header d-flex align-items-center justify-content-between"
            id="panelsStayOpen-headingOne"
          >
            Folders
            <Link
              to="#"
              className="accordion-button a-auto"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            />
          </h4>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <div className="folders-carousel owl-theme d-flex">
                <div className="folders p-3 me-3">
                  <div className="d-flex align-items-center justify-content-between head">
                    <div className="d-flex align-items-center">
                      <ImageWithBasePath
                        src="assets/img/icons/folder.svg"
                        alt="Folder"
                        className="me-2"
                      />
                      <h6 className="popup-toggle">
                        <Link to="#">Project Details</Link>
                      </h6>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="dropset"
                      >
                        <i className="fa fa-ellipsis-v" />
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="#" className="dropdown-item">
                            Details
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Share
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Copy
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Move
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Download
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Rename
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Archeived
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start project-plan my-3">
                    <label>Project plan</label>
                    <ul className="d-flex">
                      <li className="d-flex align-items-center">154 KB</li>
                      <li className="d-flex align-items-center">8 Files</li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center justify-content-between avatar-wrap">
                    <div className="group-avatar">
                      <span className="avatar">
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          aria-label="Member 1"
                          data-bs-original-title="Member 1"
                        >
                          <ImageWithBasePath
                            src="assets/img/avatar/avatar-2.jpg"
                            alt="Avatar"
                          />
                        </Link>
                      </span>
                      <span className="avatar">
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          aria-label="Member 2"
                          data-bs-original-title="Member 2"
                        >
                          <ImageWithBasePath
                            src="assets/img/avatar/avatar-1.jpg"
                            alt="Avatar"
                          />
                        </Link>
                      </span>
                      <span className="count">
                        <Link to="#">1 Members</Link>
                      </span>
                    </div>
                    <Link to="#" className>
                      <Star className="feather-16" />
                    </Link>
                  </div>
                </div>

                <div className="folders p-3">
                  <div className="d-flex align-items-center justify-content-between head">
                    <div className="d-flex align-items-center">
                      <ImageWithBasePath
                        src="assets/img/icons/folder.svg"
                        alt="Folder"
                        className="me-2"
                      />
                      <h6 className="popup-toggle">
                        <Link to="#">Project Details</Link>
                      </h6>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="dropset"
                      >
                        <i className="fa fa-ellipsis-v" />
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="#" className="dropdown-item">
                            Details
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Share
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Copy
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Move
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Download
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Rename
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Archeived
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start project-plan my-3">
                    <label>Project plan</label>
                    <ul className="d-flex">
                      <li className="d-flex align-items-center">154 KB</li>
                      <li className="d-flex align-items-center">8 Files</li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center justify-content-between avatar-wrap">
                    <div className="group-avatar">
                      <span className="avatar">
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          aria-label="Member 1"
                          data-bs-original-title="Member 1"
                        >
                          <ImageWithBasePath
                            src="assets/img/avatar/avatar-1.jpg"
                            alt="Avatar"
                          />
                        </Link>
                      </span>
                      <span className="avatar">
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          aria-label="Member 2"
                          data-bs-original-title="Member 2"
                        >
                          <ImageWithBasePath
                            src="assets/img/avatar/avatar-2.jpg"
                            alt="Avatar"
                          />
                        </Link>
                      </span>
                      <span className="avatar">
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          aria-label="Member 3"
                          data-bs-original-title="Member 3"
                        >
                          <ImageWithBasePath
                            src="assets/img/avatar/avatar-3.jpg"
                            alt="Avatar"
                          />
                        </Link>
                      </span>
                      <span className="avatar">
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          aria-label="Member 4"
                          data-bs-original-title="Member 4"
                        >
                          <ImageWithBasePath
                            src="assets/img/avatar/avatar-4.jpg"
                            alt="Avatar"
                          />
                        </Link>
                      </span>
                      <span className="count">
                        <Link to="#">1 Members</Link>
                      </span>
                    </div>
                    <Link to="#" className>
                      <Star className="feather-16" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item seprator-lg">
          <h4
            className="accordion-header d-flex align-items-center justify-content-between"
            id="panelsStayOpen-headingTwo"
          >
            Files
            <Link
              to="#"
              className="accordion-button w-auto"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            ></Link>
          </h4>
          <div
            id="panelsStayOpen-collapseTwo"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="accordion-body">
              <div className="files-carousel owl-theme d-flex">
                <div className="folders p-3 me-2">
                  <div className="d-flex align-items-center justify-content-between head">
                    <div className="d-flex align-items-center">
                      <ImageWithBasePath
                        src="assets/img/icons/pdf-02.svg"
                        alt="File"
                        className="me-2"
                      />
                      <h6 className="popup-toggle">
                        <Link to="#">hsa.pdf</Link>
                      </h6>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to="#" className>
                        <i className="fa fa-star me-2" />
                      </Link>
                      <div className="dropdown">
                        <Link
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="dropset"
                        >
                          <i className="fa fa-ellipsis-v" />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="#" className="dropdown-item">
                              Details
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Share
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Copy
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Move
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Download
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Archeived
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start project-plan mt-3">
                    <label>12 Jul</label>
                    <ul className="d-flex">
                      <li className="d-flex align-items-center">85 MB</li>
                    </ul>
                  </div>
                </div>
                <div className="folders p-3 me-2">
                  <div className="d-flex align-items-center justify-content-between head">
                    <div className="d-flex align-items-center">
                      <ImageWithBasePath
                        src="assets/img/icons/pdf-02.svg"
                        alt="File"
                        className="me-2"
                      />
                      <h6 className="popup-toggle">
                        <Link to="#">Haird.pdf</Link>
                      </h6>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to="#" className>
                        <i className="fa fa-star me-2" />
                      </Link>
                      <div className="dropdown">
                        <Link
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="dropset"
                        >
                          <i className="fa fa-ellipsis-v" />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="#" className="dropdown-item">
                              Details
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Share
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Copy
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Move
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Download
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Rename
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Archeived
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start project-plan mt-3">
                    <label>14 Jul</label>
                    <ul className="d-flex">
                      <li className="d-flex align-items-center">4 MB</li>
                    </ul>
                  </div>
                </div>
                <div className="folders p-3">
                  <div className="d-flex align-items-center justify-content-between head">
                    <div className="d-flex align-items-center">
                      <ImageWithBasePath
                        src="assets/img/icons/xls.svg"
                        alt="File"
                        className="me-2"
                      />
                      <h6 className="popup-toggle">
                        <Link to="#">Estimation.xls</Link>
                      </h6>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to="#" className>
                        <i className="fa fa-star me-2" />
                      </Link>
                      <div className="dropdown">
                        <Link
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="dropset"
                        >
                          <i className="fa fa-ellipsis-v" />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="#" className="dropdown-item">
                              Details
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Share
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Copy
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Move
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Download
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Rename
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Archeived
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start project-plan mt-3">
                    <label>14 Jul</label>
                    <ul className="d-flex">
                      <li className="d-flex align-items-center">500 KB</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item mb-4">
          <h4
            className="accordion-header d-flex align-items-center justify-content-between"
            id="panelsStayOpen-headingThree"
          >
            Videos
            <Link
              to="#"
              className="accordion-button w-auto"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            />
          </h4>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              <div className="video-section d-flex">
                <div className="item me-2">
                  <div className="js-player">
                    <ImageWithBasePath src="assets/img/file-manager/video3.jpg" />
                  </div>

                  <div className="info">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="popup-toggle">
                        <Link to="#">Demoparticles.mp4</Link>
                      </h6>
                      <div className="d-flex align-items-center">
                        <Link to="#" className="d-flex align-items-center">
                          <Star className="feather-16 me-2" />
                        </Link>
                        <div className="dropdown">
                          <Link
                            to="#"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="dropset"
                          >
                            <i className="fa fa-ellipsis-v" />
                          </Link>
                          <ul className="dropdown-menu">
                            <li>
                              <Link to="#" className="dropdown-item">
                                Details
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Share
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Copy
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Move
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Download
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Rename
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Archeived
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start project-plan">
                      <label>14 Jul</label>
                      <ul className="d-flex">
                        <li className="d-flex align-items-center">173 MB</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="item me-2">
                  <div className="js-player">
                    <ImageWithBasePath src="assets/img/file-manager/video2.jpg" />
                  </div>

                  <div className="info">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="popup-toggle">
                        <Link to="#">Android_bike.mp4</Link>
                      </h6>
                      <div className="d-flex align-items-center">
                        <Link to="#" className="d-flex align-items-center">
                          <Star className="feather-16 me-2" />
                        </Link>
                        <div className="dropdown">
                          <Link
                            to="#"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="dropset"
                          >
                            <i className="fa fa-ellipsis-v" />
                          </Link>
                          <ul className="dropdown-menu">
                            <li>
                              <Link to="#" className="dropdown-item">
                                Details
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Share
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Copy
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Move
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Download
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Rename
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Archeived
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start project-plan">
                      <label>14 Jul</label>
                      <ul className="d-flex">
                        <li className="d-flex align-items-center">23 MB</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="item me-2">
                  <div className="js-player">
                    <ImageWithBasePath src="assets/img/file-manager/video3.jpg" />
                  </div>

                  <div className="info">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="popup-toggle">
                        <Link to="#">Demoparticles.mp4</Link>
                      </h6>
                      <div className="d-flex align-items-center">
                        <Link to="#" className="d-flex align-items-center">
                          <Star className="feather-16 me-2" />
                        </Link>
                        <div className="dropdown">
                          <Link
                            to="#"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="dropset"
                          >
                            <i className="fa fa-ellipsis-v" />
                          </Link>
                          <ul className="dropdown-menu">
                            <li>
                              <Link to="#" className="dropdown-item">
                                Details
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Share
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Copy
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Move
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Download
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Rename
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Archeived
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start project-plan">
                      <label>14 Jul</label>
                      <ul className="d-flex">
                        <li className="d-flex align-items-center">173 MB</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Accordian */}
      <div className="card p-4 bg-white all-files mb-0">
        <div className="seprator-lg d-lg-flex align-items-center justify-content-between">
          <h4>All Files</h4>
          <div className="d-sm-flex align-items-center btn-grp">
            <Link to="#" className="btn btn-primary me-2">
              <List className="feather-20" />
            </Link>
            <Link to="#" className="btn btn-outline-secondary me-2">
              <Layout className="feather-20" />
            </Link>
            <Link to="#" className="btn btn-outline-secondary me-2">
              <Grid className="feather-20" />
            </Link>
            <div className="icon-select">
              <span className="icon">
                <Calendar className="feather-16" />
              </span>
              <Select className="select" options={options1} />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table datanew">
            <thead>
              <tr>
                <th>
                  <label className="checkboxs">
                    <input type="checkbox" id="select-all" />
                    <span className="checkmarks" />
                  </label>
                </th>
                <th>Name</th>
                <th>Last Modified</th>
                <th>Size</th>
                <th>Owned Memebr</th>
                <th>Action</th>
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
                <td className="productimgname">
                  <Link
                    to="product-list"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/folder.svg"
                      alt="Product"
                      className="me-2"
                    />
                    <span>Digimed</span>
                  </Link>
                </td>
                <td>
                  Today 08:30 AM <br />
                  by Angel
                </td>
                <td>200 MB</td>
                <td>
                  <Link
                    to="#"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/avatar/avatar-6.jpg"
                      alt="Product"
                      className="me-2 rounded-circle"
                    />
                    <span>Nolan Christopher</span>
                  </Link>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <Link to="#" className>
                      <Star className="feather-16 me-2 color-primary" />
                    </Link>
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="dropset"
                      >
                        <i className="fa fa-ellipsis-v" />
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Trash2 className="feather-14 me-2" />
                            Permanent Delete
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Edit className="feather-14 me-2" />
                            Restore File
                          </Link>
                        </li>
                      </ul>
                    </div>
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
                <td className="productimgname">
                  <Link
                    to="product-list"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/xls.svg"
                      alt="Product"
                      className="me-2"
                    />
                    <span>Estimation</span>
                  </Link>
                </td>
                <td>Today 09:20 AM</td>
                <td>140 MB</td>
                <td>
                  <Link
                    to="#"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/avatar/avatar-5.jpg"
                      alt="Product"
                      className="me-2 rounded-circle"
                    />
                    <span>Nolan Harris</span>
                  </Link>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <Link to="#" className>
                      <Star className="feather-16 me-2 color-primary" />
                    </Link>
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="dropset"
                      >
                        <i className="fa fa-ellipsis-v" />
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Trash2 className="feather-14 me-2" />
                            Permanent Delete
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Edit className="feather-14 me-2" />
                            Restore File
                          </Link>
                        </li>
                      </ul>
                    </div>
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
                <td className="productimgname">
                  <Link
                    to="product-list"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/pdf-02.svg"
                      alt="Product"
                      className="me-2"
                    />
                    <span>Intro.pdf</span>
                  </Link>
                </td>
                <td>27 July 2023</td>
                <td>70 MB</td>
                <td>
                  <Link
                    to="#"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/avatar/avatar-10.jpg"
                      alt="Product"
                      className="me-2 rounded-circle"
                    />
                    <span>Me</span>
                  </Link>
                </td>
                <td className="text-end">
                  <div className="d-flex align-items-center">
                    <Link to="#" className>
                      <Star className="feather-16 me-2 color-primary" />
                    </Link>
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="dropset"
                      >
                        <i className="fa fa-ellipsis-v" />
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Trash2 className="feather-14 me-2" />
                            Permanent Delete
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Edit className="feather-14 me-2" />
                            Restore File
                          </Link>
                        </li>
                      </ul>
                    </div>
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
                <td className="productimgname">
                  <Link
                    to="product-list"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/video.svg"
                      alt="Product"
                      className="me-2"
                    />
                    <span>Demoworrking.mp4</span>
                  </Link>
                </td>
                <td>
                  24 July 2023
                  <br />
                  08:25 AM
                </td>
                <td>180 MB</td>
                <td>
                  <Link
                    to="#"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/avatar/avatar-2.jpg"
                      alt="Product"
                      className="me-2 rounded-circle"
                    />
                    <span>Daniel</span>
                  </Link>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <Link to="#" className>
                      <Star className="feather-16 me-2 color-primary" />
                    </Link>
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="dropset"
                      >
                        <i className="fa fa-ellipsis-v" />
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Trash2 className="feather-14 me-2" />
                            Permanent Delete
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Edit className="feather-14 me-2" />
                            Restore File
                          </Link>
                        </li>
                      </ul>
                    </div>
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
                <td className="productimgname">
                  <Link
                    to="product-list"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/audio.svg"
                      alt="Product"
                      className="me-2"
                    />
                    <span>voice.mp3</span>
                  </Link>
                </td>
                <td>27 July 2023</td>
                <td>80 MB</td>
                <td>
                  <Link
                    to="#"
                    className="product-img d-flex align-items-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/avatar/avatar-7.jpg"
                      alt="Product"
                      className="me-2 rounded-circle"
                    />
                    <span>Henriques</span>
                  </Link>
                </td>
                <td className="text-end">
                  <div className="d-flex align-items-center">
                    <Link to="#" className>
                      <Star className="feather-16 me-2 color-primary" />
                    </Link>
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="dropset"
                      >
                        <i className="fa fa-ellipsis-v" />
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Trash2 className="feather-14 me-2" />
                            Permanent Delete
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            <Edit className="feather-14 me-2" />
                            Restore File
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FileContent;
