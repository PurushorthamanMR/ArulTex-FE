import { RotateCcw } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ChevronUp } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { setToogleHeader } from '../../../core/redux/action';
import SettingsSideBar from '../settingssidebar';

const PosSettings = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);

    const paper = [
        { value: 'a4Option1', label: 'A4' },
        { value: 'a4Option2', label: 'A4' },
        { value: 'a4Option3', label: 'A4' },
    ];
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
                                            <h4>POS Settings</h4>
                                        </div>
                                        <div className="company-info border-0">
                                            <div className="localization-info">
                                                <div className="row align-items-center mb-sm-4">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>POS Printer</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={paper}
                                                                className="select"

                                                                placeholder="Choose an Option"
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center mb-sm-4">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Payment Method</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="localization-select pos-payment-method d-flex align-items-center mb-0 w-100">
                                                            <div className="custom-control custom-checkbox">
                                                                <label className="checkboxs mb-0 pb-0 line-height-1">
                                                                    <input type="checkbox" />
                                                                    <span className="checkmarks" />
                                                                    COD
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <label className="checkboxs mb-0 pb-0 line-height-1">
                                                                    <input type="checkbox" />
                                                                    <span className="checkmarks" />
                                                                    Cheque
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <label className="checkboxs mb-0 pb-0 line-height-1">
                                                                    <input type="checkbox" />
                                                                    <span className="checkmarks" />
                                                                    Card
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <label className="checkboxs mb-0 pb-0 line-height-1">
                                                                    <input type="checkbox" />
                                                                    <span className="checkmarks" />
                                                                    Paypal
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <label className="checkboxs mb-0 pb-0 line-height-1">
                                                                    <input type="checkbox" />
                                                                    <span className="checkmarks" />
                                                                    Bank Transfer
                                                                </label>
                                                            </div>
                                                            <div className="custom-control custom-checkbox">
                                                                <label className="checkboxs mb-0 pb-0 line-height-1">
                                                                    <input type="checkbox" />
                                                                    <span className="checkmarks" />
                                                                    Cash
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Enable Sound Effect </h6>
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

        </div>
    )
}

export default PosSettings
