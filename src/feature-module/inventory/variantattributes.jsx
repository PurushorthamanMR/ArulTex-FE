import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../../core/pagination/datatable'
import Swal from 'sweetalert2';
import { Calendar, ChevronUp, Filter, PlusCircle, RotateCcw, Sliders, StopCircle, Zap } from 'feather-icons-react/build/IconComponents';
import Select from 'react-select';
import { DatePicker } from 'antd';
import AddVariant from '../../core/modals/inventory/addvariant';
import EditVarient from '../../core/modals/inventory/editvarient';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { setToogleHeader } from '../../core/redux/action';
import withReactContent from 'sweetalert2-react-content';

const VariantAttributes = () => {
  const dataSource = useSelector((state) => state.variantattributes_data);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
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

  const oldandlatestvalue = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];
  const variant = [
    { value: 'Choose Variant', label: 'Choose Variant' },
    { value: 'Size (T-shirts)', label: 'Size (T-shirts)' },
    { value: 'Size (Shoes)', label: 'Size (Shoes)' },
    { value: 'Color', label: 'Color' },
  ];
  const status = [
    { value: 'choose Status', label: 'Choose Status' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  const columns = [
    {
      title: "Variant",
      dataIndex: "variant",
      sorter: (a, b) => a.variant.length - b.variant.length,
    },
    {
      title: "Values",
      dataIndex: "values",
      sorter: (a, b) => a.values.length - b.values.length,
    },


    {
      title: "Created On",
      dataIndex: "createdon",
      sorter: (a, b) => a.createdon.length - b.createdon.length,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span className="badge badge-linesuccess">
          <Link to="#"> {text}</Link>
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <td className="action-table-data">
          <div className="edit-delete-action">
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
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Variant Attributes</h4>
              <h6>Manage your variant attributes</h6>
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
            <a
              to="#"
              className="btn btn-added"
              data-bs-toggle="modal"
              data-bs-target="#add-units"
            >
              <PlusCircle className="me-2" />
              Add New Variant
            </a>
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
              className={`card${isFilterVisible ? ' visible' : ''}`}
              id="filter_inputs"
              style={{ display: isFilterVisible ? 'block' : 'none' }}
            >       <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <Zap className="info-img" />
                      <Select
                        className="select"
                        options={variant}
                        placeholder="Choose Brand"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <Calendar className="info-img" />
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
                      <StopCircle className="info-img" />
                      <Select
                        className="select"
                        options={status}
                        placeholder="Choose Brand"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12 ms-auto">
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
      <AddVariant />
      <EditVarient />
    </div>
  )
}

export default VariantAttributes
