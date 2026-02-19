import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../core/pagination/datatable";
import Swal from "sweetalert2";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { ChevronUp, PlusCircle, RotateCcw, Printer } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { fetchPurchases, savePurchase, deleteAllPurchases } from "../Api/purchaseListApi";
import AddPurchases from "../../core/modals/purchases/addpurchases";
import "../../style/scss/pages/_categorylist.scss";

const tillName = localStorage.getItem("tillName");

const PurchasesList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const [purchases, setPurchases] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10,
        totalRecords: 0
    });

    useEffect(() => {
        loadInitialData();
    }, [pagination.pageNumber, pagination.pageSize]);

    const loadInitialData = async () => {
        setIsLoading(true);
        await fetchPurchasesData();
        setIsLoading(false);
    };

    const fetchPurchasesData = async () => {
        try {
            const data = await fetchPurchases(pagination.pageNumber, pagination.pageSize);
            if (data && data.payload) {
                setPurchases(data.payload);
                setPagination(prev => ({
                    ...prev,
                    totalRecords: data.totalRecords
                }));
            } else {
                setPurchases([]);
                Swal.fire({
                    title: "Warning!",
                    text: "No purchase data received from the server.",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch purchases: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const filterData = (purchasesData, query) => {
        if (query.trim() === "") {
            setPurchases(purchasesData);
            return;
        }
        const filteredData = purchasesData.filter(
            (purchase) =>
                (purchase.barcode && purchase.barcode.toLowerCase().includes(query.toLowerCase())) ||
                (purchase.productName && purchase.productName.toLowerCase().includes(query.toLowerCase()))
        );
        setPurchases(filteredData);
    };

    const handleSavePurchase = async (purchaseData) => {
        try {
            const result = await savePurchase(purchaseData);
            if (result) {
                await fetchPurchasesData();
                Swal.fire({
                    title: "Success!",
                    text: "Purchase has been added successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: { confirmButton: "btn btn-success" },
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || error.message || "Failed to add purchase",
                icon: "error",
                confirmButtonText: "OK",
                customClass: { confirmButton: "btn btn-danger" },
            });
        }
    };

    const handleDeleteAll = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete all purchases permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete all!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteAllPurchases();
                    if (response) {
                        await fetchPurchasesData();
                        Swal.fire({
                            title: "Deleted!",
                            text: "All purchases have been deleted.",
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete purchases: " + error.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }
        });
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterData(purchases, value);
    };

    const exportToPDF = () => {
        try {
            const doc = new jsPDF();
            doc.text("Purchase List", 14, 15);

            const tableColumn = ["Barcode", "Product Name"];
            const tableRows = purchases.map((purchase) => [
                purchase.barcode || "",
                purchase.productName || "",
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 20,
                theme: "grid",
                styles: { fontSize: 10 },
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            });

            doc.save("purchase_list.pdf");
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to generate PDF: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            Swal.fire({
                title: "Error!",
                text: "Failed to open print window. Please allow popups for this site and try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        const formattedDate = new Date().toLocaleString();
        const shopName = localStorage.getItem("shopName") || "Delta POS";
        const branchName = localStorage.getItem("branchName") || "";
        const branchCode = localStorage.getItem("branchCode") || "";
        const address = localStorage.getItem("branchAddress") || "";
        const contactNumber = localStorage.getItem("branchContact") || "";

        printWindow.document.write(`
          <html>
            <head>
              <title>Purchase List</title>
              <style>
                @media print {
                  @page { size: 72mm auto; margin: 0; }
                  body { margin: 0 auto; padding: 0 5px; font-family: 'Courier New', Courier, monospace; width: 72mm; min-height: 100%; box-sizing: border-box; font-weight: bold; color: #000; }
                  header, footer, nav, .print-header, .print-footer { display: none !important; }
                  html, body { width: 72mm; height: auto; margin: 0 auto; overflow: hidden; }
                }
                body { font-family: 'Courier New', Courier, monospace; width: 72mm; margin: 0 auto; padding: 0 5px; font-size: 12px; line-height: 1.2; box-sizing: border-box; text-align: center; }
                .receipt-header { text-align: center; margin-bottom: 5px; }
                .receipt-header h2 { margin: 0; font-size: 14px; font-weight: bold; }
                .receipt-details { margin-bottom: 5px; text-align: left; }
                .receipt-details p { margin: 2px 0; }
                .receipt-items { width: 100%; border-collapse: collapse; margin-bottom: 5px; margin-left: auto; margin-right: auto; }
                .receipt-items th, .receipt-items td { padding: 2px 0; font-weight: bold; text-align: left; font-size: 12px; }
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
                <p>Date: ${formattedDate}</p>
                <p>Till Name: ${tillName}</p>
                <p>Purchase List</p>
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
                  ${purchases.map(purchase => `
                    <tr>
                      <td>${purchase.barcode || ""}</td>
                      <td>${purchase.productName || "Unknown Product"}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <div class="divider"></div>
              <div class="receipt-details">
                <p>Total Items: ${purchases.length}</p>
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
              <script>
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              </script>
            </body>
          </html>
        `);

        printWindow.document.close();
        printWindow.focus();
    };

    const exportToExcel = () => {
        try {
            if (!purchases || purchases.length === 0) {
                Swal.fire({
                    title: "No Data",
                    text: "There are no purchases to export",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
                return;
            }

            const worksheetData = purchases.map((purchase) => ({
                Barcode: purchase.barcode || "",
                "Product Name": purchase.productName || "",
            }));

            const worksheet = XLSX.utils.json_to_sheet(worksheetData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Purchases");

            worksheet["!cols"] = [{ wch: 20 }, { wch: 30 }];

            XLSX.writeFile(workbook, "purchase_list.xlsx");
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to export to Excel: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handlePageChange = (page, pageSize) => {
        setPagination(prev => ({
            ...prev,
            pageNumber: page,
            pageSize: pageSize
        }));
    };

    const columns = [
        {
            title: "Barcode",
            dataIndex: "barcode",
            sorter: (a, b) => (a.barcode || "").localeCompare(b.barcode || ""),
        },
        {
            title: "Product Name",
            dataIndex: "productName",
            sorter: (a, b) => (a.productName || "").localeCompare(b.productName || ""),
        },
    ];

    const renderTooltip = (props) => <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>;
    const renderExcelTooltip = (props) => <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>;
    const renderRefreshTooltip = (props) => <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>;
    const renderCollapseTooltip = (props) => <Tooltip id="refresh-tooltip" {...props}>Collapse</Tooltip>;

    if (isLoading) {
        return <div className="page-wrapper"></div>;
    }

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex flex-column">
                        <div className="page-title">
                            <h4>Purchase List</h4>
                            <h6>Manage Your Purchases</h6>
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
                                <Link onClick={() => fetchPurchasesData()}>
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
                    <div className="page-btn d-flex align-items-center">
                        <Link
                            to="#"
                            className="btn btn-added me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#add-units"
                        >
                            <PlusCircle className="me-2 iconsize" />
                            Add New 
                        </Link>
                        <button className="btn btn-danger btn-added me-2" onClick={handleDeleteAll}>
                            Delete All
                        </button>
                        <button className="btn btn-added" onClick={handlePrint}>
                            <Printer className="me-2" /> Print
                        </button>
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
                                dataSource={purchases}
                                rowKey={(record) => record.id}
                                pagination={{
                                    current: pagination.pageNumber,
                                    pageSize: pagination.pageSize,
                                    total: pagination.totalRecords,
                                    onChange: handlePageChange
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <AddPurchases onSave={handleSavePurchase} />
        </div>
    );
};

export default PurchasesList;