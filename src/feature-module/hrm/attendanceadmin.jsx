import React, { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, RotateCcw, StopCircle } from 'feather-icons-react/build/IconComponents';
import { Filter, Grid, PlusCircle, Sliders, User } from 'react-feather';
import Select from 'react-select';
import Layout from 'feather-icons-react/build/IconComponents/Layout';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable.jsx'
import AddAttendance from '../../core/modals/hrm/addattendance.jsx';
import EditAttendance from '../../core/modals/hrm/editattendance.jsx';
import { setToogleHeader } from '../../core/redux/action.jsx';

const AttendanceAdmin = () => {
    const dataSource = useSelector((state) => state.attendanceadmin_data);
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
    const status = [
        { value: 'Choose Status', label: 'Choose Status' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
    ];

    const namelist = [
        { value: 'Choose Name', label: 'Choose Name' },
        { value: 'Mitchum Daniel', label: 'Mitchum Daniel' },
        { value: 'Susan Lopez', label: 'Susan Lopez' },
        { value: 'Robert Grossman', label: 'Robert Grossman' },
        { value: 'Janet Hembre', label: 'Janet Hembre' },
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
            title: "Emp Name",
            dataIndex: "empname",
            render: (text, record) => (
                <div className="userimgname">
                    <Link to="#" className='product-img'>
                        <ImageWithBasePath alt="" src={record.img} />
                    </Link>
                    <div to="#" className='emp-team'>{text}</div>
                </div>
            ),
            sorter: (a, b) => a.empname.length - b.empname.length,
        },
        {
            title: "Emp Id",
            dataIndex: "empid",
            sorter: (a, b) => a.empid.length - b.empid.length,
        },
        {
            title: "Date",
            dataIndex: "date",
            sorter: (a, b) => a.date.length - b.date.length,
        },
        {
            title: "Shift",
            dataIndex: "shift",
            sorter: (a, b) => a.shift.length - b.shift.length,
        },
        {
            title: "Clock In",
            dataIndex: "clockin",
            sorter: (a, b) => a.clockin.length - b.clockin.length,
        },
        {
            title: "Production",
            dataIndex: "production",
            sorter: (a, b) => a.production.length - b.production.length,
        },
        {
            title: "Over Time",
            dataIndex: "overtime",
            sorter: (a, b) => a.overtime.length - b.overtime.length,
        },
        {
            title: "Total Hours",
            dataIndex: "totalhours",
            sorter: (a, b) => a.totalhours.length - b.totalhours.length,
        },
        {
            title: "Approval",
            dataIndex: "approval",
            render: (text) => (
                <span className="badges status-badge">
                    <Link to="#"> {text}</Link>
                </span>
            ),
            sorter: (a, b) => a.approval.length - b.approval.length,
        },

        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: () => (
                <td className="action-table-data">
                    <div className="edit-delete-action">

                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                        >
                            <i data-feather="edit" className="feather-edit"></i>
                        </Link>
                        <Link className="confirm-text p-2" to="#">
                            <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={showConfirmationAlert}
                            ></i>
                        </Link>
                    </div>
                </td>
            ),
        },
    ];
    const MySwal = withReactContent(Swal);
    const showConfirmationAlert = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            showCancelButton: true,
            confirmButtonColor: '#00ff00',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonColor: '#ff0000',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {

                MySwal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    className: "btn btn-success",
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn btn-success',
                    },
                });
            } else {
                MySwal.close();
            }

        });
    };
    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Attendance</h4>
                                <h6>Manage your Attendance</h6>
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

                                Add New Attendance
                            </Link>
                        </div>
                    </div>
                    {/* /product list */}
                    <div className="card table-list-card">
                        <div className="card-body pb-0">
                            <div className="table-top">
                                <div className="input-blocks search-set mb-0">
                                    {/* <div class="total-employees">
                                          <h6><i data-feather="users" class="feather-user"></i>Total Employees <span>21</span></h6>
                                      </div> */}
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
                                <div className="search-path d-flex align-items-center search-path-new">
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
                                        <Link to="#" className="btn-grid active">

                                            <Grid className="feather-user" />
                                        </Link>
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
                                                <User className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={namelist}
                                                    placeholder="Newest"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
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
                                <Table columns={columns} dataSource={dataSource} />
                            </div>
                        </div>
                    </div>
                    {/* /product list */}
                </div>
            </div>
            <AddAttendance />
            <EditAttendance />
        </div>
    )
}

export default AttendanceAdmin
