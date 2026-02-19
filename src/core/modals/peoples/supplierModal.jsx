import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SupplierModal = ({ onSave, onUpdate, selectedSupplier }) => {
  const initialFormState = {
    id: "",
    name: "",
    emailAddress: "",
    mobileNumber: "",
    whatsappNumber: "",
    isActive: 1,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedSupplier) {
      setFormData({
        id: selectedSupplier.id || "",
        name: selectedSupplier.name || "",
        emailAddress: selectedSupplier.emailAddress || "",
        mobileNumber: selectedSupplier.mobileNumber || "",
        whatsappNumber: selectedSupplier.whatsappNumber || "",
        isActive: selectedSupplier.isActive ?? 1,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [selectedSupplier]);

  useEffect(() => {
    const editModal = document.getElementById("edit-units");
    const handleShow = () => {
      if (selectedSupplier) {
        setFormData({
          id: selectedSupplier.id || "",
          name: selectedSupplier.name || "",
          emailAddress: selectedSupplier.emailAddress || "",
          mobileNumber: selectedSupplier.mobileNumber || "",
          whatsappNumber: selectedSupplier.whatsappNumber || "",
          isActive: selectedSupplier.isActive ?? 1,
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
  }, [selectedSupplier]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Supplier name is required";
    if (!formData.emailAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress))
      newErrors.emailAddress = "Please enter a valid email address";
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required";
    if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = "WhatsApp number is required";
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
      {/* Add Supplier Modal */}
      <div className="modal fade" id="add-units" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="modal-header border-0 custom-modal-header">
              <h4 className="page-title">Add Supplier</h4>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body custom-modal-body">
              <form onSubmit={handleAddSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Supplier Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Email <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.emailAddress && <span className="text-danger">{errors.emailAddress}</span>}
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
                      />
                      {errors.mobileNumber && <span className="text-danger">{errors.mobileNumber}</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>WhatsApp Number <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.whatsappNumber && <span className="text-danger">{errors.whatsappNumber}</span>}
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

      {/* Edit Supplier Modal */}
      <div className="modal fade" id="edit-units" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="modal-header border-0 custom-modal-header">
              <h4 className="page-title">Edit Supplier</h4>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body custom-modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Supplier Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Email <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.emailAddress && <span className="text-danger">{errors.emailAddress}</span>}
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
                      />
                      {errors.mobileNumber && <span className="text-danger">{errors.mobileNumber}</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>WhatsApp Number <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.whatsappNumber && <span className="text-danger">{errors.whatsappNumber}</span>}
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

SupplierModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  selectedSupplier: PropTypes.object,
};

export default SupplierModal;