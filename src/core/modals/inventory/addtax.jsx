import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { saveTax, getTaxByName } from "../../../feature-module/Api/TaxApi";

const AddTax = ({ refreshTaxes, onTaxAdded }) => {
    const [tax, setTax] = useState("");
    const [error, setError] = useState("");
    const MySwal = withReactContent(Swal);

    const handleTaxChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setTax(value);
        }
    };

    const resetForm = () => {
        setTax("");
        setError("");
    };

    const validateInput = () => {
        setError("");
        
        if (!tax.trim()) {
            setError("Please enter a tax percentage");
            return false;
        }
        
        const taxValue = parseFloat(tax);
        if (isNaN(taxValue)) {
            setError("Please enter a valid number");
            return false;
        }
        
        if (taxValue < 0) {
            setError("Tax percentage cannot be negative");
            return false;
        }
        
        if (taxValue > 100) {
            setError("Tax percentage cannot exceed 100%");
            return false;
        }
        
        return true;
    };

    const handleSaveTax = async () => {
        if (!validateInput()) {
            return;
        }
        
        try {
            const taxValue = parseFloat(tax);
            // Check for duplicate tax
            const existingTax = await getTaxByName(taxValue);
            if (existingTax && existingTax.responseDto) {
                MySwal.fire({
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

            const response = await saveTax(taxValue);
            
            if (response && response.responseDto) {
                MySwal.fire({
                    title: "Success!",
                    text: "Tax saved successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                });
                
                if (onTaxAdded) {
                    onTaxAdded({
                        value: response.responseDto.id,
                        label: `${response.responseDto.taxPercentage}%`
                    });
                }
                
                setTax("");
                document.getElementById('add-units-tax').classList.remove('show');
                document.querySelector('.modal-backdrop').remove();
                document.body.classList.remove('modal-open');
                document.body.style.removeProperty('overflow');
                document.body.style.removeProperty('padding-right');
                
                if (refreshTaxes) {
                    refreshTaxes();
                }
            } else {
                MySwal.fire({
                    title: "Error!",
                    text: "Failed to save tax.",
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
            <div className="modal fade" id="add-units-tax">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Add New Tax</h4>
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
                                        <label className="form-label">Tax Percentage (%)</label>
                                        <input
                                            type="text"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            value={tax}
                                            onChange={handleTaxChange}
                                            placeholder="Enter tax percentage"
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
                                        <Link to="#" className="btn btn-submit" onClick={handleSaveTax}>
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

AddTax.propTypes = {
    refreshTaxes: PropTypes.func,
    onTaxAdded: PropTypes.func
};

export default AddTax;