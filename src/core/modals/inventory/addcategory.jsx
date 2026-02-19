import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { saveProductCategory, getProductCategoryByName } from "../../../feature-module/Api/ProductCategoryApi";

const AddCategory = ({ refreshCategories, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
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
      // Check for duplicate category
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

      const response = await saveProductCategory(categoryName);
      if (response && response.responseDto) {
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
          onCategoryAdded({
            value: response.responseDto.id,
            label: response.responseDto.productCategoryName
          });
        }
        
        setCategoryName("");
        
        document.getElementById('add-units-category').classList.remove('show');
        document.querySelector('.modal-backdrop').remove();
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
        
        if (refreshCategories) {
          refreshCategories();
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
      MySwal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
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
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                      value={categoryName}
                      onChange={handleCategoryNameChange}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                  <div className="modal-footer-btn">
                    <Link
                      to="#"
                      className="btn btn-cancel me-2"
                      data-bs-dismiss="modal"
                      onClick={resetForm}
                    >
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-submit" onClick={handleSaveCategory}>
                      Submit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AddCategory.propTypes = {
  refreshCategories: PropTypes.func,
  onCategoryAdded: PropTypes.func
};

export default AddCategory;