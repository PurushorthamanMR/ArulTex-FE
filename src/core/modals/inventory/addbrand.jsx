import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { savePayoutCategory, getPayoutCategoryByName } from '../../../feature-module/Api/PayoutCategoryApi'
import PropTypes from 'prop-types'

const AddBrand = ({ refreshCategories, onCategoryAdded }) => {
    const [payoutCategory, setPayoutCategory] = useState("")
    const [error, setError] = useState("")
    const MySwal = withReactContent(Swal)

    const handleCategoryChange = (e) => {
        setPayoutCategory(e.target.value)
        setError("")
    }

    const resetForm = () => {
        setPayoutCategory("")
        setError("")
    }

    const validateInput = () => {
        if (!payoutCategory.trim()) {
            setError("Please enter a payout category")
            return false
        }
        return true
    }

    const handleSaveCategory = async () => {
        if (!validateInput()) return

        try {
            // Check for duplicate name
            const existingCategory = await getPayoutCategoryByName(payoutCategory.trim());
            if (existingCategory && existingCategory.responseDto) {
                MySwal.fire({
                    title: "Error!",
                    text: "A payout category with this name already exists.",
                    icon: "error",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                });
                return;
            }

            const response = await savePayoutCategory({ 
                payoutCategory: payoutCategory.trim(),
                isActive: true
            });

            if (response?.responseDto) {
                console.log('Saving category with data:', {
                    name: payoutCategory,
                    isActive: true
                });

                MySwal.fire({
                    title: "Success!",
                    text: "Payout category created successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        if (onCategoryAdded) {
                            onCategoryAdded(response.responseDto);
                        }

                        resetForm();
                        const modal = document.getElementById('add-brand');
                        if (modal) modal.classList.remove('show');
                        document.body.classList.remove('modal-open');
                        const backdrops = document.getElementsByClassName('modal-backdrop');
                        while(backdrops.length > 0) backdrops[0].remove();

                        if (refreshCategories) {
                            await refreshCategories();
                        }
                    }
                });
            } else {
                throw new Error("Failed to save payout category");
            }
        } catch (error) {
            MySwal.fire({
                title: "Error!",
                text: error.message || "An error occurred while saving payout category",
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-primary",
                },
            });
        }
    };

    return (
        <div className="modal fade" id="add-brand">
            <div className="modal-dialog modal-dialog-centered custom-modal-two">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">
                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>Create New Payout Category</h4>
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
                                    <label className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error ? 'is-invalid' : ''}`}
                                        value={payoutCategory}
                                        onChange={handleCategoryChange}
                                        placeholder="Enter payout category"
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
                                    <button 
                                        type="button"
                                        className="btn btn-submit" 
                                        onClick={handleSaveCategory}
                                    >
                                        Create Category
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

AddBrand.propTypes = {
    refreshCategories: PropTypes.func,
    onCategoryAdded: PropTypes.func
};

export default AddBrand
