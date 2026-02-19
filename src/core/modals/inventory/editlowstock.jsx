import React from 'react'
import { Link } from 'react-router-dom'

const EditLowStock = () => {
    return (
        <>
            {/* Edit Low Stock */}
            <div className="modal fade" id="edit-stock">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Edit Low Stocks</h4>
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
                                            <label className="form-label">Warehouse</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="Lavish Warehouse"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Store</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="Crinol"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Category</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="Laptop"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Product</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="Lenevo 3rd Gen"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">SKU</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="PT001"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Qty</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue={15}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Qty Alert</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue={10}
                                            />
                                        </div>
                                        <div className="mb-0">
                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                <span className="status-label">Status</span>
                                                <input
                                                    type="checkbox"
                                                    id="user3"
                                                    className="check"
                                                    defaultChecked="true"
                                                />
                                                <label htmlFor="user3" className="checktoggle" />
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
            {/* / Edit Low Stock */}
        </>

    )
}

export default EditLowStock
