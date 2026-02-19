import React, { useState } from 'react'
import ImageWithBasePath from '../../core/img/imagewithbasebath'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChevronUp, Layout, RotateCcw, Sliders, StopCircle } from 'feather-icons-react/build/IconComponents';
import Select from 'react-select';
import Filter from 'feather-icons-react/build/IconComponents/Filter';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../core/pagination/datatable'
import { setToogleHeader } from '../../core/redux/action';

const AttendanceEmployee = () => {

    const dataSource = useSelector((state) => state.attendenceemployee_data);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [isLayoutVisible, setIsLayoutVisible] = useState(false);
    const handleLayoutClick = () => {
        setIsLayoutVisible(!isLayoutVisible);
    };


    const oldandlatestvalue = [
        { value: 'date', label: 'Sort by Date' },
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ];
    const status = [
        { value: 'Choose Status', label: 'Choose Status' },
        { value: 'Present', label: 'Present' },
        { value: 'Absent', label: 'Absent' },
        { value: 'Holiday', label: 'Holiday' },
    ];


    const renderTooltip = (props) => (
        <Tooltip id="pdf-tooltip" {...props}>
            Pdf
        </Tooltip>
    );
    const renderExcelTooltip = (props) => (
        <Tooltip id="excel-tooltip" {...props}>
            Excel
        </Tooltip>
    );
    const renderPrinterTooltip = (props) => (
        <Tooltip id="printer-tooltip" {...props}>
            Printer
        </Tooltip>
    );


    const renderRefreshTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Refresh
        </Tooltip>
    );
    const renderCollapseTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Collapse
        </Tooltip>
    );

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            sorter: (a, b) => a.date.length - b.date.length,
        },
        {
            title: "Clock In",
            dataIndex: "clockin",
            sorter: (a, b) => a.clockin.length - b.clockin.length,
        },
        {
            title: "Clock Out",
            dataIndex: "clockout",
            sorter: (a, b) => a.clockout.length - b.clockout.length,
        },
        {
            title: "Production",
            dataIndex: "production",
            sorter: (a, b) => a.production.length - b.production.length,
        },
        {
            title: "Break",
            dataIndex: "break",
            sorter: (a, b) => a.break.length - b.break.length,
        },
        {
            title: "OverTime",
            dataIndex: "overtime",
            sorter: (a, b) => a.overtime.length - b.overtime.length,
        },

        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            render: (progressArray) => (
                <div>
                    {progressArray && progressArray.length > 0 ? (
                        <div className="progress attendance">
                            {progressArray.map((value, index) => (
                                <div
                                    key={index}
                                    className={`progress-bar ${index === 0 ? 'progress-bar-success' : index === 1 ? 'progress-bar-warning' : 'progress-bar-danger'
                                        }`}
                                    role="progressbar"
                                    style={{ width: `${value}%` }}
                                ></div>
                            ))}
                        </div>
                    ) : null}
                </div>
            ),
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (text) => (
                <span className={`badge ${text === 'Present' ? 'badge-linesuccess' : 'badges-inactive Holiday'}`}>
                    {text === 'Present' ? 'Active' : text === 'Abscent' ? 'Inactive' : 'Holiday'}
                </span>
            ),
            sorter: (a, b) => a.status.length - b.status.length,
        },


        {
            title: "TotalHours",
            dataIndex: "totalhours",
            sorter: (a, b) => a.totalhours.length - b.totalhours.length,
        },

    ];
    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="attendance-header">
                        <div className="attendance-content">
                            <ImageWithBasePath
                                src="./assets/img/icons/hand01.svg"
                                className="hand-img"
                                alt="img"
                            />
                            <h3>
                                Good Morning, <span>John Smilga</span>
                            </h3>
                        </div>
                        <div>
                            <ul className="table-top-head employe">
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
                                        onClick={() => {dispatch(setToogleHeader(!data)) }}
                                    >
                                        <ChevronUp />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="attendance-widget">
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 col-md-4 d-flex">
                                <div className="card w-100">
                                    <div className="card-body">
                                        <h5>
                                            Attendance<span>22 Aug 2023</span>
                                        </h5>
                                        <div className="card attendance">
                                            <div>
                                                <ImageWithBasePath src="./assets/img/icons/time-big.svg" alt="time-img" />
                                            </div>
                                            <div>
                                                <h2>05:45:22</h2>
                                                <p>Current Time</p>
                                            </div>
                                        </div>
                                        <div className="modal-attendance-btn flex-column flex-lg-row">
                                            <Link to="#" className="btn btn-submit w-100">
                                                Clock Out
                                            </Link>
                                            <Link
                                                to="#"
                                                className="btn btn-cancel me-2 w-100"
                                            >
                                                Break
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-12 col-md-8 d-flex">
                                <div className="card w-100">
                                    <div className="card-body">
                                        <h5>Days Overview This Month</h5>
                                        <ul className="widget-attend">
                                            <li className="box-attend">
                                                <div className="warming-card">
                                                    <h4>31</h4>
                                                    <h6>Total Working Days</h6>
                                                </div>
                                            </li>
                                            <li className="box-attend">
                                                <div className="danger-card">
                                                    <h4>05</h4>
                                                    <h6>Abesent Days</h6>
                                                </div>
                                            </li>
                                            <li className="box-attend">
                                                <div className="light-card">
                                                    <h4>28</h4>
                                                    <h6>Present Days</h6>
                                                </div>
                                            </li>
                                            <li className="box-attend">
                                                <div className="warming-card">
                                                    <h4>02</h4>
                                                    <h6>Half Days</h6>
                                                </div>
                                            </li>
                                            <li className="box-attend">
                                                <div className="warming-card">
                                                    <h4>01</h4>
                                                    <h6>Late Days</h6>
                                                </div>
                                            </li>
                                            <li className="box-attend">
                                                <div className="success-card">
                                                    <h4>02</h4>
                                                    <h6>Holidays</h6>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Attendance</h4>
                            </div>
                        </div>
                        <ul className="table-top-head">
                            <li>
                                <OverlayTrigger placement="top" overlay={renderTooltip}>
                                    <Link>
                                        <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>

                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <i data-feather="printer" className="feather-printer" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                        </ul>
                    </div>
                    {/* /product list */}
                    <div className="card table-list-card">
                        <div className="card-body pb-0">
                            <div className="table-top">
                                <div className="input-blocks search-set mb-0">
                                    <div className="search-set">
                                        <div className="search-input">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="form-control form-control-sm formsearch"
                                            />
                                            <Link to className="btn btn-searchset">
                                                <i data-feather="search" className="feather-search" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="search-path">
                                    <div className="d-flex align-items-center">
                                        <Link className="btn btn-filter" id="filter_search">
                                            <Filter className="filter-icon" onClick={toggleFilterVisibility}
                                            />
                                            <span>
                                                <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                                            </span>
                                        </Link>
                                        <div className={`layout-hide-box ${isLayoutVisible ? 'layout-show-box' : 'layout-hide-box'}`}>
                                            <Link to="#" className="me-3 layout-box" onClick={handleLayoutClick}>
                                                <Layout />
                                            </Link>
                                            {isLayoutVisible && (

                                                <div className="layout-drop-item card">
                                                    <div className="drop-item-head">
                                                        <h5>Want to manage datatable?</h5>
                                                        <p>
                                                            Please drag and drop your column to reorder your table and
                                                            enable see option as you want.
                                                        </p>
                                                    </div>
                                                    <ul>
                                                        <li>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                                <span className="status-label">
                                                                    <i data-feather="menu" className="feather-menu" />
                                                                    Shop
                                                                </span>
                                                                <input
                                                                    type="checkbox"
                                                                    id="option1"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="option1" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                                <span className="status-label">
                                                                    <i data-feather="menu" className="feather-menu" />
                                                                    Product
                                                                </span>
                                                                <input
                                                                    type="checkbox"
                                                                    id="option2"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="option2" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                                <span className="status-label">
                                                                    <i data-feather="menu" className="feather-menu" />
                                                                    Reference No
                                                                </span>
                                                                <input
                                                                    type="checkbox"
                                                                    id="option3"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="option3" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                                <span className="status-label">
                                                                    <i data-feather="menu" className="feather-menu" />
                                                                    Date
                                                                </span>
                                                                <input
                                                                    type="checkbox"
                                                                    id="option4"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="option4" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                                <span className="status-label">
                                                                    <i data-feather="menu" className="feather-menu" />
                                                                    Responsible Person
                                                                </span>
                                                                <input
                                                                    type="checkbox"
                                                                    id="option5"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="option5" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                                <span className="status-label">
                                                                    <i data-feather="menu" className="feather-menu" />
                                                                    Notes
                                                                </span>
                                                                <input
                                                                    type="checkbox"
                                                                    id="option6"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="option6" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                                <span className="status-label">
                                                                    <i data-feather="menu" className="feather-menu" />
                                                                    Quantity
                                                                </span>
                                                                <input
                                                                    type="checkbox"
                                                                    id="option7"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="option7" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                                <span className="status-label">
                                                                    <i data-feather="menu" className="feather-menu" />
                                                                    Actions
                                                                </span>
                                                                <input
                                                                    type="checkbox"
                                                                    id="option8"
                                                                    className="check"
                                                                    defaultChecked="true"
                                                                />
                                                                <label htmlFor="option8" className="checktoggle">
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-sort">
                                    <Sliders className="info-img" />
                                    <Select
                                        className="select"
                                        options={oldandlatestvalue}
                                        placeholder="Newest"
                                    />
                                </div>
                            </div>
                            {/* /Filter */}
                            <div
                                className={`card${isFilterVisible ? " visible" : ""}`}
                                id="filter_inputs"
                                style={{ display: isFilterVisible ? "block" : "none" }}
                            >
                                <div className="card-body pb-0">
                                    <div className="row">
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <i data-feather="calendar" className="info-img" />
                                                <div className="input-groupicon">
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        onChange={handleDateChange}
                                                        type="date"
                                                        className="filterdatepicker"
                                                        dateFormat="dd-MM-yyyy"
                                                        placeholder='Choose Date'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <i data-feather="stop-circle" className="info-img" />
                                                <StopCircle className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={status}
                                                    placeholder="Newest"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12 ms-auto">
                                            <div className="input-blocks">
                                                <Link className="btn btn-filters ms-auto">
                                                    {" "}
                                                    <i data-feather="search" className="feather-search" />{" "}
                                                    Search{" "}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Filter */}
                            <div className="table-responsive">
                                <Table columns={columns} dataSource={dataSource} />
                            </div>
                        </div>
                    </div>
                    {/* /product list */}
                </div>
            </div>

        </div>
    )
}

export default AttendanceEmployee
