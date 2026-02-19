import React, { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, RotateCcw, Sliders, StopCircle, User } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Filter } from 'react-feather';
import Select from 'react-select';
import Table from '../../core/pagination/datatable'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Calendar from 'feather-icons-react/build/IconComponents/Calendar';


const InvoiceReport = () => {
    const dataSource = useSelector((state) => state.invoicereport_data);

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
    )
    const status = [
        { value: 'Choose Name', label: 'Choose Name' },
        { value: 'Rose', label: 'Rose' },
        { value: 'Kaitlin', label: 'Kaitlin' },
    ];
    const statusupdate = [
        { value: 'Choose Status', label: 'Choose Status' },
        { value: 'Paid', label: 'Paid' },
        { value: 'Unpaid', label: 'Unpaid' },
        { value: 'Overdue', label: 'Overdue' },
    ];
    const oldandlatestvalue = [
        { value: 'Sort by Date', label: 'Sort by Date' },
        { value: '07 09 23', label: '07 09 23' },
        { value: '21 09 23', label: '21 09 23' },
    ];

    const columns = [

        {
            title: "invoiceno",
            dataIndex: "invoiceno",
            sorter: (a, b) => a.invoiceno.length - b.invoiceno.length,
        },

        {
            title: "customer",
            dataIndex: "customer",
            sorter: (a, b) => a.customer.length - b.customer.length,
        },
        {
            title: "duedate",
            dataIndex: "duedate",
            sorter: (a, b) => a.duedate.length - b.duedate.length,
        },
        {
            title: "amount",
            dataIndex: "amount",
            sorter: (a, b) => a.amount.length - b.amount.length,
        },
        {
            title: "paid",
            dataIndex: "paid",
            sorter: (a, b) => a.paid.length - b.paid.length,
        },
        {
            title: "amountdue",
            dataIndex: "amountdue",
            sorter: (a, b) => a.amountdue.length - b.amountdue.length,
        },

        {
            title: "Status",
            dataIndex: "status",
            render: (text) => (
                <div>
                    {text === "Paid" && (
                        <span className="badge badge-linesuccess">{text}</span>
                    )}
                    {text === "Unpaid" && (
                        <span className="badge badge-linedanger">{text}</span>
                    )}
                    {text === "Overdue" && (
                        <span className="badge badges-warning">{text}</span>
                    )}
                </div>
            ),
            sorter: (a, b) => a.status.length - b.status.length,
        },

    ]
    const initialSettings = {
        endDate: new Date("2020-08-11T12:30:00.000Z"),
        ranges: {
            "Last 30 Days": [
                new Date("2020-07-12T04:57:17.076Z"),
                new Date("2020-08-10T04:57:17.076Z"),
            ],
            "Last 7 Days": [
                new Date("2020-08-04T04:57:17.076Z"),
                new Date("2020-08-10T04:57:17.076Z"),
            ],
            "Last Month": [
                new Date("2020-06-30T18:30:00.000Z"),
                new Date("2020-07-31T18:29:59.999Z"),
            ],
            "This Month": [
                new Date("2020-07-31T18:30:00.000Z"),
                new Date("2020-08-31T18:29:59.999Z"),
            ],
            Today: [
                new Date("2020-08-10T04:57:17.076Z"),
                new Date("2020-08-10T04:57:17.076Z"),
            ],
            Yesterday: [
                new Date("2020-08-09T04:57:17.076Z"),
                new Date("2020-08-09T04:57:17.076Z"),
            ],
        },
        startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
        timePicker: false,
    };
    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Invoice Report </h4>
                                <h6>Manage Your Invoice Report</h6>
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
                    </div>
                    {/* /product list */}
                    <div className="card table-list-card">
                        <div className="card-body">
                            <div className="table-top">
                                <div className="search-set">
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
                                className={`card${isFilterVisible ? ' visible' : ''}`}
                                id="filter_inputs"
                                style={{ display: isFilterVisible ? 'block' : 'none' }}
                            >
                                <div className="card-body pb-0">
                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <User className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={status}
                                                    placeholder="Choose Brand"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">

                                                <StopCircle className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={statusupdate}
                                                    placeholder="Choose Brand"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <div className="position-relative daterange-wraper">
                                                    <Calendar />
                                                    <DateRangePicker
                                                        initialSettings={initialSettings}
                                                    >
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                        //style={{ border: "none" }}
                                                        />
                                                    </DateRangePicker>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <a className="btn btn-filters ms-auto">
                                                    {" "}
                                                    <i data-feather="search" className="feather-search" />{" "}
                                                    Search{" "}
                                                </a>
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

export default InvoiceReport
