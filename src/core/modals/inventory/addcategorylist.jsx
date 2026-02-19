import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { saveProductCategory, getProductCategoryByName } from "../../../feature-module/Api/ProductCategoryApi";

const AddCategoryList = ({ refreshCategories, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [agevalidation, setAgevalidation] = useState(false);
  const [error, setError] = useState("");

  const MySwal = withReactContent(Swal);

  const handleCategoryNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s\-_.,&()]+$/.test(value) || value === '') {
      setCategoryName(value);
    }
  };

  const resetForm = () => {
    setCategoryName("");
    setAgevalidation(false);
    setError("");
  };

  const validateInput = () => {
    setError("");
    
    if (!categoryName.trim()) {
      setError("Please enter a category name");
      return false;
    }
    
    if (categoryName.length < 2) {
      setError("Category name must be at least 2 characters");
      return false;
    }
    
    if (categoryName.length > 50) {
      setError("Category name cannot exceed 50 characters");
      return false;
    }
    
    return true;
  };

  const handleSaveCategory = async () => {
    if (!validateInput()) {
      return;
    }

    try {
      const existingCategory = await getProductCategoryByName(categoryName);
      if (existingCategory && existingCategory.responseDto) {
        MySwal.fire({
          title: "Error!",
          text: "A category with this name already exists.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      const newCategory = {
        productCategoryName: categoryName,
        agevalidation: agevalidation,
        isActive: true
      };

      const response = await saveProductCategory(newCategory);
      console.log('Save Category Response:', response); // Debug log

      // Check if response indicates success
      if (response && response.data) {
        MySwal.fire({
          title: "Success!",
          text: "Category saved successfully!",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        
        if (onCategoryAdded) {
          const savedCategory = response.data.responseDto || response.data;
          onCategoryAdded({
            value: savedCategory.id,
            label: savedCategory.productCategoryName,
            agevalidation: savedCategory.agevalidation
          });
        }
        
        resetForm();
        
        // Simulate clicking the close button
        const closeButton = document.querySelector('#add-units-category .close');
        if (closeButton) {
          closeButton.click();
        }
        
        if (refreshCategories) {
          refreshCategories(false); // Trigger table refresh
        }
      } else {
        MySwal.fire({
          title: "Error!",
          text: "Failed to save category.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    } catch (err) {
      console.error('Save Category Error:', err); // Debug log
      MySwal.fire({
        title: "Error!",
        text: "An unexpected error occurred: " + (err.message || 'Unknown error'),
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    }
  };

  return (
    <>
      <div className="modal fade" id="add-units-category">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add New Category</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={resetForm}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                      />
                      {error && <div className="invalid-feedback">{error}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Age Restriction</label>
                      <select
                        className="form-control"
                        value={agevalidation}
                        onChange={(e) => setAgevalidation(e.target.value === 'true')}
                      >
                        <option value={false}>false</option>
                        <option value={true}>true</option>
                      </select>
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                      <Link to="#" className="btn btn-submit" onClick={handleSaveCategory}>
                        Submit
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AddCategoryList.propTypes = {
  refreshCategories: PropTypes.func,
  onCategoryAdded: PropTypes.func
};

export default AddCategoryList;