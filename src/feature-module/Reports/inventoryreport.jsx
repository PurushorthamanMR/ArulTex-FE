import React, { useState } from "react";
import Breadcrumbs from "../../core/breadcrumbs";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { Filter, Sliders, Box, Zap } from "react-feather";
import Select from "react-select";

const InventoryReport = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  const productOptions = [
    { value: "chooseProduct", label: "Choose Product" },
    { value: "boldV3.2", label: "Bold V3.2" },
    { value: "nikeJordan", label: "Nike Jordan" },
  ];

  const categoryOptions = [
    { value: "chooseCategory", label: "Choose Category" },
    { value: "accessories", label: "Accessories" },
    { value: "shoe", label: "Shoe" },
  ];
  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Inventory Report"
          subtitle="Manage Your Inventory Report"
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
                  <div className="col-lg-3">
                    <div className="input-blocks">
                      <Box className="info-img" />
                      <Select className="select" options={productOptions} />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="input-blocks">
                      <Zap className="info-img" />
                      <Select className="select" options={categoryOptions} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12">
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
                    <th>Product Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Unit</th>
                    <th>Instock Qty</th>
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
                    <td>PT001</td>
                    <td>Computers</td>
                    <td>N/D</td>
                    <td>pc</td>
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
                    <td>PT002</td>
                    <td>Accessories</td>
                    <td>N/D</td>
                    <td>pc</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
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
                    <td>PT003</td>
                    <td>Shoe</td>
                    <td>N/D</td>
                    <td>pc</td>
                    <td>170</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
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
                    <td>PT004</td>
                    <td>Accessories</td>
                    <td>N/D</td>
                    <td>pc</td>
                    <td>120</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
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
                    <td>PT005</td>
                    <td>Accessories</td>
                    <td>N/D</td>
                    <td>pc</td>
                    <td>80</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
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
                    <td>PT006</td>
                    <td>Furnitures</td>
                    <td>N/D</td>
                    <td>pc</td>
                    <td>200</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
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
                    <td>PT007</td>
                    <td>Accessories</td>
                    <td>N/D</td>
                    <td>pc</td>
                    <td>230</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
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
                    <td>PT008</td>
                    <td>Phone</td>
                    <td>N/D</td>
                    <td>pc</td>
                    <td>370</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
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
                    <td>PT009</td>
                    <td>Furnitures</td>
                    <td>N/D</td>
                    <td>pc</td>
                    <td>260</td>
                  </tr>
                  <tr>
                    <td>
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                    </td>
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
                    <td>PT010</td>
                    <td>Bags</td>
                    <td>N/D</td>
                    <td>pc</td>
                    <td>340</td>
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

export default InventoryReport;
