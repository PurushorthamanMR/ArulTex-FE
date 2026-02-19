import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CustomerModal = ({ onSave, onUpdate, selectedCustomer }) => {
  const initialFormState = {
    id: "",
    name: "",
    mobileNumber: "",
    isActive: 1,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        id: selectedCustomer.id || "",
        name: selectedCustomer.name || "",
        mobileNumber: selectedCustomer.mobileNumber || "",
        isActive: selectedCustomer.isActive ?? 1,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [selectedCustomer]);

  useEffect(() => {
    const editModal = document.getElementById("edit-units");
    const handleShow = () => {
      if (selectedCustomer) {
        setFormData({
          id: selectedCustomer.id || "",
          name: selectedCustomer.name || "",
          mobileNumber: selectedCustomer.mobileNumber || "",
          isActive: selectedCustomer.isActive ?? 1,
        });
      }
    };

    const addModal = document.getElementById("add-units");
    const handleAddShow = () => {
      setFormData(initialFormState);
      setErrors({});
    };

    editModal?.addEventListener("show.bs.modal", handleShow);
    addModal?.addEventListener("show.bs.modal", handleAddShow);

    return () => {
      editModal?.removeEventListener("show.bs.modal", handleShow);
      addModal?.removeEventListener("show.bs.modal", handleAddShow);
    };
  }, [selectedCustomer]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Customer name is required";
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ ...formData, isActive: 1 });
      setFormData(initialFormState);
      setErrors({});
      document.querySelector("#add-units .close").click();
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
      setFormData(initialFormState);
      setErrors({});
      document.querySelector("#edit-units .close").click();
    }
  };

  return (
    <div>
      {/* Add Customer Modal */}
      <div className="modal fade" id="add-units" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="modal-header border-0 custom-modal-header">
              <h4 className="page-title">Add Customer</h4>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body custom-modal-body">
              <form onSubmit={handleAddSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Customer Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter customer name"
                      />
                      {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Mobile Number <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter mobile number"
                      />
                      {errors.mobileNumber && <span className="text-danger">{errors.mobileNumber}</span>}
                    </div>
                  </div>
                </div>
                <div className="modal-footer-btn">
                  <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Customer Modal */}
      <div className="modal fade" id="edit-units" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="modal-header border-0 custom-modal-header">
              <h4 className="page-title">Edit Customer</h4>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body custom-modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Customer Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter customer name"
                      />
                      {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Mobile Number <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter mobile number"
                      />
                      {errors.mobileNumber && <span className="text-danger">{errors.mobileNumber}</span>}
                    </div>
                  </div>
                </div>
                <div className="modal-footer-btn">
                  <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomerModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  selectedCustomer: PropTypes.object,
};

export default CustomerModal;