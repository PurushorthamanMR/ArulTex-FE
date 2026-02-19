import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { setToogleHeader } from '../../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import SettingsSideBar from '../settingssidebar';

const GdprSettings = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);

    const position = [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
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
                                            <h4>GDPR Cookies</h4>
                                        </div>
                                        <div className="company-info border-0">
                                            <div className="localization-info">
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Cookies Consent Text</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="mb-3">
                                                            <textarea
                                                                rows={4}
                                                                className="form-control"
                                                                placeholder="Type your message"
                                                                defaultValue={""}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Cookies Position</h6>
                                                            <p>Your can configure the type</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={position}
                                                                className="select"
                                                                placeholder="Right"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Agree Button Text</h6>
                                                            <p>Your can configure the text here</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select d-flex align-items-center">
                                                            <div className="mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue="Agree"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Decline Button Text</h6>
                                                            <p>Your can configure the text here</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select d-flex align-items-center">
                                                            <div className="mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue="Decline"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Show Decline Button</h6>
                                                            <p>Your can configure the text here</p>
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
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Link for Cookies Page</h6>
                                                            <p>Your can configure the link here</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="localization-select d-flex align-items-center w-100">
                                                            <div className="mb-3 w-100">
                                                                <input type="text" className="form-control" />
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

export default GdprSettings
