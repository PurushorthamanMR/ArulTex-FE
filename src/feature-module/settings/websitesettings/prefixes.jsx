import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setToogleHeader } from '../../../core/redux/action';
import SettingsSideBar from '../settingssidebar';

const Prefixes = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);

    const renderRefreshTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Refresh
        </Tooltip>
    );
    const renderCollapseTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Collapse
        </Tooltip>
    )
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
                                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>

                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <RotateCcw />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>

                                    <Link
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        id="collapse-header"
                                        className={data ? "active" : ""}
                                        onClick={() => { dispatch(setToogleHeader(!data)) }}
                                    >
                                        <ChevronUp />
                                    </Link>
                                </OverlayTrigger>
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
                                            <h4>Prefixes</h4>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Product (SKU)</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="SKU -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Supplier</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="SUP -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Purchase</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="PU -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Purchase Return</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="PR -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Sales</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="SA -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Sales Return</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="SR -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Customer</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="CT -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Expense</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="EX -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Stock Transfer</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="ST -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Stock Adjustmentt</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="SA -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Sales Order</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="SO -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">POS Invoice</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="PINV -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Estimation</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="EST -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Transaction</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="TRN -"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Employee</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="EMP -"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="prefix-settings">
                                            <div className="modal-footer-btn">
                                                <button
                                                    type="button"
                                                    className="btn btn-cancel me-2"
                                                // data-bs-dismiss="modal"
                                                >
                                                    Cancel
                                                </button>
                                                <Link to="#" className="btn btn-submit">
                                                    Save Changes
                                                </Link>
                                            </div>
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

export default Prefixes

