import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Sliders } from "react-feather";
import Select from "react-select";
import { Globe, User } from "react-feather";
import ImageWithBasePath from "../../img/imagewithbasebath";
import Breadcrumbs from "../../breadcrumbs";

const WareHouses = () => {
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
    { label: "Choose Store Name", value: "" },
    { label: "Benjamin", value: "Benjamin" },
    { label: "Ellen", value: "Ellen" },
    { label: "Freda", value: "Freda" },
    { label: "Kaitlin", value: "Kaitlin" },
  ];

  const countries = [
    { label: "Choose Country", value: "" },
    { label: "India", value: "India" },
    { label: "USA", value: "USA" },
  ];

  const options1 = [
    { value: "choose", label: "Choose" },
    { value: "steven", label: "Steven" },
    { value: "gravely", label: "Gravely" },
  ];

  const options2 = [
    { value: "choose", label: "Choose" },
    { value: "uk", label: "United Kingdom" },
    { value: "us", label: "United States" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Warehouse"
          subtitle="Manage Your Warehouse"
          addButton="Add New Warehouse"
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
                      <User className="info-img" />
                      <Select
                        options={optionsTwo}
                        placeholder="Choose Store Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <Globe className="info-img" />
                      <Select
                        options={countries}
                        placeholder="Choose Country"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12 ms-auto">
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
                    <th>Warehouse</th>
                    <th>Contact Person</th>
                    <th>Phone</th>
                    <th>Total Products</th>
                    <th>Stock</th>
                    <th>Qty</th>
                    <th>Created On</th>
                    <th>Status</th>
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
                    <td>Legendary</td>
                    <td>
                      <div className="userimgname">
                        <Link to="#" className="product-img">
                          <ImageWithBasePath
                            src="assets/img/users/user-08.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Steven</Link>
                      </div>
                    </td>
                    <td>+1 45445 4454</td>
                    <td>04</td>
                    <td>55</td>
                    <td>600</td>
                    <td>04 Aug 2023</td>
                    <td>
                      <span className="badge badge-linesuccess">Active</span>
                    </td>
                    <td className="action-table-data">
                      <div className="edit-delete-action">
                        <Link
                          className="me-2 edit-icon p-2"
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit-units"
                        >
                          <i data-feather="eye" className="feather-eye" />
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
                    <td>Determined</td>
                    <td>
                      <div className="userimgname">
                        <Link to="#" className="product-img">
                          <ImageWithBasePath
                            src="assets/img/users/user-04.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Gravely</Link>
                      </div>
                    </td>
                    <td>+1 63728 3467</td>
                    <td>04</td>
                    <td>60</td>
                    <td>300</td>
                    <td>18 Sep 2023</td>
                    <td>
                      <span className="badge badge-linesuccess">Active</span>
                    </td>
                    <td className="action-table-data">
                      <div className="edit-delete-action">
                        <Link
                          className="me-2 edit-icon p-2"
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit-units"
                        >
                          <i data-feather="eye" className="feather-eye" />
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
                    <td>Sincere</td>
                    <td>
                      <div className="userimgname">
                        <Link to="#" className="product-img">
                          <ImageWithBasePath
                            src="assets/img/users/user-09.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Kevin</Link>
                      </div>
                    </td>
                    <td>+1 95628 1036</td>
                    <td>04</td>
                    <td>26</td>
                    <td>250</td>
                    <td>05 Oct 2023</td>
                    <td>
                      <span className="badge badge-linesuccess">Active</span>
                    </td>
                    <td className="action-table-data">
                      <div className="edit-delete-action">
                        <Link
                          className="me-2 edit-icon p-2"
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit-units"
                        >
                          <i data-feather="eye" className="feather-eye" />
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
                    <td>Pretty</td>
                    <td>
                      <div className="userimgname">
                        <Link to="#" className="product-img">
                          <ImageWithBasePath
                            src="assets/img/users/user-10.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Grillo</Link>
                      </div>
                    </td>
                    <td>+1 65730 1603</td>
                    <td>04</td>
                    <td>47</td>
                    <td>400</td>
                    <td>21 Nov 2023</td>
                    <td>
                      <span className="badge badge-linesuccess">Active</span>
                    </td>
                    <td className="action-table-data">
                      <div className="edit-delete-action">
                        <Link
                          className="me-2 edit-icon p-2"
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit-units"
                        >
                          <i data-feather="eye" className="feather-eye" />
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
                          <i
                            data-feather="trash-2"
                            className="feather-trash-2"
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

      <div>
        {/* Add Warehouse */}
        <div className="modal fade" id="add-units">
          <div className="modal-dialog modal-dialog-centered custom-modal-two">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header border-0 custom-modal-header">
                    <div className="page-title">
                      <h4>Add Warehouse</h4>
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
                      <div className="modal-title-head">
                        <h6>
                          <span>
                            <i data-feather="info" className="feather-edit" />
                          </span>
                          Warehouse Info
                        </h6>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-blocks">
                            <label>Contact Person</label>
                            <Select className="select" options={options1} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3 war-add">
                            <label className="mb-2">Phone Number</label>
                            <input
                              className="form-control"
                              id="phone"
                              name="phone"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Work Phone</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" />
                          </div>
                        </div>
                        <div className="modal-title-head">
                          <h6>
                            <span>
                              <i data-feather="map-pin" />
                            </span>
                            Location
                          </h6>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Address 1</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Address 2</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-blocks">
                            <label>Country</label>
                            <Select className="select" options={options2} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3 mb-0">
                            <label className="form-label">City</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3 mb-0">
                            <label className="form-label">Zipcode</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
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
                          Create Warehouse
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Warehouse */}
        {/* Edit Warehouse */}
        <div className="modal fade" id="edit-units">
          <div className="modal-dialog modal-dialog-centered custom-modal-two">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header border-0 custom-modal-header">
                    <div className="page-title">
                      <h4>Edit Warehouse</h4>
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
                      <div className="modal-title-head">
                        <h6>
                          <span>
                            <i data-feather="info" className="feather-edit" />
                          </span>
                          Warehouse Info
                        </h6>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Legendary"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-blocks">
                            <label>Contact Person</label>
                            <Select className="select" options={options1} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3 war-edit-phone">
                            <label className="mb-2">Phone Number</label>
                            <input
                              className="form-control"
                              id="phone2"
                              name="phone"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3 war-edit-phone">
                            <label className="form-label">Work Phone</label>
                            <input
                              className="form-control"
                              id="phone3"
                              name="phone"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              defaultValue="stevenlegendary@example.com"
                            />
                          </div>
                        </div>
                        <div className="modal-title-head">
                          <h6>
                            <span>
                              <i data-feather="map-pin" />
                            </span>
                            Location
                          </h6>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Address 1</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Admiral Street"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-blocks">
                            <label className="form-label">Address 2</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Aire Street"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-blocks">
                            <label>Country</label>
                            <Select className="select" options={options2} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="East England"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3 mb-0">
                            <label className="form-label">City</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Leeds"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3 mb-0">
                            <label className="form-label">Zipcode</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="LS1"
                            />
                          </div>
                        </div>
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
      </div>
    </div>
  );
};

export default WareHouses;
