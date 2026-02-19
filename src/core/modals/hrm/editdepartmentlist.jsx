import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';

const EditDepartmentList = () => {
    const hod = [
        { value: 'Choose Type', label: 'Choose Type' },
        { value: 'Mitchum Daniel', label: 'Mitchum Daniel' },
        { value: 'Susan Lopez', label: 'Susan Lopez' },
    ];
    return (
        <div>
            {/* Edit Department */}
            <div className="modal fade" id="edit-department">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Edit Department</h4>
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
                                                    <label className="form-label">Department Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue="UI/UX"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">HOD</label>
                                                    <Select
                                                    className="select"
                                                    options={hod}
                                                    placeholder="Newest"
                                                />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3 summer-description-box">
                                                    <label className="form-label">Description</label>
                                                    <div id="summernote2" />
                                                </div>
                                            </div>
                                            <div className="input-blocks m-0">
                                                <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                    <span className="status-label">Status</span>
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
            {/* /Edit Department */}
        </div>

    )
}

export default EditDepartmentList
