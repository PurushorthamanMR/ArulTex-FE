import React, { useState } from "react";
import { Filter, Sliders } from "react-feather";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import Select from "react-select";
import { Zap } from "react-feather/dist";
import { CreditCard } from "feather-icons-react/build/IconComponents";
import { Calendar } from "react-feather";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Breadcrumbs from "../../core/breadcrumbs";

const TaxReport = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isFilterVisibleTwo, setIsFilterVisibleTwo] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const toggleFilterVisibilityTwo = () => {
    setIsFilterVisibleTwo((prevVisibilityTwo) => !prevVisibilityTwo);
  };

  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  const optionsTwo = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  const optionsCategory = [{ value: "Computers", label: "Computers" }];

  const optionsPaymentMethod = [
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
        <Breadcrumbs maintitle="Tax Report" subtitle="Manage Your Tax Report" />
        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            <div className="tabs-set">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="purchase-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#purchase2"
                    type="button"
                    role="tab"
                    aria-controls="purchase2"
                    aria-selected="true"
                  >
                    Purchase Tax Report
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="sales-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#sales2"
                    type="button"
                    role="tab"
                    aria-controls="sales2"
                    aria-selected="false"
                  >
                    Sales Tax Report
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="purchase2"
                  role="tabpanel"
                  aria-labelledby="purchase-tab"
                >
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
                        <div className="col-lg-2 col-sm-6 col-12">
                          <div className="input-blocks">
                            <Zap className="info-img" />
                            <Select
                              className="select"
                              options={optionsCategory}
                              placeholder="Choose Category"
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 col-sm-6 col-12">
                          <div className="input-blocks">
                            <CreditCard className="info-img" />
                            <Select
                              className="select"
                              options={optionsPaymentMethod}
                              placeholder="Payment Method"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <div className="position-relative daterange-wraper">
                              <Calendar className="feather-14 info-img" />

                              <DateRangePicker
                                initialSettings={initialSettings}
                              >
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
                          <th>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </th>
                          <th>Supplier</th>
                          <th>Date</th>
                          <th>Ref No</th>
                          <th>Total Amount</th>
                          <th>Payment Method</th>
                          <th>Discount</th>
                          <th>Tax Amount</th>
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
                          <td>Lavi</td>
                          <td>12 Jul 2023</td>
                          <td className="ref-number">#4237300</td>
                          <td>$30,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/pay.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>10</td>
                          <td>$457</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>Anthony</td>
                          <td>18 Aug 2023</td>
                          <td className="ref-number">#5628954</td>
                          <td>$45,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/stripe.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>12</td>
                          <td>$265</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>Colleen</td>
                          <td>27 Aug 2023</td>
                          <td className="ref-number">#8745239</td>
                          <td>$26,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/razorpay.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>08</td>
                          <td>$980</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>Victor</td>
                          <td>05 Sep 2023</td>
                          <td className="ref-number">#9814586</td>
                          <td>$18,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/pay.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>15</td>
                          <td>$561</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>Tracy</td>
                          <td>23 Sep 2023</td>
                          <td className="ref-number">#7590325</td>
                          <td>$52,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/pay.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>20</td>
                          <td>$382</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="sales2"
                  role="tabpanel"
                  aria-labelledby="sales-tab"
                >
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
                          isFilterVisibleTwo ? "setclose" : ""
                        }`}
                        id="filter_search"
                      >
                        <Filter
                          className="filter-icon"
                          onClick={toggleFilterVisibilityTwo}
                        />
                        <span onClick={toggleFilterVisibilityTwo}>
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
                        className="select"
                        options={optionsTwo}
                        placeholder="Sort by Date"
                      />
                    </div>
                  </div>
                  {/* /Filter */}
                  <div
                    className={`card${isFilterVisibleTwo ? " visible" : ""}`}
                    id="filter_inputs2"
                    style={{ display: isFilterVisibleTwo ? "block" : "none" }}
                  >
                    <div className="card-body pb-0">
                      <div className="row">
                        <div className="col-lg-2 col-sm-6 col-12">
                          <div className="input-blocks">
                            <Zap className="info-img" />
                            <Select
                              className="select"
                              options={optionsCategory}
                              placeholder="Choose Category"
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 col-sm-6 col-12">
                          <div className="input-blocks">
                            <CreditCard className="info-img" />
                            <Select
                              className="select"
                              options={optionsPaymentMethod}
                              placeholder="Payment Method"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <div className="position-relative daterange-wraper">
                              <Calendar className="feather-14 info-img" />

                              <DateRangePicker
                                initialSettings={initialSettings}
                              >
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
                          <th>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Invoice Number</th>
                          <th>Total Amount</th>
                          <th>Payment Method</th>
                          <th>Discount</th>
                          <th>Tax Amount</th>
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
                          <td className="userimgname">
                            <Link to="#" className="product-img">
                              <ImageWithBasePath
                                src="assets/img/users/user-01.jpg"
                                alt="product"
                              />
                            </Link>
                            <Link to="#">Mitchum Daniel</Link>
                          </td>
                          <td>12 Jul 2023</td>
                          <td className="ref-number">INV4237300</td>
                          <td>$30,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/pay.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>10</td>
                          <td>$457</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td className="userimgname">
                            <Link to="#" className="product-img">
                              <ImageWithBasePath
                                src="assets/img/users/user-02.jpg"
                                alt="product"
                              />
                            </Link>
                            <Link to="#">Susan Lopez</Link>
                          </td>
                          <td>04 Aug 2023</td>
                          <td className="ref-number">INV5385083</td>
                          <td>$27,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/stripe.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>08</td>
                          <td>$382</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td className="userimgname">
                            <Link to="#" className="product-img">
                              <ImageWithBasePath
                                src="assets/img/users/user-03.jpg"
                                alt="product"
                              />
                            </Link>
                            <Link to="#">Robert</Link>
                          </td>
                          <td>25 Aug 2023</td>
                          <td className="ref-number">INV7609368</td>
                          <td>$45,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/razorpay.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>15</td>
                          <td>$649</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td className="userimgname">
                            <Link to="#" className="product-img">
                              <ImageWithBasePath
                                src="assets/img/users/user-04.jpg"
                                alt="product"
                              />
                            </Link>
                            <Link to="#">Russell Belle</Link>
                          </td>
                          <td>16 Sep 2023</td>
                          <td className="ref-number">INV2750916</td>
                          <td>$18,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/pay.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>12</td>
                          <td>$104</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td className="userimgname">
                            <Link to="#" className="product-img">
                              <ImageWithBasePath
                                src="assets/img/users/user-05.jpg"
                                alt="product"
                              />
                            </Link>
                            <Link to="#">Edward Muniz</Link>
                          </td>
                          <td>28 Oct 2023</td>
                          <td className="ref-number">INV3478305</td>
                          <td>$22,000</td>
                          <td className="payment-info">
                            <Link to="#">
                              {" "}
                              <ImageWithBasePath
                                src="assets/img/icons/pay.svg"
                                alt="Pay"
                              />{" "}
                            </Link>
                          </td>
                          <td>20</td>
                          <td>$290</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default TaxReport;
