import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit } from "feather-icons-react/build/IconComponents";
import Table from "../../core/pagination/datatable";
import Swal from "sweetalert2";
import ProductDiscountModal from "../../core/modals/discount/productDiscountModal";
import { saveProductDiscount, fetchProductDiscounts, updateProductDiscount, updateProductDiscountStatus } from "../Api/productDiscountApi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { ChevronUp, PlusCircle, RotateCcw } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
import withReactContent from "sweetalert2-react-content";

const ProductDiscount = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [discounts, setDiscounts] = useState([]);
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Cash");
  const [showActive, setShowActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const MySwal = withReactContent(Swal);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadInitialData();

    const intervalId = setInterval(checkExpiredDiscounts, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      filterData(allDiscounts, searchTerm);
    }
  }, [activeTab, showActive]);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      await fetchDiscountsData(true);
      await checkExpiredDiscounts();
    } catch (error) {
      console.error("Error loading initial data:", error);
      // Silently handle the error without showing an alert
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDiscountsData = async (isInitial = false, status = showActive) => {
    try {
      if (isInitial) {
        setIsLoading(true);
      }
      const data = await fetchProductDiscounts(1, 10, status);
      if (Array.isArray(data)) {
        const normalizedData = data.map(discount => ({
          ...discount,
          isActive: discount.isActive === 1 || discount.isActive === true,
          quantityDiscounts: discount.productDiscountTypeDto.type === "Quantity"
            ? [{ quantity: discount.quantity, discount: discount.discount }]
            : [],
        }));
        setAllDiscounts(normalizedData);
      } else {
        setAllDiscounts([]);
        setDiscounts([]);
        MySwal.fire({
          title: "No Data",
          text: "No discounts are available at the moment.",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Unknown error";
      console.error("Error in fetchDiscountsData:", errorMessage);
      MySwal.fire({
        title: "Error!",
        text: `Failed to fetch discounts: ${errorMessage}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      setAllDiscounts([]);
      setDiscounts([]);
    } finally {
      if (isInitial) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    filterData(allDiscounts, searchTerm);
  }, [allDiscounts, activeTab, showActive, searchTerm]);

  const filterData = (discountsData, query) => {
    let filteredData = discountsData.filter(discount =>
      discount.productDiscountTypeDto?.type?.trim().toLowerCase() === activeTab.trim().toLowerCase()
    );

    if (activeTab === "Quantity") {
      const groupedByProduct = {};
      filteredData.forEach(discount => {
        const productId = discount.productDto.id;
        if (!groupedByProduct[productId]) {
          groupedByProduct[productId] = {
            ...discount,
            quantityDiscounts: [{
              quantity: discount.quantity,
              discount: discount.discount,
              isActive: discount.isActive
            }],
            isActive: discount.isActive
          };
        } else {
          groupedByProduct[productId].quantityDiscounts.push({
            quantity: discount.quantity,
            discount: discount.discount,
            isActive: discount.isActive
          });
        }
      });

      Object.values(groupedByProduct).forEach(product => {
        product.quantityDiscounts = product.quantityDiscounts
          .sort((a, b) => (parseInt(a.quantity) || 0) - (parseInt(b.quantity) || 0));
      });

      filteredData = Object.values(groupedByProduct);
    }

    if (query.trim() !== "") {
      filteredData = filteredData.filter(discount =>
        (discount.productDto?.name && discount.productDto.name.toLowerCase().includes(query.toLowerCase())) ||
        (discount.productDto?.barcode && discount.productDto.barcode.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setDiscounts(filteredData);
  };

  const handleSaveDiscount = async (discountData) => {
    try {
      if (discountData.productDiscountTypeDto.type === "Quantity") {
        const result = await saveProductDiscount(discountData);
        if (result) {
          await fetchDiscountsData(false);
          return true;
        }
        return false;
      } else {
        const result = await saveProductDiscount(discountData);
        if (result) {
          await fetchDiscountsData(false);
          setSelectedDiscount(null);
          MySwal.fire({
            title: "Success!",
            text: "Discount has been added successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          return true;
        }
        return false;
      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: `Failed to add discount: ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }
  };

  const handleUpdateDiscount = async (discountData) => {
    try {
      if (discountData.productDiscountTypeDto.type === "Quantity") {
        const result = await updateProductDiscount(discountData);
        if (result) {
          await fetchDiscountsData(false);
          return true;
        }
        return false;
      } else {
        const result = await updateProductDiscount(discountData);
        if (result) {
          await fetchDiscountsData(false);
          setSelectedDiscount(null);
          MySwal.fire({
            title: "Success!",
            text: "Discount has been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          return true;
        }
        return false;
      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: `Failed to update discount: ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }
  };

  const handleToggleStatus = (discountId, currentStatus, productId) => {
    setTogglingId(discountId);
    const newStatusText = currentStatus ? 'Inactive' : 'Active';

    MySwal.fire({
      title: 'Are you sure?',
      text: `Do you want to change this discount to ${newStatusText}?`,
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
          if (activeTab === "Quantity") {
            const productDiscounts = allDiscounts.filter(d =>
              d.productDto.id === productId && d.productDiscountTypeDto.type === "Quantity"
            );
            for (const discount of productDiscounts) {
              await updateProductDiscountStatus(discount.id, newStatus);
            }
          } else {
            await updateProductDiscountStatus(discountId, newStatus);
          }
          await fetchDiscountsData(false);
          MySwal.fire({
            title: "Success!",
            text: `Discount status changed to ${newStatusText}.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          MySwal.fire({
            title: "Error!",
            text: `Failed to update discount status: ${error.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
      setTogglingId(null);
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterData(allDiscounts, value);
  };

  const exportToPDF = () => {
    try {
      if (!discounts || discounts.length === 0) {
        MySwal.fire({
          title: "No Data",
          text: "There are no discounts to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const doc = new jsPDF();
      doc.text(`${activeTab} Discounts (${showActive ? 'Active' : 'Inactive'})`, 14, 15);

      const tableColumn = ["Product Name", "Discount", "Quantity", "End Date", "Status"];
      const tableRows = discounts.map(discount => {
        if (activeTab === "Quantity") {
          const quantities = discount.quantityDiscounts?.length ? discount.quantityDiscounts.map(q => q.quantity).join(", ") : "N/A";
          const discounts = discount.quantityDiscounts?.length ? discount.quantityDiscounts.map(q => `$${q.discount.toFixed(2)}`).join(", ") : "N/A";
          return [
            discount.productDto?.name || "",
            discounts,
            quantities,
            discount.endDate || "N/A",
            discount.isActive ? 'Active' : 'Inactive'
          ];
        }
        return [
          discount.productDto?.name || "",
          activeTab === "Percentage" ? `${discount.discount}%` : `$${discount.discount.toFixed(2)}`,
          discount.quantity || "N/A",
          discount.endDate || "N/A",
          discount.isActive ? 'Active' : 'Inactive'
        ];
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });

      doc.save(`${activeTab.toLowerCase()}_discounts_${showActive ? 'active' : 'inactive'}.pdf`);
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: `Failed to generate PDF: ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const exportToExcel = () => {
    try {
      if (!discounts || discounts.length === 0) {
        MySwal.fire({
          title: "No Data",
          text: "There are no discounts to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const worksheetData = discounts.map(discount => {
        if (activeTab === "Quantity") {
          const quantities = discount.quantityDiscounts?.length ? discount.quantityDiscounts.map(q => q.quantity).join(", ") : "N/A";
          const discounts = discount.quantityDiscounts?.length ? discount.quantityDiscounts.map(q => `$${q.discount.toFixed(2)}`).join(", ") : "N/A";
          return {
            "Product Name": discount.productDto?.name || "",
            "Discount": discounts,
            "Quantity": quantities,
            "End Date": discount.endDate || "N/A",
            "Status": discount.isActive ? 'Active' : 'Inactive'
          };
        }
        return {
          "Product Name": discount.productDto?.name || "",
          "Discount": activeTab === "Percentage" ? `${discount.discount}%` : `$${discount.discount.toFixed(2)}`,
          "Quantity": discount.quantity || "N/A",
          "End Date": discount.endDate || "N/A",
          "Status": discount.isActive ? 'Active' : 'Inactive'
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Discounts");

      worksheet["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 10 }, { wch: 15 }, { wch: 10 }];

      XLSX.writeFile(workbook, `${activeTab.toLowerCase()}_discounts_${showActive ? 'active' : 'inactive'}.xlsx`);
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: `Failed to export to Excel: ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleAddClick = () => {
    setSelectedDiscount(null);
    setShowModal(true);
  };

  const handleEditClick = (record) => {
    if (record.productDiscountTypeDto?.type === "Quantity") {
      const editData = {
        ...record,
        id: record.id,
        productDto: record.productDto,
        endDate: record.endDate,
        isActive: record.isActive ? 1 : 0,
        productDiscountTypeDto: {
          id: 3,
          type: "Quantity"
        },
        quantityDiscounts: record.quantityDiscounts.map(qd => ({
          quantity: qd.quantity,
          discount: qd.discount
        }))
      };
      setSelectedDiscount(editData);
    } else {
      const editData = {
        ...record,
        id: record.id,
        isActive: record.isActive ? 1 : 0
      };
      setSelectedDiscount(editData);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    fetchDiscountsData(false, showActive); // Pass the current `showActive` state
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productDto",
      render: (productDto) => productDto?.name || "N/A",
      sorter: (a, b) => (a.productDto?.name || "").localeCompare(b.productDto?.name || ""),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      render: (_, record) => {
        const priceSymbol = localStorage.getItem("priceSymbol") || "$";
        if (record.productDiscountTypeDto?.type === "Quantity") {
          return record.quantityDiscounts
            .map(qd => `${priceSymbol} ${parseFloat(qd.discount).toFixed(2)}`)
            .join(', ');
        }
        if (!record.discount) return "N/A";
        if (record.productDiscountTypeDto?.type === "Percentage") {
          return `${record.discount}%`;
        }
        // For Cash
        return `${priceSymbol} ${parseFloat(record.discount).toFixed(2)}`;
      },
      sorter: (a, b) => {
        if (a.productDiscountTypeDto?.type === "Quantity" && b.productDiscountTypeDto?.type === "Quantity") {
          const aMin = Math.min(...a.quantityDiscounts.map(qd => parseFloat(qd.discount) || 0));
          const bMin = Math.min(...b.quantityDiscounts.map(qd => parseFloat(qd.discount) || 0));
          return aMin - bMin;
        }
        return (parseFloat(a.discount) || 0) - (parseFloat(b.discount) || 0);
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) => {
        if (record.productDiscountTypeDto?.type === "Quantity") {
          // Show all quantities
          return record.quantityDiscounts
            .map(qd => qd.quantity)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .join(', ');
        }
        return "1"; // Default quantity for non-quantity discounts
      },
      sorter: (a, b) => {
        if (a.productDiscountTypeDto?.type === "Quantity" && b.productDiscountTypeDto?.type === "Quantity") {
          const aMin = Math.min(...a.quantityDiscounts.map(qd => parseInt(qd.quantity) || 0));
          const bMin = Math.min(...b.quantityDiscounts.map(qd => parseInt(qd.quantity) || 0));
          return aMin - bMin;
        }
        return 0; // No sorting for non-quantity discounts
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => {
        const endDateObj = new Date(endDate);
        const currentDate = new Date();

        const nextDayMidnight = new Date(endDateObj);
        nextDayMidnight.setDate(nextDayMidnight.getDate() + 1);
        nextDayMidnight.setHours(0, 0, 0, 0);

        const timeDiff = nextDayMidnight - currentDate;
        const hoursRemaining = timeDiff / (1000 * 60 * 60);

        let statusClass = "";
        let statusText = "";

        if (timeDiff < 0) {
          statusClass = "text-danger";
          statusText = "Expired";
        } else if (hoursRemaining <= 24) {
          statusClass = "text-warning";
          statusText = "Expires Tonight";
        }

        return (
          <div>
            {endDate}
            {statusText && (
              <span className={`ms-2 badge ${statusClass === "text-danger" ? "bg-danger" : "bg-warning"}`}>
                {statusText}
              </span>
            )}
          </div>
        );
      },
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <div className={`form-check form-switch ${togglingId === record.id ? 'toggling' : ''}`}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={isActive}
            onChange={() => handleToggleStatus(record.id, isActive, record.productDto.id)}
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
              onClick={e => {
                e.preventDefault();
                handleEditClick(record);
              }}
            >
              <Edit className="feather-edit" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  // Get columns based on active tab
  const getActiveColumns = () => {
    const baseColumns = columns.filter(col => col.dataIndex !== "quantity" || activeTab === "Quantity");
    return baseColumns;
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
    <Tooltip id="collapse-tooltip" {...props}>Collapse</Tooltip>
  );

  const checkExpiredDiscounts = async () => {
    try {
      const currentDate = new Date();
      let hasExpiredDiscounts = false;

      for (const discount of allDiscounts) {
        if (discount.isActive && discount.endDate) {
          const endDate = new Date(discount.endDate);

          const nextDayMidnight = new Date(endDate);
          nextDayMidnight.setDate(nextDayMidnight.getDate() + 1);
          nextDayMidnight.setHours(0, 0, 0, 0);

          if (currentDate >= nextDayMidnight) {
            hasExpiredDiscounts = true;
            await updateProductDiscountStatus(discount.id, 0);
          }
        }
      }

      if (hasExpiredDiscounts) {
        await fetchDiscountsData(false);
      }
    } catch (error) {
      console.error("Error checking expired discounts:", error);
    }
  };

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex flex-column">
            <div className="page-title">
              <h4>{activeTab} Discounts</h4>
              <h6>Manage your product discounts</h6>
            </div>
            <div className="status-toggle-btns mt-2">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                  onClick={() => {
                    setShowActive(true);
                    fetchDiscountsData(false, true); // Fetch active discounts
                  }}
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`btn ${!showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                  onClick={() => {
                    setShowActive(false);
                    fetchDiscountsData(false, false); // Fetch inactive discounts
                  }}
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
                <Link onClick={() => fetchDiscountsData(false)}>
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
              onClick={handleAddClick}
            >
              <PlusCircle className="me-2 iconsize" />
              Add New Discount
            </Link>
          </div>
        </div>
        <div className="table-tab">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "Cash" ? "active" : ""}`}
                id="pills-cash-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-cash"
                type="button"
                role="tab"
                aria-controls="pills-cash"
                aria-selected={activeTab === "Cash"}
                onClick={() => handleTabChange("Cash")}
              >
                Cash Discounts
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "Percentage" ? "active" : ""}`}
                id="pills-percentage-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-percentage"
                type="button"
                role="tab"
                aria-controls="pills-percentage"
                aria-selected={activeTab === "Percentage"}
                onClick={() => handleTabChange("Percentage")}
              >
                Percentage Discounts
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "Quantity" ? "active" : ""}`}
                id="pills-quantity-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-quantity"
                type="button"
                role="tab"
                aria-controls="pills-quantity"
                aria-selected={activeTab === "Quantity"}
                onClick={() => handleTabChange("Quantity")}
              >
                Quantity Discounts
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-cash"
              role="tabpanel"
              aria-labelledby="pills-cash-tab"
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
                      columns={getActiveColumns()}
                      dataSource={discounts}
                      rowKey={(record) => record.id}
                      locale={{ emptyText: "No discounts available for this category." }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-percentage"
              role="tabpanel"
              aria-labelledby="pills-percentage-tab"
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
                      columns={getActiveColumns()}
                      dataSource={discounts}
                      rowKey={(record) => record.id}
                      locale={{ emptyText: "No discounts available for this category." }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-quantity"
              role="tabpanel"
              aria-labelledby="pills-quantity-tab"
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
                      columns={getActiveColumns()}
                      dataSource={discounts}
                      rowKey={(record) => record.id}
                      locale={{ emptyText: "No discounts available for this category." }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductDiscountModal
        show={showModal || selectedDiscount !== null}
        onHide={() => {
          setSelectedDiscount(null);
          setShowModal(false);
        }}
        onSave={handleSaveDiscount}
        onUpdate={handleUpdateDiscount}
        selectedDiscount={selectedDiscount}
        discountType={activeTab}
        defaultActive={showActive}
      />
    </div>
  );
};

export default ProductDiscount;