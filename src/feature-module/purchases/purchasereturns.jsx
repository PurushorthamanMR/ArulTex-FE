import React, { useState } from 'react'
import ImageWithBasePath from '../../core/img/imagewithbasebath'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronUp, PlusCircle, RotateCcw, Sliders, StopCircle } from 'feather-icons-react/build/IconComponents';
import { Filter } from 'react-feather';
import Select from 'react-select';
import { DatePicker } from 'antd';
import AddPurchaseReturn from '../../core/modals/purchases/addpurchasereturn';
import EditPurchaseReturns from '../../core/modals/purchases/editpurchasereturns';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const PurchaseReturns = () => {

    const oldandlatestvalue = [
        { value: 'date', label: 'Sort by Date' },
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ];
    const supplier = [
        { value: 'chooseSupplier', label: 'Choose Supplier' },
        { value: 'apexComputers', label: 'Apex Computers' },
        { value: 'modernAutomobile', label: 'Modern Automobile' },
        { value: 'aimInfotech', label: 'AIM Infotech' },
      ];
      const supplierlist = [
        { value: 'chooseSupplier', label: 'Choose Supplier' },
        { value: 'apexComputers', label: 'Apex Computers' },
        { value: 'modernAutomobile', label: 'Modern Automobile' },
        { value: 'aimInfotech', label: 'AIM Infotech' },
      ];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
    };

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
                                <h4>Purchase Return List</h4>
                                <h6>Manage your Returns</h6>
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
                                data-bs-target="#add-sales-new"
                            >
                                 <PlusCircle className="me-2"/>
                                Add Purchase Return
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
                                    <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`} id="filter_search">
                                        <Filter
                                            className="filter-icon"
                                            onClick={toggleFilterVisibility}
                                        />
                                        <span onClick={toggleFilterVisibility}>
                                            <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                                        </span>
                                    </Link>
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
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <StopCircle  className="info-img"/>
                                                <Select options={supplier} className="select" placeholder="Choose Supplier" />

                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <i data-feather="stop-circle" className="info-img" />
                                                <Select options={supplierlist} className="select" placeholder="Choose Supplier" />

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
                                <table className="table datanew">
                                    <thead>
                                        <tr>
                                            <th>
                                                <label className="checkboxs">
                                                    <input type="checkbox" id="select-all" />
                                                    <span className="checkmarks" />
                                                </label>
                                            </th>
                                            <th>Image</th>
                                            <th>Date</th>
                                            <th>Supplier</th>
                                            <th>Reference</th>
                                            <th>Status</th>
                                            <th>Grand Total ($)</th>
                                            <th>Paid ($)</th>
                                            <th>Due ($)</th>
                                            <th>Payment Status</th>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product1.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>2/27/2022</td>
                                            <td>Apex Computers </td>
                                            <td>PT001</td>
                                            <td>
                                                <span className="badges bg-lightgreen">Received</span>
                                            </td>
                                            <td>550</td>
                                            <td>120</td>
                                            <td>550</td>
                                            <td>
                                                <span className="badges bg-lightgreen">Paid</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product2.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>1/15/2022</td>
                                            <td>Modern Automobile</td>
                                            <td>PT002</td>
                                            <td>
                                                <span className="badges bg-lightyellow">Ordered</span>
                                            </td>
                                            <td>550</td>
                                            <td>120</td>
                                            <td>550</td>
                                            <td>
                                                <span className="badges bg-lightyellow">Partial</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product3.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>3/24/2022</td>
                                            <td>AIM Infotech</td>
                                            <td>PT003</td>
                                            <td>
                                                <span className="badges bg-lightred">Pending</span>
                                            </td>
                                            <td>210</td>
                                            <td>120</td>
                                            <td>210</td>
                                            <td>
                                                <span className="badges bg-lightred">Unpaid</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product4.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>1/15/2022</td>
                                            <td>Best Power Tools</td>
                                            <td>PT004</td>
                                            <td>
                                                <span className="badges bg-lightgreen">Received</span>
                                            </td>
                                            <td>210</td>
                                            <td>120</td>
                                            <td>210</td>
                                            <td>
                                                <span className="badges bg-lightgreen">Paid</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product5.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>1/15/2022</td>
                                            <td>AIM Infotech</td>
                                            <td>PT005</td>
                                            <td>
                                                <span className="badges bg-lightred">Pending</span>
                                            </td>
                                            <td>210</td>
                                            <td>120</td>
                                            <td>210</td>
                                            <td>
                                                <span className="badges bg-lightred">UnPaid</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product6.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>3/24/2022</td>
                                            <td>Best Power Tools</td>
                                            <td>PT006</td>
                                            <td>
                                                <span className="badges bg-lightgreen">Received</span>
                                            </td>
                                            <td>210</td>
                                            <td>120</td>
                                            <td>210</td>
                                            <td>
                                                <span className="badges bg-lightgreen">paid</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product7.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>1/15/2022</td>
                                            <td>Apex Computers</td>
                                            <td>PT007</td>
                                            <td>
                                                <span className="badges bg-lightyellow">Ordered</span>
                                            </td>
                                            <td>1000</td>
                                            <td>500</td>
                                            <td>1000</td>
                                            <td>
                                                <span className="badges bg-lightyellow">Partial</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product8.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>3/24/2022</td>
                                            <td>Best Power Tools</td>
                                            <td>PT008</td>
                                            <td>
                                                <span className="badges bg-lightgreen">Received</span>
                                            </td>
                                            <td>210</td>
                                            <td>120</td>
                                            <td>210</td>
                                            <td>
                                                <span className="badges bg-lightgreen">paid</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product9.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>3/24/2022</td>
                                            <td>Hatimi Hardware &amp; Tools</td>
                                            <td>PT009</td>
                                            <td>
                                                <span className="badges bg-lightred">Pending</span>
                                            </td>
                                            <td>5500</td>
                                            <td>550</td>
                                            <td>5500</td>
                                            <td>
                                                <span className="badges bg-lightred">Unpaid</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath
                                                        src="assets/img/products/product10.jpg"
                                                        alt="product"
                                                    />
                                                </Link>
                                            </td>
                                            <td>3/24/2022</td>
                                            <td>Best Power Tools</td>
                                            <td>PT0010</td>
                                            <td>
                                                <span className="badges bg-lightred">Pending</span>
                                            </td>
                                            <td>2580</td>
                                            <td>1250</td>
                                            <td>2580</td>
                                            <td>
                                                <span className="badges bg-lightred">Unpaid</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
                                            <td>
                                                <Link className="product-img">
                                                    <ImageWithBasePath src="assets/img/products/product5.jpg" alt="product" />
                                                </Link>
                                            </td>
                                            <td>3/24/2022</td>
                                            <td>Best Power Tools</td>
                                            <td>PT0011</td>
                                            <td>
                                                <span className="badges bg-lightred">Pending</span>
                                            </td>
                                            <td>2580</td>
                                            <td>1250</td>
                                            <td>2580</td>
                                            <td>
                                                <span className="badges bg-lightred">Unpaid</span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <Link
                                                        className="me-2 p-2"
                                                        to="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-sales-new"
                                                    >
                                                        <i data-feather="edit" className="feather-edit" />
                                                    </Link>
                                                    <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
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
            <AddPurchaseReturn/>
            <EditPurchaseReturns/>
        </div>
    )
}

export default PurchaseReturns
