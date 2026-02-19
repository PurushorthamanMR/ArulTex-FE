import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../core/img/imagewithbasebath'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ChevronUp, Eye, PlusCircle, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Box,  Filter, Sliders, StopCircle, User } from 'react-feather';
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable'
import AddQuotation from '../../core/modals/sales/addquotation';
import EditQuotation from '../../core/modals/sales/editquotation';

const QuotationList = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const dataSource = useSelector((state) => state.quotationlist_data);

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
    };
    const oldandlatestvalue = [
        { value: 'date', label: 'Sort by Date' },
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ];
    const products = [
        { value: 'Choose product', label: 'Choose product' },
        { value: 'Bold V3.2', label: 'Bold V3.2' },
        { value: 'Apple Series 5 Watch', label: 'Apple Series 5 Watch' },
    ];
    const status = [
        { value: 'Choose product', label: 'Choose Status' },
        { value: 'Ordered', label: 'Ordered' },
        { value: 'Sent', label: 'Sent' },
    ];
    const customername = [
        { value: 'Choose Custmer', label: 'Choose Customer' },
        { value: 'walk-in-customer', label: 'walk-in-customer' },
        { value: 'John Smith', label: 'John Smith' },
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
    )
    const columns = [

       
        {
          title: "Product Name",
          dataIndex: "productname",
          sorter: (a, b) => a.productname.length - b.productname.length,
        },
        {
          title: "Reference",
          dataIndex: "reference",
          sorter: (a, b) => a.reference.length - b.reference.length,
        },
        {
          title: "Customer Name",
          dataIndex: "customername",
          sorter: (a, b) => a.customername.length - b.customername.length,
        },
        {
          title: "Status",
          dataIndex: "status",
          render: (text) => (
            <div>
              {text === "Sent" && (
                <span className="badges status-badge">{text}</span>
              )}
              {text === "Ordered" && (
                <span className="badges order-badge">{text}</span>
              )}
              {text === "Pending" && (
                <span className="badges unstatus-badge">{text}</span>
              )}
            </div>
          ),
          sorter: (a, b) => a.status.length - b.status.length,
        },
        {
          title: "Grand Total ($)",
          dataIndex: "grandtotal",
          sorter: (a, b) => a.grandtotal.length - b.grandtotal.length,
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          render: () => (
            <td className="action-table-data">
              <div className="edit-delete-action">
              <Link
              className="me-2 p-2"
              to="#"
            >
              <Eye className="feather-view" />
            </Link>
                <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-units">
                  <i data-feather="edit" className="feather-edit"></i>
                </Link>
                <Link className="confirm-text p-2" to="#"  >
                  <i data-feather="trash-2" className="feather-trash-2" onClick={showConfirmationAlert}></i>
                </Link>
              </div>
            </td>
          )
        },
      ]
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
                                <h4>Quotation List</h4>
                                <h6>Manage Your Quotation</h6>
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
                                Add New Quotation
                            </Link>
                        </div>
                    </div>
                    {/* /product list */}
                    <div className="card table-list-card">
                        <div className="card-body">
                            <div className="table-top">
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
                                        <div className="col-lg-2 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <Box className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={products}
                                                    placeholder="Choose Product"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <StopCircle className="info-img" />
                                                <Select
                                                    className="select"
                                                    options={status}
                                                    placeholder="Choose Status"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-6 col-12">
                                            <div className="input-blocks">

                                                <User className="info-img" />
                                                
                                                <Select
                                                className="select"
                                                options={customername}
                                                placeholder="Choose Custmer"
                                            />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <i data-feather="file-text" className="info-img" />
                                                <div className="input-groupicon">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Reference"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
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
            <AddQuotation/>
            <EditQuotation />
        </div>
    )
}

export default QuotationList
