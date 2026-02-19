import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { ChevronUp, RotateCcw, Printer } from "feather-icons-react/build/IconComponents";
import Table from "../../core/pagination/datatable";
import { setToogleHeader } from "../../core/redux/action";
import EditLowStock from "../../core/modals/inventory/editlowstock";
import { fetchProducts } from "../Api/productApi";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const LowStock = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products for filtering
  const [searchQueryLow, setSearchQueryLow] = useState("");
  const [searchQueryOut, setSearchQueryOut] = useState("");
  const [activeTab, setActiveTab] = useState("low");
  const [isLoading, setIsLoading] = useState(true);
  const tillName = localStorage.getItem("tillName");

  const MySwal = withReactContent(Swal);

  const loadProductsData = async (isInitial = false) => {
    try {
      if (isInitial) {
        setIsLoading(true);
      }
      const products = await fetchProducts();
      if (Array.isArray(products)) {
        const reversedProducts = products.reverse();
        const filteredProducts = reversedProducts.filter(
          (product) =>
            !product.barcode ||
            isNaN(product.barcode) ||
            product.barcode.length >= 5
        );
        setAllProducts(filteredProducts); // Store all filtered products
        const lowStock = filteredProducts.filter(
          (product) =>
            product.isActive === true &&
            product.quantity < product.lowStock &&
            product.quantity > 0
        );
        setLowStockProducts(lowStock);
        const outOfStock = filteredProducts.filter(
          (product) => product.isActive === true && product.quantity === 0
        );
        setOutOfStockProducts(outOfStock);
      } else {
        setAllProducts([]);
        setLowStockProducts([]);
        setOutOfStockProducts([]);
        MySwal.fire({
          title: "Warning!",
          text: "No product data received from the server.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "Failed to fetch products: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      if (isInitial) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadProductsData(true);
  }, []);

  const handleSearchChangeLow = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQueryLow(query);

    if (query.trim() !== "") {
      const filteredLowStock = allProducts.filter(
        (product) =>
          product.isActive === true &&
          product.quantity < product.lowStock &&
          product.quantity > 0 &&
          ((product.name && product.name.toLowerCase().includes(query)) ||
            (product.barcode &&
              product.barcode.toLowerCase().includes(query)) ||
            (product.productCategoryDto?.productCategoryName &&
              product.productCategoryDto.productCategoryName
                .toLowerCase()
                .includes(query)))
      );
      setLowStockProducts(filteredLowStock);
    } else {
      const lowStock = allProducts.filter(
        (product) =>
          product.isActive === true &&
          product.quantity < product.lowStock &&
          product.quantity > 0
      );
      setLowStockProducts(lowStock);
    }
  };

  const handleSearchChangeOut = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQueryOut(query);

    if (query.trim() !== "") {
      const filteredOutOfStock = allProducts.filter(
        (product) =>
          product.isActive === true &&
          product.quantity === 0 &&
          ((product.name && product.name.toLowerCase().includes(query)) ||
            (product.barcode &&
              product.barcode.toLowerCase().includes(query)) ||
            (product.productCategoryDto?.productCategoryName &&
              product.productCategoryDto.productCategoryName
                .toLowerCase()
                .includes(query)))
      );
      setOutOfStockProducts(filteredOutOfStock);
    } else {
      const outOfStock = allProducts.filter(
        (product) => product.isActive === true && product.quantity === 0
      );
      setOutOfStockProducts(outOfStock);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
  const renderPrintTooltip = (props) => (
    <Tooltip id="print-tooltip" {...props}>
      Print
    </Tooltip>
  );

  const exportToPDF = () => {
    const data = activeTab === "low" ? lowStockProducts : outOfStockProducts;
    const title = activeTab === "low" ? "Low Stocks" : "Out of Stocks";
    try {
      if (!data || data.length === 0) {
        MySwal.fire({
          title: "No Data",
          text: "There are no products to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const doc = new jsPDF();
      doc.text(title, 14, 15);

      const tableColumn = [
        "Product Name",
        "Bar Code",
        "Category",
        "Tax %",
        "Purchase Price",
        "Price/Unit",
        "Qty",
        "Low Stock",
      ];
      const tableRows = data.map((product) => [
        product.name || "",
        product.barcode || "",
        product.productCategoryDto?.productCategoryName || "N/A",
        product.taxDto?.taxPercentage
          ? `${product.taxDto.taxPercentage}%`
          : "N/A",
        product.purchasePrice?.toFixed(2) || "0.00",
        product.pricePerUnit?.toFixed(2) || "0.00",
        product.quantity?.toString() || "0",
        product.lowStock?.toString() || "0",
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: "grid",
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });

      doc.save(`${title.toLowerCase().replace(" ", "_")}.pdf`);
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "Failed to generate PDF: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const exportToExcel = () => {
    const data = activeTab === "low" ? lowStockProducts : outOfStockProducts;
    const title = activeTab === "low" ? "Low Stocks" : "Out of Stocks";
    try {
      if (!data || data.length === 0) {
        MySwal.fire({
          title: "No Data",
          text: "There are no products to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const worksheetData = data.map((product) => ({
        "Product Name": product.name || "",
        "Bar Code": product.barcode || "",
        Category: product.productCategoryDto?.productCategoryName || "N/A",
        "Tax Percentage": product.taxDto?.taxPercentage
          ? `${product.taxDto.taxPercentage}%`
          : "N/A",
        "Purchase Price": product.purchasePrice?.toFixed(2) || "0.00",
        "Price Per Unit": product.pricePerUnit?.toFixed(2) || "0.00",
        Quantity: product.quantity || 0,
        "Low Stock": product.lowStock || 0,
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      worksheet["!cols"] = [
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 12 },
        { wch: 12 },
        { wch: 12 },
        { wch: 10 },
        { wch: 10 },
      ];

      XLSX.writeFile(workbook, `${title.toLowerCase().replace(" ", "_")}.xlsx`);
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "Failed to export to Excel: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handlePrint = () => {
    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        MySwal.fire({
          title: "Error!",
          text: "Please allow pop-ups to print the document.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const shopName = localStorage.getItem("shopName") || "Shop Name";
      const branchName = localStorage.getItem("branchName") || "Branch Name";
      const branchCode = localStorage.getItem("branchCode") || "Branch Code";
      const address = localStorage.getItem("branchAddress") || "Address";
      const contactNumber = localStorage.getItem("branchContact") || "Contact Number";
      const currentDate = new Date().toLocaleString();

      const productsToPrint = activeTab === "low" ? lowStockProducts : outOfStockProducts;
      const title = activeTab === "low" ? "Low Stock Items" : "Out of Stock Items";

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            <style>
              @page { size: 72mm auto; margin: 0; }
              body { 
                font-family: 'Courier New', monospace;
                width: 72mm;
                margin: 0 auto;
                padding: 5mm;
                font-size: 12px;
              }
              .receipt-header { text-align: center; margin-bottom: 5px; }
              .receipt-header h2 { margin: 0; font-size: 14px; }
              .receipt-details p { margin: 2px 0; }
              .receipt-items { 
                width: 100%; 
                border-collapse: collapse; 
                margin-bottom: 5px; 
                margin-left: auto; 
                margin-right: auto; 
              }
              .receipt-items th, .receipt-items td { 
                padding: 2px 0; 
                font-weight: bold; 
                text-align: left; 
                font-size: 12px; 
              }
              .receipt-items th { border-bottom: 1px dashed #000; }
              .receipt-footer { text-align: center; margin-top: 5px; }
              .receipt-footer p { margin: 2px 0; }
              .divider { border-top: 1px dashed #000; margin: 5px 0; }
              .spacing { height: 10px; }
            </style>
          </head>
          <body>
            <div class="receipt-header">
              <h2>${shopName}</h2>
              <p>${branchName}</p>
              <p>Branch Code: ${branchCode}</p>
              <p>Address: ${address}</p>
              <p>Contact: ${contactNumber}</p>
            </div>
            <div class="receipt-details">
              <p>Date: ${currentDate}</p>
              <p>Till Name: ${tillName}</p>
              <p>${title}</p>
            </div>
            <div class="divider"></div>
            <table class="receipt-items">
              <thead>
                <tr>
                  <th>Barcode</th>
                  <th>Product Name</th>
                </tr>
              </thead>
              <tbody>
                ${productsToPrint.map(product => `
                  <tr>
                    <td>${product.barcode || ""}</td>
                    <td>${product.name || "Unknown Product"}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="divider"></div>
            <div class="receipt-details">
              <p>Total Items: ${productsToPrint.length}</p>
            </div>
            <div class="divider"></div>
            <div class="receipt-footer">
              <p>Thank You!</p>
              <div class="spacing"></div>
              <p>Powered by Delta POS</p>
              <p>(deltapos.codearson@gmail.com)</p>
              <p>(0094762963979)</p>
              <p>================================================</p>
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 500);
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "Failed to print: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Bar Code",
      dataIndex: "barcode",
      sorter: (a, b) => a.barcode.length - b.barcode.length,
    },
    {
      title: "Category",
      dataIndex: "productCategoryDto",
      render: (productCategoryDto) =>
        productCategoryDto?.productCategoryName || "N/A",
      sorter: (a, b) =>
        (a.productCategoryDto?.productCategoryName || "").localeCompare(
          b.productCategoryDto?.productCategoryName || ""
        ),
    },
    {
      title: "Tax Percentage",
      dataIndex: "taxDto",
      render: (taxDto) => (taxDto ? `${taxDto.taxPercentage}%` : "N/A"),
      sorter: (a, b) =>
        (a.taxDto?.taxPercentage || 0) - (b.taxDto?.taxPercentage || 0),
    },
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      render: (purchasePrice) => `${purchasePrice.toFixed(2)}`,
      sorter: (a, b) => a.purchasePrice - b.purchasePrice,
    },
    {
      title: "Price Per Unit",
      dataIndex: "pricePerUnit",
      render: (pricePerUnit) => `${pricePerUnit.toFixed(2)}`,
      sorter: (a, b) => a.pricePerUnit - b.pricePerUnit,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Low Stock",
      dataIndex: "lowStock",
      sorter: (a, b) => a.lowStock - b.lowStock,
    },
  ];

  if (isLoading) {
    return (
      <div className="page-wrapper">
        {/* You can add a loading spinner or message here if desired */}
      </div>
    );
  }

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title me-auto">
              <h4>
                {activeTab === "low" ? "Low Stocks" : "Out of Stocks"}
              </h4>
              <h6>
                {activeTab === "low"
                  ? "Manage your low stocks"
                  : "Manage your out of stocks"}
              </h6>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderPrintTooltip}>
                  <Link onClick={handlePrint}>
                    <Printer />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                  <Link onClick={exportToPDF}>
                    <ImageWithBasePath
                      src="assets/img/icons/pdf.svg"
                      alt="img"
                    />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                  <Link onClick={exportToExcel}>
                    <ImageWithBasePath
                      src="assets/img/icons/excel.svg"
                      alt="img"
                    />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link onClick={() => loadProductsData(false)}>
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={() => dispatch(setToogleHeader(!data))}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
          <div className="table-tab">
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  onClick={() => handleTabChange("low")}
                >
                  Low Stocks
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  onClick={() => handleTabChange("out")}
                >
                  Out of Stocks
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              {/* Low Stocks Tab */}
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="card table-list-card">
                  <div className="card-body">
                    <div className="table-top">
                      <div className="search-set">
                        <div className="search-input">
                          <input
                            type="text"
                            placeholder="Search"
                            className="form-control form-control-sm formsearch"
                            value={searchQueryLow}
                            onChange={handleSearchChangeLow}
                          />
                          <Link to="#" className="btn btn-searchset">
                            <i
                              data-feather="search"
                              className="feather-search"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table columns={columns} dataSource={lowStockProducts} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Out of Stocks Tab */}
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="card table-list-card">
                  <div className="card-body">
                    <div className="table-top">
                      <div className="search-set">
                        <div className="search-input">
                          <input
                            type="text"
                            placeholder="Search"
                            className="form-control form-control-sm formsearch"
                            value={searchQueryOut}
                            onChange={handleSearchChangeOut}
                          />
                          <Link to="#" className="btn btn-searchset">
                            <i
                              data-feather="search"
                              className="feather-search"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table
                        columns={columns}
                        dataSource={outOfStockProducts}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditLowStock />
    </div>
  );
};

export default LowStock;