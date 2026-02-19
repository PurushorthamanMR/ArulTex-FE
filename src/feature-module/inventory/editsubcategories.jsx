import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateTax, getTaxByName } from '../Api/TaxApi';
import Swal from 'sweetalert2';

const EditSubcategories = ({ selectedTax, onTaxUpdated }) => {
    const [taxPercentage, setTaxPercentage] = useState('');
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        if (selectedTax?.taxPercentage !== undefined) {
            setTaxPercentage(selectedTax.taxPercentage.toString());
            setValidationError('');
        }
    }, [selectedTax]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedTax?.id) {
            console.error('No tax selected for update');
            return;
        }

        if (!taxPercentage.trim()) {
            setValidationError('Tax percentage is required');
            return;
        }

        const percentage = parseFloat(taxPercentage);
        
        if (isNaN(percentage)) {
            setValidationError('Please enter a valid number');
            return;
        }

        if (percentage < 0) {
            setValidationError('Negative numbers are not allowed');
            return;
        }
        
        if (percentage > 100) {
            setValidationError('Tax percentage must be between 0 and 100');
            return;
        }

        try {
            // Check for existing tax percentage (excluding current tax)
            const existingTax = await getTaxByName(taxPercentage);
            if (existingTax?.responseDto && 
                existingTax.responseDto.id !== selectedTax.id) {
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

            const updatedData = {
                taxPercentage: Number(taxPercentage),
                isActive: true
            };

            const response = await updateTax(selectedTax.id, updatedData);
            
            if (response) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Tax has been updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.getElementById('edit-tax-close').click();
                        if (onTaxUpdated) {
                            onTaxUpdated();
                        }
                    }
                });
            } else {
                setValidationError('Failed to update tax');
            }
        } catch (error) {
            console.error('Error updating tax:', error);
            setValidationError('Something went wrong while updating tax');
        }
    };

    const handleCloseModal = () => {
        setValidationError(''); 
        if (selectedTax?.taxPercentage !== undefined) {
            setTaxPercentage(selectedTax.taxPercentage.toString());
        } else {
            setTaxPercentage('');
        }
    };

    return (
        <div>
            <div className="modal fade" id="edit-tax">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Edit Tax</h4>
                                    </div>
                                    <button
                                        id="edit-tax-close"
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
                                                className={`form-control ${validationError ? 'is-invalid' : ''}`}
                                                value={taxPercentage}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                                        setTaxPercentage(value);
                                                        if (value !== '' && parseFloat(value) < 0) {
                                                            setValidationError('Negative numbers are not allowed');
                                                        } else {
                                                            setValidationError('');
                                                        }
                                                    }
                                                }}
                                            />
                                            {validationError && (
                                                <div className="invalid-feedback">
                                                    {validationError}
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
                                                Save Changes
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

EditSubcategories.propTypes = {
    selectedTax: PropTypes.shape({
        id: PropTypes.number,
        taxPercentage: PropTypes.number,
    }),
    onTaxUpdated: PropTypes.func
};

EditSubcategories.defaultProps = {
    selectedTax: null,
    onTaxUpdated: () => {}
};

export default EditSubcategories;