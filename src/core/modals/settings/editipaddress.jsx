import React from 'react'
import { Link } from 'react-router-dom'

const EditIpAddress = () => {
    return (
        <div>
            {/* Edit BanIp */}
            <div className="modal fade" id="edit-banip">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Edit Ban IP Address</h4>
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
                                                    <label className="form-label">IP Address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue="211.11.0.25"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Reason For Ban</label>
                                                    <textarea
                                                        rows={4}
                                                        className="form-control"
                                                        placeholder="Temporarily block to protect user accounts from internet fraudsters."
                                                        defaultValue={""}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                    <span className="status-label">Status</span>
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
                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"
                                                data-bs-dismiss="modal"
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
            {/* /Edit BanIp */}
        </div>
    )
}

export default EditIpAddress