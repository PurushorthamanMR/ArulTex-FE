import React, { useState } from "react";
import Breadcrumbs from "../../core/breadcrumbs";
import { Eye } from "react-feather";
import { Link } from "react-router-dom";
import { Sliders } from "react-feather";
import Select from "react-select";
import { Filter } from "react-feather";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Calendar, StopCircle, User, FileText } from "react-feather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { all_routes } from "../../Router/all_routes";

const ExpensesList = () => {
  const route = all_routes;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateTwo, setSelectedDateTwo] = useState(null);
  const [selectedDateModal, setSelectedDateModal] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handlerefChange = (date) => {
    setSelectedDateTwo(date);
  };
  const handleDateChangeModal = (date) => {
    setSelectedDateModal(date);
  };
  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];
  const optionsOne = [
    { value: "chooseName", label: "Choose Name" },
    { value: "macbookPro", label: "Macbook Pro" },
    { value: "orange", label: "Orange" },
  ];

  const optionsTwo = [
    { value: "chooseStatus", label: "Choose Status" },
    { value: "computers", label: "Computers" },
    { value: "fruits", label: "Fruits" },
  ];

  const optionsModalOne = [
    { value: "choose", label: "Choose" },
    { value: "foodsSnacks", label: "Foods & Snacks" },
    { value: "employeeBenefits", label: "Employee Benefits" },
  ];

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const confirmText = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumbs
            maintitle="Expense List"
            subtitle="Manage Your Expenses"
            addButton="Add New Expenses"
          />
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
                  <Link
                    className={`btn btn-filter ${
                      isFilterVisible ? "setclose" : ""
                    }`}
                    id="filter_search"
                  >
                    <Filter
                      className="filter-icon"
                      onClick={toggleFilterVisibility}
                    />
                    <span onClick={toggleFilterVisibility}>
                      <ImageWithBasePath
                        src="assets/img/icons/closes.svg"
                        alt="img"
                      />
                    </span>
                  </Link>
                </div>
                <div className="form-sort stylewidth">
                  <Sliders className="info-img" />

                  <Select
                    className="select "
                    options={options}
                    placeholder="Sort by Date"
                  />
                </div>
              </div>
              {/* /Filter */}
              {/* <div className="card" id="filter_inputs"> */}

              <div
                className={`card${isFilterVisible ? " visible" : ""}`}
                id="filter_inputs"
                style={{ display: isFilterVisible ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="input-blocks">
                        <User className="info-img" />
                        <Select
                          className="select select-height"
                          options={optionsOne}
                          defaultValue={optionsOne[0]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="input-blocks">
                        <StopCircle className="info-img" />
                        <Select
                          className="select select-height"
                          options={optionsTwo}
                          defaultValue={optionsTwo[0]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Calendar className="info-img" />
                        <div className="input-groupicon">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="From Date - To Date"
                            className="datetimepicker"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="input-blocks">
                        {/* <i data-feather="file-text" className="info-img" /> */}
                        <FileText className="info-img" />
                        <div className="input-groupicon">
                          {/* <input
                            type="text"
                            className="datetimepicker"
                            placeholder="Enter Reference"
                          /> */}
                          <DatePicker
                            selected={selectedDateTwo}
                            onChange={handlerefChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Enter Reference"
                            className="datetimepicker"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Link className="btn btn-filters ms-auto">
                          {" "}
                          <i
                            data-feather="search"
                            className="feather-search"
                          />{" "}
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
                      <th>Category name</th>
                      <th>Reference</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th className="no-sort">Action</th>
                    </tr>
                  </thead>
                  <tbody className="Expense-list-blk">
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td>Employee Benefits</td>
                      <td>PT001</td>
                      <td>19 Jan 2023</td>
                      <td>
                        <span className="badge badge-linesuccess">Active</span>
                      </td>
                      <td>$550</td>
                      <td>Employee Vehicle</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Foods &amp; Snacks</td>
                      <td>PT002</td>
                      <td>27 Jan 2023</td>
                      <td>
                        <span className="badge badge-linesuccess">Active</span>
                      </td>
                      <td>$570</td>
                      <td>Employee Foods</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Entertainment</td>
                      <td>PT003</td>
                      <td>03 Feb 2023</td>
                      <td>
                        <span className="badge badge-linesuccess">Active</span>
                      </td>
                      <td>$400</td>
                      <td>Office Vehicle</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Office Expenses &amp; Postage </td>
                      <td>PT004</td>
                      <td>17 Feb 2023</td>
                      <td>
                        <span className="badge badge-linedanger">Inactive</span>
                      </td>
                      <td>$750</td>
                      <td>Employee Foods</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Employee Benefits</td>
                      <td>PT005</td>
                      <td>14 Mar 2023</td>
                      <td>
                        <span className="badge badge-linedanger">Inactive</span>
                      </td>
                      <td>$470</td>
                      <td>Employee Vehicle</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Foods &amp; Snacks</td>
                      <td>PT006</td>
                      <td>28 Mar 2023</td>
                      <td>
                        <span className="badge badge-linesuccess">Active</span>
                      </td>
                      <td>$200</td>
                      <td>Employee Foods</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Entertainment</td>
                      <td>PT007</td>
                      <td>06 Apr 2023</td>
                      <td>
                        <span className="badge badge-linedanger">Inactive</span>
                      </td>
                      <td>$380</td>
                      <td>Office Vehicle</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Office Expenses &amp; Postage </td>
                      <td>PT008</td>
                      <td>19 Apr 2023</td>
                      <td>
                        <span className="badge badge-linesuccess">Active</span>
                      </td>
                      <td>$620</td>
                      <td>Employee Foods</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Employee Benefits</td>
                      <td>PT009</td>
                      <td>08 May 2023</td>
                      <td>
                        <span className="badge badge-linedanger">Inactive</span>
                      </td>
                      <td>$430</td>
                      <td>Employee Vehicle</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Foods &amp; Snacks</td>
                      <td>PT010</td>
                      <td>23 May 2023</td>
                      <td>
                        <span className="badge badge-linesuccess">Active</span>
                      </td>
                      <td>$120</td>
                      <td>Employee Foods</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Entertainment</td>
                      <td>PT011</td>
                      <td>24 Nov 2023</td>
                      <td>
                        <span className="badge badge-linedanger">Inactive</span>
                      </td>
                      <td>$620</td>
                      <td>Office Vehicle</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
                      <td>Office Expenses &amp; Postage </td>
                      <td>PT012</td>
                      <td>19 Nov 2023</td>
                      <td>
                        <span className="badge badge-linesuccess">Active</span>
                      </td>
                      <td>$430</td>
                      <td>Employee Foods</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2 mb-0" to="#">
                            <Eye className="action-eye" />
                          </Link>
                          <Link
                            className="me-2 p-2 mb-0"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className="me-3 confirm-text p-2 mb-0" to="#">
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                              onClick={confirmText}
                            />
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
      {/* Add Expense */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Expense</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Expense Category</label>

                        <Select
                          options={optionsModalOne}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-blocks date-group">
                        <i data-feather="calendar" className="info-img" />
                        <div className="input-groupicon">
                          <DatePicker
                            selected={selectedDateModal}
                            onChange={handleDateChangeModal}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Choose Date"
                            className="datetimepicker"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="$"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Reference</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Expense For</label>
                        <input type="text" className="form-control" />
                        <span className="unlimited-text">0 for Unlimited</span>
                      </div>
                    </div>
                    {/* Editor */}
                    <div className="col-md-12">
                      <div className="edit-add card">
                        <div className="edit-add">
                          <label className="form-label">Description</label>
                        </div>
                        <div className="card-body-list input-blocks mb-0">
                          <textarea
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                        <p>Maximum 600 Characters</p>
                      </div>
                    </div>
                    {/* /Editor */}
                  </div>
                  <div className="modal-footer-btn">
                    <Link
                      to="#"
                      className="btn btn-cancel me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to={route.expenselist} className="btn btn-submit">
                      Submit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Expense */}

      {/* Edit Expense */}
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Edit Expense</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Expense Category</label>
                          <select className="select">
                            <option>Employee Benefits</option>
                            <option>Foods &amp; Snacks</option>
                            <option>Entertainment</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks date-group">
                          <i data-feather="calendar" className="info-img" />
                          <div className="input-groupicon">
                            <input
                              type="text"
                              className="datetimepicker ps-5"
                              placeholder="19 Jan 2023"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Amount</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="$550.00"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Reference</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={55544}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3 input-blocks">
                          <label className="form-label">Expense For</label>
                          <input type="text" className="form-control" />
                          <span className="unlimited-text">
                            0 for Unlimited
                          </span>
                        </div>
                      </div>
                      {/* Editor */}
                      <div className="col-md-12">
                        <div className="edit-add card">
                          <div className="edit-add">
                            <label className="form-label">Description</label>
                          </div>
                          <div className="card-body-list input-blocks mb-0">
                            <textarea
                              className="form-control"
                              defaultValue={"Employee Vehicle"}
                            />
                          </div>
                          <p>Maximum 600 Characters</p>
                        </div>
                      </div>
                      {/* /Editor */}
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Expense */}
    </div>
  );
};

export default ExpensesList;
