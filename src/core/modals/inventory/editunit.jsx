import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { updateNonScanProduct, getNonScanProductByName } from '../../../feature-module/Api/NonScanProductApi'
import Swal from 'sweetalert2'

const EditUnit = ({ selectedProduct, onUpdate }) => {
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
    const modalRef = useRef(null);

    // Update form data when selectedProduct changes
    useEffect(() => {
        console.log("Selected product changed:", selectedProduct);
        if (selectedProduct) {
            setFormData({
                nonScanProduct: selectedProduct.nonScanProduct || '',
                icon: selectedProduct.icon || '',
                price: selectedProduct.price || '',
                isActive: selectedProduct.isActive === 1 || selectedProduct.isActive === true
            });
        }
    }, [selectedProduct]);

    // Reset form when modal is closed
    useEffect(() => {
        const modal = document.getElementById('edit-units');
        if (modal) {
            const handleHidden = () => {
                resetForm();
                // Move focus back to the document body when modal is closed
                document.body.focus();
            };
            
            modal.addEventListener('hidden.bs.modal', handleHidden);
            
            return () => {
                modal.removeEventListener('hidden.bs.modal', handleHidden);
            };
        }
    }, []);

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
        const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]/u;
        return emojiRegex.test(str);
    };

    const closeModal = () => {
        // Find the close button and trigger a click
        const closeButton = document.querySelector('#edit-units .close');
        if (closeButton) {
            // Move focus to the document body before closing the modal
            document.body.focus();
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
            // Check for duplicate product name if the name has changed
            const productName = formData.nonScanProduct.trim();
            if (productName !== selectedProduct.nonScanProduct) {
                try {
                    const existingProduct = await getNonScanProductByName(productName);
                    console.log("Existing product check result:", existingProduct);
                    
                    // Check if the API returned a valid response with data
                    if (existingProduct && existingProduct.responseDto && existingProduct.responseDto.length > 0) {
                        // Check if the found product is not the current one being edited
                        const isDuplicate = existingProduct.responseDto.some(
                            product => product.id !== selectedProduct.id
                        );
                        
                        if (isDuplicate) {
                            Swal.fire({
                                title: 'Duplicate Product',
                                text: `"${productName}" already exists`,
                                icon: 'warning',
                                confirmButtonText: 'OK'
                            });
                            setIsSubmitting(false);
                            return;
                        }
                    }
                } catch (error) {
                    console.error("Error checking for duplicate product:", error);
                    // Continue with updating even if the check fails
                }
            }
            
            // Prepare the updated data
            const updatedData = {
                nonScanProduct: formData.nonScanProduct.trim(),
                icon: formData.icon.trim(),
                price: parseFloat(formData.price),
                isActive: formData.isActive
            };

            console.log("Sending update data:", {
                productId: selectedProduct.id,
                updatedData: updatedData
            });
            
            // Call the API with the correct parameters
            const response = await updateNonScanProduct(selectedProduct.id, updatedData);
            console.log("API Response:", response);
            
            // Check if the response is successful
            if (response) {
                // Show success message
                Swal.fire({
                    title: 'Success',
                    text: 'Non-scan product has been updated!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Reset form
                    resetForm();
                    
                    // Close modal using our custom function
                    closeModal();
                    
                    // Refresh product list
                    if (onUpdate) {
                        onUpdate();
                    }
                });
            } else {
                // Handle different error scenarios
                let errorMessage = 'Failed to update non-scan product';
                
                if (response && response.message) {
                    errorMessage = response.message;
                } else if (response && response.error) {
                    errorMessage = response.error;
                }
                
                console.error("Update error details:", response);
                Swal.fire('Error', errorMessage, 'error');
            }
        } catch (error) {
            console.error('Error updating non-scan product:', error);
            
            // Extract error message if available
            let errorMessage = 'Something went wrong';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            Swal.fire('Error', errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* Edit Non-Scan Product */}
            <div 
                className="modal fade" 
                id="edit-units" 
                tabIndex="-1" 
                aria-labelledby="editUnitsModalLabel" 
                aria-hidden="true"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Edit Non-Scan Product</h4>
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
                                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Edit Non-Scan Product */}
        </div>
    )
}

EditUnit.propTypes = {
    selectedProduct: PropTypes.object,
    onUpdate: PropTypes.func
};

EditUnit.defaultProps = {
    selectedProduct: null,
    onUpdate: () => {}
};

export default EditUnit
