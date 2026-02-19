import React from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../../core/img/imagewithbasebath'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ChevronUp, RotateCcw, Upload, X } from 'feather-icons-react/build/IconComponents'
import { setToogleHeader } from '../../../core/redux/action'
import { useDispatch, useSelector } from 'react-redux'
import SettingsSideBar from '../settingssidebar'

const CompanySettings = () => {

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
    )
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
                                        onClick={() => { dispatch(setToogleHeader(!data)) }}
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
                                <SettingsSideBar/>
                                <div className="settings-page-wrap">
                                    <form>
                                        <div className="setting-title">
                                            <h4>Company Settings</h4>
                                        </div>
                                        <div className="company-info">
                                            <div className="card-title-head">
                                                <h6>
                                                    <span>
                                                        <i data-feather="zap" />
                                                    </span>
                                                    Company Information
                                                </h6>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-4 col-lg-6 col-md-4">
                                                    <div className="mb-3">
                                                        <label className="form-label">Company Name</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-lg-6 col-md-4">
                                                    <div className="mb-3">
                                                        <label className="form-label">
                                                            Company Email Address
                                                        </label>
                                                        <input type="email" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="mb-3">
                                                        <label className="form-label">Phone Number</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="mb-3">
                                                        <label className="form-label">Fax</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="mb-3">
                                                        <label className="form-label">Website</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="company-info company-images">
                                            <div className="card-title-head">
                                                <h6>
                                                    <span>
                                                        <i data-feather="image" />
                                                    </span>
                                                    Company Images
                                                </h6>
                                            </div>
                                            <ul className="logo-company">
                                                <li className="d-flex align-items-center">
                                                    <div className="logo-info">
                                                        <h6>Company Logo</h6>
                                                        <p>Upload Logo of your Company to display in website</p>
                                                    </div>
                                                    <div className="profile-pic-upload mb-0">
                                                        <div className="new-employee-field">
                                                            <div className="mb-0">
                                                                <div className="image-upload mb-0">
                                                                    <input type="file" />
                                                                    <div className="image-uploads">
                                                                        <h4>
                                                                            <Upload />
                                                                            Upload Photo
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <span>
                                                                    For better preview recommended size is 450px x
                                                                    450px. Max size 5MB.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="new-logo ms-auto">
                                                        <Link to="#">
                                                            <ImageWithBasePath src="assets/img/logo-small.png" alt="Logo" />
                                                            <span>
                                                                <i data-feather="x" />
                                                                <X />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <div className="logo-info">
                                                        <h6>Company Icon</h6>
                                                        <p>Upload Icon of your Company to display in website</p>
                                                    </div>
                                                    <div className="profile-pic-upload mb-0">
                                                        <div className="new-employee-field">
                                                            <div className="mb-0">
                                                                <div className="image-upload mb-0">
                                                                    <input type="file" />
                                                                    <div className="image-uploads">
                                                                        <h4>
                                                                            <Upload />                                                                            Upload Photo
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <span>
                                                                    For better preview recommended size is 450px x
                                                                    450px. Max size 5MB.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="new-logo ms-auto">
                                                        <Link to="#">
                                                            <ImageWithBasePath src="assets/img/logo-small.png" alt="Logo" />
                                                            <span>
                                                                <X />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <div className="logo-info">
                                                        <h6>Favicon</h6>
                                                        <p>
                                                            Upload Favicon of your Company to display in website
                                                        </p>
                                                    </div>
                                                    <div className="profile-pic-upload mb-0">
                                                        <div className="new-employee-field">
                                                            <div className="mb-0">
                                                                <div className="image-upload mb-0">
                                                                    <input type="file" />
                                                                    <div className="image-uploads">
                                                                        <h4>
                                                                            <Upload />
                                                                            Upload Photo
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <span>
                                                                    For better preview recommended size is 450px x
                                                                    450px. Max size 5MB.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="new-logo ms-auto">
                                                        <Link to="#">
                                                            <ImageWithBasePath src="assets/img/logo-small.png" alt="Logo" />
                                                            <span>
                                                                <X />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <div className="logo-info">
                                                        <h6>Company Dark Logo</h6>
                                                        <p>Upload Logo of your Company to display in website</p>
                                                    </div>
                                                    <div className="profile-pic-upload mb-0">
                                                        <div className="new-employee-field">
                                                            <div className="mb-0">
                                                                <div className="image-upload mb-0">
                                                                    <input type="file" />
                                                                    <div className="image-uploads">
                                                                        <h4>
                                                                            <Upload />
                                                                            Upload Photo
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <span>
                                                                    For better preview recommended size is 450px x
                                                                    450px. Max size 5MB.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="new-logo ms-auto">
                                                        <Link to="#">
                                                            <ImageWithBasePath src="assets/img/logo-small.png" alt="Logo" />
                                                            <span>
                                                                <X />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="company-address">
                                            <div className="card-title-head">
                                                <h6>
                                                    <span>
                                                        <i data-feather="map-pin" />
                                                    </span>
                                                    Address
                                                </h6>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Address</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-lg-4 col-md-3">
                                                    <div className="mb-3">
                                                        <label className="form-label">Country</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-lg-4 col-md-3">
                                                    <div className="mb-3">
                                                        <label className="form-label">State / Province</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-lg-4 col-md-3">
                                                    <div className="mb-3">
                                                        <label className="form-label">City</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-lg-4 col-md-3">
                                                    <div className="mb-3">
                                                        <label className="form-label">Postal Code</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"

                                            >
                                                Cancel
                                            </button>
                                            <Link to="#" className="btn btn-submit">
                                                Save Changes
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CompanySettings
