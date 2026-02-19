import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../../style/scss/components/Pos Components/Pos_Calculator.scss";
import { getAllManagerToggles } from "../../Api/ManagerToggle";

export const Pos_Calculator = ({
  darkMode,
  selectedItems,
  totalValue,
  inputScreenText,
  onBarcodeSearch,
  barcodeInput,
  setBarcodeInput,
  customerName,
  barcodeInputRef,
  paymentMethods,
  balance,
  selectedRowIndex,
  onRowSelect,
  isPaymentStarted,
  manualDiscount,
  manualDiscounts,
  employeeDiscount,
  employeeDiscountPercentage,
  employeeName,
  isAgeRestrictionEnabled,
}) => {
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);
  const priceSymbol = localStorage.getItem("priceSymbol") || "$";

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

  const handleBarcodeChange = (e) => {
    const value = e.target.value.trim();
    setBarcodeInput(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && barcodeInput) {
      onBarcodeSearch(barcodeInput);
      setBarcodeInput("");
    }
  };

  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, [barcodeInputRef]);

  useEffect(() => {
    if (barcodeInput.length >= 3) {
      const timer = setTimeout(() => {
        onBarcodeSearch(barcodeInput);
        setBarcodeInput("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [barcodeInput, onBarcodeSearch, setBarcodeInput]);

  const cashTotal = paymentMethods
    .filter((method) => method.type === "Cash")
    .reduce((sum, method) => sum + method.amount, 0);
  const cardPayments = paymentMethods.filter((method) => method.type === "Card");

  const totalTax = isTaxEnabled ? selectedItems.reduce((sum, item) => {
    const itemPrice = item.originalPrice || item.price;
    const itemTotal = itemPrice * item.qty;
    const itemTax = (itemTotal * (item.taxDto?.taxPercentage || 0)) / 100;
    return sum + itemTax;
  }, 0) : 0;

  const displayItems = isPaymentStarted
    ? [
        ...selectedItems,
        ...(manualDiscounts.length > 0
          ? manualDiscounts.map((discount, index) => ({
              id: `manual-discount-${index}`,
              name: "Manual Discount",
              qty: 1,
              price: -discount,
              total: -discount,
              type: "Discount",
            }))
          : []),
        ...(employeeDiscount > 0
          ? [{
              id: 'employee-discount',
              name: `Employee Discount (${employeeDiscountPercentage.toFixed(1)}%)`,
              qty: 1,
              price: -employeeDiscount,
              total: -employeeDiscount,
              type: "EmployeeDiscount",
            }]
          : []),
        ...(cashTotal > 0
          ? [
              {
                id: `payment-cash`,
                name: `Cash Payment`,
                qty: 1,
                price: cashTotal,
                total: cashTotal,
                type: "Cash",
              },
            ]
          : []),
        ...(cardPayments.length > 0
          ? cardPayments.map((method, index) => ({
              id: `payment-card-${index}`,
              name: `${method.type} Payment`,
              qty: 1,
              price: method.amount,
              total: method.amount,
              type: "Card",
            }))
          : []),
      ]
    : [
        ...selectedItems,
        ...(manualDiscounts.length > 0
          ? manualDiscounts.map((discount, index) => ({
              id: `manual-discount-${index}`,
              name: "Manual Discount",
              qty: 1,
              price: -discount,
              total: -discount,
              type: "Discount",
            }))
          : []),
        ...(employeeDiscount > 0
          ? [{
              id: 'employee-discount',
              name: `Employee Discount (${employeeDiscountPercentage.toFixed(1)}%)`,
              qty: 1,
              price: -employeeDiscount,
              total: -employeeDiscount,
              type: "EmployeeDiscount",
            }]
          : []),
      ];

  const reversedDisplayItems = [...displayItems].reverse();
  
  // Calculate grand total (after discounts and including tax)
  const grandTotal = totalValue - manualDiscount - employeeDiscount + totalTax;
  
  // Calculate total payments
  const totalPayments = cashTotal + cardPayments.reduce((sum, method) => sum + method.amount, 0);
  
  // Determine if balance should be displayed as negative (when overpaid)
  const displayBalance = isPaymentStarted ? balance : 0;
  const isOverpaid = totalPayments > grandTotal;

  return (
    <div className={`calculator-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Scan barcode"
          className="search-input"
          value={barcodeInput}
          onChange={handleBarcodeChange}
          onKeyPress={handleKeyPress}
          ref={barcodeInputRef}
        />
        <span className="search-icon">
          <i className="feather-search" />
        </span>
      </div>

      <div className="input-screen-box">
        <div className="input-screen-text">{inputScreenText || ""}</div>
      </div>

      <div className="display-box">
        <div className="table-container">
          <div className="result-table">
            <div className="result-header">
              <span className="qty-column">Qty</span>
              <span className="item-column">Item</span>
              <span className="price-column">Price</span>
              <span className="total-column">Total</span>
            </div>
            {reversedDisplayItems.length > 0 &&
              reversedDisplayItems.map((item, index) => (
                <div
                  key={`${item.type || 'item'}-${item.id || index}-${item.name}-${index}`}
                  className={`result-row 
                    ${selectedRowIndex === (reversedDisplayItems.length - 1 - index) ? "selected" : ""}
                    ${item.type === "Cash" ? "cash-row" : ""}
                    ${item.type === "Card" ? "card-row" : ""}
                    ${item.type === "Discount" ? "discount-row" : ""}
                    ${item.type === "EmployeeDiscount" ? "discount-row" : ""}
                    ${isAgeRestrictionEnabled && item.ageRestricted ? "age-restricted-row" : ""}
                  `}
                  onClick={() => onRowSelect(reversedDisplayItems.length - 1 - index)}
                >
                  <span className="qty-column">{item.qty}</span>
                  <span className="item-column">
                    {item.name}
                    {isAgeRestrictionEnabled && item.ageRestricted && (
                      <span className="age-restricted-badge">Age Restricted</span>
                    )}
                  </span>
                  <span className="price-column">
                    {priceSymbol}{(item.originalPrice || item.price).toFixed(2)}
                  </span>
                  <span className="total-column">
                    {item.originalPrice && item.originalPrice !== item.price ? (
                      <>
                        <span className="original-price" style={{ textDecoration: "line-through", color: "#999" }}>
                          {priceSymbol}{(item.originalPrice * item.qty).toFixed(2)}
                        </span>{" "}
                        <span className="discounted-price">{priceSymbol}{item.total.toFixed(2)}</span>
                      </>
                    ) : (
                      `${priceSymbol}${item.total.toFixed(2)}`
                    )}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="summary-box">
        {customerName && (
          <div className="summary-item customer-name-box">
            <span className="label">Customer Name</span>
            <span className="value">{customerName}</span>
          </div>
        )}
        <div className="summary-item">
          <span className="label">Total Qty</span>
          <span className="value">{selectedItems.reduce((sum, item) => sum + item.qty, 0)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Cash Back</span>
          <span className="value">{priceSymbol}0.00</span>
        </div>
        <div className="summary-item">
          <span className="label">Discount</span>
          <span className="value">{priceSymbol}{(manualDiscount + employeeDiscount).toFixed(2)}</span>
        </div>
        {manualDiscount > 0 && (
          <div className="summary-item">
            <span className="label">Manual Discount</span>
            <span className="value">{priceSymbol}{manualDiscount.toFixed(2)}</span>
          </div>
        )}
        {employeeDiscount > 0 && (
          <div className="summary-item">
            <span className="label">Employee Discount ({employeeDiscountPercentage.toFixed(1)}%)</span>
            <span className="value">{employeeName ? `(${employeeName})` : ""}</span>
            <span className="value">{priceSymbol}{employeeDiscount.toFixed(2)}</span>
          </div>
        )}
        {isTaxEnabled && (
          <div className="summary-item">
            <span className="label">Total Tax</span>
            <span className="value">{priceSymbol}{totalTax.toFixed(2)}</span>
          </div>
        )}
        <div className="summary-item">
          <span className="label">Balance</span>
          <span className={`value ${isOverpaid ? "green-text" : "red-text"}`}>
            {isOverpaid ? "- " : ""}{priceSymbol}{Math.abs(displayBalance).toFixed(2)}
          </span>
        </div>
        <div className="divider" />
        <div className="total-summary">
          <span className="label">Grand Total</span>
          <span className="value">{priceSymbol}{grandTotal.toFixed(2)}</span>
        </div>
        {cashTotal > 0 && (
          <div className="summary-item">
            <span className="label">Cash</span>
            <span className="value">{priceSymbol}{cashTotal.toFixed(2)}</span>
          </div>
        )}
        {cardPayments.length > 0 && cardPayments.map((method, index) => (
          <div key={index} className="summary-item">
            <span className="label">Card</span>
            <span className="value">{priceSymbol}{method.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

Pos_Calculator.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      qty: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      discount: PropTypes.number,
      discountType: PropTypes.string,
    })
  ).isRequired,
  totalValue: PropTypes.number.isRequired,
  inputScreenText: PropTypes.string,
  onBarcodeSearch: PropTypes.func.isRequired,
  barcodeInput: PropTypes.string.isRequired,
  setBarcodeInput: PropTypes.func.isRequired,
  customerName: PropTypes.string,
  barcodeInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      amount: PropTypes.number,
    })
  ).isRequired,
  balance: PropTypes.number.isRequired,
  selectedRowIndex: PropTypes.number,
  onRowSelect: PropTypes.func.isRequired,
  isPaymentStarted: PropTypes.bool.isRequired,
  manualDiscount: PropTypes.number.isRequired,
  manualDiscounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  employeeDiscount: PropTypes.number.isRequired,
  employeeDiscountPercentage: PropTypes.number.isRequired,
  employeeName: PropTypes.string,
  isAgeRestrictionEnabled: PropTypes.bool,
};

export default Pos_Calculator;