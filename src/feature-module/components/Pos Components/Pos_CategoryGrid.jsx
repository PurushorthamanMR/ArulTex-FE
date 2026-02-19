import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "../../../style/scss/components/Pos Components/Pos_CategoryGrid.scss";
import Pos_BarcodeCreation from "./Pos_BarcodeCreation";
import Pos_RequestLeave from "./Pos_RequestLeave";
import { savePurchase, fetchPurchases, deleteAllPurchases } from "../../Api/purchaseListApi";
import { getProductByBarcode } from "../../Api/productApi";
import { fetchTransactions } from "../../Api/TransactionApi";
import { quickAccess, fetchCustomCategories, fetchNonScanProducts } from "../../../core/json/Posdata";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import { fetchXReport } from "../../Api/TransactionApi";
import { Printer } from "feather-icons-react/build/IconComponents";
import { fetchZReport } from "../../Api/TransactionApi";
import Swal from 'sweetalert2';
import { getAllManagerToggles } from "../../Api/ManagerToggle";
import { saveBanking } from "../../Api/BankingApi";
import { fetchEmployeeDiscounts } from "../../Api/EmployeeDis";
import Pos_EmployeeDiscountPopup from "./Pos_EmployeeDiscountPopup";

const PAGE_SIZE = 14;
const SALES_PAGE_SIZE = 10;
const MAX_PAGES = 5;

const Pos_CategoryGrid = forwardRef(({
  items = fetchCustomCategories,
  onCategorySelect,
  onManualDiscount,
  onEmployeeDiscount,
  showNotification,
  inputValue,
  selectedItems,
  manualDiscount = 0
}, ref) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [showBarcodePopup, setShowBarcodePopup] = useState(false);
  const [showAddPurchasePopup, setShowAddPurchasePopup] = useState(false);
  const [showViewPurchasePopup, setShowViewPurchasePopup] = useState(false);
  const [showXReportPopup, setShowXReportPopup] = useState(false);
  const [showSalesListPopup, setShowSalesListPopup] = useState(false);
  const [showRequestLeavePopup, setShowRequestLeavePopup] = useState(false);
  const [employeeDiscounts, setEmployeeDiscounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nonScanItems, setNonScanItems] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [error, setError] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [xReportData, setXReportData] = useState(null);
  const popupRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);
  const [salesPageIndex, setSalesPageIndex] = useState(0);
  const [currentTransactionId, setCurrentTransactionId] = useState("0000000000");
  const barcodeRef = useRef(null);
  const [zReportData, setZReportData] = useState(null);
  const [showZReportPopup, setShowZReportPopup] = useState(false);
  const [managerToggles, setManagerToggles] = useState([]);
  const [showEmployeeDiscountPopup, setShowEmployeeDiscountPopup] = useState(false);
  const [productName, setProductName] = useState("");
  const priceSymbol = localStorage.getItem("priceSymbol") || "";
  const tillName = localStorage.getItem("tillName");

  // Function to manually refresh NonScan data
  const refreshNonScanData = async () => {
    try {
      if (typeof items === "function" && items === fetchNonScanProducts) {
        const data = await items();
        setNonScanItems(data);

        // Update cache with fresh data
        const now = new Date().getTime();
        localStorage.setItem('nonScanProductsCache', JSON.stringify(data));
        localStorage.setItem('nonScanProductsCacheTimestamp', now.toString());
      }
    } catch (error) {
      console.error("Error refreshing NonScan data:", error);
      if (showNotification) {
        showNotification("Failed to refresh NonScan data", "error");
      }
    }
  };

  // Expose the refresh function through a ref
  useImperativeHandle(ref, () => ({
    refreshNonScanData,
    resetPageIndex: () => setPageIndex(0)
  }));

  useEffect(() => {
    const handleStorageChange = () => {
      setPageIndex(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        if (typeof items === "function") {
          if (items === fetchNonScanProducts) {
            // Force refresh of NonScan data when the tab is active
            const data = await items();
            setNonScanItems(data);

            // Update cache with fresh data
            const now = new Date().getTime();
            localStorage.setItem('nonScanProductsCache', JSON.stringify(data));
            localStorage.setItem('nonScanProductsCacheTimestamp', now.toString());
          } else if (items === fetchCustomCategories) {
            // Check if we have cached data and it's not too old (less than 5 minutes)
            const cachedData = localStorage.getItem('customCategoriesCache');
            const cacheTimestamp = localStorage.getItem('customCategoriesCacheTimestamp');
            const now = new Date().getTime();
            const fiveMinutes = 5 * 60 * 1000;

            if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < fiveMinutes) {
              setCategories(JSON.parse(cachedData));
            } else {
              // Fetch fresh data if cache is missing or too old
              const data = await items();
              setCategories(data);

              // Update cache with fresh data
              localStorage.setItem('customCategoriesCache', JSON.stringify(data));
              localStorage.setItem('customCategoriesCacheTimestamp', now.toString());
            }
          } else {
            const data = await items();
            setCategories(data);
          }
        } else {
          setCategories(items);
        }
      } catch (error) {
        setCategories([]);
        setNonScanItems([]);
      }
    };

    loadCategories();
  }, [items]);

  useEffect(() => {
    if (showViewPurchasePopup) {
      const loadPurchasesAndProducts = async () => {
        try {
          const data = await fetchPurchases();
          const purchasesWithProducts = await Promise.all(
            data.map(async (purchase) => {
              try {
                const productData = await getProductByBarcode(purchase.barcode);
                return {
                  ...purchase,
                  productName: productData?.responseDto?.[0]?.name || "Unknown Product",
                };
              } catch (err) {
                return { ...purchase, productName: "Unknown Product" };
              }
            })
          );
          setPurchases(purchasesWithProducts);
        } catch (err) {
          console.error("Failed to load purchases:", err.message);
          setError(err.message);
          setPurchases([]);
        }
      };
      loadPurchasesAndProducts();
    }
  }, [showViewPurchasePopup]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowXReportPopup(false);
        setXReportData(null);
      }
    };

    if (showXReportPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showXReportPopup]);

  useEffect(() => {
    if (showSalesListPopup) {
      const loadTransactions = async () => {
        try {
          const pageNumber = salesPageIndex + 1;
          const data = await fetchTransactions(pageNumber, SALES_PAGE_SIZE);
          setTransactions(data.content || []);
        } catch (error) {
          console.error("Error fetching transactions:", error);
          setTransactions([]);
        }
      };
      loadTransactions();
    }
  }, [showSalesListPopup, salesPageIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowZReportPopup(false);
        setZReportData(null);
      }
    };

    if (showZReportPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showZReportPopup]);

  useEffect(() => {
    const fetchToggles = async () => {
      try {
        const toggles = await getAllManagerToggles();
        setManagerToggles(toggles.responseDto);
      } catch (error) {
        console.error('Error fetching manager toggles:', error);
      }
    };

    fetchToggles();
  }, []);

  useEffect(() => {
    const loadEmployeeDiscounts = async () => {
      try {
        const data = await fetchEmployeeDiscounts();
        setEmployeeDiscounts(data);
      } catch (error) {
        console.error("Error loading employee discounts:", error);
        showNotification("Failed to load employee discounts", "error");
      }
    };
    loadEmployeeDiscounts();
  }, []);

  let filteredItems = [];
  if (items === fetchCustomCategories) {
    filteredItems = categories;
  } else if (items === fetchNonScanProducts) {
    filteredItems = nonScanItems;
  } else {
    filteredItems = items || [];
  }

  if (!Array.isArray(filteredItems)) {
    filteredItems = [];
  }

  const totalItems = filteredItems.length;

  let paginatedItems = [];
  if (pageIndex === 0) {
    paginatedItems = filteredItems.slice(0, PAGE_SIZE);
    if (totalItems > PAGE_SIZE) {
      paginatedItems.push({ id: "more", name: "More", icon: "➡️", isMore: true });
    }
  } else {
    const start = pageIndex * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, totalItems);
    paginatedItems = [
      { id: "prev", name: "Prev", icon: "⬅️", isPrev: true },
      ...filteredItems.slice(start, end),
    ];
    if (end < totalItems) {
      paginatedItems.push({ id: "more", name: "More", icon: "➡️", isMore: true });
    }
  }

  if (items === quickAccess) {
    // Filter to only get discount-related toggles
    const discountToggles = managerToggles.filter(toggle =>
      toggle.action === "Manual Discount" || toggle.action === "Employee Discount"
    );

    const activeToggleButtons = discountToggles
      .filter(toggle => toggle.isActive)
      .map(toggle => ({
        id: `toggle-${toggle.id}`,
        name: toggle.action,
        icon: toggle.action === "Manual Discount" ? "🪙" : "🎁",
        isToggle: true
      }));

    // Get user role from localStorage
    const userRole = localStorage.getItem("userRole");

    // Filter out X-Report if user is not ADMIN or MANAGER
    const filteredItems = paginatedItems
      .filter(item => {
        if (item.name === "X - Report") {
          return userRole === "ADMIN" || userRole === "MANAGER";
        }
        return !["Manual Discount", "Employee Discount", "Non Scan Product"].includes(item.name);
      });

    paginatedItems = [
      ...filteredItems,
      ...activeToggleButtons,
    ].map((item) =>
      item.name === "Label Print"
        ? { ...item, isLabelPrint: true }
        : item.name === "Add Purchase List"
          ? { ...item, isAddPurchase: true }
          : item.name === "View Purchase List"
            ? { ...item, isViewPurchase: true }
            : item.name === "Sales List"
              ? { ...item, isSalesList: true }
              : item.name === "X - Report"
                ? { ...item, isXReport: true }
                : item.name === "Z - Report"
                  ? { ...item, isZReport: true }
                  : item.name === "Request Leave"
                    ? { ...item, isRequestLeave: true }
                    : item
    );
  }

  const getUserRole = () => {
    const userRole = localStorage.getItem("userRole");
    return userRole || "USER";
  };

  const handleZReportClick = async (item) => {
    if (item.isZReport) {
      try {
        const userRole = getUserRole();

        // Check for suspended transactions first
        const suspendedTransactionsData = localStorage.getItem("suspendedTransactions");
        const hasSuspendedTransactions = suspendedTransactionsData && JSON.parse(suspendedTransactionsData).length > 0;

        if (hasSuspendedTransactions) {
          await Swal.fire({
            icon: 'warning',
            title: 'Suspended Transactions Found',
            text: 'Please complete the suspended transactions before generating Z-Report.',
            confirmButtonColor: '#3085d6',
          });
          return;
        }

        const result = await Swal.fire({
          title: 'Generate Z-Report?',
          text: 'Are you sure you want to generate a Z-Report?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, generate it!',
          cancelButtonText: 'No, cancel!'
        });

        if (result.isConfirmed) {
          // Stop "Banking Required!" message by setting bankingRequired to false in localStorage
          localStorage.setItem('bankingRequired', JSON.stringify({
            isRequired: false,
            timestamp: new Date().toISOString()
          }));
          
          // Dispatch a custom event to notify other components
          const event = new CustomEvent('bankingStatusChanged', { 
            detail: { isRequired: false } 
          });
          window.dispatchEvent(event);
          
          const xReportResponse = await fetchXReport();
          if (!xReportResponse.success || !xReportResponse.data) {
            Swal.fire({
              icon: 'warning',
              title: 'X-Report Required',
              text: 'Please generate an X-Report before getting Z-Report',
              confirmButtonColor: '#3085d6',
            });
            return;
          }

          const response = await fetchZReport();
          if (response.success && response.data && response.data.responseDto) {
            setZReportData(response.data);

            if (userRole === "USER") {
              await Swal.fire({
                icon: 'success',
                title: 'Z-Report Generated Successfully',
                text: 'The Z-Report has been generated.',
                confirmButtonColor: '#3085d6',
              });
            } else if (userRole === "ADMIN" || userRole === "MANAGER") {
              setShowZReportPopup(true);
            }
          } else {
            Swal.fire({
              icon: 'info',
              title: 'No New Transactions',
              text: 'Already got the Z-Report for current session',
              confirmButtonColor: '#3085d6',
            });
            console.error("Failed to fetch Z-Report:", response.error);
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to generate Z-Report. Please try again.',
          confirmButtonColor: '#3085d6',
        });
        console.error("Error fetching Z-Report:", error);
      }
    }
  };

  const handleBankingSaveAndPrint = async () => {
    try {
      // Stop "Banking Required!" message by setting bankingRequired to false in localStorage
      localStorage.setItem('bankingRequired', JSON.stringify({
        isRequired: false,
        timestamp: new Date().toISOString()
      }));
      
      // Dispatch a custom event to notify other components
      const event = new CustomEvent('bankingStatusChanged', { 
        detail: { isRequired: false } 
      });
      window.dispatchEvent(event);
      
      const bankingAmount = parseFloat(inputValue) || 0;
      if (isNaN(bankingAmount) || bankingAmount <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Amount',
          text: 'Please enter a valid banking amount.',
          confirmButtonColor: '#3085d6',
        });
        return;
      }

      const result = await Swal.fire({
        title: 'Save Banking Amount?',
        text: `Are you sure you want to save ${bankingAmount.toFixed(2)} to banking?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'No, cancel!'
      });

      if (result.isConfirmed) {
        const response = await saveBanking({
          amount: bankingAmount,
          userDto: {
            id: parseInt(localStorage.getItem("userId") || "1")
          }
        });
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Banking Saved',
            text: 'Amount has been successfully saved to banking',
            confirmButtonColor: '#3085d6',
          });

          await handlePrintBankingBill(bankingAmount);

          onCategorySelect({ name: "clear" });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save banking amount. Please try again.',
        confirmButtonColor: '#3085d6',
      });
      console.error("Error saving banking:", error);
    }
  };

  const handlePrintBankingBill = async (bankingAmount) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showNotification("Failed to open print window. Please allow popups for this site and try again.");
      return;
    }

    const formattedDate = new Date().toLocaleString();
    const cashierName = localStorage.getItem("firstName") || "Unknown";
    const cashierLastName = localStorage.getItem("lastName") || "";
    const shopName = localStorage.getItem("shopName") || "";
    const branchName = localStorage.getItem("branchName") || "";
    const branchCode = localStorage.getItem("branchCode") || "";
    const address = localStorage.getItem("branchAddress") || "";
    const contactNumber = localStorage.getItem("branchContact") || "";

    printWindow.document.write(`
      <html>
        <head>
          <title>Banking Receipt</title>
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
            .receipt-items .total-column { text-align: right; }
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
            <p>Cashier: ${cashierName} ${cashierLastName}</p>
          </div>
          <div class="divider"></div>
          <table class="receipt-items">
            <thead>
              <tr>
                <th>Description</th>
                <th class="total-column">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Banking</td>
                <td class="total-column">${priceSymbol}${bankingAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div class="divider"></div>
          <div class="receipt-details">
            <p>Total: ${priceSymbol}${bankingAmount.toFixed(2)}</p>
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

  const renderCategoryButton = (item) => {
    const handleClick = async () => {
      if (item.isPrev) {
        setPageIndex(pageIndex - 1);
      } else if (item.isMore) {
        setPageIndex(pageIndex + 1);
      } else if (item.isLabelPrint) {
        setShowBarcodePopup(true);
      } else if (item.isAddPurchase) {
        setShowAddPurchasePopup(true);
      } else if (item.isViewPurchase) {
        setShowViewPurchasePopup(true);
      } else if (item.isSalesList) {
        setShowSalesListPopup(true);
      } else if (item.isXReport) {
        try {
          const result = await Swal.fire({
            title: 'Generate X-Report?',
            text: 'Are you sure you want to generate an X-Report?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, generate it!',
            cancelButtonText: 'No, cancel!'
          });

          if (result.isConfirmed) {
            const response = await fetchXReport();
            if (response.success && response.data && response.data.responseDto) {
              setXReportData(response.data);
              setShowXReportPopup(true);
            } else {
              Swal.fire({
                icon: 'info',
                title: 'No New Transactions',
                text: 'Already got the X-Report for current session',
                confirmButtonColor: '#3085d6',
              });
              console.error("Failed to fetch X-Report:", response.error);
            }
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to generate X-Report. Please try again.',
            confirmButtonColor: '#3085d6',
          });
          console.error("Error fetching X-Report:", error);
        }
      } else if (item.isZReport) {
        await handleZReportClick(item);
      } else if (item.isToggle) {
        if (item.name === "Manual Discount") {
          onManualDiscount();
        } else if (item.name === "Employee Discount") {
          if (!selectedItems || selectedItems.length === 0) {
            showNotification("Please add items before applying employee discount", "error");
            return;
          }

          const employee = employeeDiscounts[0];
          if (!employee) {
            showNotification("No employee discount found", "error");
            return;
          }
          setShowEmployeeDiscountPopup(true);
        }
      } else if (item.isRequestLeave) {
        setShowRequestLeavePopup(true);
      } else if (item.name === "Banking") {
        await handleBankingSaveAndPrint();
      } else {
        onCategorySelect(item);
      }
    };

    const buttonClass = items === quickAccess ? "quick-access-btn" :
      items === fetchNonScanProducts ? "category-btn non-scan-btn" :
        "category-btn";

    return (
      <button key={item.id} className={`group ${buttonClass}`} onClick={handleClick}>
        <div className="text-2xl mb-1 transition-transform group-hover:scale-110">
          {item.icon}
        </div>
        <div className="font-medium text-sm truncate px-1">{item.name}</div>
      </button>
    );
  };

  const handleBarcodeChange = async (e) => {
    const value = e.target.value.trim();
    setBarcode(value);
    setError("");
    setProductName("");
    setProductStatus("");
  };

  const handleBarcodeKeyDown = async (e) => {
    if (e.key === 'Enter') {
      const value = barcode.trim();

      if (value === "") {
        setProductStatus("Enter a barcode to check");
        return;
      }

      try {
        const productData = await getProductByBarcode(value);
        if (productData && productData.responseDto && productData.responseDto.length > 0) {
          const product = productData.responseDto[0];
          setProductName(product.name);
          setProductStatus(`Product: ${product.name}`);
        } else {
          setProductStatus("No product found");
        }
      } catch (err) {
        setProductStatus("Error fetching product");
        console.error("Error fetching product by barcode:", err);
      }
    }
  };

  const handleAddPurchase = async () => {
    if (!barcode.trim()) {
      setError("Barcode is required");
      return;
    }

    if (!productName) {
      setError("Product not found. Cannot add to purchase list.");
      return;
    }

    try {
      await savePurchase({ barcode });
      setShowAddPurchasePopup(false);
      setBarcode("");
      setProductStatus("");
      setProductName("");
      setError("");
      showNotification("Purchase added successfully", "success");
    } catch (err) {
      console.error("Failed to add purchase:", err.message);
      setError(err.message || "Failed to add purchase");
    }
  };

  const handleClearTable = async () => {
    try {
      await deleteAllPurchases();
      setPurchases([]);
      setError("");
      showNotification("Purchase list cleared", "success");
    } catch (err) {
      console.error("Failed to clear purchases:", err.message);
      setError(err.message || "Failed to clear purchases");
    }
  };

  const handlePrintPurchase = () => {
    if (purchases.length === 0) {
      showNotification("No purchases to print", "error");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showNotification("Failed to open print window. Please allow popups.", "error");
      return;
    }

    const formattedDate = new Date().toLocaleString();
    const cashierName = localStorage.getItem("firstName") || "Unknown";
    const cashierLastName = localStorage.getItem("lastName") || "";
    const shopName = localStorage.getItem("shopName") || "";
    const branchName = localStorage.getItem("branchName") || "";
    const branchCode = localStorage.getItem("branchCode") || "";
    const address = localStorage.getItem("branchAddress") || "";
    const contactNumber = localStorage.getItem("branchContact") || "";

    printWindow.document.write(`
      <html>
        <head>
          <title>Purchase List Receipt</title>
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
            <p>Cashier: ${cashierName} ${cashierLastName}</p>
          </div>
          <p> Purchase List </p>
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
                  <td>${purchase.barcode}</td>
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

  const handlePrintXReport = () => {
    if (!xReportData || !xReportData.responseDto) return;

    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);

    const reportData = xReportData.responseDto;

    // Set receipt paper size (80mm or 57mm width, length is auto for POS printers)
    const paperWidth = '80mm'; // Options: '80mm' or '57mm'

    // Prepare data with fallbacks
    const startDate = reportData.startDate
      ? new Date(reportData.startDate).toLocaleDateString()
      : 'N/A';
    const endDate = reportData.endDate
      ? new Date(reportData.endDate).toLocaleDateString()
      : 'N/A';
    const generatedBy = reportData.reportGeneratedBy || 'Unknown';
    const totalSales = reportData.totalSales
      ? parseFloat(reportData.totalSales).toFixed(2)
      : '0.00';
    const totalTransactions = reportData.totalTransactions || 0;
    const categoryTotals = reportData.categoryTotals || {};
    const bankingCount = reportData.bankingCount || 0;
    const bankingTotal = reportData.bankingTotal
      ? parseFloat(reportData.bankingTotal).toFixed(2)
      : '0.00';
    const payoutCount = reportData.payoutCount || 0;
    const payoutTotal = reportData.payoutTotal
      ? parseFloat(reportData.payoutTotal).toFixed(2)
      : '0.00';
    const difference = reportData.difference
      ? parseFloat(reportData.difference).toFixed(2)
      : '0.00';

    // Handle overallPaymentTotals for Payment Methods
    const paymentMethods = reportData.overallPaymentTotals || {};
    const paymentEntries = typeof paymentMethods === 'object' && !Array.isArray(paymentMethods)
      ? Object.entries(paymentMethods)
      : [];

    // Calculate After Balance Cash for X Report
    const cashAmount = paymentMethods.Cash || 0;
    const afterBalanceCash = (cashAmount - parseFloat(difference)).toFixed(2);

    // Handle userPaymentDetails
    const userPaymentDetails = reportData.userPaymentDetails || [];

    printFrame.contentWindow.document.write(`
      <html>
        <head>
          <title>X Report - ${generatedBy}</title>
          <style>
            @media print {
              @page {
                size: ${paperWidth} auto;
                margin: 0;
              }
              body {
                margin: 0;
                padding: ${paperWidth === '57mm' ? '3px' : '5px'};
                width: ${paperWidth};
                font-family: 'Courier New', Courier, monospace;
                font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
                font-weight: bold;
                color: #000;
                box-sizing: border-box;
              }
            }
            body {
              font-family: 'Courier New', Courier, monospace;
              width: ${paperWidth};
              margin: 0 auto;
              padding: ${paperWidth === '57mm' ? '3px' : '5px'};
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
              line-height: 1.2;
              font-weight: bold;
              color: #000;
              text-align: center;
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 10px;
            }
            .receipt-title {
              font-size: ${paperWidth === '57mm' ? '14px' : '16px'};
              font-weight: bold;
              margin: 5px 0;
              letter-spacing: 1px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin: 3px 0;
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
            }
            .info-row span:last-child {
              font-weight: bold;
            }
            .section {
              margin: 10px 0;
              padding-bottom: 5px;
            }
            .section-title {
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
              font-weight: bold;
              text-align: center;
              margin: 8px 0;
              text-transform: uppercase;
              border-top: 1px dashed #000;
              border-bottom: 1px dashed #000;
              padding: 3px 0;
              letter-spacing: 1px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 5px 0;
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
            }
            th, td {
              padding: 2px 0;
              text-align: left;
              font-weight: bold;
            }
            th {
              text-transform: uppercase;
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
            }
            .amount {
              text-align: right;
            }
            .after-balance-row td {
              padding-top: 4px; /* Add spacing above After Balance Cash for clarity */
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 10px;
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
              border-top: 1px dashed #000;
              padding-top: 5px;
            }
            .divider {
              border-top: 1px dashed #000;
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <div class="receipt-title">X REPORT</div>
            <div>${startDate}</div>
            <div>Generated by: ${generatedBy}</div>
            <p>Till Name: ${tillName}</p>
            <div>Front Office</div>
          </div>
  
          <div class="section">
            <div class="info-row">
              <span>Period:</span>
              <span>${startDate} - ${endDate}</span>
            </div>
            <div class="info-row">
              <span>Total Sales:</span>
              <span>${totalSales}</span>
            </div>
            <div class="info-row">
              <span>Total Transactions:</span>
              <span>${totalTransactions}</span>
            </div>
          </div>
  
          <div class="section">
            <div class="section-title">CATEGORIES</div>
            <table>
              ${Object.keys(categoryTotals).length > 0
        ? Object.entries(categoryTotals)
          .map(([category, amount]) => `
                      <tr>
                        <td>${category}</td>
                        <td class="amount">${parseFloat(amount).toFixed(2)}</td>
                      </tr>
                    `)
          .join('')
        : '<tr><td colspan="2">No categories found</td></tr>'
      }
            </table>
          </div>
  
          <div class="section">
            <div class="section-title">PAYMENT METHODS</div>
            <table>
              ${paymentEntries.length > 0
        ? paymentEntries
          .map(([method, amount]) => `
                      <tr>
                        <td>${method}</td>
                        <td class="amount">${parseFloat(amount).toFixed(2)}</td>
                      </tr>
                    `)
          .join('')
        : '<tr><td colspan="2">No payment methods found</td></tr>'
      }
              <tr class="after-balance-row">
                <td>After Balance Cash</td>
                <td class="amount">${isNaN(afterBalanceCash) ? '0.00' : afterBalanceCash}</td>
              </tr>
            </table>
          </div>
  
          <div class="section">
            <div class="section-title">USER PAYMENT DETAILS</div>
            <table>
              ${userPaymentDetails.length > 0
        ? userPaymentDetails
          .map(user =>
            Object.entries(user.payments || {})
              .map(([method, amount]) => `
                          <tr>
                            <td>${user.userName.split(' ')[0]}</td>
                            <td>${method}</td>
                            <td class="amount">${parseFloat(amount).toFixed(2)}</td>
                          </tr>
                        `)
              .join('')
          )
          .join('')
        : '<tr><td colspan="3">No user payments found</td></tr>'
      }
            </table>
          </div>
  
          <div class="section">
            <div class="section-title">BANKING & PAYOUT DETAILS</div>
            <table>
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>COUNT</th>
                  <th class="amount">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Banking</td>
                  <td>${bankingCount}</td>
                  <td class="amount">${bankingTotal}</td>
                </tr>
                <tr>
                  <td>Payout</td>
                  <td>${payoutCount}</td>
                  <td class="amount">${payoutTotal}</td>
                </tr>
                <tr>
                  <td colspan="2">Difference</td>
                  <td class="amount">${difference}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div class="footer">
            <div>*** End of X Report ***</div>
            <div>Printed on ${new Date().toLocaleString()}</div>
          </div>
        </body>
      </html>
    `);

    printFrame.contentWindow.document.close();

    printFrame.onload = () => {
      printFrame.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    };
  };

  const handleCloseViewPurchasePopup = () => {
    setShowViewPurchasePopup(false);
    setPurchases([]);
    setError("");
  };

  const toggleDropdown = (transactionId) => {
    setExpandedTransactionId(expandedTransactionId === transactionId ? null : transactionId);
  };

  const handlePrintBill = async (transaction) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showNotification("Failed to open print window. Please allow popups for this site and try again.");
      return;
    }

    const formattedDate = transaction.dateTime && !isNaN(new Date(transaction.dateTime).getTime())
      ? new Date(transaction.dateTime).toLocaleString()
      : new Date().toLocaleString();

    const transactionId = transaction.id || 0;
    const formattedTransactionId = transactionId.toString().padStart(10, "0");

    const items = transaction.transactionDetailsList.map((detail) => ({
      qty: detail.quantity,
      name: detail.productDto?.name || "Unknown Item",
      price: detail.unitPrice,
      discount: detail.discount || 0,
      total: detail.quantity * detail.unitPrice,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const totalDiscount = items.reduce((sum, item) => sum + (item.discount || 0), 0);
    const manualDiscount = transaction.manualDiscount || 0;
    const employeeDiscount = transaction.employeeDiscount || 0;
    const totalTax = transaction.taxAmount || 0;
    const totalAfterDiscounts = subtotal - totalDiscount - manualDiscount - employeeDiscount;
    const grandTotal = totalAfterDiscounts + totalTax;

    const paymentMethods = transaction.transactionPaymentMethod.map((method) => ({
      type: method.paymentMethodDto?.type || "Unknown",
      amount: method.amount,
    }));

    const totalPaid = paymentMethods.reduce((sum, method) => sum + method.amount, 0);
    const balance = totalPaid - grandTotal;

    setCurrentTransactionId(formattedTransactionId);

    let barcodeDataUrl = "";
    try {
      if (barcodeRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const canvas = await html2canvas(barcodeRef.current, { scale: 2 });
        barcodeDataUrl = canvas.toDataURL("image/png");
      }
    } catch (error) {
      console.error("Failed to generate barcode image:", error);
      barcodeDataUrl = "";
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
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
            .receipt-items .total-column { text-align: right; }
            .receipt-footer { text-align: center; margin-top: 5px; }
            .receipt-footer p { margin: 2px 0; }
            .divider { border-top: 1px dashed #000; margin: 5px 0; }
            .barcode-container { text-align: center; margin: 5px 0; }
            .barcode-container img { width: 100%; height: 30px; }
            .spacing { height: 10px; }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <h2>${transaction.shopDetailsDto?.name || "Unknown Shop"}</h2>
            <p>${transaction.branchDto?.branchName || "Unknown Branch"}</p>
            <p>Branch Code: ${transaction.branchDto?.branchCode || "N/A"}</p>
            <p>Address: ${transaction.branchDto?.address || "N/A"}</p>
            <p>Contact: ${transaction.branchDto?.contactNumber || "N/A"}</p>
          </div>
          <div class="receipt-details">
            <p>Date: ${formattedDate}</p>
            <p>Till Name: ${tillName}</p>
            <p>Cashier: ${transaction.userDto?.firstName || "Unknown"} ${transaction.userDto?.lastName || ""}</p>
            <p>Customer: ${transaction.customerDto?.name || "Local Customer"}</p>
            <p>Transaction ID: ${formattedTransactionId}</p>
          </div>
          <div class="divider"></div>
          <table class="receipt-items">
            <thead>
              <tr>
                <th>Qty</th>
                <th>Item</th>
                <th>Price</th>
                <th class="total-column">Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.length > 0
        ? items.map(item => `
                    <tr>
                      <td>${item.qty}</td>
                      <td>${item.name}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td class="total-column">${item.total.toFixed(2)}</td>
                    </tr>
                  `).join('')
        : '<tr><td colspan="5">No items</td></tr>'
      }
            </tbody>
          </table>
          <div class="divider"></div>
          <div class="receipt-details">
            <p>Subtotal: ${priceSymbol}${subtotal.toFixed(2)}</p>
            ${totalDiscount > 0 ? `<p>Product Discount: ${priceSymbol}${totalDiscount.toFixed(2)}</p>` : ''}
            ${manualDiscount > 0 ? `<p>Manual Discount: -${priceSymbol}${manualDiscount.toFixed(2)}</p>` : ''}
            ${employeeDiscount > 0 ? `<p>Employee Discount: -${priceSymbol}${employeeDiscount.toFixed(2)}</p>` : ''}
            <p>Total Tax: ${priceSymbol}${totalTax.toFixed(2)}</p>
            <p>Grand Total: ${priceSymbol}${grandTotal.toFixed(2)}</p>
            ${paymentMethods.map(method => `
              <p>${method.type}: ${priceSymbol}${method.amount.toFixed(2)}</p>
            `).join('')}
            <p>Balance: ${priceSymbol}${balance.toFixed(2)}</p>
          </div>
          <div class="divider"></div>
          <div class="barcode-container">
            ${barcodeDataUrl ? `<img src="${barcodeDataUrl}" alt="Barcode" />` : '<p>Barcode failed to render</p>'}
          </div>
          <div class="divider"></div>
          <div class="receipt-footer">
            <p>Thank You for Shopping with Us!</p>
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

  const handlePrintZReport = () => {
    if (!zReportData || !zReportData.responseDto) {
      showNotification("No Z-Report data available to print", "error");
      return;
    }

    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);

    const reportData = zReportData.responseDto;

    // Set receipt paper size (80mm or 57mm width, length is auto for POS printers)
    const paperWidth = '80mm'; // Options: '80mm' or '57mm'

    // Prepare data with fallbacks
    const startDate = reportData.startDate
      ? new Date(reportData.startDate).toLocaleDateString()
      : 'N/A';
    const endDate = reportData.endDate
      ? new Date(reportData.endDate).toLocaleDateString()
      : 'N/A';
    const generatedBy = reportData.reportGeneratedBy || 'Unknown';
    const fullyTotalSales = reportData.fullyTotalSales
      ? parseFloat(reportData.fullyTotalSales).toFixed(2)
      : '0.00';
    const bankingCount = reportData.bankingCount || 0;
    const bankingTotal = reportData.bankingTotal
      ? parseFloat(reportData.bankingTotal).toFixed(2)
      : '0.00';
    const payoutCount = reportData.payoutCount || 0;
    const payoutTotal = reportData.payoutTotal
      ? parseFloat(reportData.payoutTotal).toFixed(2)
      : '0.00';
    const difference = reportData.difference
      ? parseFloat(reportData.difference).toFixed(2)
      : '0.00';
    const dateWiseTotals = reportData.dateWiseTotals || {};

    printFrame.contentWindow.document.write(`
      <html>
        <head>
          <title>Z Report - ${generatedBy}</title>
          <style>
            @media print {
              @page {
                size: ${paperWidth} auto;
                margin: 0;
              }
              body {
                margin: 0;
                padding: ${paperWidth === '57mm' ? '3px' : '5px'};
                width: ${paperWidth};
                font-family: 'Courier New', Courier, monospace;
                font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
                font-weight: bold;
                color: #000;
                box-sizing: border-box;
              }
            }
            body {
              font-family: 'Courier New', Courier, monospace;
              width: ${paperWidth};
              margin: 0 auto;
              padding: ${paperWidth === '57mm' ? '3px' : '5px'};
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
              line-height: 1.2;
              font-weight: bold;
              color: #000;
              text-align: center;
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 10px;
            }
            .receipt-title {
              font-size: ${paperWidth === '57mm' ? '14px' : '16px'};
              font-weight: bold;
              margin: 5px 0;
              letter-spacing: 1px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin: 3px 0;
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
            }
            .info-row span:last-child {
              font-weight: bold;
            }
            .section {
              margin: 10px 0;
              padding-bottom: 5px;
            }
            .section-title {
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
              font-weight: bold;
              text-align: center;
              margin: 8px 0;
              text-transform: uppercase;
              border-top: 1px dashed #000;
              border-bottom: 1px dashed #000;
              padding: 3px 0;
              letter-spacing: 1px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 5px 0;
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
            }
            th, td {
              padding: 2px 0;
              text-align: left;
              font-weight: bold;
            }
            th {
              text-transform: uppercase;
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
            }
            .amount {
              text-align: right;
            }
            .after-balance-row td {
              padding-top: 4px; /* Add spacing above After Balance Cash for clarity */
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 10px;
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
              border-top: 1px dashed #000;
              padding-top: 5px;
            }
            .divider {
              border-top: 1px dashed #000;
              margin: 5px 0;
            }
            .date-header {
              font-size: ${paperWidth === '57mm' ? '10px' : '12px'};
              font-weight: bold;
              text-align: center;
              margin: 8px 0;
              border-top: 1px dashed #000;
              border-bottom: 1px dashed #000;
              padding: 3px 0;
            }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <div class="receipt-title">Z REPORT</div>
            <div>${startDate}</div>
            <div>Generated by: ${generatedBy}</div>
            <p>Till Name: ${tillName}</p>
            <div>Front Office</div>
          </div>
  
          <div class="section">
            <div class="info-row">
              <span>Period:</span>
              <span>${startDate} - ${endDate}</span>
            </div>
            <div class="info-row">
              <span>Total Sales:</span>
              <span>${fullyTotalSales}</span>
            </div>
          </div>
  
          <div class="section">
            <div class="section-title">BANKING & PAYOUT DETAILS</div>
            <table>
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>COUNT</th>
                  <th class="amount">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Banking</td>
                  <td>${bankingCount}</td>
                  <td class="amount">${priceSymbol}${bankingTotal}</td>
                </tr>
                <tr>
                  <td>Payout</td>
                  <td>${payoutCount}</td>
                  <td class="amount">${priceSymbol}${payoutTotal}</td>
                </tr>
                <tr>
                  <td colspan="2">Difference</td>
                  <td class="amount">${priceSymbol}${difference}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          ${Object.entries(dateWiseTotals)
        .map(([date, data]) => {
          const categoryTotals = data.categoryTotals || {};
          const overallPaymentTotals = data.overallPaymentTotals || {};
          const userPaymentDetails = data.userPaymentDetails || {};

          // Fallback to top-level difference if date-specific difference is incorrect
          const cashAmount = overallPaymentTotals.Cash ? parseFloat(overallPaymentTotals.Cash) : 0.0;
          const dateDifference = data.difference && !isNaN(parseFloat(data.difference)) ? parseFloat(data.difference) : parseFloat(difference);
          const afterBalanceCash = (cashAmount - dateDifference).toFixed(2);

          // Debug logging to verify values
          console.log(`Z Report Print - Date: ${date}, Cash: ${cashAmount}, Difference: ${dateDifference}, After Balance Cash: ${afterBalanceCash}`);

          return `
                <div class="section">
                  <div class="date-header">Date: ${new Date(date).toLocaleDateString()}</div>
  
                  <div class="section">
                    <div class="section-title">CATEGORIES BREAKDOWN</div>
                    <table>
                      ${Object.keys(categoryTotals).length > 0
              ? Object.entries(categoryTotals)
                .map(([category, amount]) => `
                              <tr>
                                <td>${category}</td>
                                <td class="amount">${parseFloat(amount).toFixed(2)}</td>
                              </tr>
                            `)
                .join('')
              : '<tr><td colspan="2">No categories found</td></tr>'
            }
                    </table>
                  </div>
  
                  <div class="section">
                    <div class="section-title">PAYMENT METHODS</div>
                    <table>
                      ${Object.keys(overallPaymentTotals).length > 0
              ? Object.entries(overallPaymentTotals)
                .map(([method, amount]) => `
                              <tr>
                                <td>${method}</td>
                                <td class="amount">${parseFloat(amount).toFixed(2)}</td>
                              </tr>
                            `)
                .join('')
              : '<tr><td colspan="2">No payment methods found</td></tr>'
            }
                      <tr class="after-balance-row">
                        <td>After Balance Cash</td>
                        <td class="amount">${priceSymbol}${afterBalanceCash}</td>
                      </tr>
                    </table>
                  </div>
  
                  <div class="section">
                    <div class="section-title">USER PAYMENT DETAILS</div>
                    <table>
                      ${Object.keys(userPaymentDetails).length > 0
              ? Object.entries(userPaymentDetails)
                .map(([userName, payments]) =>
                  Object.entries(payments)
                    .map(([method, amount]) => `
                                  <tr>
                                    <td>${userName}</td>
                                    <td>${method}</td>
                                    <td class="amount">${parseFloat(amount).toFixed(2)}</td>
                                  </tr>
                                `)
                    .join('')
                )
                .join('')
              : '<tr><td colspan="3">No user payments found</td></tr>'
            }
                    </table>
                  </div>
                </div>
              `;
        })
        .join('')}
  
          <div class="footer">
            <div>*** End of Z Report ***</div>
            <div>Printed on ${new Date().toLocaleString()}</div>
          </div>
        </body>
      </html>
    `);

    printFrame.contentWindow.document.close();

    printFrame.onload = () => {
      try {
        printFrame.contentWindow.print();
      } catch (error) {
        console.error('Error during printing:', error);
        showNotification('Failed to print Z-Report. Please try again.', 'error');
      } finally {
        setTimeout(() => {
          if (printFrame && document.body.contains(printFrame)) {
            document.body.removeChild(printFrame);
          }
        }, 2000);
      }
    };
  };

  const totalSalesPages = MAX_PAGES;

  return (
    <div className="pos-category-grid-container">
      <div className="grid grid-cols-5 gap-2">
        {paginatedItems.map(renderCategoryButton)}
      </div>
      {showBarcodePopup && (
        <Pos_BarcodeCreation onClose={() => setShowBarcodePopup(false)} />
      )}
      {showAddPurchasePopup && (
        <div className="purchase-popup-overlay">
          <div className="purchase-popup">
            <div className="purchase-popup-header">
              <h2 className="purchase-popup-title">Add Purchase List</h2>
              <button
                onClick={() => { 
                  setShowAddPurchasePopup(false);
                  setBarcode("");
                  setProductStatus("");
                  setProductName("");
                  setError("");
                }}
                className="purchase-popup-close"
              >
                ×
              </button>
            </div>
            <div className="purchase-popup-input-container">
              <input
                type="text"
                value={barcode}
                onChange={handleBarcodeChange}
                onKeyDown={handleBarcodeKeyDown}
                placeholder="Enter barcode number"
                className="purchase-popup-input"
              />
              <p className="purchase-popup-status">
                {productStatus || "Scan barcode"}
              </p>
              {error && (
                <p className="purchase-popup-status" style={{ color: "red" }}>
                  {error}
                </p>
              )}
            </div>
            <div className="purchase-popup-actions">
              <div className="purchase-popup-actions-left">
                {getUserRole() !== "USER" && (
                  <button
                    onClick={handleClearTable}
                    disabled={purchases.length === 0}
                    className="purchase-popup-button clear"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="purchase-popup-actions-right">
                <button
                  onClick={handleAddPurchase}
                  className="purchase-popup-button add"
                  disabled={!productName} // Disable if no product found
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showViewPurchasePopup && (
        <div className="purchase-popup-overlay">
          <div className="purchase-popup">
            <div className="purchase-popup-header">
              <h2 className="purchase-popup-title">View Purchase List</h2>
              <button
                onClick={handleCloseViewPurchasePopup}
                className="purchase-popup-close"
              >
                ×
              </button>
            </div>
            <div className="purchase-popup-table-container">
              <table className="purchase-popup-table">
                <thead>
                  <tr>
                    <th>Barcode</th>
                    <th>Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.length > 0 ? (
                    purchases.map((purchase) => (
                      <tr key={purchase.barcode}>
                        <td>{purchase.barcode}</td>
                        <td>{purchase.productName || "Unknown Product"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="no-data">
                        {error || "No purchases found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="purchase-popup-actions">
              <div className="purchase-popup-actions-left">
                {getUserRole() !== "USER" && (
                  <button
                    onClick={handleClearTable}
                    disabled={purchases.length === 0}
                    className="purchase-popup-button clear"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="purchase-popup-actions-right">
                <button
                  onClick={handlePrintPurchase}
                  disabled={purchases.length === 0}
                  className="purchase-popup-button print"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSalesListPopup && (
        <div className="sales-popup-overlay">
          <div className="sales-popup">
            <h2 className="sales-popup-title">Sales List</h2>
            {transactions.length > 0 ? (
              <>
                <div className="sales-table-container">
                  <table className="sales-table">
                    <thead>
                      <tr>
                        <th>Transaction ID</th>
                        <th>Branch Name</th>
                        <th>Shop Name</th>
                        <th>User Name</th>
                        <th>Customer Name</th>
                        <th>Tax Amount</th>
                        <th>Total Amount</th>
                        <th>Date Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, index) => (
                        <React.Fragment key={transaction.id}>
                          <tr className={index % 2 === 0 ? "even-row" : "odd-row"}>
                            <td>{String(transaction.id).padStart(10, "0")}</td>
                            <td>{transaction.branchDto?.branchName || "N/A"}</td>
                            <td>{transaction.shopDetailsDto?.name || "N/A"}</td>
                            <td>{transaction.userDto?.firstName || "N/A"}</td>
                            <td>{transaction.customerDto?.name || "N/A"}</td>
                            <td>{parseFloat(transaction.taxAmount || 0).toFixed(2)}</td>
                            <td>{parseFloat(transaction.totalAmount || 0).toFixed(2)}</td>
                            <td>
                              {transaction.dateTime
                                ? new Date(transaction.dateTime).toLocaleString()
                                : "N/A"}
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button
                                  onClick={() => handlePrintBill(transaction)}
                                  className="action-btn print-btn"
                                  title="Print Receipt"
                                >
                                  <svg
                                    className="action-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => toggleDropdown(transaction.id)}
                                  className="action-btn view-btn"
                                  title="View Details"
                                >
                                  <svg
                                    className="action-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                          {expandedTransactionId === transaction.id && (
                            <tr>
                              <td colSpan="8">
                                <div className="dropdown-details">
                                  <div className="details-section">
                                    <h6>Transaction Items</h6>
                                    <table className="details-table items-table">
                                      <thead>
                                        <tr>
                                          <th>Product Name</th>
                                          <th>Barcode</th>
                                          <th>Unit Price</th>
                                          <th>Quantity</th>
                                          <th>Discount</th>
                                          <th>Total</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {transaction.transactionDetailsList &&
                                          transaction.transactionDetailsList.length > 0 ? (
                                          transaction.transactionDetailsList.map((item, index) => (
                                            <tr key={index}>
                                              <td>{item.productDto?.name || "N/A"}</td>
                                              <td>{item.productDto?.barcode || "N/A"}</td>
                                              <td>{parseFloat(item.unitPrice || 0).toFixed(2)}</td>
                                              <td>{item.quantity || 0}</td>
                                              <td>{parseFloat(item.discount || 0).toFixed(2)}</td>
                                              <td>{parseFloat((item.unitPrice * item.quantity) - (item.discount || 0)).toFixed(2)}</td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <td colSpan="6" className="no-data">
                                              No items found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="details-section">
                                    <h6>Payment Methods</h6>
                                    <table className="details-table payment-table">
                                      <thead>
                                        <tr>
                                          <th>Payment Type</th>
                                          <th>Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {transaction.transactionPaymentMethod &&
                                          transaction.transactionPaymentMethod.length > 0 ? (
                                          transaction.transactionPaymentMethod.map((payment, index) => (
                                            <tr key={index}>
                                              <td>{payment.paymentMethodDto?.type || "N/A"}</td>
                                              <td>{parseFloat(payment.amount || 0).toFixed(2)}</td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <td colSpan="2" className="no-data">
                                              No payment methods found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="sales-footer">
                  <div className="sales-pagination">
                    <div className="pagination-center">
                      <button
                        onClick={() => setSalesPageIndex(salesPageIndex - 1)}
                        disabled={salesPageIndex === 0}
                        className="pagination-btn"
                      >
                        Previous
                      </button>
                      <span>
                        Page {salesPageIndex + 1} of {totalSalesPages}
                      </span>
                      <button
                        onClick={() => setSalesPageIndex(salesPageIndex + 1)}
                        disabled={salesPageIndex === totalSalesPages - 1 || transactions.length < SALES_PAGE_SIZE}
                        className="pagination-btn"
                      >
                        Next
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setShowSalesListPopup(false);
                        setTransactions([]);
                        setExpandedTransactionId(null);
                        setSalesPageIndex(0);
                      }}
                      className="pagination-btn close-btn"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p className="sales-popup-message">No transactions found</p>
            )}
          </div>
        </div>
      )}
      {showXReportPopup && xReportData && xReportData.responseDto && (
        <div className="purchase-popup-overlay">
          <div
            ref={popupRef}
            className="purchase-popup simple-popup"
            style={{
              maxWidth: '1200px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="purchase-popup-title">X Report Details</h2>
              <div className="d-flex gap-2">
                <button className="btn btn-added" onClick={handlePrintXReport}>
                  <Printer className="me-2" /> Print
                </button>
                <button
                  onClick={() => {
                    setShowXReportPopup(false);
                    setXReportData(null);
                  }}
                  className="btn btn-danger"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="row" style={{ marginBottom: '20px' }}>
                  <div className="col-md-6">
                    <h4>Report Information</h4>
                    <p><strong>Generated By:</strong> {xReportData.responseDto.reportGeneratedBy}</p>
                    <p><strong>Total Sales:</strong> {xReportData.responseDto.totalSales.toFixed(2)}</p>
                    <p><strong>Total Transactions:</strong> {xReportData.responseDto.totalTransactions}</p>
                  </div>
                  <div className="col-md-6">
                    <h4>Report Period</h4>
                    <p><strong>From:</strong> {new Date(xReportData.responseDto.startDate).toLocaleString()}</p>
                    <p><strong>To:</strong> {new Date(xReportData.responseDto.endDate).toLocaleString()}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h4>Banking & Payout Details</h4>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Count</th>
                          <th className="amount">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Banking</td>
                          <td>{xReportData.responseDto.bankingCount || 0}</td>
                          <td className="amount">{xReportData.responseDto.bankingTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Payout</td>
                          <td>{xReportData.responseDto.payoutCount || 0}</td>
                          <td className="amount">{xReportData.responseDto.payoutTotal.toFixed(2)}</td>
                        </tr>
                        <tr className="total-row">
                          <td colSpan="2">Difference</td>
                          <td className="amount">{xReportData.responseDto.difference.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h4>Categories Breakdown</h4>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th className="amount">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(xReportData.responseDto.categoryTotals).map(([category, amount]) => (
                          <tr key={category}>
                            <td>{category}</td>
                            <td className="amount">{amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h4>Payment Methods</h4>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Method</th>
                          <th className="amount">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(xReportData.responseDto.overallPaymentTotals).map(([method, amount]) => (
                          <tr key={method}>
                            <td>{method}</td>
                            <td className="amount">{amount.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td>After Balance Cash</td>
                          <td className="amount">{isNaN((xReportData.responseDto.overallPaymentTotals.Cash || 0) - (xReportData.responseDto.difference || 0)) ? '0.00' : ((xReportData.responseDto.overallPaymentTotals.Cash || 0) - (xReportData.responseDto.difference || 0)).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-12">
                    <h4>User Payment Details</h4>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th style={{ backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '2px solid #dee2e6' }}>User Name</th>
                            <th style={{ backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '2px solid #dee2e6' }}>Payment Method</th>
                            <th style={{ backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '2px solid #dee2e6' }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {xReportData.responseDto.userPaymentDetails.map((user) => {
                            // Debug log for After Balance Cash calculation
                            const cashAmount = xReportData.responseDto.overallPaymentTotals.Cash || 0;
                            const difference = xReportData.responseDto.difference || 0;
                            const afterBalanceCash = (cashAmount - difference).toFixed(2);
                            console.log(`X Report Popup - Cash: ${cashAmount}, Difference: ${difference}, After Balance Cash: ${afterBalanceCash}`);

                            return Object.entries(user.payments).map(([method, amount]) => (
                              <tr key={`${user.userName}-${method}`}>
                                <td style={{ padding: '12px 15px' }}>{user.userName.split(' ')[0]}</td>
                                <td style={{ padding: '12px 15px' }}>{method}</td>
                                <td style={{ padding: '12px 15px' }}>{amount.toFixed(2)}</td>
                              </tr>
                            ));
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showZReportPopup && zReportData && zReportData.responseDto && (
        <div className="purchase-popup-overlay">
          <div
            ref={popupRef}
            className="purchase-popup simple-popup"
            style={{
              maxWidth: '1200px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="purchase-popup-title">Z Report Details</h2>
              <div className="d-flex gap-2">
                <button className="btn btn-added" onClick={handlePrintZReport}>
                  <Printer className="me-2" /> Print
                </button>
                <button
                  onClick={() => {
                    setShowZReportPopup(false);
                    setZReportData(null);
                  }}
                  className="btn btn-danger"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="row" style={{ marginBottom: '20px' }}>
                  <div className="col-md-6">
                    <h4>Report Information</h4>
                    <p><strong>Generated By:</strong> {zReportData.responseDto.reportGeneratedBy}</p>
                    <p><strong>Total Sales:</strong> {zReportData.responseDto.fullyTotalSales.toFixed(2)}</p>
                  </div>
                  <div className="col-md-6">
                    <h4>Report Period</h4>
                    <p><strong>From:</strong> {new Date(zReportData.responseDto.startDate).toLocaleString()}</p>
                    <p><strong>To:</strong> {new Date(zReportData.responseDto.endDate).toLocaleString()}</p>
                  </div>
                </div>

                <div className="section">
                  <h4>Banking & Payout Details</h4>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Count</th>
                        <th className="amount">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Banking</td>
                        <td>{zReportData.responseDto.bankingCount || 0}</td>
                        <td className="amount">{priceSymbol}{zReportData.responseDto.bankingTotal}</td>
                      </tr>
                      <tr>
                        <td>Payout</td>
                        <td>{zReportData.responseDto.payoutCount || 0}</td>
                        <td className="amount">{priceSymbol}{zReportData.responseDto.payoutTotal}</td>
                      </tr>
                      <tr className="total-row">
                        <td colSpan="2">Difference</td>
                        <td className="amount">{priceSymbol}{zReportData.responseDto.difference}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {Object.entries(zReportData.responseDto.dateWiseTotals).map(([date, data]) => {
                  // Explicitly parse values to ensure correct calculation
                  const cashAmount = data.overallPaymentTotals.Cash ? parseFloat(data.overallPaymentTotals.Cash) : 0.0;
                  // Fallback to top-level difference if date-specific difference is invalid
                  const difference = data.difference && !isNaN(parseFloat(data.difference)) ? parseFloat(data.difference) : parseFloat(zReportData.responseDto.difference || 0.0);
                  const afterBalanceCash = (cashAmount - difference).toFixed(2);

                  // Debug log to verify values
                  console.log(`Popup - Date: ${date}, Cash: ${cashAmount}, Difference: ${difference}, After Balance Cash: ${afterBalanceCash}`);

                  return (
                    <div key={date} className="mb-4">
                      <h4 className="date-header">Date: {new Date(date).toLocaleDateString()}</h4>

                      <div className="row">
                        <div className="col-md-6">
                          <h4>Categories Breakdown</h4>
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Category</th>
                                <th className="amount">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(data.categoryTotals).map(([category, amount]) => (
                                <tr key={category}>
                                  <td>{category}</td>
                                  <td className="amount">{priceSymbol}{parseFloat(amount).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="col-md-6">
                          <h4>Payment Methods</h4>
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Method</th>
                                <th className="amount">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(data.overallPaymentTotals).map(([method, amount]) => (
                                <tr key={method}>
                                  <td>{method}</td>
                                  <td className="amount">{priceSymbol}{parseFloat(amount).toFixed(2)}</td>
                                </tr>
                              ))}
                              <tr className="after-balance-row">
                                <td>After Balance Cash</td>
                                <td className="amount">{priceSymbol}{afterBalanceCash}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12">
                          <h4>User Payment Details</h4>
                          <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                              <thead>
                                <tr>
                                  <th style={{ backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '2px solid #dee2e6' }}>User Name</th>
                                  <th style={{ backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '2px solid #dee2e6' }}>Payment Method</th>
                                  <th style={{ backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '2px solid #dee2e6' }}>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(data.userPaymentDetails).map(([userName, payments]) =>
                                  Object.entries(payments).map(([method, amount]) => (
                                    <tr key={`${userName}-${method}`}>
                                      <td style={{ padding: '12px 15px' }}>{userName}</td>
                                      <td style={{ padding: '12px 15px' }}>{method}</td>
                                      <td style={{ padding: '12px 15px' }}>{priceSymbol}{parseFloat(amount).toFixed(2)}</td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {showRequestLeavePopup && (
        <Pos_RequestLeave onClose={() => setShowRequestLeavePopup(false)} />
      )}
      {showEmployeeDiscountPopup && (
        <div className="popup-overlay">
          <Pos_EmployeeDiscountPopup
            onClose={() => setShowEmployeeDiscountPopup(false)}
            onApplyDiscount={(empId, empName, discountPercentage) => {
              const grandTotal = selectedItems.reduce((sum, item) => sum + item.total, 0);
              const totalAfterManualDiscount = grandTotal - manualDiscount;
              const discountAmount = (discountPercentage / 100) * totalAfterManualDiscount;

              onEmployeeDiscount(discountAmount, empId, discountPercentage);
              showNotification(`Employee discount (${discountPercentage}%) applied for ${empName}`, "success");
            }}
            darkMode={false}
            discountPercentage={employeeDiscounts[0]?.discount || 0}
          />
        </div>
      )}
      <div style={{ position: "absolute", left: "-9999px" }}>
        <div ref={barcodeRef}>
          <Barcode
            value={currentTransactionId}
            format="CODE128"
            width={1}
            height={30}
            displayValue={false}
          />
        </div>
      </div>
    </div>
  );
});

Pos_CategoryGrid.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ),
    PropTypes.func,
  ]),
  onCategorySelect: PropTypes.func.isRequired,
  onManualDiscount: PropTypes.func.isRequired,
  onEmployeeDiscount: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      qty: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  manualDiscount: PropTypes.number,
};

Pos_CategoryGrid.displayName = "Pos_CategoryGrid";

export default Pos_CategoryGrid;