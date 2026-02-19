import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Sliders, Upload } from "react-feather";
import Select from "react-select";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import FileContent from "./fileContent";
import FileModal from "../../core/modals/applications/fileModal";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import {
  ChevronUp,
  Clock,
  File,
  Folder,
  FolderMinus,
  HardDrive,
  PlusCircle,
  Repeat,
  RotateCcw,
  Send,
  Settings,
  Star,
  UploadCloud,
  FileText,
  Target,
  Trash2,
} from "react-feather";
import { all_routes } from "../../Router/all_routes";

const FileManager = () => {
  const route = all_routes;
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "Ascending", label: "Ascending" },
    { value: "Descending", label: "Descending" },
    { value: "Recently Viewed", label: "Recently Viewed" },
    { value: "Recently Added", label: "Recently Added" },
    { value: "Creation Date", label: "Creation Date" },
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
  return (
    <div
      className={`page-wrapper notes-page-wrapper file-manager ${
        isOpen && "notes-tag-left"
      }`}
    >
      <div className="content">
        <div className="page-header page-add-notes flex-sm-row flex-column">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>File Manager</h4>
              <p>Manage your files</p>
            </div>
            <Link
              id="toggle_btn2"
              className="notes-tog"
              to="#"
              onClick={() => setOpen(!isOpen)}
            >
              <i className="fas fa-chevron-left" />
            </Link>
          </div>
          <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start">
            <div className="form-sort me-2 mb-sm-0 mb-3 stylewidth">
              <Sliders className="info-img" />
              <Select
                className="select"
                options={options}
                placeholder="Sort by Date"
              />
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
            <Link
              to="#"
              className="btn btn-primary btn-added"
              data-bs-toggle="modal"
              data-bs-target="#upload-file"
            >
              <span className="me-1 d-flex align-items-center">
                <Upload className="feather-16" />
              </span>
              Upload Files
            </Link>
          </div>
        </div>
        <div className="row">
          <div
            className={`col-lg-3 col-md-12 sidebars-right theiaStickySidebar section-bulk-widget  ${
              isOpen && "section-notes-dashboard"
            }`}
          >
            <aside className="card file-manager-sidebar mb-0">
              <h5 className="d-flex align-items-center">
                <span className="me-2 d-flex align-items-center">
                  <Folder className="feather-20" />
                </span>
                Files
              </h5>
              <div className="dropdown">
                <Link
                  to="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="dropset btn btn-primary mb-3 btn-icon"
                >
                  <span className="me-1 btn-icon">
                    <PlusCircle className="feather-16" />
                  </span>
                  New
                </Link>
                <ul className="dropdown-menu">
                  <li data-bs-toggle="modal" data-bs-target="#upload-file">
                    <Link to="#" className="dropdown-item">
                      <UploadCloud className="feather-16 me-2" />
                      Upload File
                    </Link>
                  </li>
                  <li data-bs-toggle="modal" data-bs-target="#upload-folder">
                    <Link to="#" className="dropdown-item">
                      <Folder className="feather-16 me-2" />
                      Upload Folder
                    </Link>
                  </li>
                  <li data-bs-toggle="modal" data-bs-target="#create-folder">
                    <Link to="#" className="dropdown-item">
                      <FolderMinus className="feather-16 me-2" />
                      Create folder
                    </Link>
                  </li>
                </ul>
              </div>
              <ul className="mb-5">
                <li>
                  <Link to="file-manager" className="active">
                    <span className="me-2 btn-icon">
                      <FileText className="feather-16" />
                    </span>
                    My Files
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="me-2 btn-icon">
                      <Star className="feather-16" />
                    </span>
                    Google Drive
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="me-2 btn-icon">
                      <Send className="feather-16" />
                    </span>
                    Dropbox
                  </Link>
                </li>
                <li>
                  <Link to={route.filemanager}>
                    <span className="me-2 btn-icon">
                      <File className="feather-16" />
                    </span>
                    Shared With Me
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="me-2 btn-icon">
                      <File className="feather-16" />
                    </span>
                    Document
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="me-2 btn-icon">
                      <Clock className="feather-16" />
                    </span>
                    Recent
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="me-2 btn-icon">
                      <Star className="feather-16" />
                    </span>
                    Favourites
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="me-2 btn-icon">
                      <Target className="feather-16" />
                    </span>
                    Archived
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="me-2 btn-icon">
                      <Trash2 className="feather-16" />
                    </span>
                    Deleted
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="me-2 btn-icon">
                      <Settings className="feather-16" />
                    </span>
                    Settings
                  </Link>
                </li>
              </ul>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="me-2 btn-icon">
                    <HardDrive className="feather-16" />
                  </span>
                  <h6>Storage</h6>
                </div>
                <span>70%</span>
              </div>
              <div className="progress my-2">
                <div
                  className="progress-bar progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: "75%" }}
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <span>78.5 GB of 1 TB Free Used</span>
              <div className="space-manager p-4">
                <ImageWithBasePath
                  src="assets/img/icons/half-circle.svg"
                  alt="Folder"
                />
                <h6>
                  <Link to="#">Need More Space?</Link>
                </h6>
                <p>Upgrade storage for 2TB for $60 per month</p>
                <Link to="#" className="btn btn-outline-primary">
                  Upgrade
                  <span className="ms-1 btn-icon">
                    <Repeat className="feather-16" />
                  </span>
                </Link>
              </div>
            </aside>
          </div>

          <div
            className={`col-lg-9 budget-role-notes  ${
              isOpen && "budgeted-role-notes"
            }`}
          >
            {isOpen ? (
              <FileContent />
            ) : (
              <Scrollbars>
                <FileContent />
              </Scrollbars>
            )}
          </div>
        </div>
        <FileModal />
      </div>
    </div>
  );
};

export default FileManager;
