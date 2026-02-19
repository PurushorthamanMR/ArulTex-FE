import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'

const AddWarrenty = () => {
    const period = [
        { value: "Choose", label: "Choose" },
        { value: "Month", label: "Month" },
        { value: "Year", label: "Year" },
    ]

    return (
        <>
            {/* Add Warranty */}
            <div className="modal fade" id="add-units">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Add Warrranty</h4>
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
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Duration</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label className="form-label">Periods</label>

                                                    <Select
                                                    className="select"
                                                    options={period}
                                                    placeholder="Month"
                                                />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3 input-blocks">
                                                    <label className="form-label">Description</label>
                                                    <textarea className="form-control" defaultValue="true" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-0">
                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                <span className="status-label">Status</span>
                                                <input type="checkbox" id="user2" className="check" />
                                                <label htmlFor="user2" className="checktoggle" />
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
                                                Create Warrenty
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Warranty */}
        </>

    )
}

export default AddWarrenty
