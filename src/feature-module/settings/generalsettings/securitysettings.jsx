import { Box, ChevronUp, EyeOff, Mail, Phone, RotateCcw, Shield, Slash, Tool, Trash2 } from 'feather-icons-react/build/IconComponents'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setToogleHeader } from '../../../core/redux/action';
import SettingsSideBar from '../settingssidebar';

const SecuritySettings = () => {

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
                               <SettingsSideBar/>
                                <div className="settings-page-wrap">
                                    <div className="setting-title">
                                        <h4>Security</h4>
                                    </div>
                                    <div className="security-settings">
                                        <ul>
                                            <li>
                                                <div className="security-type">
                                                    <span className="security-icon">
                                                        <EyeOff/>
                                                    </span>
                                                    <div className="security-title">
                                                        <h5>Password</h5>
                                                        <p>Last Changed 22 July 2023, 10:30 AM</p>
                                                    </div>
                                                </div>
                                                <div className="security-btn">
                                                    <Link to="#" className="btn btn-primary">
                                                        Change Password
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="security-type">
                                                    <span className="security-icon">
                                                      
                                                        <Shield/>
                                                    </span>
                                                    <div className="security-title">
                                                        <h5>Two Factor</h5>
                                                        <p>Receive codes via SMS or email every time you login</p>
                                                    </div>
                                                </div>
                                                <div className="security-btn d-flex align-items-center">
                                                    <Link to="#" className="btn btn-danger">
                                                        Disable
                                                    </Link>
                                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                        <input
                                                            type="checkbox"
                                                            id="user3"
                                                            className="check"
                                                            defaultChecked="true"
                                                        />
                                                        <label htmlFor="user3" className="checktoggle">
                                                            {" "}
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="security-type">
                                                    <span className="security-icon">
                                                        <Shield/>
                                                    </span>
                                                    <div className="security-title">
                                                        <h5>Google Authentication</h5>
                                                        <p>Connect to Google</p>
                                                    </div>
                                                </div>
                                                <div className="security-btn d-flex align-items-center">
                                                    <span className="badges-connected">Connected</span>
                                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                        <input
                                                            type="checkbox"
                                                            id="user4"
                                                            className="check"
                                                            defaultChecked="true"
                                                        />
                                                        <label htmlFor="user4" className="checktoggle">
                                                            {" "}
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="security-type">
                                                    <span className="security-icon">
                                                        <Phone/>
                                                    </span>
                                                    <div className="security-title">
                                                        <h5>Phone Number Verification</h5>
                                                        <p>Verified Mobile Number : +81699799974</p>
                                                    </div>
                                                </div>
                                                <div className="security-btn d-flex align-items-center">
                                                    <span>
                                                        <i className=" fa fa-check-circle me-2" />
                                                    </span>
                                                    <Link to="#" className="btn btn-primary">
                                                        Change
                                                    </Link>
                                                    <Link to="#" className="remove-red ms-2">
                                                        Remove
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="security-type">
                                                    <span className="security-icon">
                                                        <Mail/>
                                                    </span>
                                                    <div className="security-title">
                                                        <h5>Email Verification</h5>
                                                        <p>Verified Email : info@example.com</p>
                                                    </div>
                                                </div>
                                                <div className="security-btn d-flex align-items-center">
                                                    <span>
                                                        <i className=" fa fa-check-circle me-2" />
                                                    </span>
                                                    <Link to="#" className="btn btn-primary">
                                                        Change
                                                    </Link>
                                                    <Link to="#" className="remove-red ms-2">
                                                        Remove
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="security-type">
                                                    <span className="security-icon">
                                                        <Tool/>
                                                    </span>
                                                    <div className="security-title">
                                                        <h5>Device Management</h5>
                                                        <p>Last Changed 22 July 2023, 10:30 AM</p>
                                                    </div>
                                                </div>
                                                <div className="security-btn d-flex align-items-center">
                                                    <Link to="#" className="manage-btn">
                                                        Manage
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="security-type">
                                                    <span className="security-icon">
                                                        <Box/>
                                                    </span>
                                                    <div className="security-title">
                                                        <h5>Account Activity</h5>
                                                        <p>Last Changed 25 July 2023, 11:00 AM</p>
                                                    </div>
                                                </div>
                                                <div className="security-btn d-flex align-items-center">
                                                    <Link to="#" className="manage-btn">
                                                        View
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="security-type">
                                                    <span className="security-icon">
                                                        <Slash/>
                                                    </span>
                                                    <div className="security-title">
                                                        <h5>Deactivate Account</h5>
                                                        <p>Last Changed 21 July 2023, 09:37 AM</p>
                                                    </div>
                                                </div>
                                                <div className="security-btn d-flex align-items-center">
                                                    <Link to="#" className="manage-btn">
                                                        Deactivate
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="security-type">
                                                    <span className="security-icon">
                                                        <Trash2/>
                                                    </span>
                                                    <div className="security-title">
                                                        <h5>Delete Account</h5>
                                                        <p>Last Changed 26 July 2023, 11:40 AM</p>
                                                    </div>
                                                </div>
                                                <div className="security-btn d-flex align-items-center">
                                                    <Link to="#" className="btn btn-danger">
                                                        Delete
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecuritySettings
