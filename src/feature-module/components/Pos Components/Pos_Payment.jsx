import React from "react";
import PropTypes from "prop-types";
import "../../../style/scss/components/Pos Components/Pos_Payment.scss";

const Pos_Payment = ({
  inputValue,
  resetInput,
  setPaymentMethods,
  totalValue,
  setIsPaymentStarted,
  paymentMethods,
  showNotification,
  manualDiscount,
  employeeDiscount,
  selectedItems
}) => {
  const handlePayment = (type) => {
    if (selectedItems.length === 0) {
      showNotification("Please add items before making payment", "error");
      return;
    }

    // Calculate total tax
    const totalTax = selectedItems.reduce((sum, item) => {
      const itemPrice = item.originalPrice || item.price;
      const itemTotal = itemPrice * item.qty;
      const itemTax = (itemTotal * (item.taxDto?.taxPercentage || 0)) / 100;
      return sum + itemTax;
    }, 0);

    // Calculate grand total including tax
    const grandTotal = totalValue - manualDiscount - employeeDiscount + totalTax;

    // If no amount entered, use the grand total
    const parsedInput = parseFloat(inputValue);
    const amount = (!parsedInput || parsedInput <= 0) ? grandTotal : parsedInput;

    const existingPayments = paymentMethods.reduce((sum, method) => sum + method.amount, 0);
    const remainingTotal = grandTotal - existingPayments;

    if (amount <= 0) {
      showNotification("Invalid payment amount", "error");
      return;
    }

    if (amount > remainingTotal && type === "Card") {
      showNotification("Card payment cannot exceed the remaining balance", "error");
      return;
    }

    setPaymentMethods((prev) => [...prev, { type, amount }]);
    setIsPaymentStarted(true);
    resetInput();
  };

  return (
    <div className="col-span-3 grid grid-rows-2 gap-1">
      <button
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg text-base font-bold transition-colors shadow-md hover:shadow-lg border-0"
        onClick={() => handlePayment("Cash")}
      >
        💵 Cash
      </button>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-base font-bold transition-colors shadow-md hover:shadow-lg border-0"
        onClick={() => handlePayment("Card")}
      >
        💳 Card
      </button>
    </div>
  );
};

Pos_Payment.propTypes = {
  inputValue: PropTypes.string.isRequired,
  resetInput: PropTypes.func.isRequired,
  setPaymentMethods: PropTypes.func.isRequired,
  totalValue: PropTypes.number.isRequired,
  setIsPaymentStarted: PropTypes.func.isRequired,
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      amount: PropTypes.number,
    })
  ).isRequired,
  showNotification: PropTypes.func.isRequired,
  manualDiscount: PropTypes.number.isRequired,
  employeeDiscount: PropTypes.number.isRequired,
  selectedItems: PropTypes.array.isRequired,
};

export default Pos_Payment;