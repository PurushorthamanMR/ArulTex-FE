import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../core/breadcrumbs";
import { Filter, Sliders } from "react-feather";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import Select from "react-select";
import { Zap } from "react-feather/dist";
import Swal from "sweetalert2";
import { all_routes } from "../../Router/all_routes";

const ExpenseCategory = () => {
  const route = all_routes;
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  const optionsTwo = [
    { value: "chooseCategory", label: "Choose Category" },
    { value: "foodsSnacks", label: "Foods & Snacks" },
    { value: "petrol", label: "Petrol" },
  ];

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
    <>
      <div>
        <div className="page-wrapper">
          <div className="content">
            <Breadcrumbs
              maintitle="Expense Category"
              subtitle="Manage Your Expense Category"
              addButton="Add Expenses Category"
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
                <div
                  className={`card${isFilterVisible ? " visible" : ""}`}
                  id="filter_inputs"
                  style={{ display: isFilterVisible ? "block" : "none" }}
                >
                  <div className="card-body pb-0">
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="input-blocks">
                          {/* <i data-feather="zap" className="info-img" /> */}
                          <Zap className="info-img" />
                          <Select
                            options={optionsTwo}
                            placeholder="Choose Category"
                          />
                        </div>
                      </div>
                      <div className="col-lg-9 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Link className="btn btn-filters ms-auto">
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
                        <td>Employee Vehicle</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
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
                        <td>Employee Foods</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Employee Welfare</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Postal Expense</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Other Expenses</td>
                        <td>Other Expenses</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Petrol</td>
                        <td>Employee Cab</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Maintenance</td>
                        <td>Office Maintenance</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Marketing</td>
                        <td>Advertising Cost</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Printing &amp; Stationery</td>
                        <td>Stationery Expense</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Telephone Expense</td>
                        <td>Telephone Cost</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Office Vehicle</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
                        <td>Employee Foods</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
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
        {/* Add Expense Category*/}
        <div className="modal fade" id="add-units">
          <div className="modal-dialog modal-dialog-centered custom-modal-two">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header border-0 custom-modal-header">
                    <div className="page-title">
                      <h4>Add Expense Category</h4>
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
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Expense Name</label>
                            <input type="text" className="form-control" />
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
                        <button
                          type="button"
                          className="btn btn-cancel me-2"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Expense Category*/}

        {/* Edit Expense Category*/}
        <div className="modal fade" id="edit-units">
          <div className="modal-dialog modal-dialog-centered custom-modal-two">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header border-0 custom-modal-header">
                    <div className="page-title">
                      <h4>Edit Expense Category</h4>
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
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Expense Name</label>
                          <input
                            type="text"
                            defaultValue="Employee Benefits"
                            className="form-control"
                          />
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
                      <Link
                        to="javascript:void(0);"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </Link>
                      <Link
                        to={route.expensecategory}
                        className="btn btn-submit"
                      >
                        Save Changes
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Expense */}
      </div>
    </>
  );
};

export default ExpenseCategory;
