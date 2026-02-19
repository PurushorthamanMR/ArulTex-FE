import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../../core/pagination/datatable";
import AddUnit from "../../core/modals/inventory/addunit";
import EditUnit from "../../core/modals/inventory/editunit";
import Swal from "sweetalert2";
import {
  ChevronUp,
  PlusCircle,
  RotateCcw,
} from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { setToogleHeader } from "../../core/redux/action";
import {
  updateNonScanProduct,
  updateNonScanProductStatus,
  getAllNonScanProductsPage
} from "../Api/NonScanProductApi";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const Units = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [nonScanProducts, setNonScanProducts] = useState([]);
  const [allNonScanProducts, setAllNonScanProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadNonScanProducts();
  }, []);

  useEffect(() => {
    loadNonScanProducts();
  }, [showActive, pageNumber, pageSize]);

  const loadNonScanProducts = async () => {
    try {
      // Make sure pageNumber is 1-based for the API
      const apiPageNumber = pageNumber + 1;
      console.log(`Fetching page ${apiPageNumber} with size ${pageSize}`);
      
      const response = await getAllNonScanProductsPage(apiPageNumber, pageSize);
      console.log("API Response:", response);
      
      if (response && response.responseDto) {
        const productArray = response.responseDto;
        console.log("Products from responseDto:", productArray);
        
        // Set all products for search functionality
        setAllNonScanProducts(productArray);
        
        // Filter based on active status
        const activeFilteredProducts = productArray
          .filter(product => {
            const isActiveValue = typeof product.isActive === 'number' 
              ? product.isActive === 1 
              : product.isActive === true;
            
            return isActiveValue === showActive;
          })
          .reverse(); // Reverse the array to show last in first out
        
        console.log("Filtered products:", activeFilteredProducts);
        console.log("Show active:", showActive);
        
        // Set the filtered products for display
        setNonScanProducts(activeFilteredProducts);
        
        // Set total items for pagination
        setTotalItems(productArray.length);
      } else {
        console.log("No valid product array found");
        setAllNonScanProducts([]);
        setNonScanProducts([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setAllNonScanProducts([]);
      setNonScanProducts([]);
      setTotalItems(0);
      
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch non-scan products: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEditClick = (product) => {
    console.log("Edit clicked for product:", product);
    // Make sure to create a new object to trigger React's state update
    setSelectedProduct({...product});
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const response = await updateNonScanProduct(productId, updatedData);
      if (response) {
        Swal.fire('Success', 'Product has been updated!', 'success');
        await loadNonScanProducts();
        const modal = document.getElementById('edit-units');
        const bootstrapModal = new window.bootstrap.Modal(modal);
        bootstrapModal.hide();
      } else {
        Swal.fire('Error', 'Failed to update product', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    setTogglingId(productId);
    const newStatusText = currentStatus ? 'Inactive' : 'Active';

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change this product to ${newStatusText}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const newStatus = currentStatus ? 0 : 1;
          const response = await updateNonScanProductStatus(productId, newStatus);
          if (response) {
            loadNonScanProducts();
          } else {
            Swal.fire('Error', 'Failed to update product status', 'error');
          }
        } catch (error) {
          Swal.fire('Error', 'Something went wrong', 'error');
        }
      }
      setTogglingId(null);
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      const searchProducts = allNonScanProducts.filter(product =>
        product.nonScanProduct.toLowerCase().includes(query.toLowerCase())
      );
      setNonScanProducts(searchProducts.length > 0 ? searchProducts : []);
    } else {
      loadNonScanProducts();
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Non-Scan Products List (${showActive ? 'Active' : 'Inactive'})`, 20, 10);
    const tableData = nonScanProducts.map(product => [
      product.nonScanProduct || 'N/A',
      product.price || 'N/A'
    ]);
    autoTable(doc, {
      head: [['Product', 'Price']],
      body: tableData,
      startY: 20,
    });
    doc.save(`non_scan_products_${showActive ? 'active' : 'inactive'}.pdf`);
  };

  const exportToExcel = () => {
    const worksheetData = nonScanProducts.map(product => ({
      Product: product.nonScanProduct || 'N/A',
      Price: product.price || 'N/A',
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Non-Scan Products');
    XLSX.writeFile(workbook, `non_scan_products_${showActive ? 'active' : 'inactive'}.xlsx`);
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

  const columns = [
    {
      title: "Product",
      dataIndex: "nonScanProduct",
      render: (text) => <Link to="#">{text}</Link>,
      sorter: (a, b) => (a.nonScanProduct || '').length - (b.nonScanProduct || '').length,
    },
    {
      title: "Icon",
      dataIndex: "icon",
      render: (icon) => (
        <div className="product-icon">
          {icon ? (
            <span className="product-icon-text">{icon}</span>
          ) : (
            <div className="no-icon">No Icon</div>
          )}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <span>${price || '0.00'}</span>,
      sorter: (a, b) => (a.price || 0) - (b.price || 0),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, record) => {
        // Convert to boolean if it's a number
        const isActiveValue = typeof isActive === 'number' 
          ? isActive === 1 
          : isActive === true;
          
        return (
          <div className={`form-check form-switch ${togglingId === record.id ? 'toggling' : ''}`}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={isActiveValue}
              onChange={() => handleToggleStatus(record.id, isActiveValue)}
              disabled={togglingId === record.id}
            />
          </div>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-units"
              onClick={() => handleEditClick(record)}
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
          </div>
        </td>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex flex-column">
              <div className="page-title">
                <h4>Non Scan Products</h4>
                <h6>Manage your non scan products</h6>
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
              <li>
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                  <Link onClick={exportToPDF}>
                    <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                  <Link onClick={exportToExcel}>
                    <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link onClick={() => loadNonScanProducts()}>
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
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-units"
              >
                <PlusCircle className="me-2" />
                Add New
              </Link>
            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-top">
                <div className="search-set">
                  <div className="search-input">
                    <input
                      type="text"
                      placeholder="Search"
                      className="form-control form-control-sm formsearch"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <Link to className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table 
                  columns={columns} 
                  dataSource={nonScanProducts} 
                  rowKey={(record) => record.id}
                  pagination={{
                    current: pageNumber + 1,
                    pageSize: pageSize,
                    total: totalItems,
                    onChange: (page, pageSize) => {
                      setPageNumber(page - 1);
                      setPageSize(pageSize);
                    }
                  }}
                  locale={{
                    emptyText: `No ${showActive ? 'active' : 'inactive'} non-scan products found.`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <AddUnit onAddProduct={loadNonScanProducts} />
        <EditUnit 
          selectedProduct={selectedProduct} 
          onUpdate={loadNonScanProducts} 
          onSave={handleUpdateProduct}
        />
      </div>
    </>
  );
};

