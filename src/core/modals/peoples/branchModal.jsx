import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { fetchCountries } from "../../../feature-module/Api/countrycodeApi";
import { fetchShopDetails } from "../../../feature-module/Api/ShopDetailsApi";
import { fetchBranches } from "../../../feature-module/Api/BranchApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const BranchModal = ({ onSave, onUpdate, selectedBranch }) => {
  const [countries, setCountries] = useState([]);
  const [shops, setShops] = useState([]);
  const [formData, setFormData] = useState({
    branchName: '',
    branchCode: '',
    address: '',
    contactNumber: '',
    emailAddress: '',
    countryDto: null,
    shopDetailsDto: null
  });

  const [errors, setErrors] = useState({
    branchName: '',
    branchCode: '',
    address: '',
    contactNumber: '',
    emailAddress: '',
    countryDto: '',
    shopDetailsDto: ''
  });

  const [existingBranches, setExistingBranches] = useState([]);

  useEffect(() => {
    if (selectedBranch) {
      setFormData({
        ...selectedBranch,
        countryDto: countries.find(c => c.value === selectedBranch.countryDto?.id) || null,
        shopDetailsDto: shops.find(s => s.value === selectedBranch.shopDetailsDto?.id) || null
      });
    } else {
      setFormData({
        branchName: '',
        branchCode: '',
        address: '',
        contactNumber: '',
        emailAddress: '',
        countryDto: null,
        shopDetailsDto: null
      });
    }
    setErrors({
      branchName: '',
      branchCode: '',
      address: '',
      contactNumber: '',
      emailAddress: '',
      countryDto: '',
      shopDetailsDto: ''
    });
  }, [selectedBranch, countries, shops]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [countriesData, shopsData] = await Promise.all([
          fetchCountries(),
          fetchShopDetails()
        ]);
        
        setCountries(countriesData.map(c => ({ 
          value: c.id, 
          label: c.countryName 
        })));
        
        setShops(shopsData.map(s => ({ 
          value: s.id, 
          label: s.name 
        })));
      } catch (error) {
        console.error("Error loading options:", error);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    const loadExistingBranches = async () => {
      try {
        const branches = await fetchBranches();
        setExistingBranches(branches);
      } catch (error) {
        console.error("Error loading branches:", error);
      }
    };
    loadExistingBranches();
  }, []);

  const showDuplicateError = (fieldName, message) => {
    MySwal.fire({
      title: 'Duplicate Entry!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary'
      }
    });
    document.querySelector(`[name="${fieldName}"]`).focus();
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    const currentBranchId = selectedBranch?.id;

    // Branch Name validation
    if (!formData.branchName.trim()) {
      newErrors.branchName = "Branch name is required";
      isValid = false;
    } else if (existingBranches.some(branch => 
      branch.branchName.toLowerCase() === formData.branchName.toLowerCase() && 
      branch.id !== currentBranchId
    )) {
      newErrors.branchName = "Branch name already exists";
      isValid = false;
    }

    // Branch Code validation
    if (!formData.branchCode.trim()) {
      newErrors.branchCode = "Branch code is required";
      isValid = false;
    } else if (existingBranches.some(branch => 
      branch.branchCode === formData.branchCode && 
      branch.id !== currentBranchId
    )) {
      newErrors.branchCode = "Branch code already exists";
      isValid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    } else if (existingBranches.some(branch => 
      branch.address.toLowerCase() === formData.address.toLowerCase() && 
      branch.id !== currentBranchId
    )) {
      newErrors.address = "Address already exists";
      isValid = false;
    }

    // Contact Number validation
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be exactly 10 digits";
      isValid = false;
    } else if (existingBranches.some(branch => 
      branch.contactNumber === formData.contactNumber && 
      branch.id !== currentBranchId
    )) {
      newErrors.contactNumber = "Contact number already exists";
      isValid = false;
    }

    // Email validation
    if (!formData.emailAddress) {
      newErrors.emailAddress = "Email address is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
      isValid = false;
    } else if (existingBranches.some(branch => 
      branch.emailAddress.toLowerCase() === formData.emailAddress.toLowerCase() && 
      branch.id !== currentBranchId
    )) {
      newErrors.emailAddress = "Email address already exists";
      isValid = false;
    }

    // Country and Shop validation
    if (!formData.countryDto) {
      newErrors.countryDto = "Country is required";
      isValid = false;
    }
    if (!formData.shopDetailsDto) {
      newErrors.shopDetailsDto = "Shop details are required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Check for duplicate errors and show popup
      const duplicateFields = Object.entries(errors).filter(([, value]) => 
        value.includes('already exists')
      );
      
      if (duplicateFields.length > 0) {
        const [field, message] = duplicateFields[0];
        showDuplicateError(field, message);
      }
      return;
    }

    try {
      if (selectedBranch) {
        await onUpdate(formData);
        // Close modal before showing success message
        document.getElementById('edit-branch').querySelector('[data-bs-dismiss="modal"]').click();
        MySwal.fire({
          title: 'Success!',
          text: 'Branch updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        await onSave(formData);
        // Close modal before showing success message
        document.getElementById('add-branch').querySelector('[data-bs-dismiss="modal"]').click();
        MySwal.fire({
          title: 'Success!',
          text: 'Branch created successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }

      // Reset form
      setFormData({
        branchName: '',
        branchCode: '',
        address: '',
        contactNumber: '',
        emailAddress: '',
        countryDto: null,
        shopDetailsDto: null
      });
      
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: error.message || 'Failed to save branch',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div>
      {/* Add Branch Modal */}
      <div className="modal fade" id="add-branch" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="modal-header border-0 custom-modal-header">
              <h4 className="page-title">Add Branch</h4>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body custom-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Branch Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.branchName ? 'is-invalid' : ''}`}
                        placeholder="Enter branch name"
                      />
                      {errors.branchName && (
                        <div className="invalid-feedback">{errors.branchName}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Branch Code <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="branchCode"
                        value={formData.branchCode}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.branchCode ? 'is-invalid' : ''}`}
                        placeholder="Enter branch code"
                      />
                      {errors.branchCode && (
                        <div className="invalid-feedback">{errors.branchCode}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Address <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="Enter address"
                      />
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Contact Number <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                        placeholder="Enter 10-digit contact number"
                      />
                      {errors.contactNumber && (
                        <div className="invalid-feedback">{errors.contactNumber}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Email Address <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.emailAddress ? 'is-invalid' : ''}`}
                        placeholder="Enter email address"
                      />
                      {errors.emailAddress && (
                        <div className="invalid-feedback">{errors.emailAddress}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Country <span className="text-danger">*</span></label>
                      <Select
                        options={countries}
                        value={formData.countryDto}
                        onChange={(selected) => handleInputChange('countryDto', selected)}
                        placeholder="Select Country"
                        isSearchable
                        className={`${errors.countryDto ? 'is-invalid' : ''}`}
                        classNamePrefix="select"
                      />
                      {errors.countryDto && (
                        <div className="text-danger" style={{ fontSize: '0.875em', marginTop: '0.25rem' }}>
                          {errors.countryDto}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Shop Details <span className="text-danger">*</span></label>
                      <Select
                        options={shops}
                        value={formData.shopDetailsDto}
                        onChange={(selected) => handleInputChange('shopDetailsDto', selected)}
                        placeholder="Select Shop"
                        isSearchable
                        className={`${errors.shopDetailsDto ? 'is-invalid' : ''}`}
                        classNamePrefix="select"
                      />
                      {errors.shopDetailsDto && (
                        <div className="text-danger" style={{ fontSize: '0.875em', marginTop: '0.25rem' }}>
                          {errors.shopDetailsDto}
                        </div>
                      )}
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

      {/* Edit Branch Modal */}
      <div className="modal fade" id="edit-branch" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="modal-header border-0 custom-modal-header">
              <h4 className="page-title">Edit Branch</h4>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body custom-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Branch Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.branchName ? 'is-invalid' : ''}`}
                        placeholder="Enter branch name"
                      />
                      {errors.branchName && (
                        <div className="invalid-feedback">{errors.branchName}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Branch Code <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="branchCode"
                        value={formData.branchCode}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.branchCode ? 'is-invalid' : ''}`}
                        placeholder="Enter branch code"
                      />
                      {errors.branchCode && (
                        <div className="invalid-feedback">{errors.branchCode}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Address <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="Enter address"
                      />
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Contact Number <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                        placeholder="Enter 10-digit contact number"
                      />
                      {errors.contactNumber && (
                        <div className="invalid-feedback">{errors.contactNumber}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Email Address <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className={`form-control ${errors.emailAddress ? 'is-invalid' : ''}`}
                        placeholder="Enter email address"
                      />
                      {errors.emailAddress && (
                        <div className="invalid-feedback">{errors.emailAddress}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Country <span className="text-danger">*</span></label>
                      <Select
                        options={countries}
                        value={formData.countryDto}
                        onChange={(selected) => handleInputChange('countryDto', selected)}
                        placeholder="Select Country"
                        isSearchable
                        className={`${errors.countryDto ? 'is-invalid' : ''}`}
                        classNamePrefix="select"
                      />
                      {errors.countryDto && (
                        <div className="text-danger" style={{ fontSize: '0.875em', marginTop: '0.25rem' }}>
                          {errors.countryDto}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Shop Details <span className="text-danger">*</span></label>
                      <Select
                        options={shops}
                        value={formData.shopDetailsDto}
                        onChange={(selected) => handleInputChange('shopDetailsDto', selected)}
                        placeholder="Select Shop"
                        isSearchable
                        className={`${errors.shopDetailsDto ? 'is-invalid' : ''}`}
                        classNamePrefix="select"
                      />
                      {errors.shopDetailsDto && (
                        <div className="text-danger" style={{ fontSize: '0.875em', marginTop: '0.25rem' }}>
                          {errors.shopDetailsDto}
                        </div>
                      )}
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

BranchModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  selectedBranch: PropTypes.object,
};

export default BranchModal;