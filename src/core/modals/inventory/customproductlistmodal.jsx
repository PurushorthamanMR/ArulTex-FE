import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchProducts, saveProduct, updateProduct } from "../../../feature-module/Api/productApi";
import { fetchProductCategories } from "../../../feature-module/Api/ProductCategoryApi";

const AddCustomProductModal = ({ onSave, onUpdate, selectedProduct }) => {
    const initialFormState = {
        id: "",
        name: "",
        icon: "",
        isActive: 1,
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [customCategoryId, setCustomCategoryId] = useState(null);

    useEffect(() => {
        const loadCustomCategoryId = async () => {
            const categories = await fetchProductCategories();
            const customCategory = categories.find(
                (category) => category.productCategoryName?.toLowerCase() === "custom"
            );

            setCustomCategoryId(customCategory.id);

        };

        loadCustomCategoryId();
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                id: selectedProduct.id || "",
                name: selectedProduct.name || "",
                icon: selectedProduct.icon || "",
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
                    isActive: selectedProduct.isActive ?? 1,
                });
            }
        };

        const addModal = document.getElementById("add-units");
        const handleAddShow = () => {
            setFormData(initialFormState);
            setErrors({});
        };

        editModal?.addEventListener("show.bs.modal", handleShow);
        addModal?.addEventListener("show.bs.modal", handleAddShow);

        return () => {
            editModal?.removeEventListener("show.bs.modal", handleShow);
            addModal?.removeEventListener("show.bs.modal", handleAddShow);
        };
    }, [selectedProduct]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Category name is required";
        if (!formData.icon.trim()) newErrors.icon = "Icon is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (!customCategoryId) {
            return;
        }

        const products = await fetchProducts();
        const customProducts = products.filter(
            (p) => p.productCategoryDto?.productCategoryName?.toLowerCase() === "custom"
        );
        const barcode = String(customProducts.length + 1);

        const productData = {
            name: `${formData.name}-${formData.icon}`,
            barcode,
            pricePerUnit: 100,
            purchasePrice: 100,
            productCategoryDto: { id: customCategoryId },
            taxDto: { id: 1 },
            quantity: 100,
            lowStock: 0,
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

        if (!customCategoryId) {
            return;
        }

        const updatedProductData = {
            id: formData.id,
            name: `${formData.name}-${formData.icon}`,
            barcode: selectedProduct.barcode,
            createdDate: selectedProduct.createdDate,
            pricePerUnit: selectedProduct.pricePerUnit || 100,
            purchasePrice: selectedProduct.purchasePrice || 100,
            productCategoryDto: { id: customCategoryId },
            taxDto: selectedProduct.taxDto || { id: 1 },
            quantity: selectedProduct.quantity || 100,
            lowStock: selectedProduct.lowStock || 0,
            isActive: selectedProduct.isActive || 1,
        };

        await updateProduct(updatedProductData);
        onUpdate();
        setFormData(initialFormState);
        setErrors({});
        document.querySelector("#edit-units .close").click();

    };

    return (
        <div>
            {/* Add Custom Product Modal */}
            <div className="modal fade" id="add-units" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="modal-header border-0 custom-modal-header">
                            <h4 className="page-title">Add Custom Product</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body custom-modal-body">
                            <form onSubmit={handleAddSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="input-blocks">
                                            <label>
                                                Category Name <span className="text-danger">*</span>
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
                                </div>
                                <div className="modal-footer-btn">
                                    <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">
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

            {/* Edit Custom Product Modal */}
            <div className="modal fade" id="edit-units" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="modal-header border-0 custom-modal-header">
                            <h4 className="page-title">Edit Custom Category</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body custom-modal-body">
                            <form onSubmit={handleEditSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="input-blocks">
                                            <label>
                                                Category Name <span className="text-danger">*</span>
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
                                </div>
                                <div className="modal-footer-btn">
                                    <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">
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

AddCustomProductModal.propTypes = {
    onSave: PropTypes.func.isRequired,
    onUpdate: PropTypes.func,
    selectedProduct: PropTypes.object,
};

export default AddCustomProductModal;