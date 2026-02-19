import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { saveNonScanProduct, getNonScanProductByName } from '../../../feature-module/Api/NonScanProductApi'
import Swal from 'sweetalert2'

const AddUnit = ({ onAddProduct }) => {
    const [formData, setFormData] = useState({
        nonScanProduct: '',
        icon: '',
        price: '',
        isActive: true
    });
    const [errors, setErrors] = useState({
        nonScanProduct: '',
        icon: '',
        price: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const resetForm = () => {
        // Reset form data to initial values
        setFormData({
            nonScanProduct: '',
            icon: '',
            price: '',
            isActive: true
        });
        
        // Clear all validation errors
        setErrors({
            nonScanProduct: '',
            icon: '',
            price: ''
        });
    };

    const handleCancel = () => {
        // Reset form data and errors
        resetForm();
        
        // Close the modal
        closeModal();
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        
        if (!formData.nonScanProduct.trim()) {
            newErrors.nonScanProduct = 'Product name is required';
            isValid = false;
        }
        
        if (!formData.icon.trim()) {
            newErrors.icon = 'Icon is required';
            isValid = false;
        } else if (!isValidEmoji(formData.icon)) {
            newErrors.icon = 'Please enter a valid emoji';
            isValid = false;
        }
        
        if (!formData.price || isNaN(parseFloat(formData.price))) {
            newErrors.price = 'Please enter a valid price';
            isValid = false;
        } else if (parseFloat(formData.price) < 0) {
            newErrors.price = 'Price cannot be negative';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    // Function to check if a string is a valid emoji
    const isValidEmoji = (str) => {
        // Simple regex to check for emoji characters
        // This is a basic check and might need adjustment based on your specific requirements
        const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]/u;
        return emojiRegex.test(str);
    };

    const closeModal = () => {
        // Find the close button and trigger a click
        const closeButton = document.querySelector('#add-units .close');
        if (closeButton) {
            closeButton.click();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);

        try {
            // Check for duplicate product name
            const productName = formData.nonScanProduct.trim();
            
            try {
                const existingProduct = await getNonScanProductByName(productName);
                console.log("Existing product check result:", existingProduct);
                
                // Check if the API returned a valid response with data
                if (existingProduct && existingProduct.responseDto && existingProduct.responseDto.length > 0) {
                    Swal.fire({
                        title: 'Duplicate Product',
                        text: `"${productName}" already exists`,
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                    setIsSubmitting(false);
                    return;
                }
            } catch (error) {
                console.error("Error checking for duplicate product:", error);
                // Continue with saving even if the check fails
            }
            
            // Convert price to number
            const productData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            const response = await saveNonScanProduct(productData);
            
            if (response) {
                Swal.fire('Success', 'Non-scan product has been added!', 'success');
                // Reset form
                resetForm();
                
                // Close modal using our custom function
                closeModal();
                
                // Refresh product list
                if (onAddProduct) {
                    onAddProduct();
                }
            } else {
                Swal.fire('Error', 'Failed to add non-scan product', 'error');
            }
        } catch (error) {
            console.error('Error adding non-scan product:', error);
            Swal.fire('Error', 'Something went wrong', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* Add Non-Scan Product */}
            <div className="modal fade" id="add-units">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Create Non-Scan Product</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body custom-modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Product Name</label>
                                            {errors.nonScanProduct && (
                                                <div className="text-danger mb-1" style={{ fontSize: '0.8rem' }}>
                                                    {errors.nonScanProduct}
                                                </div>
                                            )}
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.nonScanProduct ? 'is-invalid' : ''}`}
                                                name="nonScanProduct"
                                                value={formData.nonScanProduct}
                                                onChange={handleChange}
                                                placeholder="Enter product name"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Icon</label>
                                            {errors.icon && (
                                                <div className="text-danger mb-1" style={{ fontSize: '0.8rem' }}>
                                                    {errors.icon}
                                                </div>
                                            )}
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.icon ? 'is-invalid' : ''}`}
                                                name="icon"
                                                value={formData.icon}
                                                onChange={handleChange}
                                                placeholder="Enter emoji icon (e.g., 🛍️)"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Price</label>
                                            {errors.price && (
                                                <div className="text-danger mb-1" style={{ fontSize: '0.8rem' }}>
                                                    {errors.price}
                                                </div>
                                            )}
                                            <input 
                                                type="number" 
                                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="Enter price"
                                                step="0.01"
                                                min="0"
                                            />
                                        </div>
                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="btn btn-submit"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Creating...' : 'Create Product'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Non-Scan Product */}
        </div>
    )
}

AddUnit.propTypes = {
    onAddProduct: PropTypes.func
};

AddUnit.defaultProps = {
    onAddProduct: () => {}
};

export default AddUnit
