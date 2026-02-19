import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchProducts, saveProduct, updateProduct } from "../../../feature-module/Api/productApi";
import { fetchProductCategories } from "../../../feature-module/Api/ProductCategoryApi";

const AddNonSaleProductModal = ({ onSave, onUpdate, selectedProduct }) => {
    const initialFormState = {
        id: "",
        name: "",
        icon: "",
        price: "",
        isActive: 1,
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [nonScanCategoryId, setNonScanCategoryId] = useState(null);

    useEffect(() => {
        const loadNonScanCategoryId = async () => {
            const categories = await fetchProductCategories();
            const nonScanCategory = categories.find(
                (category) => category.productCategoryName?.toLowerCase() === "non scan"
            );

            if (nonScanCategory) {
                setNonScanCategoryId(nonScanCategory.id);
            } else {
                setNonScanCategoryId(null);
            }
        };

        loadNonScanCategoryId();
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                id: selectedProduct.id || "",
                name: selectedProduct.name || "",
                icon: selectedProduct.icon || "",
                price: selectedProduct.pricePerUnit?.toString() || "",
                isActive: selectedProduct.isActive ?? 1,
            });
        } else {
            setFormData(initialFormState);
        }
    }, [selectedProduct]);

    useEffect(() => {
        const editModal = document.getElementById("edit-units");
        const handleShow = () => {
            if (selectedProduct) {
                setFormData({
                    id: selectedProduct.id || "",
                    name: selectedProduct.name || "",
                    icon: selectedProduct.icon || "",
                    price: selectedProduct.pricePerUnit?.toString() || "",
                    isActive: selectedProduct.isActive ?? 1,
                });
            }
        };

        const addModal = document.getElementById("add-units");
        const handleAddShow = () => {
            setFormData(initialFormState);
            setErrors({});
        };

        // Add event listeners for modal close
        const handleModalClose = () => {
            setErrors({});
        };

        editModal?.addEventListener("show.bs.modal", handleShow);
        addModal?.addEventListener("show.bs.modal", handleAddShow);
        
        // Add event listeners for modal close
        editModal?.addEventListener("hidden.bs.modal", handleModalClose);
        addModal?.addEventListener("hidden.bs.modal", handleModalClose);

        return () => {
            editModal?.removeEventListener("show.bs.modal", handleShow);
            addModal?.removeEventListener("show.bs.modal", handleAddShow);
            editModal?.removeEventListener("hidden.bs.modal", handleModalClose);
            addModal?.removeEventListener("hidden.bs.modal", handleModalClose);
        };
    }, [selectedProduct]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Product name is required";
        if (!formData.icon.trim()) newErrors.icon = "Icon is required";
        if (!formData.price.trim()) newErrors.price = "Price is required";
        if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
            newErrors.price = "Price must be a valid number";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error for the field being edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (!nonScanCategoryId) {
            return;
        }

        const products = await fetchProducts();
        const nonScanProducts = products.filter(
            (p) => p.productCategoryDto?.productCategoryName?.toLowerCase() === "non scan"
        );
        const barcode = String(nonScanProducts.length + 1);

        const productData = {
            name: `${formData.name}-${formData.icon}`,
            barcode,
            pricePerUnit: parseFloat(formData.price),
            purchasePrice: parseFloat(formData.price),
            productCategoryDto: { id: nonScanCategoryId },
            taxDto: { id: 1 },
            quantity: 100,
            lowStock: 10,
            isActive: 1,
        };

        await saveProduct(productData);
        onSave();
        setFormData(initialFormState);
        setErrors({});
        document.querySelector("#add-units .close").click();
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (!nonScanCategoryId) {
            return;
        }

        const updatedProductData = {
            id: formData.id,
            name: `${formData.name}-${formData.icon}`,
            barcode: selectedProduct.barcode,
            createdDate: selectedProduct.createdDate,
            pricePerUnit: parseFloat(formData.price),
            purchasePrice: parseFloat(formData.price),
            productCategoryDto: { id: nonScanCategoryId },
            taxDto: selectedProduct.taxDto || { id: 1 },
            quantity: 100,
            lowStock: 10,
            isActive: selectedProduct.isActive || 1,
        };

        await updateProduct(updatedProductData);
        onUpdate();
        setFormData(initialFormState);
        setErrors({});
        document.querySelector("#edit-units .close").click();
    };

    // Function to handle modal close
    const handleModalClose = () => {
        setErrors({});
    };

    return (
        <div>
            {/* Add Non-Sale Product Modal */}
            <div className="modal fade" id="add-units" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="modal-header border-0 custom-modal-header">
                            <h4 className="page-title">Add Non-Sale Product</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body custom-modal-body">
                            <form onSubmit={handleAddSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="input-blocks">
                                            <label>
                                                Product Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter product name"
                                            />
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-blocks">
                                            <label>
                                                Icon <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="icon"
                                                value={formData.icon}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter emoji (e.g., 🧁)"
                                            />
                                            {errors.icon && <span className="text-danger">{errors.icon}</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-blocks">
                                            <label>
                                                Price <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter price"
                                                min="0"
                                                step="0.01"
                                            />
                                            {errors.price && <span className="text-danger">{errors.price}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer-btn">
                                    <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal" onClick={handleModalClose}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Non-Sale Product Modal */}
            <div className="modal fade" id="edit-units" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="modal-header border-0 custom-modal-header">
                            <h4 className="page-title">Edit Non-Sale Product</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body custom-modal-body">
                            <form onSubmit={handleEditSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="input-blocks">
                                            <label>
                                                Product Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter product name"
                                            />
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-blocks">
                                            <label>
                                                Icon <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="icon"
                                                value={formData.icon}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter emoji (e.g., 🧁)"
                                            />
                                            {errors.icon && <span className="text-danger">{errors.icon}</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-blocks">
                                            <label>
                                                Price <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter price"
                                                min="0"
                                                step="0.01"
                                            />
                                            {errors.price && <span className="text-danger">{errors.price}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer-btn">
                                    <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal" onClick={handleModalClose}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddNonSaleProductModal.propTypes = {
    onSave: PropTypes.func.isRequired,
    onUpdate: PropTypes.func,
    selectedProduct: PropTypes.object,
};

export default AddNonSaleProductModal; 