import { Tool } from 'feather-icons-react/build/IconComponents'
import React from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../../core/img/imagewithbasebath'
import Paypal from '../../../core/modals/settings/paypal'
import SettingsSideBar from '../settingssidebar'

const PaymentGateway = () => {
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
                                        <h4>Payment Gateway</h4>
                                    </div>
                                    <div className="row social-authent-settings">
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-01.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn">
                                                                <Link to="#">Connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            PayPal is the faster, safer way to send and receive
                                                            money or make an online payment.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link
                                                                to="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#payment-connect"
                                                            >
                                                                <Tool className="me-2" />
                                                                View Integration
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
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-02.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            APIs to accept credit cards, manage subscriptions, send
                                                            money.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
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
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-03.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Braintree offers more fraud protection and security
                                                            features.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
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
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-04.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>Razorpay is an India&apos;s all in one payment solution.</p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input type="checkbox" id="user4" className="check" />
                                                            <label htmlFor="user4" className="checktoggle">
                                                                {" "}
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-05.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn">
                                                                <Link to="#">Connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Works stably and reliably and features are valuable and
                                                            necessary for any software.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                View Integration
                                                            </Link>
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
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-06.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Allows send international money transfers and payments
                                                            quickly with low fees.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input type="checkbox" id="user6" className="check" />
                                                            <label htmlFor="user6" className="checktoggle">
                                                                {" "}
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-07.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn">
                                                                <Link to="#">Connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Provide payment solution to individuals to make payments
                                                            using credit card.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                View Integration
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input
                                                                type="checkbox"
                                                                id="user7"
                                                                className="check"
                                                                defaultChecked="true"
                                                            />
                                                            <label htmlFor="user7" className="checktoggle">
                                                                {" "}
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-08.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Replaces your physical cards and cash with an easier,
                                                            safer, more private and secure{" "}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input type="checkbox" id="user8" className="check" />
                                                            <label htmlFor="user8" className="checktoggle">
                                                                {" "}
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-09.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Fast, Low-Cost Solution for your International Business.{" "}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input type="checkbox" id="user9" className="check" />
                                                            <label htmlFor="user9" className="checktoggle">
                                                                {" "}
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-10.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Online payment platform that enables to send and receive
                                                            money via emails.{" "}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input
                                                                type="checkbox"
                                                                id="user10"
                                                                className="check"
                                                                defaultChecked="true"
                                                            />
                                                            <label htmlFor="user10" className="checktoggle" />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-11.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn">
                                                                <Link to="#">Connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Paytm stands for Pay through mobile and it is India&apos;s
                                                            largest mobile payments.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                View Integration
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input
                                                                type="checkbox"
                                                                id="user11"
                                                                className="check"
                                                                defaultChecked="true"
                                                            />
                                                            <label htmlFor="user11" className="checktoggle" />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-12.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Midtrans provides the maximum number of payment methods
                                                            across payment gateways.{" "}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input
                                                                type="checkbox"
                                                                id="user12"
                                                                className="check"
                                                                defaultChecked="true"
                                                            />
                                                            <label htmlFor="user12" className="checktoggle" />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-13.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            PyTorch is a network through which your customers
                                                            transfer funds to you.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input
                                                                type="checkbox"
                                                                id="user13"
                                                                className="check"
                                                                defaultChecked="true"
                                                            />
                                                            <label htmlFor="user13" className="checktoggle" />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-14.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn">
                                                                <Link to="#">Connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Direct transfer of funds from one bank account into
                                                            another.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                View Integration
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input
                                                                type="checkbox"
                                                                id="user14"
                                                                className="check"
                                                                defaultChecked="true"
                                                            />
                                                            <label htmlFor="user14" className="checktoggle" />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 d-flex">
                                            <div className="connected-app-card d-flex w-100">
                                                <ul className="w-100">
                                                    <li className="flex-column align-items-start">
                                                        <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                                            <div className="security-type d-flex align-items-center">
                                                                <span>
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/payment-icon-15.svg"
                                                                        alt="Payment"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="connect-btn not-connect">
                                                                <Link to="#">Not connected</Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Indicating that goods must be paid for at the time of
                                                            delivery.{" "}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="integration-btn">
                                                            <Link to="#">
                                                                <Tool className="me-2" />
                                                                Connect Now
                                                            </Link>
                                                        </div>
                                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                                                            <input
                                                                type="checkbox"
                                                                id="user15"
                                                                className="check"
                                                                defaultChecked="true"
                                                            />
                                                            <label htmlFor="user15" className="checktoggle" />
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
            <Paypal />
        </div>
    )
}

export default PaymentGateway
