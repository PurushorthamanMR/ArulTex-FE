import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setToogleHeader } from '../../../core/redux/action';
import Select from 'react-select';
import Map from 'feather-icons-react/build/IconComponents/Map';
import ReactTagsInput from '../reacttaginputs';
import SettingsSideBar from '../settingssidebar';

const LocalizationSettings = () => {
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
    const languageOptions = [
        { value: 'english', label: 'English' },
        { value: 'spanish', label: 'Spanish' },
    ];
    const timezoneOptions = [
        { value: 'utc5:30', label: 'UTC 5:30' },
        { value: 'utc+11:00', label: '(UTC+11:00) INR' },
    ];
    const dateOptions = [
        { value: '22-Jul-2023', label: '22 Jul 2023' },
        { value: 'Jul-22-2023', label: 'Jul 22 2023' },
    ];
    const timeFormatOptions = [
        { value: '12-hours', label: '12 Hours' },
        { value: '24-hours', label: '24 Hours' },
    ];
    const yearOptions = [
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
    ];
    const monthOptions = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
    ];
    const country = [
        { value: 'India', label: 'India' },
        { value: 'United States Of America', label: 'United States Of America' },

    ];
    const symbols = [
        { value: '$', label: '$' },
        { value: '€', label: '€' },
        { value: '€', label: '€' },
    ];
    const symbolsandvalue = [
        { value: '$100', label: '$100' },
        { value: '$400', label: '$400' },
    ];
    const dot = [
        { value: '.', label: '.' },
        { value: '.', label: '.' },
    ];
    const comma = [
        { value: ',', label: ',' },
        { value: ',', label: ',' },
    ];
    const permissionforcountry = [
        { value: 'Allow All Country', label: 'Allow All Country' },
        { value: 'Deny All Country', label: 'Deny All Country' },
    ];

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
                                            <h4>Localization</h4>
                                        </div>
                                        <div className="company-info company-images">
                                            <div className="card-title-head">
                                                <h6>
                                                    <span>
                                                        <i data-feather="list" />
                                                    </span>
                                                    Basic Information
                                                </h6>
                                            </div>
                                            <div className="localization-info">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Language</h6>
                                                            <p>Select Language of the Website</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={languageOptions}
                                                                className="select"
                                                                placeholder="Select Language"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Language Switcher</h6>
                                                            <p>To display in all the pages</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
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
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Timezone</h6>
                                                            <p>Select Time zone in website</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={timezoneOptions}
                                                                className="select"

                                                                placeholder="Select Timezone"
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Date format</h6>
                                                            <p>Select date format to display in website</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={dateOptions}
                                                                className="select"

                                                                placeholder="Select Date Format"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Time Format</h6>
                                                            <p>Select time format to display in website</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={timeFormatOptions}
                                                                className="select"
                                                                placeholder="Select Time Format"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Financial Year</h6>
                                                            <p>Select year for finance </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={yearOptions}
                                                                className="select"

                                                                placeholder="Select Year"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Starting Month</h6>
                                                            <p>Select starting month to display</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={monthOptions}
                                                                className="select"

                                                                placeholder="Select Month"
                                                            />                                                     </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="company-info company-images">
                                            <div className="card-title-head">
                                                <h6>
                                                    <span>
                                                        <i data-feather="credit-card" />
                                                    </span>
                                                    Currency Settings
                                                </h6>
                                            </div>
                                            <div className="localization-info">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Currency</h6>
                                                            <p>Select currency </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                            <Select
                                                                options={country}
                                                                className="select"
                                                                placeholder="Select Country"
                                                            />                                                     </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <div className="setting-info">
                                                    <h6>Currency Symbol</h6>
                                                    <p>Select currency symbol</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="localization-select">

                                                    <Select
                                                        options={symbols}
                                                        className="select"
                                                        placeholder="Select Country"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <div className="setting-info">
                                                    <h6>Currency Position</h6>
                                                    <p>Select currency position</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="localization-select">

                                                    <Select
                                                        options={symbolsandvalue}
                                                        className="select"
                                                        placeholder="Select Country"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <div className="setting-info">
                                                    <h6>Decimal Separator</h6>
                                                    <p>Select decimal</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="localization-select">
                                                    <Select
                                                        options={dot}
                                                        className="select"
                                                        placeholder="."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <div className="setting-info">
                                                    <h6>Thousand Separator</h6>
                                                    <p>Select thousand</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="localization-select">
                                                    <Select
                                                        options={comma}
                                                        className="select"
                                                        placeholder=","
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="company-info company-images">
                                            <div className="card-title-head">
                                                <h6>
                                                    <span>

                                                        <Map/>
                                                    </span>
                                                    Country Settings
                                                </h6>
                                            </div>
                                            <div className="localization-info">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Countries Restriction</h6>
                                                            <p>Select country </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select">
                                                           
                                                            <Select
                                                        options={permissionforcountry}
                                                        className="select"
                                                        placeholder="Allow All Country"
                                                    />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="company-images">
                                            <div className="card-title-head">
                                                <h6>
                                                    <span>
                                                     
                                                        <Map/>
                                                    </span>
                                                    File Settings
                                                </h6>
                                            </div>
                                            <div className="localization-info">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info">
                                                            <h6>Allowed Files</h6>
                                                            <p>Select files </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-8 col-sm-4">
                                                        <div className="localization-select w-100">
                                                            <div className="input-blocks">
                                                            <ReactTagsInput/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-4">
                                                        <div className="setting-info mb-sm-0">
                                                            <h6>Max File Size</h6>
                                                            <p>File size </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="localization-select d-flex align-items-center mb-0">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={5000}
                                                            />
                                                            <span className="ms-2"> MB</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"
                                            //data-bs-dismiss="modal"
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

export default LocalizationSettings;