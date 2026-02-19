import { Upload } from 'feather-icons-react/build/IconComponents'
import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import SettingsSideBar from '../settingssidebar'
import ImageWithBasePath from '../../../core/img/imagewithbasebath'

const InvoiceSettings = () => {

    const listofnumbers = [
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
    ];
   

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
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh">
                                    <i data-feather="rotate-ccw" className="feather-rotate-ccw" />
                                </a>
                            </li>
                            <li>
                                <a
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Collapse"
                                    id="collapse-header"
                                >
                                    <i data-feather="chevron-up" className="feather-chevron-up" />
                                </a>
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
                                            <h4>Invoice Settings</h4>
                                        </div>
                                        <div className="company-info border-0">
                                            <ul className="logo-company">
                                                <li>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="logo-info me-0 mb-3 mb-md-0">
                                                                <h6>Invoice Logo</h6>
                                                                <p>
                                                                    Upload Logo of your Company to display in Invoice
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="profile-pic-upload mb-0 me-0">
                                                                <div className="new-employee-field">
                                                                    <div className="mb-3 mb-md-0">
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
                                                                            450px. Max size 5mb.
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <div className="new-logo ms-auto">
                                                                <a to="#">
                                                                    <ImageWithBasePath src="assets/img/logo-small.png" alt="Logo" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="localization-info">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Invoice Prefix</h6>
                                                            <p>Add prefix to your invoice</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="INV -"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Invoice Due</h6>
                                                            <p>Select due date to display in Invoice</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select d-flex align-items-center fixed-width">
                                                            <Select
                                                                options={listofnumbers}
                                                                className="select"
                                                                //placeholder="5"
                                                            />
                                                            <span className="ms-2">Days</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Invoice Round Off</h6>
                                                            <p>Value Roundoff in Invoice</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select d-flex align-items-center width-custom">
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center me-3">
                                                                <input
                                                                    type="checkbox"
                                                                    id="user3"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="user3" className="checktoggle" />
                                                            </div>
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Show Company Details</h6>
                                                            <p>Show / Hide Company Details in Invoice</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select d-flex align-items-center">
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center me-3">
                                                                <input
                                                                    type="checkbox"
                                                                    id="user4"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="user4" className="checktoggle" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Invoice Header Terms</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="mb-3">
                                                            <textarea
                                                                rows={4}
                                                                className="form-control"
                                                                placeholder="Type your message"
                                                                defaultValue="true"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Invoice Footer Terms</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="mb-3">
                                                            <textarea
                                                                rows={4}
                                                                className="form-control"
                                                                placeholder="Type your message"
                                                                defaultValue="true"
                                                            />
                                                        </div>
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

export default InvoiceSettings
