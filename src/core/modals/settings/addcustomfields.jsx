import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'

const AddCustomFields = () => {
    const fields = [
        { value: 'choose', label: 'Choose' },
        { value: 'expense', label: 'Expense' },
        { value: 'transaction', label: 'Transaction' },
      ];
      const textarea = [
        { value: 'choose', label: 'Choose' },
        { value: 'text', label: 'Text' },
        { value: 'textarea', label: 'Textarea' },
      ];
    return (
        <div>
            {/* Add Custom Field */}
            <div className="modal fade" id="add-custom-field">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Add New Custom Fields</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body custom-modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Custom Fields For <span> *</span>
                                                    </label>
                                                    <Select
                                                    options={fields}
                                                    className="select"
                                                    placeholder="Choose an option"
                                                  />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Label <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Default Value <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Input Type <span> *</span>
                                                    </label>
                                                    <Select
                                                    options={textarea}
                                                    className="select"
                                                    placeholder="Choose an option"
                                                  />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="localization-select pos-payment-method mb-3 d-flex align-items-center mb-0 w-100">
                                                    <div className="custom-control custom-checkbox">
                                                        <label className="checkboxs mb-0 pb-0 line-height-1">
                                                            <input type="checkbox" defaultChecked="" />
                                                            <span className="checkmarks" />
                                                            Required
                                                        </label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox">
                                                        <label className="checkboxs mb-0 pb-0 line-height-1">
                                                            <input type="checkbox" defaultChecked="" />
                                                            <span className="checkmarks" />
                                                            Disable
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                    <span className="status-label">Status</span>
                                                    <input
                                                        type="checkbox"
                                                        id="user2"
                                                        className="check"
                                                        defaultChecked=""
                                                    />
                                                    <label htmlFor="user2" className="checktoggle" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"
                                                data-bs-dismiss="modal"
                                            >
                                                Cancel
                                            </button>
                                            <Link to="#" className="btn btn-submit">
                                                Submit
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Custom Field */}
        </div>

    )
}

export default AddCustomFields
