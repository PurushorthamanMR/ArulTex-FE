import { Mail, Tool } from 'feather-icons-react/build/IconComponents'
import React from 'react'
import { Link } from 'react-router-dom'
import SettingsSideBar from '../settingssidebar'

const EmailSettings = () => {
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
                               <Link data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh">
                                    <i data-feather="rotate-ccw" className="feather-rotate-ccw" />
                                </Link>
                            </li>
                            <li>
                               <Link
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Collapse"
                                    id="collapse-header"
                                >
                                    <i data-feather="chevron-up" className="feather-chevron-up" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="settings-wrapper d-flex">
                               <SettingsSideBar/>
                                <div className="settings-page-wrap">
                                    <div className="setting-title">
                                        <h4>Email Settings</h4>
                                    </div>
                                    <div className="page-header text-end justify-content-end">
                                       <Link to="#" className="btn-added btn-primary">
                                        
                                            <Mail  className="me-2"/>
                                            Send test email
                                        </Link>
                                    </div>
                                    <div className="row">
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card email-setting d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <div className="security-title">
                                                                    <h5>PHP Mailer</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Used to send emails safely and easily via PHP code from
                                                            a web server.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                           <Link
                                                                to=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#php-mail"
                                                            >
                                                               
                                                                <Tool className="me-2"/>
                                                                Connect
                                                            </Link>
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
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card email-setting d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <div className="security-title">
                                                                    <h5>SMTP</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            SMTP is used to send, relay or forward messages from a
                                                            mail client.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                           <Link
                                                                to=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#smtp-mail"
                                                            >
                                                            <Tool className="me-2"/>
                                                                Connect
                                                            </Link>
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
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card email-setting d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <div className="security-title">
                                                                    <h5>SendGrid </h5>
                                                                </div>
                                                            </div>
                                                            <div className="connect-btn">
                                                               <Link to="#">Connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Cloud-based email marketing tool that assists marketers
                                                            and developers .
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                           <Link
                                                                to=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#test-mail"
                                                            >
                                                            <Tool className="me-2"/>
                                                                View Integration
                                                            </Link>
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

export default EmailSettings
