import React, { useState } from 'react'
import ImageWithBasePath from '../../core/img/imagewithbasebath'
import { useDispatch, useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { Box, Filter, Layout, PlusCircle, Sliders, StopCircle, User, XCircle } from 'react-feather';
import Select from 'react-select';
import { setToogleHeader } from '../../core/redux/action';
import AddLeaveEmployee from '../../core/modals/hrm/addleaveemployee';
import EditLeaveEmployee from '../../core/modals/hrm/editleaveemployee';

const LeavesEmployee = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
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
    const leavetype = [
        { value: 'Choose Type', label: 'Choose Type' },
        { value: 'Sick Leave', label: 'Sick Leave' },
        { value: 'Paternity', label: 'Paternity' },
    ];
    const employeename = [
        { value: 'Choose Employee', label: 'Choose Employee' },
        { value: 'Mitchum Daniel', label: 'Mitchum Daniel' },
        { value: 'Susan Lopez', label: 'Susan Lopez' },
    ];
    const leavestatus = [
        { value: 'Choose Status', label: 'Choose Status' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
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
    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Leaves</h4>
                                <h6>Manage your Leaves</h6>
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
                        <div className="page-btn">
                            <Link
                                to="#"
                                className="btn btn-added"
                                data-bs-toggle="modal"
                                data-bs-target="#add-units"
                            >

                                <PlusCircle className="me-2" />
                                Apply Leave
                            </Link>
                        </div>
                    </div>
                    {/* /product list */}
                    <div className="card table-list-card">
                        <div className="card-body">
                            <div className="table-top">
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
                                <div className="search-path">
                                    <div className="d-flex align-items-center">
                                        <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`} id="filter_search">
                                            <Filter
                                                className="filter-icon"
                                                onClick={toggleFilterVisibility}
                                            />
                                            <span onClick={toggleFilterVisibility}>
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
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <Box className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={leavetype}
                                                    placeholder="Newest"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <User className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={employeename}
                                                    placeholder="Newest"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">

                                                <StopCircle className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={leavestatus}
                                                    placeholder="Newest"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12 ms-auto">
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
                                <table className="table  datanew">
                                    <thead>
                                        <tr>
                                            <th className="no-sort">
                                                <label className="checkboxs">
                                                    <input type="checkbox" id="select-all" />
                                                    <span className="checkmarks" />
                                                </label>
                                            </th>
                                            <th>Emp Id</th>
                                            <th>Type</th>
                                            <th>Date</th>
                                            <th>Duration</th>
                                            <th>Applied On</th>
                                            <th>Reason</th>
                                            <th>Approval</th>
                                            <th className="no-sort">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label className="checkboxs">
                                                    <input type="checkbox" />
                                                    <span className="checkmarks" />
                                                </label>
                                            </td>
                                            <td>POS001 </td>
                                            <td>Sick Leave</td>
                                            <td>02 Aug 2023</td>
                                            <td>01 Day</td>
                                            <td>04 Aug 2023</td>
                                            <td />
                                            <td>
                                                <span className="badge-applied">Applied</span>
                                            </td>
                                            <td className="action-table-data justify-content-end">
                                                <div className="edit-delete-action">
                                                    <Link to="" className="me-2 cancel-circle">
                                                        
                                                        <XCircle className="feather-x-circle"/>
                                                    </Link>
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-units"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#">
                                                        <i data-feather="trash-2" className="feather-trash-2" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="checkboxs">
                                                    <input type="checkbox" />
                                                    <span className="checkmarks" />
                                                </label>
                                            </td>
                                            <td>POS002 </td>
                                            <td>Paternity</td>
                                            <td>07 Aug 2023</td>
                                            <td>2 hrs</td>
                                            <td>07 Aug 2023</td>
                                            <td />
                                            <td>
                                                <span className="badge-approved">Approved</span>
                                            </td>
                                            <td className="action-table-data justify-content-end">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-units"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#">
                                                        <i data-feather="trash-2" className="feather-trash-2" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="checkboxs">
                                                    <input type="checkbox" />
                                                    <span className="checkmarks" />
                                                </label>
                                            </td>
                                            <td>POS003 </td>
                                            <td>Sick Leave</td>
                                            <td>03 Aug 2023</td>
                                            <td>01 Day</td>
                                            <td>03 Aug 2023</td>
                                            <td>
                                                <Link
                                                    to=""
                                                    className="reason-for-reject"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#rejected-reason"
                                                >
                                                    Reason
                                                </Link>
                                            </td>
                                            <td>
                                                <span className="badge-reject">Rejected</span>
                                            </td>
                                            <td className="action-table-data justify-content-end">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-units"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#">
                                                        <i data-feather="trash-2" className="feather-trash-2" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="checkboxs">
                                                    <input type="checkbox" />
                                                    <span className="checkmarks" />
                                                </label>
                                            </td>
                                            <td>POS004 </td>
                                            <td>Sick Leave</td>
                                            <td>05 Aug 2023</td>
                                            <td>01 Day</td>
                                            <td>05 Aug 2023</td>
                                            <td>
                                                <Link
                                                    to=""
                                                    className="reason-for-reject"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#rejected-reason"
                                                >
                                                    Reason
                                                </Link>
                                            </td>
                                            <td>
                                                <span className="badge-reject">Rejected</span>
                                            </td>
                                            <td className="action-table-data justify-content-end">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-units"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#">
                                                        <i data-feather="trash-2" className="feather-trash-2" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="checkboxs">
                                                    <input type="checkbox" />
                                                    <span className="checkmarks" />
                                                </label>
                                            </td>
                                            <td>POS005 </td>
                                            <td>Sick Leave</td>
                                            <td>08 Aug 2023</td>
                                            <td>02 Days</td>
                                            <td>08 Aug 2023</td>
                                            <td />
                                            <td>
                                                <span className="badge-applied">Applied</span>
                                            </td>
                                            <td className="action-table-data justify-content-end">
                                                <div className="edit-delete-action">
                                                    <Link to="" className="me-2 cancel-circle">
                                                    <XCircle className="feather-x-circle"/>
                                                    </Link>
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-units"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#">
                                                        <i data-feather="trash-2" className="feather-trash-2" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="checkboxs">
                                                    <input type="checkbox" />
                                                    <span className="checkmarks" />
                                                </label>
                                            </td>
                                            <td>POS006</td>
                                            <td>Sick Leave</td>
                                            <td>03 Aug 2023</td>
                                            <td>2 hrs</td>
                                            <td>03 Aug 2023</td>
                                            <td />
                                            <td>
                                                <span className="badge-approved">Approved</span>
                                            </td>
                                            <td className="action-table-data justify-content-end">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-units"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#">
                                                        <i data-feather="trash-2" className="feather-trash-2" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* /product list */}
                </div>
            </div>
            <AddLeaveEmployee />
            <EditLeaveEmployee />
        </div>
    )
}

export default LeavesEmployee
