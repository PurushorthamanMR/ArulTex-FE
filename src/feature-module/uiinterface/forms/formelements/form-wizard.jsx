/* eslint-disable react/no-unknown-property */
import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../../Router/all_routes";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const FormWizard = () => {
  const route = all_routes;
  return (
    <div className="page-wrapper cardhead">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Form Wizard</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={route.dashboard}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Form Wizard</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          {/* Lightbox */}
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Basic Wizard</h4>
              </div>
              <div className="card-body">
                <div id="basic-pills-wizard" className="twitter-bs-wizard">
                  <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                    <li className="nav-item">
                      <Link to="#" className="nav-link" data-toggle="tab">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-seller-details">
                              Seller Details
                            </Tooltip>
                          }
                        >
                          <div className="step-icon">
                            <i className="far fa-user" />
                          </div>
                        </OverlayTrigger>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="#" className="nav-link" data-toggle="tab">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-company-document">
                              Company Document
                            </Tooltip>
                          }
                        >
                          <div className="step-icon">
                            <i className="fas fa-map-pin" />
                          </div>
                        </OverlayTrigger>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="#" className="nav-link" data-toggle="tab">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-bank-details">
                              Bank Details
                            </Tooltip>
                          }
                        >
                          <div className="step-icon">
                            <i className="fas fa-credit-card" />
                          </div>
                        </OverlayTrigger>
                      </Link>
                    </li>
                  </ul>
                  {/* wizard-nav */}
                  <div className="tab-content twitter-bs-wizard-tab-content">
                    <div className="tab-pane active" id="seller-details">
                      <div className="mb-4">
                        <h5>Enter Your Personal Details</h5>
                      </div>
                      <form>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="basicpill-firstname-input"
                                className="form-label"
                              >
                                First name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="basicpill-firstname-input"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="basicpill-lastname-input"
                                className="form-label"
                              >
                                Last name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="basicpill-lastname-input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="basicpill-phoneno-input"
                                className="form-label"
                              >
                                Phone
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="basicpill-phoneno-input"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="basicpill-email-input"
                                className="form-label"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="basicpill-email-input"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                      <ul className="pager wizard twitter-bs-wizard-pager-link">
                        <li className="next">
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onclick="nextTab()"
                          >
                            Next <i className="bx bx-chevron-right ms-1" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* tab pane */}
                    <div className="tab-pane" id="company-document">
                      <div>
                        <div className="mb-4">
                          <h5>Enter Your Address</h5>
                        </div>
                        <form>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-pancard-input"
                                  className="form-label"
                                >
                                  Address 1
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-pancard-input"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-vatno-input"
                                  className="form-label"
                                >
                                  Address 2
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-vatno-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-cstno-input"
                                  className="form-label"
                                >
                                  Landmark
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-cstno-input"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-servicetax-input"
                                  className="form-label"
                                >
                                  Town
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-servicetax-input"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                          <li className="previous">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onclick="nextTab()"
                            >
                              <i className="bx bx-chevron-left me-1" /> Previous
                            </Link>
                          </li>
                          <li className="next">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onclick="nextTab()"
                            >
                              Next <i className="bx bx-chevron-right ms-1" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* tab pane */}
                    <div className="tab-pane" id="bank-detail">
                      <div>
                        <div className="mb-4">
                          <h5>Payment Details</h5>
                        </div>
                        <form>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-namecard-input"
                                  className="form-label"
                                >
                                  Name on Card
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-namecard-input"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Credit Card Type
                                </label>
                                <select className="form-select">
                                  <option selected="">Select Card Type</option>
                                  <option value="AE">American Express</option>
                                  <option value="VI">Visa</option>
                                  <option value="MC">MasterCard</option>
                                  <option value="DI">Discover</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-cardno-input"
                                  className="form-label"
                                >
                                  Credit Card Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-cardno-input"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-card-verification-input"
                                  className="form-label"
                                >
                                  Card Verification Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-card-verification-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-expiration-input"
                                  className="form-label"
                                >
                                  Expiration Date
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-expiration-input"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                          <li className="previous">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onclick="nextTab()"
                            >
                              <i className="bx bx-chevron-left me-1" /> Previous
                            </Link>
                          </li>
                          <li className="float-end">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target=".confirmModal"
                            >
                              Save Changes
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* tab pane */}
                  </div>
                  {/* end tab content */}
                </div>
              </div>
              {/* end card body */}
            </div>
          </div>
          {/* /Wizard */}
          {/* Wizard */}
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Wizard with Progressbar</h4>
              </div>
              <div className="card-body">
                <div id="progrss-wizard" className="twitter-bs-wizard">
                  <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                    <li className="nav-item">
                      <Link to="#" className="nav-link" data-toggle="tab">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-user-details">
                              User Details
                            </Tooltip>
                          }
                        >
                          <div className="step-icon">
                            <i className="far fa-user" />
                          </div>
                        </OverlayTrigger>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="progress-company-document"
                        className="nav-link"
                        data-toggle="tab"
                      >
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-address-detail">
                              Address Detail
                            </Tooltip>
                          }
                        >
                          <div className="step-icon">
                            <i className="fas fa-map-pin" />
                          </div>
                        </OverlayTrigger>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="#" className="nav-link" data-toggle="tab">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-payment-details">
                              Payment Details
                            </Tooltip>
                          }
                        >
                          <div className="step-icon">
                            <i className="fas fa-credit-card" />
                          </div>
                        </OverlayTrigger>
                      </Link>
                    </li>
                  </ul>
                  {/* wizard-nav */}
                  <div id="bar" className="progress mt-4">
                    <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" />
                  </div>
                  <div className="tab-content twitter-bs-wizard-tab-content">
                    <div
                      className="tab-pane active"
                      id="progress-seller-details"
                    >
                      <div className="mb-4">
                        <h5>User Details</h5>
                      </div>
                      <form>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="progresspill-firstname-input"
                                className="form-label"
                              >
                                First name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="progresspill-firstname-input"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="progresspill-lastname-input"
                                className="form-label"
                              >
                                Last name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="progresspill-lastname-input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="progresspill-phoneno-input"
                                className="form-label"
                              >
                                Phone
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="progresspill-phoneno-input"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="progresspill-email-input"
                                className="form-label"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="progresspill-email-input"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                      <ul className="pager wizard twitter-bs-wizard-pager-link">
                        <li className="next">
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onclick="nextTab()"
                          >
                            Next <i className="bx bx-chevron-right ms-1" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-pane" id="progress-company-document">
                      <div>
                        <div className="mb-4">
                          <h5>Location Details</h5>
                        </div>
                        <form>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-pancard-input"
                                  className="form-label"
                                >
                                  Address Line 1
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-pancard-input"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-vatno-input"
                                  className="form-label"
                                >
                                  Address Line 2
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-vatno-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-cstno-input"
                                  className="form-label"
                                >
                                  Landmark
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-cstno-input"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-servicetax-input"
                                  className="form-label"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-servicetax-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-companyuin-input"
                                  className="form-label"
                                >
                                  State
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-companyuin-input"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-declaration-input"
                                  className="form-label"
                                >
                                  Country
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-declaration-input"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                          <li className="previous">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onclick="nextTab()"
                            >
                              <i className="bx bx-chevron-left me-1" /> Previous
                            </Link>
                          </li>
                          <li className="next">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onclick="nextTab()"
                            >
                              Next <i className="bx bx-chevron-right ms-1" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="tab-pane" id="progress-bank-detail">
                      <div>
                        <div className="mb-4">
                          <h5>Payment Details</h5>
                        </div>
                        <form>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-namecard-input"
                                  className="form-label"
                                >
                                  Name on Card
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-namecard-input"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Credit Card Type
                                </label>
                                <select className="form-select">
                                  <option selected="">Select Card Type</option>
                                  <option value="AE">American Express</option>
                                  <option value="VI">Visa</option>
                                  <option value="MC">MasterCard</option>
                                  <option value="DI">Discover</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-cardno-input"
                                  className="form-label"
                                >
                                  Credit Card Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-cardno-input"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-card-verification-input"
                                  className="form-label"
                                >
                                  Card Verification Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-card-verification-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="progresspill-expiration-input"
                                  className="form-label"
                                >
                                  Expiration Date
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="progresspill-expiration-input"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                          <li className="previous">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onclick="nextTab()"
                            >
                              <i className="bx bx-chevron-left me-1" /> Previous
                            </Link>
                          </li>
                          <li className="float-end">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target=".confirmModal"
                            >
                              Save Changes
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>
          {/* /Wizard */}
        </div>
      </div>
    </div>
  );
};

export default FormWizard;
