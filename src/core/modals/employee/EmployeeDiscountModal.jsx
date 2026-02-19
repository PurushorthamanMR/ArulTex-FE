import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EmployeeDiscountModal = ({ isOpen, onClose, selectedDiscount, onUpdate }) => {
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedDiscount) {
      setDiscount(selectedDiscount.discount);
    }
    setError(""); // Clear error when modal opens
  }, [selectedDiscount]);

  const validateDiscount = (value) => {
    if (value === "") {
      return "Discount is required";
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }
    if (numValue < 0) {
      return "Discount cannot be negative";
    }
    if (numValue > 100) {
      return "Discount cannot be more than 100%";
    }
    // Check if the number has more than 2 decimal places
    if (value.split(".")[1]?.length > 2) {
      return "Discount can have maximum 2 decimal places";
    }
    return "";
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    // Allow empty value, single decimal point, or valid number
    if (value === "" || value === "." || /^\d*\.?\d*$/.test(value)) {
      setDiscount(value);
      setError(validateDiscount(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateDiscount(discount);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (selectedDiscount) {
      onUpdate(selectedDiscount.id, discount);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee Discount</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedDiscount?.userDto?.firstName || ""}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Discount</label>
                {error && (
                  <div className="text-danger mb-2" style={{ fontSize: "0.875rem" }}>
                    {error}
                  </div>
                )}
                <input
                  type="text"
                  inputMode="decimal"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  value={discount}
                  onChange={handleDiscountChange}
                  placeholder="Enter discount (0-100)"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={!!error}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeDiscountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedDiscount: PropTypes.shape({
    id: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    userDto: PropTypes.shape({
      firstName: PropTypes.string.isRequired
    }).isRequired
  }),
  onUpdate: PropTypes.func.isRequired
};

export default EmployeeDiscountModal; 