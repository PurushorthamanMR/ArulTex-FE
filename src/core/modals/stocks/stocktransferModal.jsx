import React, { useState, useEffect } from "react";
import Select from "react-select";
import { saveEmployeeDiscount, fetchEmployeeDiscounts } from "../../../feature-module/Api/EmployeeDis";
import { fetchUsers } from "../../../feature-module/Api/UserApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PropTypes from "prop-types";

const StockTransferModal = ({ onSave }) => {
  const [formData, setFormData] = useState({
    username: null,
    usernameLabel: "",
    discount: ""
  });
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [existingDiscounts, setExistingDiscounts] = useState([]);

  useEffect(() => {
    loadUsers();
    loadExistingDiscounts();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers(1, 100, true);
      const userOptions = (response.payload || []).map(user => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`
      }));
      setUsers(userOptions);
    } catch (error) {
      console.error("Error loading users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadExistingDiscounts = async () => {
    try {
      const data = await fetchEmployeeDiscounts();
      setExistingDiscounts(data);
    } catch (error) {
      console.error("Error loading existing discounts:", error);
      setExistingDiscounts([]);
    }
  };

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
    if (value.split(".")[1]?.length > 2) {
      return "Discount can have maximum 2 decimal places";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === "discount") {
      setError(validateDiscount(value));
    }
  };

  const handleUserSelect = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      username: selectedOption?.value || null,
      usernameLabel: selectedOption?.label || ""
    }));
  };

  const handleClose = () => {
    // Reset form data
    setFormData({
      username: null,
      usernameLabel: "",
      discount: ""
    });
    // Clear error
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateDiscount(formData.discount);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!formData.username) {
      setError("Please select a user");
      return;
    }

    // Check for duplicate username
    const isDuplicate = existingDiscounts.some(
      discount => discount.userDto.id === formData.username
    );

    if (isDuplicate) {
      setError("This user already has a discount assigned");
      return;
    }

    try {
      const discountData = {
        userDto: {
          id: formData.username,
          firstName: formData.usernameLabel
        },
        discount: parseFloat(formData.discount),
        isActive: 1
      };

      await saveEmployeeDiscount(discountData);
      
      const MySwal = withReactContent(Swal);
      await MySwal.fire({
        title: "Success!",
        text: "Employee discount added successfully",
        icon: "success",
        confirmButtonText: "OK"
      });

      // Reset form and close modal
      handleClose();
      
      // Close the modal using data-bs-dismiss
      const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
      if (closeButton) {
        closeButton.click();
      }
      
      // Call onSave to refresh the table
      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.error("Error adding employee discount:", error);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Error!",
        text: "Failed to add employee discount",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div>
      {/* Add Stock */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add User Discount</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleClose}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>User Name</label>
                          <Select
                            className="select"
                            options={users}
                            onChange={handleUserSelect}
                            isLoading={loading}
                            placeholder="Select User"
                            isClearable
                            required
                            value={users.find(option => option.value === formData.username) || null}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Discount</label>
                          {error && (
                            <div className="text-danger mb-2" style={{ fontSize: "0.875rem" }}>
                              {error}
                            </div>
                          )}
                          <input
                            type="text"
                            inputMode="decimal"
                            className={`form-control ${error ? "is-invalid" : ""}`}
                            name="discount"
                            value={formData.discount}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-submit"
                        disabled={!!error || !formData.username}
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Stock */}

      {/* Add Employee Discount */}
      <div className="modal fade" id="add-employee-discount">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Employee Discount</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="add-employee-discount-close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Employee Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
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
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="Enter discount (0-100)"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!!error}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Employee Discount */}
    </div>
  );
};

StockTransferModal.propTypes = {
  onSave: PropTypes.func
};

export default StockTransferModal;
