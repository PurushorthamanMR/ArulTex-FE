import React, { useState } from "react";
import { Filter, Sliders } from "react-feather";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import Select from "react-select";
import { User, Zap } from "react-feather";
import { Calendar } from "react-feather";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Breadcrumbs from "../../core/breadcrumbs";

const ExpenseReport = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  const optionsCategory = [{ value: "Computers", label: "Computers" }];

  const optionsCreatedBy = [
    { value: "Complete", label: "Complete" },
    { value: "Inprogress", label: "Inprogress" },
  ];

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
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Expenses Report"
          subtitle="Manage Your Expenses Report"
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
                      <Zap className="info-img" />
                      <Select
                        className="select"
                        options={optionsCategory}
                        placeholder="Choose Category"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <User className="info-img" />
                      <Select
                        className="select"
                        options={optionsCreatedBy}
                        placeholder="Created by"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <div className="position-relative daterange-wraper">
                        <Calendar className="feather-14 info-img" />

                        <DateRangePicker initialSettings={initialSettings}>
                          <input
                            className="form-control col-4 input-range"
                            type="text"
                            style={{ border: "none" }}
                          />
                        </DateRangePicker>
                      </div>
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
              <table className="table datanew">
                <thead>
                  <tr>
                    <th className="no-sort">
                      <label className="checkboxs">
                        <input type="checkbox" id="select-all" />
                        <span className="checkmarks" />
                      </label>
                    </th>
                    <th>Date</th>
                    <th>Expense Category</th>
                    <th>User</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className="Expense-list">
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
                    <td>01 Jan 2024</td>
                    <td>Printing</td>
                    <td className="userimgname">
                      <Link to="#" className="product-img">
                        <ImageWithBasePath
                          src="assets/img/users/user-01.jpg"
                          alt="product"
                        />
                      </Link>
                      <Link to="#">Mitchum Daniel</Link>
                    </td>
                    <td>$14,174</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
                    <td>14 Jan 2024</td>
                    <td>Utilities</td>
                    <td className="userimgname">
                      <Link to="#" className="product-img">
                        <ImageWithBasePath
                          src="assets/img/users/user-02.jpg"
                          alt="product"
                        />
                      </Link>
                      <Link to="#">Susan Lopez</Link>
                    </td>
                    <td>$19,474</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
                    <td>25 Jan 2024</td>
                    <td>Travel</td>
                    <td className="userimgname">
                      <Link to="#" className="product-img">
                        <ImageWithBasePath
                          src="assets/img/users/user-03.jpg"
                          alt="product"
                        />
                      </Link>
                      <Link to="#">Robert Grossman</Link>
                    </td>
                    <td>$20,744</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
                    <td>01 May 2024</td>
                    <td>Purchase</td>
                    <td className="userimgname">
                      <Link to="#" className="product-img">
                        <ImageWithBasePath
                          src="assets/img/users/user-04.jpg"
                          alt="product"
                        />
                      </Link>
                      <Link to="#">Russell Belle</Link>
                    </td>
                    <td>$25,474</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
                    <td>14 Oct 2024</td>
                    <td>Printing</td>
                    <td className="userimgname">
                      <Link to="#" className="product-img">
                        <ImageWithBasePath
                          src="assets/img/users/user-05.jpg"
                          alt="product"
                        />
                      </Link>
                      <Link to="#">Edward K. Muniz</Link>
                    </td>
                    <td>$12,436</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default ExpenseReport;
