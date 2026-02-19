import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import {
  ChevronUp,
  Filter,
  RotateCcw,
  Sliders,
  StopCircle,
} from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { DatePicker } from "antd";

const PurchaseOrderReport = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const oldandlatestvalue = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];
  const suppliers = [
    { value: "chooseSupplier", label: "Choose Supplier" },
    { value: "suppliers", label: "Suppliers" },
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
  );
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Purchase order report</h4>
                <h6>Manage your Purchase order report</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                  <Link>
                    <ImageWithBasePath
                      src="assets/img/icons/pdf.svg"
                      alt="img"
                    />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <ImageWithBasePath
                      src="assets/img/icons/excel.svg"
                      alt="img"
                    />
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
                    onClick={() => {
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
          {/* /product list */}
          <div className="card">
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
                        <div className="input-groupicon">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            type="date"
                            className="filterdatepicker"
                            dateFormat="dd-MM-yyyy"
                            placeholder="Choose Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <div className="input-groupicon">
                          <DatePicker
                            selected={selectedDate1}
                            onChange={handleDateChange1}
                            type="date"
                            className="filterdatepicker"
                            dateFormat="dd-MM-yyyy"
                            placeholder="Choose Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <StopCircle className="info-img" />
                        <Select
                          options={suppliers}
                          className="select"
                          placeholder="Choose Supplier"
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
                <table className="table datanew">
                  <thead>
                    <tr>
                      <th className="no-sort">
                        <label className="checkboxs">
                          <input type="checkbox" id="select-all" />
                          <span className="checkmarks" />
                        </label>
                      </th>
                      <th>Product Name</th>
                      <th>Purchased amount</th>
                      <th>Purchased QTY</th>
                      <th>Instock QTY</th>
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
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product1.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Macbook pro</Link>
                      </td>
                      <td>38698.00</td>
                      <td>1248</td>
                      <td>1356</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product2.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Orange</Link>
                      </td>
                      <td>36080.00</td>
                      <td>110</td>
                      <td>131</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product3.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Pineapple</Link>
                      </td>
                      <td>21000.00</td>
                      <td>106</td>
                      <td>131</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product4.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Strawberry</Link>
                      </td>
                      <td>11000.00</td>
                      <td>105</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product5.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Sunglasses</Link>
                      </td>
                      <td>10600.00</td>
                      <td>105</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product6.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Unpaired gray</Link>
                      </td>
                      <td>9984.00</td>
                      <td>50</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product7.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Avocat</Link>
                      </td>
                      <td>4500.00 </td>
                      <td>41</td>
                      <td>29</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product8.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Banana</Link>
                      </td>
                      <td>900.00 </td>
                      <td>28</td>
                      <td>24</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product9.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Earphones</Link>
                      </td>
                      <td>500.00</td>
                      <td>20</td>
                      <td>11</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product8.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Banana</Link>
                      </td>
                      <td>900.00 </td>
                      <td>28</td>
                      <td>24</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td className="productimgname">
                        <Link className="product-img">
                          <ImageWithBasePath
                            src="assets/img/products/product9.jpg"
                            alt="product"
                          />
                        </Link>
                        <Link to="#">Earphones</Link>
                      </td>
                      <td>500.00</td>
                      <td>20</td>
                      <td>11</td>
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
  );
};

export default PurchaseOrderReport;
