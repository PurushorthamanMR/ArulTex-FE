import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit } from "feather-icons-react/build/IconComponents";
import Table from "../../core/pagination/datatable";
import Swal from "sweetalert2";
import AddCustomProductModal from "../../core/modals/inventory/customproductlistmodal";
import { updateProductStatus, getProductsByCategoryName } from "../Api/productApi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { ChevronUp, PlusCircle, RotateCcw } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "../../style/scss/pages/_categorylist.scss";

const CustomProductList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchProductsData(false);
    }
  }, [showActive]);

  const loadInitialData = async () => {
    setIsLoading(true);
    await fetchProductsData(true);
    setIsLoading(false);
  };

  const fetchProductsData = async (isInitial = false) => {
    try {
      if (isInitial) setIsLoading(true);
      const status = showActive ? 'True' : 'False';
      const data = await getProductsByCategoryName(1, 100, 'Custom', status);
      if (data && data.responseDto && data.responseDto.payload) {
        const customProducts = data.responseDto.payload.map((product) => {
          const [name, icon] = product.name.split("-");
          return {
            ...product,
            name: name.trim(),
            icon: icon?.trim() || "📦",
            isActive: product.isActive === 1 || product.isActive === true,
          };
        });
        setAllProducts(customProducts);
        filterData(customProducts, searchTerm);
      } else {
        setAllProducts([]);
        setProducts([]);
        Swal.fire({
          title: "Warning!",
          text: "No custom category data received from the server.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setAllProducts([]);
      setProducts([]);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch custom categories: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      if (isInitial) setIsLoading(false);
    }
  };

  const filterData = (productsData, query) => {
    let filteredData = [...productsData];
    if (query.trim() !== "") {
      filteredData = filteredData.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setProducts(filteredData.reverse());
  };

  const handleToggleStatus = (productId, currentStatus) => {
    setTogglingId(productId);
    const newStatusText = currentStatus ? "Inactive" : "Active";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change this category to ${newStatusText}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const newStatus = currentStatus ? 0 : 1;
          const response = await updateProductStatus(productId, newStatus);
          if (response && response.success !== false) {
            await fetchProductsData(false);
            Swal.fire({
              title: "Success!",
              text: `Category status changed to ${newStatusText}.`,
              icon: "success",
              confirmButtonText: "OK",
              customClass: { confirmButton: "btn btn-success" },
            });
          } else {
            throw new Error(response?.message || "Failed to update status");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to update category status: " + error.message,
            icon: "error",
            confirmButtonText: "OK",
            customClass: { confirmButton: "btn btn-danger" },
          });
        }
      }
      setTogglingId(null);
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterData(allProducts, value);
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text(`Custom Category List (${showActive ? "Active" : "Inactive"})`, 14, 15);
      const tableColumn = ["Category Name"];
      const tableRows = products.map((product) => [product.name || ""]);
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });
      doc.save(`custom_category_list_${showActive ? "active" : "inactive"}.pdf`);
    } catch (error) {
      Swal.fire({
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
        Swal.fire({
          title: "No Data",
          text: "There are no custom categories to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      const worksheetData = products.map((product) => ({
        "Category Name": product.name || "",
        Icon: product.icon || "📦",
      }));
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "CustomCategories");
      worksheet["!cols"] = [{ wch: 20 }, { wch: 10 }];
      XLSX.writeFile(workbook, `custom_category_list_${showActive ? "active" : "inactive"}.xlsx`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to export to Excel: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
  };

  const handleEditClick = (record) => {
    setSelectedProduct(record);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      render: (text) => <Link to="#">{text}</Link>,
      sorter: (a, b) => (a.name || "").length - (b.name || "").length,
    },
    {
      title: "Icon",
      dataIndex: "icon",
      sorter: (a, b) => (a.icon || "").length - (b.icon || "").length,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <div className={`form-check form-switch ${togglingId === record.id ? "toggling" : ""}`}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={isActive}
            onChange={() => handleToggleStatus(record.id, isActive)}
            disabled={togglingId === record.id}
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
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-units"
              onClick={() => handleEditClick(record)}
            >
              <Edit className="feather-edit" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  const renderTooltip = () => <Tooltip id="pdf-tooltip">Pdf</Tooltip>;
  const renderExcelTooltip = () => <Tooltip id="excel-tooltip">Excel</Tooltip>;
  const renderRefreshTooltip = () => <Tooltip id="refresh-tooltip">Refresh</Tooltip>;
  const renderCollapseTooltip = () => <Tooltip id="collapse-tooltip">Collapse</Tooltip>;

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex flex-column">
            <div className="page-title">
              <h4>Custom Category List</h4>
              <h6>Manage Your Custom Categories</h6>
            </div>
            <div className="status-toggle-btns mt-2">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${showActive ? "btn-primary active" : "btn-outline-primary"}`}
                  onClick={() => setShowActive(true)}
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`btn ${!showActive ? "btn-primary active" : "btn-outline-primary"}`}
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
                <Link onClick={() => fetchProductsData(false)}>
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setToogleHeader(!data));
                  }}
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
              onClick={handleAddClick}
            >
              <PlusCircle className="me-2 iconsize" />
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
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Link to="#" className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table
                className="table datanew"
                columns={columns}
                dataSource={products}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>
      <AddCustomProductModal
        onSave={() => {
          fetchProductsData(false);
        }}
        onUpdate={() => {
          fetchProductsData(false);
        }}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default CustomProductList;