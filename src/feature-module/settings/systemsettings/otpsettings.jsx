import { RotateCcw } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ChevronUp } from 'react-feather';
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { setToogleHeader } from '../../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import SettingsSideBar from '../settingssidebar';

const OtpSettings = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    
    const duration = [
        { value: '5mins', label: '5 Mins' },
        { value: '10mins', label: '10 Mins' },
    ];
    const numbers = [
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ];
    const sms = [
        { value: 'SMS', label: 'SMS' },
        { value: 'EMail', label: 'EMail' },
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
                                            <h4>OTP Settings</h4>
                                        </div>
                                        <div className="company-info company-images">
                                            <div className="localization-info">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>OTP Type</h6>
                                                            <p>Your can configure the type</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                        <Select
                                                        options={sms}
                                                        className="select"
                                                        //placeholder="Choose a Duration"
                                                    />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>OTP Digit Limit</h6>
                                                            <p>Select size of the format </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                        <Select
                                                        options={numbers}
                                                        className="select"
                                                        //placeholder="Choose a Duration"
                                                    />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>OTP Expire Time</h6>
                                                            <p>Select expire time of OTP </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={duration}
                                                                className="select"
                                                                placeholder="Choose a Duration"
                                                            />
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

export default OtpSettings
