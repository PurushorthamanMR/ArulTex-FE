import React, { useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Filter, Sliders } from "react-feather";
import Select from "react-select";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Box, Calendar, StopCircle, User, FileText } from "react-feather";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Breadcrumbs from "../../core/breadcrumbs";

const SupplierReport = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isFilterVisibleTwo, setIsFilterVisibleTwo] = useState(false);
  const [isFilterVisibleThree, setisFilterVisibleThree] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const toggleFilterVisibilityTwo = () => {
    setIsFilterVisibleTwo((prevVisibilityTwo) => !prevVisibilityTwo);
  };

  const toggleFilterVisibilityThree = () => {
    setisFilterVisibleThree((prevVisibilityThree) => !prevVisibilityThree);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  const optionsThree = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  const optionsTwo = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  const productOptions = [
    { value: "chooseProduct", label: "Choose Product" },
    { value: "appleSeries5Watch", label: "Apple Series 5 Watch" },
    { value: "amazonEchoDot", label: "Amazon Echo Dot" },
  ];

  const statusOptions = [
    { value: "chooseStatus", label: "Choose Status" },
    { value: "received", label: "Received" },
  ];

  const supplierNameOptions = [
    { value: "chooseSupplierName", label: "Choose Supplier Name" },
    { value: "apexComputers", label: "Apex Computers" },
    { value: "beatsHeadphones", label: "Beats Headphones" },
  ];

  const nameOptions = [
    { value: "chooseName", label: "Choose Name" },
    { value: "apexComputers", label: "Apex Computers" },
    { value: "beatsHeadphones", label: "Beats Headphones" },
  ];

  const statusOptions2 = [
    { value: "chooseStatus", label: "Choose Status" },
    { value: "completed", label: "Completed" },
    { value: "incompleted", label: "Incompleted" },
  ];

  const paymentStatusOptions = [
    { value: "choosePaymentStatus", label: "Choose Payment Status" },
    { value: "paid", label: "Paid" },
    { value: "unpaid", label: "Unpaid" },
    { value: "overdue", label: "Overdue" },
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
          maintitle="Supplier Report"
          subtitle="Manage Your Supplier Report"
        />
        <div className="table-tab">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="purchase-report-tab"
                data-bs-toggle="pill"
                data-bs-target="#purchase-report"
                type="button"
                role="tab"
                aria-controls="purchase-report"
                aria-selected="true"
              >
                Purchase
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="payment-report-tab"
                data-bs-toggle="pill"
                data-bs-target="#payment-report"
                type="button"
                role="tab"
                aria-controls="payment-report"
                aria-selected="false"
              >
                Payment
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="return-report-tab"
                data-bs-toggle="pill"
                data-bs-target="#return-report"
                type="button"
                role="tab"
                aria-controls="return-report"
                aria-selected="false"
              >
                Return
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="purchase-report"
              role="tabpanel"
              aria-labelledby="purchase-report-tab"
            >
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
                        options={optionsTwo}
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
                            <Box className="info-img" />
                            <Select
                              className="select"
                              options={productOptions}
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 col-sm-6 col-12">
                          <div className="input-blocks">
                            <StopCircle className="info-img" />
                            <Select
                              className="select"
                              options={statusOptions}
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 col-sm-6 col-12">
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
                        <div className="col-lg-6 col-sm-6 col-12 ms-auto">
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
                          <th>Purchase Date</th>
                          <th>Product</th>
                          <th>Purchase Amount</th>
                          <th>Purchase Qty</th>
                          <th>Paid</th>
                          <th>Balance</th>
                          <th>Status</th>
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
                          <td>19 Jan 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/stock-img-01.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Lenovo 3rd Generation</Link>
                          </td>
                          <td>$1500</td>
                          <td>50</td>
                          <td>$1500</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>24 Jan 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/stock-img-06.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Bold V3.2</Link>
                          </td>
                          <td>$1200</td>
                          <td>20</td>
                          <td>$1200</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>03 Feb 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/stock-img-02.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Nike Jordan</Link>
                          </td>
                          <td>$2000</td>
                          <td>30</td>
                          <td>$2000</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>15 Feb 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/stock-img-03.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Apple Series 5 Watch</Link>
                          </td>
                          <td>$800</td>
                          <td>80</td>
                          <td>$800</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>12 Mar 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/stock-img-04.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Amazon Echo Dot</Link>
                          </td>
                          <td>$500</td>
                          <td>70</td>
                          <td>$500</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>25 Mar 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/stock-img-05.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Lobar Handy</Link>
                          </td>
                          <td>$400</td>
                          <td>100</td>
                          <td>$400</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>02 Apr 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/expire-product-01.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Red Premium Handy</Link>
                          </td>
                          <td>$300</td>
                          <td>120</td>
                          <td>$300</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>19 Apr 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/expire-product-02.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Iphone 14 Pro</Link>
                          </td>
                          <td>$1800</td>
                          <td>40</td>
                          <td>$1800</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>11 May 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/expire-product-03.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Black Slim 200</Link>
                          </td>
                          <td>$700</td>
                          <td>300</td>
                          <td>$700</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>27 May 2023</td>
                          <td className="productimgname">
                            <div className="view-product me-2">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/products/expire-product-04.png"
                                  alt="product"
                                />
                              </Link>
                            </div>
                            <Link to="#">Woodcraft Sandal</Link>
                          </td>
                          <td>$600</td>
                          <td>200</td>
                          <td>$600</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Received
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* /product list */}
            </div>
            <div
              className="tab-pane fade"
              id="payment-report"
              role="tabpanel"
              aria-labelledby="payment-report-tab"
            >
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
                        options={optionsThree}
                        placeholder="Sort by Date"
                      />
                    </div>
                  </div>
                  {/* /Filter */}
                  <div
                    className={`card${isFilterVisibleTwo ? " visible" : ""}`}
                    id="filter_inputs1"
                    style={{ display: isFilterVisibleTwo ? "block" : "none" }}
                  >
                    <div className="card-body pb-0">
                      <div className="row">
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <User className="info-img" />
                            <Select
                              className="select"
                              options={supplierNameOptions}
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
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Choose Date"
                                className="datetimepicker"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <FileText className="info-img" />
                            <input type="text" placeholder="Enter Reference" />
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
                              <input type="checkbox" id="select-all2" />
                              <span className="checkmarks" />
                            </label>
                          </th>
                          <th>Date</th>
                          <th>Purchase</th>
                          <th>Reference</th>
                          <th>Supplier Name</th>
                          <th>Amount</th>
                          <th>Paid</th>
                          <th>Paid By</th>
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
                          <td>19 Jan 2023</td>
                          <td>PR_0001</td>
                          <td>INV/PR_0001</td>
                          <td>Apex Computers</td>
                          <td>$1800</td>
                          <td>$1800</td>
                          <td>Cash</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>24 Jan 2023</td>
                          <td>PR_0002</td>
                          <td>INV/PR_0002</td>
                          <td>Beats Headphones</td>
                          <td>$1100</td>
                          <td>$1100</td>
                          <td>Cash</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>02 Feb 2023</td>
                          <td>PR_0003</td>
                          <td>INV/PR_0003</td>
                          <td>Dazzle Shoes</td>
                          <td>$2000</td>
                          <td>$2000</td>
                          <td>Cash</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>15 Feb 2023</td>
                          <td>PR_0004</td>
                          <td>INV/PR_0004</td>
                          <td>Best Accessories</td>
                          <td>$700</td>
                          <td>$700</td>
                          <td>Cash</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>12 Mar 2023</td>
                          <td>PR_0005</td>
                          <td>INV/PR_0005</td>
                          <td>Aesthetic Bags</td>
                          <td>$500</td>
                          <td>$500</td>
                          <td>Cash</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>26 Mar 2023</td>
                          <td>PR_0006</td>
                          <td>INV/PR_0006</td>
                          <td>Hatimi Hardwares</td>
                          <td>$1600</td>
                          <td>$1600</td>
                          <td>Cash</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>16 Apr 2023</td>
                          <td>PR_0007</td>
                          <td>INV/PR_0007</td>
                          <td>Shine Bags</td>
                          <td>$600</td>
                          <td>$600</td>
                          <td>Cash</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>24 Apr 2023</td>
                          <td>PR_0008</td>
                          <td>INV/PR_0008</td>
                          <td>Alpha Mobiles</td>
                          <td>$120</td>
                          <td>$120</td>
                          <td>Cash</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>13 May 2023</td>
                          <td>PR_0009</td>
                          <td>INV/PR_0009</td>
                          <td>Sigma Chairs</td>
                          <td>$300</td>
                          <td>$300</td>
                          <td>Cash</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>29 May 2023</td>
                          <td>PR_0010</td>
                          <td>INV/PR_0011</td>
                          <td>Zenith Bags</td>
                          <td>$350</td>
                          <td>$350</td>
                          <td>Cash</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* /product list */}
            </div>
            <div
              className="tab-pane fade"
              id="return-report"
              role="tabpanel"
              aria-labelledby="return-report-tab"
            >
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
                          isFilterVisibleThree ? "setclose" : ""
                        }`}
                        id="filter_search"
                      >
                        <Filter
                          className="filter-icon"
                          onClick={toggleFilterVisibilityThree}
                        />
                        <span onClick={toggleFilterVisibilityThree}>
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
                        options={options}
                        placeholder="Sort by Date"
                      />
                    </div>
                  </div>
                  {/* /Filter */}
                  <div
                    className={`card${isFilterVisibleThree ? " visible" : ""}`}
                    id="filter_inputs2"
                    style={{ display: isFilterVisibleThree ? "block" : "none" }}
                  >
                    <div className="card-body pb-0">
                      <div className="row">
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <User className="info-img" />
                            <Select className="select" options={nameOptions} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <StopCircle className="info-img" />
                            <Select
                              className="select"
                              options={statusOptions2}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <ImageWithBasePath
                              src="assets/img/icons/payment-status.svg"
                              className="info-img status-icon"
                              alt="Icon"
                            />
                            <Select
                              className="select"
                              options={paymentStatusOptions}
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
                              <input type="checkbox" id="select-all3" />
                              <span className="checkmarks" />
                            </label>
                          </th>
                          <th>Reference</th>
                          <th>Supplier Name</th>
                          <th>Amount</th>
                          <th>Paid</th>
                          <th>Due Amount</th>
                          <th>Status</th>
                          <th>Payment Status</th>
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
                          <td>PR0001</td>
                          <td>Apex Computers</td>
                          <td>$1800</td>
                          <td>$1800</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badge-linesuccess">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>PR0002</td>
                          <td>Beats Headphones</td>
                          <td>$1200</td>
                          <td>$0.00</td>
                          <td>$1200</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-linedanger">
                              Unpaid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>PR0003</td>
                          <td>Dazzle Shoes</td>
                          <td>$2000</td>
                          <td>$2000</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badge-linesuccess">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>PR0004</td>
                          <td>Best Accessories</td>
                          <td>$1300</td>
                          <td>$1300</td>
                          <td>$1300</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badges-warning">Overdue</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>PR0005</td>
                          <td>Aesthetic Bags</td>
                          <td>$400</td>
                          <td>$0.00</td>
                          <td>$400</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-linedanger">
                              Unpaid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>PR0006</td>
                          <td>Hatimi Hardwares</td>
                          <td>$700</td>
                          <td>$700</td>
                          <td>$700</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badges-warning">Overdue</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>PR0007</td>
                          <td>Shine Bags</td>
                          <td>$800</td>
                          <td>$800</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badge-linesuccess">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>PR0008</td>
                          <td>Alpha Mobiles</td>
                          <td>$300</td>
                          <td>$300</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badge-linesuccess">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>PR0009</td>
                          <td>Sigma Chairs</td>
                          <td>$120</td>
                          <td>$120</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badge-linesuccess">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>PR0010</td>
                          <td>Zenith Bags</td>
                          <td>$600</td>
                          <td>$600</td>
                          <td>$0.00</td>
                          <td>
                            <span className="badges status-badge">
                              Completed
                            </span>
                          </td>
                          <td>
                            <span className="badge-linesuccess">Paid</span>
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
        </div>
      </div>
    </div>
  );
};

export default SupplierReport;
