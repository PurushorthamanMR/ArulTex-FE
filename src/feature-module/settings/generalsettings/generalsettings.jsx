import { ChevronUp, PlusCircle, RotateCcw, User } from 'feather-icons-react/build/IconComponents'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setToogleHeader } from '../../../core/redux/action';
import SettingsSidebar from '../settingssidebar';

const GeneralSettings = () => {

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
                                        onClick={() => {dispatch(setToogleHeader(!data)) }}
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
                            <SettingsSidebar/>
                                <div className="settings-page-wrap">
                                    <form>
                                        <div className="setting-title">
                                            <h4>Profile Settings</h4>
                                        </div>
                                        <div className="card-title-head">
                                            <h6>
                                                <span>
                                                    
                                                    <User className="feather-chevron-up"/>
                                                </span>
                                                Employee Information
                                            </h6>
                                        </div>
                                        <div className="profile-pic-upload">
                                            <div className="profile-pic">
                                                <span>

                                                    <PlusCircle className="plus-down-add"/>
                                                    Profile Photo
                                                </span>
                                            </div>
                                            <div className="new-employee-field">
                                                <div className="mb-0">
                                                    <div className="image-upload mb-0">
                                                        <input type="file" />
                                                        <div className="image-uploads">
                                                            <h4>Change Image</h4>
                                                        </div>
                                                    </div>
                                                    <span>
                                                        For better preview recommended size is 450px x 450px. Max
                                                        size 5MB.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">First Name</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">User Name</label>
                                                    <input type="text" className="form-control" />
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
                                                    <label className="form-label">Email</label>
                                                    <input type="email" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-title-head">
                                            <h6>
                                                <span>
                                                    <i data-feather="map-pin" className="feather-chevron-up" />
                                                </span>
                                                Our Address
                                            </h6>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Address</label>
                                                    <input type="email" className="form-control" />
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
                                        <div className="text-end settings-bottom-btn">
                                            <button type="button" className="btn btn-cancel me-2">
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

export default GeneralSettings
