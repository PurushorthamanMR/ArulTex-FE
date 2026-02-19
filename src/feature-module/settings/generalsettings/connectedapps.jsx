import React from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../../core/img/imagewithbasebath'
import { useDispatch, useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../../core/redux/action';
import SettingsSideBar from '../settingssidebar';

const ConnectedApps = () => {

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
                                        <h4>Connected Apps</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                                            <div className="connected-app-card">
                                                <ul>
                                                    <li>
                                                        <div className="app-icon">
                                                            <ImageWithBasePath src="assets/img/icons/app-icon-01.svg" alt="" />
                                                        </div>
                                                        <div className="connect-btn">
                                                            <Link to="#">Connected</Link>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="security-type">
                                                            <div className="security-title">
                                                                <h5>Calendar</h5>
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
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                                            <div className="connected-app-card">
                                                <ul>
                                                    <li>
                                                        <div className="app-icon">
                                                            <ImageWithBasePath src="assets/img/icons/app-icon-02.svg" alt="" />
                                                        </div>
                                                        <div className="connect-btn not-connect">
                                                            <Link to="#">Connect</Link>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="security-type">
                                                            <div className="security-title">
                                                                <h5>Figma</h5>
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
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                                            <div className="connected-app-card">
                                                <ul>
                                                    <li>
                                                        <div className="app-icon">
                                                            <ImageWithBasePath src="assets/img/icons/app-icon-03.svg" alt="" />
                                                        </div>
                                                        <div className="connect-btn">
                                                            <Link to="#">Connected</Link>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="security-type">
                                                            <div className="security-title">
                                                                <h5>Dropbox</h5>
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
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                                            <div className="connected-app-card">
                                                <ul>
                                                    <li>
                                                        <div className="app-icon">
                                                            <ImageWithBasePath src="assets/img/icons/app-icon-04.svg" alt="" />
                                                        </div>
                                                        <div className="connect-btn not-connect">
                                                            <Link to="#">Connect</Link>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="security-type">
                                                            <div className="security-title">
                                                                <h5>Slack</h5>
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
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                                            <div className="connected-app-card">
                                                <ul>
                                                    <li>
                                                        <div className="app-icon">
                                                            <ImageWithBasePath src="assets/img/icons/app-icon-05.svg" alt="" />
                                                        </div>
                                                        <div className="connect-btn not-connect">
                                                            <Link to="#">Connect</Link>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="security-type">
                                                            <div className="security-title">
                                                                <h5>Github</h5>
                                                            </div>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input
                                                                type="checkbox"
                                                                id="user5"
                                                                className="check"
                                                                defaultChecked="true"
                                                            />
                                                            <label htmlFor="user5" className="checktoggle">
                                                                {" "}
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                                            <div className="connected-app-card">
                                                <ul>
                                                    <li>
                                                        <div className="app-icon">
                                                            <ImageWithBasePath src="assets/img/icons/app-icon-06.svg" alt="" />
                                                        </div>
                                                        <div className="connect-btn">
                                                            <Link to="#">Connected</Link>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="security-type">
                                                            <div className="security-title">
                                                                <h5>Gmail</h5>
                                                            </div>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input
                                                                type="checkbox"
                                                                id="user6"
                                                                className="check"
                                                                defaultChecked="true"
                                                            />
                                                            <label htmlFor="user6" className="checktoggle">
                                                                {" "}
                                                            </label>
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

export default ConnectedApps
