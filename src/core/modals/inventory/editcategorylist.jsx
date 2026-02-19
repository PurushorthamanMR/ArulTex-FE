import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { updateProductCategory } from '../../../feature-module/Api/ProductCategoryApi';
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const EditCategoryList = ({ selectedCategory, onUpdate }) => {
    const [categoryName, setCategoryName] = useState("");
    const [isActive, setIsActive] = useState(1);
    const [agevalidation, setAgevalidation] = useState(false);
    const [validationError, setValidationError] = useState("");

    useEffect(() => {
        if (selectedCategory) {
            setCategoryName(selectedCategory.productCategoryName);
            setIsActive(selectedCategory.isActive);
            setAgevalidation(selectedCategory.agevalidation || false);
            setValidationError("");
        }
    }, [selectedCategory]);

    const handleUpdate = async () => {
        if (!categoryName.trim()) {
            setValidationError("Category name is required");
            return;
        }
        
        if (!selectedCategory) return;

        try {
            const updatedData = { 
                productCategoryName: categoryName, 
                isActive,
                agevalidation
            };

            const response = await updateProductCategory(selectedCategory.id, updatedData);
            console.log('Update Category Response:', response); // Debug log
            if (response && response.data) {
                Swal.fire({
                    title: "Success",
                    text: "Category updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                });
                onUpdate();
                document.getElementById('edit-category-close').click();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update category",
                    icon: "error",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                });
            }
        } catch (error) {
            console.error('Update Category Error:', error); // Debug log
            Swal.fire({
                title: "Error",
                text: "Something went wrong: " + (error.message || 'Unknown error'),
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-primary",
                },
            });
        }
    };

    const handleCloseModal = () => {
        if (selectedCategory) {
            setCategoryName(selectedCategory.productCategoryName);
            setAgevalidation(selectedCategory.agevalidation || false);
        }
        setValidationError("");
    };

    return (
        <div>
            <div className="modal fade" id="edit-category" aria-hidden="true" inert>
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Edit Category</h4>
                                    </div>
                                    <button
                                        id="edit-category-close"
                                        type="button"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={handleCloseModal}
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
                                                className={`form-control ${validationError ? 'is-invalid' : ''}`}
                                                value={categoryName}
                                                readOnly
                                            />
                                            {validationError && (
                                                <div className="invalid-feedback">
                                                    {validationError}
                                                </div>
                                            )}
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
                                                onClick={handleCloseModal}
                                            >
                                                Cancel
                                            </button>
                                            <Link to="#" className="btn btn-submit" onClick={handleUpdate}>
                                                Save Changes
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

EditCategoryList.propTypes = {
    selectedCategory: PropTypes.shape({
        id: PropTypes.number.isRequired,
        productCategoryName: PropTypes.string.isRequired,
        isActive: PropTypes.bool,
        agevalidation: PropTypes.bool,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default EditCategoryList;