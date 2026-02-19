import React, { useState } from 'react';
import { saveTax, getTaxByName } from '../../../feature-module/Api/TaxApi';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const AddSubcategory = ({ onTaxCreated }) => {
    const [taxPercentage, setTaxPercentage] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!taxPercentage) {
            setShowError('Please enter a number');
            return;
        }
        
        const percentage = parseFloat(taxPercentage);
        if (isNaN(percentage)) {
            setShowError('Please enter a valid number');
            return;
        }
        
        if (percentage < 0) {
            setShowError('Negative numbers are not allowed');
            return;
        }
        
        if (percentage > 100) {
            setShowError('Tax percentage must be between 0 and 100');
            return;
        }

        try {
            // Check for duplicate tax
            const existingTax = await getTaxByName(taxPercentage);
            if (existingTax && existingTax.responseDto) {
                Swal.fire({
                    title: "Error!",
                    text: "A tax with this percentage already exists.",
                    icon: "error",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                });
                return;
            }

            // Save the exact decimal value as a string to preserve precision
            const response = await saveTax(taxPercentage.toString());
            if (response) {
                Swal.fire({
                    title: 'Success',
                    text: 'Tax created successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.getElementById('add-tax-close').click();
                        if (onTaxCreated) {
                            onTaxCreated();
                        }
                    }
                });
                setTaxPercentage('');
                setShowError(false);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to create tax',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: "btn btn-primary",
                },
            });
        }
    };

    const handleCloseModal = () => {
        setShowError(false);
        setTaxPercentage('');
    };

    return (
        <div>
            <div className="modal fade" id="add-tax">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Create Tax</h4>
                                    </div>
                                    <button
                                        id="add-tax-close"
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Tax Percentage</label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${showError ? 'is-invalid' : ''}`}
                                                value={taxPercentage}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                                        setTaxPercentage(value);
                                                        if (value !== '' && parseFloat(value) < 0) {
                                                            setShowError('Negative numbers are not allowed');
                                                        } else if (value !== '' && parseFloat(value) > 100) {
                                                            setShowError('Tax percentage must be between 0 and 100');
                                                        } else {
                                                            setShowError(false);
                                                        }
                                                    }
                                                }}
                                            />
                                            {showError && (
                                                <div className="invalid-feedback">
                                                    {showError}
                                                </div>
                                            )}
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
                                            <button type="submit" className="btn btn-submit">
                                                Create Tax
                                            </button>
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

AddSubcategory.propTypes = {
    onTaxCreated: PropTypes.func
};

export default AddSubcategory;