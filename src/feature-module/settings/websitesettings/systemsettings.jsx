import React from 'react'
import ImageWithBasePath from '../../../core/img/imagewithbasebath'
import { useDispatch, useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChevronUp, RotateCcw, Tool } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../../core/redux/action';
import SettingsSideBar from '../settingssidebar';

const SystemSettings = () => {

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
                                    <div className="setting-title">
                                        <h4>System Settings</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span className="system-app-icon">
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/app-icon-07.svg"
                                                                        alt=""
                                                                    />
                                                                </span>
                                                                <div className="security-title">
                                                                    <h5>Google Captcha</h5>
                                                                </div>
                                                            </div>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id="user1"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="user1" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Captcha helps protect you from spam and password
                                                            decryption
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link
                                                                to="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#google-captcha"
                                                            >
                                                                <Tool className="me-2"/>
                                                                View Integration
                                                            </Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span className="system-app-icon">
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/app-icon-08.svg"
                                                                        alt=""
                                                                    />
                                                                </span>
                                                                <div className="security-title">
                                                                    <h5>Google Analytics</h5>
                                                                </div>
                                                            </div>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id="user2"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="user2" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Provides statistics and basic analytical tools for SEO
                                                            and marketing purposes.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link
                                                                to="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#google-analytics"
                                                            >
                                                               
                                                                <Tool className="me-2"/>
                                                                View Integration
                                                            </Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span className="system-app-icon">
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/app-icon-09.svg"
                                                                        alt=""
                                                                    />
                                                                </span>
                                                                <div className="security-title">
                                                                    <h5>Google Adsense Code</h5>
                                                                </div>
                                                            </div>
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
                                                        <p>
                                                            Provides a way for publishers to earn money from their
                                                            online content.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link
                                                                to="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#google-adsense"
                                                            >
                                                               
                                                                <Tool className="me-2"/>
                                                                View Integration
                                                            </Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span className="system-app-icon">
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/app-icon-10.svg"
                                                                        alt=""
                                                                    />
                                                                </span>
                                                                <div className="security-title">
                                                                    <h5>Google Map</h5>
                                                                </div>
                                                            </div>
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
                                                        <p>
                                                            Provides detailed information about geographical regions
                                                            and sites worldwide.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link
                                                                to="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#google-map"
                                                            >
                                                                <Tool className="me-2"/>
                                                                View Integration
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
            </div>
        </div>
    )
}

export default SystemSettings