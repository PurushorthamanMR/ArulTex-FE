import React from 'react'
import { Link } from 'react-router-dom'

const AddBankAccount = () => {
    return (
        <div>
            {/* Add Bank Account */}
            <div className="modal fade" id="add-account">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Add Bank Account</h4>
                                    </div>
                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-auto me-2">
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
                                                        Bank Name <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Account Number <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Account Name <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Branch <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        IFSC <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="status-toggle modal-status d-flex justify-content-between align-items-center mb-3">
                                                    <span className="status-label">Status</span>
                                                    <input
                                                        type="checkbox"
                                                        id="user2"
                                                        className="check"
                                                        defaultChecked="true"
                                                    />
                                                    <label htmlFor="user2" className="checktoggle" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                    <span className="status-label">Make as default</span>
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
            {/* /Add Bank Account */}
        </div>
    )
}

export default AddBankAccount
