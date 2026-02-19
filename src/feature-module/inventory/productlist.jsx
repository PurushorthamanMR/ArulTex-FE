import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import Brand from "../../core/modals/inventory/brand";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { all_routes } from "../../Router/all_routes";
import Select from "react-select";
import { Link } from "react-router-dom";
import Table from "../../core/pagination/datatable";
import { getAllProductsPage, updateProductStatus, getProductsByCategoryName, getProductsByTaxPercentage } from '../Api/productApi';
import { fetchProductCategories } from '../Api/ProductCategoryApi';
import { fetchTaxes } from '../Api/TaxApi';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import "../../style/scss/pages/_categorylist.scss";
import { getAllManagerToggles } from "../Api/ManagerToggle";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTax, setSelectedTax] = useState(null);
  const [showActive, setShowActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const priceSymbol = localStorage.getItem("priceSymbol") || "$";
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const MySwal = withReactContent(Swal);
  const route = all_routes;

  const loadProductsData = async () => {
    try {
      setIsLoading(true);
      
      const status = showActive ? 'true' : 'false';
      
      const response = await getAllProductsPage(currentPage, pageSize, status);
      
      if (response && response.responseDto) {
        const products = response.responseDto.payload;
        const totalRecords = response.responseDto.totalRecords;
        
        // Set the products directly without any filtering
        setAllProducts(products);
        setProducts(products);
        setTotalRecords(totalRecords);
      } else {
        setAllProducts([]);
        setProducts([]);
        setTotalRecords(0);
        
        // Only show warning if we're not on page 1
        if (currentPage > 1) {
          // Reset to page 1 and try again
          setCurrentPage(1);
          // Don't show the warning message, just silently reset to page 1
        } else {
          // Only show the warning if we're already on page 1
          Swal.fire({
            title: "Warning!",
            text: "No product data received from the server.",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      setAllProducts([]);
      setProducts([]);
      setTotalRecords(0);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch products: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      // Always hide loading state when done
      setIsLoading(false);
    }
  };

  const loadFilterOptions = async () => {
    const [categoriesData, taxesData] = await Promise.all([
      fetchProductCategories(),
      fetchTaxes()
    ]);

    // Get all products to determine which categories and taxes are in use
    const allProductsResponse = await getAllProductsPage(1, 1000, showActive ? 'true' : 'false');
    const allProducts = allProductsResponse?.responseDto?.payload || [];

    // Create sets of used category IDs and tax percentages
    const usedCategoryIds = new Set(allProducts.map(p => p.productCategoryDto?.id));
    const usedTaxPercentages = new Set(allProducts.map(p => p.taxDto?.taxPercentage));

    const formattedCategories = categoriesData
      .filter(category => 
        category.productCategoryName?.toLowerCase() !== 'custom' &&
        category.productCategoryName?.toLowerCase() !== 'non scan' &&
        usedCategoryIds.has(category.id)
      )
      .map(category => ({
        value: category.id,
        label: category.productCategoryName
      }));
    setCategories(formattedCategories);

    const formattedTaxes = taxesData
      .filter(tax => tax.isActive === true && usedTaxPercentages.has(tax.taxPercentage))
      .map(tax => ({
        value: tax.taxPercentage,
        label: `${tax.taxPercentage}%`
      }));
    setTaxes(formattedTaxes);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      await Promise.all([
        loadProductsData(),
        loadFilterOptions()
      ]);
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    // Reset to first page when changing tabs
    setCurrentPage(1);
    
    // Use setTimeout to ensure the state update has completed before loading data
    const timer = setTimeout(() => {
      loadProductsData();
    }, 0);
    
    return () => clearTimeout(timer);
  }, [showActive]);

  useEffect(() => {
    // Only load data if we're not already loading
    if (!isLoading) {
      loadProductsData();
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (!isLoading) {
      filterData(searchQuery, selectedCategory, selectedTax);
    }
  }, [searchQuery, selectedCategory, selectedTax]);

  useEffect(() => {
    const fetchTaxToggle = async () => {
      try {
        const toggles = await getAllManagerToggles();
        const taxToggle = toggles.responseDto.find(toggle => toggle.action === "Tax");
        setIsTaxEnabled(taxToggle?.isActive || false);
      } catch (error) {
        console.error('Error fetching tax toggle:', error);
        setIsTaxEnabled(false);
      }
    };
    fetchTaxToggle();
  }, []);

  const handleToggleStatus = async (productId, currentStatus) => {
    const newStatusText = currentStatus ? 'Inactive' : 'Active';
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: `Do you want to change this product to ${newStatusText}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
      try {
        const newStatus = currentStatus ? 0 : 1;
        const response = await updateProductStatus(productId, newStatus);
        if (response && response.success !== false) {
          loadProductsData();
          Swal.fire({
            title: 'Success!',
            text: `Product status changed to ${newStatusText}`,
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: response?.message || 'Failed to update product status.',
            icon: 'error',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'An unexpected error occurred.',
          icon: 'error',
        });
      }
    }
  };

  const handleFilterChange = async (selected, filterType) => {
    try {
      setIsLoading(true);
      if (filterType === 'category') {
        setSelectedCategory(selected);
        if (selected) {
          const response = await getProductsByCategoryName(currentPage, pageSize, selected.label, showActive ? 'true' : 'false');
          if (response?.responseDto) {
            setProducts(response.responseDto.payload);
            setTotalRecords(response.responseDto.totalRecords);
          }
        } else {
          await loadProductsData();
        }
      } else {
        setSelectedTax(selected);
        if (selected) {
          const response = await getProductsByTaxPercentage(currentPage, pageSize, selected.value, showActive ? 'true' : 'false');
          if (response?.responseDto) {
            setProducts(response.responseDto.payload);
            setTotalRecords(response.responseDto.totalRecords);
          }
        } else {
          await loadProductsData();
        }
      }
    } catch (error) {
      console.error('Error fetching filtered data:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch filtered products",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterData = (query) => {
    let filteredData = [...allProducts];
    
    if (query.trim() !== '') {
        filteredData = filteredData.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.barcode?.toLowerCase().includes(query.toLowerCase()) ||
            product.price?.toString().includes(query) ||
            product.quantity?.toString().includes(query) ||
            product.taxDto?.taxPercentage?.toString().includes(query) ||
            product.productCategoryDto?.productCategoryName?.toLowerCase().includes(query)
        );
    }

    setProducts(filteredData);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterData(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Product List", 14, 15);
      const tableColumn = ["Product Name", "Bar Code", "Category", "Tax %", "Purchase Price", "Price/Unit", "Qty", "Low Stock"];
      const tableRows = products.map(product => [
        product.name || "",
        product.barcode || "",
        product.productCategoryDto?.productCategoryName || "N/A",
        product.taxDto?.taxPercentage ? `${product.taxDto.taxPercentage}%` : "N/A",
        product.purchasePrice?.toFixed(2) || "0.00",
        product.pricePerUnit?.toFixed(2) || "0.00",
        product.quantity?.toString() || "0",
        product.lowStock?.toString() || "0"
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });
      doc.save("product_list.pdf");
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
    try {
      if (!products || products.length === 0) {
        MySwal.fire({
          title: "No Data",
          text: "There are no products to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      const worksheetData = products.map(product => ({
        "Product Name": product.name || "",
        "Bar Code": product.barcode || "",
        "Category": product.productCategoryDto?.productCategoryName || "N/A",
        "Tax Percentage": product.taxDto?.taxPercentage ? `${product.taxDto.taxPercentage}%` : "N/A",
        "Purchase Price": product.purchasePrice?.toFixed(2) || "0.00",
        "Price Per Unit": product.pricePerUnit?.toFixed(2) || "0.00",
        "Quantity": product.quantity || 0,
        "Low Stock": product.lowStock || 0
      }));
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
      worksheet["!cols"] = [
        { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 12 },
        { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 10 }
      ];
      XLSX.writeFile(workbook, "product_list.xlsx");
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "Failed to export to Excel: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>Collapse</Tooltip>
  );

  const columns = [
    { title: "Product Name", dataIndex: "name", sorter: (a, b) => a.name.length - b.name.length },
    { title: "Bar Code", dataIndex: "barcode", sorter: (a, b) => a.barcode.length - b.barcode.length },
    {
      title: "Category",
      dataIndex: "productCategoryDto",
      render: (productCategoryDto) => productCategoryDto?.productCategoryName || 'N/A',
      sorter: (a, b) => (a.productCategoryDto?.productCategoryName || '').localeCompare(b.productCategoryDto?.productCategoryName || ''),
    },
    ...(isTaxEnabled ? [{
      title: "Tax Percentage",
      dataIndex: "taxDto",
      render: (taxDto) => taxDto ? `${taxDto.taxPercentage}%` : 'N/A',
      sorter: (a, b) => (a.taxDto?.taxPercentage || 0) - (b.taxDto?.taxPercentage || 0),
    }] : []),
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      render: (purchasePrice) => `${priceSymbol}${purchasePrice.toFixed(2)}`,
    },
    {
      title: "Price Per Unit",
      dataIndex: "pricePerUnit",
      key: "pricePerUnit",
      render: (pricePerUnit) => `${priceSymbol}${pricePerUnit.toFixed(2)}`,
    },
    { title: "Qty", dataIndex: "quantity", sorter: (a, b) => a.quantity - b.quantity },
    { title: "Low Stock", dataIndex: "lowStock", sorter: (a, b) => a.lowStock - b.lowStock },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isActive}
            onChange={() => handleToggleStatus(record.id, isActive)}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to={`${route.editproduct}?id=${record.id}`}>
              <Edit className="feather-edit" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex flex-column">
            <div className="page-title">
              <h4>Product List</h4>
              <h6>Manage your products</h6>
            </div>
            <div className="status-toggle-btns mt-2">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                  onClick={() => setShowActive(true)}
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`btn ${!showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                  onClick={() => setShowActive(false)}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>
          <ul className="table-top-head">
            <li><OverlayTrigger placement="top" overlay={renderTooltip}><Link onClick={exportToPDF}><ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" /></Link></OverlayTrigger></li>
            <li><OverlayTrigger placement="top" overlay={renderExcelTooltip}><Link onClick={exportToExcel}><ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" /></Link></OverlayTrigger></li>
            <li><OverlayTrigger placement="top" overlay={renderRefreshTooltip}><Link onClick={() => loadProductsData()}><RotateCcw /></Link></OverlayTrigger></li>
            <li><OverlayTrigger placement="top" overlay={renderCollapseTooltip}><Link id="collapse-header" className={data ? "active" : ""} onClick={(e) => { e.preventDefault(); dispatch(setToogleHeader(!data)); }}><ChevronUp /></Link></OverlayTrigger></li>
          </ul>
          <div className="page-btn d-flex gap-2">
            <Link to={route.addproduct} className="btn btn-added">
              <PlusCircle className="me-2 iconsize" /> Add New
            </Link>
          </div>
        </div>
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-path d-flex align-items-center gap-2" style={{ width: '100%' }}>
                  <div className="search-input">
                    <input
                      type="text"
                      placeholder="Search"
                      className="form-control form-control-sm formsearch"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <Link to className="btn btn-searchset"><i data-feather="search" className="feather-search" /></Link>
                  </div>
                  <div style={{ width: '200px' }}>
                    <Select
                      className="select"
                      options={categories}
                      placeholder="Select Category"
                      value={selectedCategory}
                      onChange={(selected) => handleFilterChange(selected, 'category')}
                      isClearable
                    />
                  </div>
                  {isTaxEnabled && (
                    <div style={{ width: '200px' }}>
                      <Select
                        className="select"
                        options={taxes}
                        placeholder="Select Tax"
                        value={selectedTax}
                        onChange={(selected) => handleFilterChange(selected, 'tax')}
                        isClearable
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table 
                columns={columns} 
                dataSource={products} 
                rowKey={(record) => record.id}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalRecords,
                  onChange: handlePageChange,
                  onShowSizeChange: handlePageSizeChange,
                  showSizeChanger: true
                }}
              />
            </div>
          </div>
        </div>
        <Brand />
      </div>
    </div>
  );
};

export default ProductList;