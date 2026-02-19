import React from 'react'
import { Link } from 'react-router-dom'

const TwoFactorConfig = () => {
    return (
        <div>
            {/* Two Factor Config*/}
            <div className="modal fade" id="factor-config">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>2Factor</h4>
                                    </div>
                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-auto me-2">
                                        <input
                                            type="checkbox"
                                            id="users4"
                                            className="check"
                                            defaultChecked="true"
                                        />
                                        <label htmlFor="users4" className="checktoggle" />
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
                                                        API Key <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        API Secret Key <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-0">
                                                    <label className="form-label">
                                                        {" "}
                                                        Sender ID <span> *</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
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
            {/* /Two Factor Config */}
        </div>
    )
}

export default TwoFactorConfig