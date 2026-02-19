import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchProducts } from "../../../feature-module/Api/productApi";
import { fetchProductDiscounts } from "../../../feature-module/Api/productDiscountApi";
import Swal from "sweetalert2";
import { Modal } from 'react-bootstrap';

const ProductDiscountModal = ({ onSave, onUpdate, selectedDiscount, discountType, show, onHide, defaultActive = true }) => {
  const [formData, setFormData] = useState({
    id: "",
    discount: "",
    quantity: "1",
    endDate: "",
    isActive: defaultActive ? 1 : 0,
    productDto: { id: "" },
    productDiscountTypeDto: {
      id: discountType === "Cash" ? 1 : discountType === "Percentage" ? 2 : 3,
      type: discountType
    },
    quantityDiscounts: []
  });

  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState("");
  const priceSymbol = localStorage.getItem("priceSymbol") || "$";

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedDiscount) {
      setFormData({
        id: selectedDiscount.id || "",
        discount: selectedDiscount.discount || "",
        quantity: selectedDiscount.quantity || "1",
        endDate: selectedDiscount.endDate || "",
        isActive: selectedDiscount.isActive || 0,
        productDto: selectedDiscount.productDto || { id: "" },
        productDiscountTypeDto: {
          id: discountType === "Cash" ? 1 : discountType === "Percentage" ? 2 : 3,
          type: discountType
        },
        quantityDiscounts: selectedDiscount.quantityDiscounts || []
      });
    } else {
      resetForm();
    }
  }, [selectedDiscount, discountType]);

  useEffect(() => {
    updateAvailableProducts();
  }, [allDiscounts, products, selectedDiscount]);

  const loadInitialData = async () => {
    try {
      const [productsData, discountsData] = await Promise.all([
        fetchProducts(),
        fetchProductDiscounts()
      ]);

      if (Array.isArray(productsData)) {
        const filteredProducts = productsData.filter(product => 
          product.isActive && 
          product.productCategoryDto?.productCategoryName !== "Custom" && 
          product.productCategoryDto?.productCategoryName !== "Non Scan"
        );
        setProducts(filteredProducts);
      }

      if (Array.isArray(discountsData)) {
        setAllDiscounts(discountsData);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to load initial data: " + error.message,
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const updateAvailableProducts = () => {
    const productsWithActiveDiscounts = new Set(
      allDiscounts
        .filter(d => d.isActive && (!selectedDiscount || d.id !== selectedDiscount.id))
        .map(d => d.productDto.id)
    );

    const available = products.filter(p => !productsWithActiveDiscounts.has(p.id));
    setAvailableProducts(available);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      discount: "",
      quantity: "1",
      endDate: "",
      isActive: defaultActive ? 1 : 0,
      productDto: { id: "" },
      productDiscountTypeDto: {
        id: discountType === "Cash" ? 1 : discountType === "Percentage" ? 2 : 3,
        type: discountType
      },
      quantityDiscounts: []
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productDto.id) {
      newErrors.productDto = "Product is required";
      return { isValid: false, errors: newErrors };
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
      return { isValid: false, errors: newErrors };
    }

    if (discountType === "Quantity") {
      if (!formData.quantityDiscounts.length) {
        newErrors.quantityDiscounts = "At least one quantity discount is required";
        return { isValid: false, errors: newErrors };
      }

      const sortedDiscounts = [...formData.quantityDiscounts].sort((a, b) => 
        parseInt(a.quantity) - parseInt(b.quantity)
      );

      const quantities = new Set();
      for (const [index, row] of sortedDiscounts.entries()) {
        if (!row.quantity || parseInt(row.quantity) <= 0) {
          newErrors[`quantity_${index}`] = "Quantity must be greater than 0";
          return { isValid: false, errors: newErrors };
        }

        if (quantities.has(parseInt(row.quantity))) {
          newErrors[`quantity_${index}`] = `Quantity ${row.quantity} is already added`;
          return { isValid: false, errors: newErrors };
        }
        quantities.add(parseInt(row.quantity));

        if (!row.discount || parseFloat(row.discount) <= 0) {
          newErrors[`discount_${index}`] = "Discount must be greater than 0";
          return { isValid: false, errors: newErrors };
        }
      }

      if (JSON.stringify(formData.quantityDiscounts) !== JSON.stringify(sortedDiscounts)) {
        setFormData(prev => ({
          ...prev,
          quantityDiscounts: sortedDiscounts
        }));
      }
    } else {
      if (!formData.discount || formData.discount <= 0) {
        newErrors.discount = "Discount must be greater than 0";
        return { isValid: false, errors: newErrors };
      }

      if (discountType === "Percentage" && formData.discount > 100) {
        newErrors.discount = "Percentage discount cannot exceed 100%";
        return { isValid: false, errors: newErrors };
      }
    }

    if (formData.isActive) {
      const hasActiveDiscount = allDiscounts.some(d => {
        if (selectedDiscount && d.id === selectedDiscount.id) {
          return false;
        }
        
        if (discountType === "Quantity") {
          return d.productDto.id === formData.productDto.id && 
                 d.isActive && 
                 d.productDiscountTypeDto.type !== "Quantity";
        }
        
        return d.productDto.id === formData.productDto.id && 
               d.isActive && 
               (d.productDiscountTypeDto.type === discountType ||
                d.productDiscountTypeDto.type === "Quantity");
      });

      if (hasActiveDiscount) {
        newErrors.productDto = "This product already has an active discount";
        Swal.fire({
          title: "Active Discount Exists",
          text: "This product already has an active discount. Please deactivate the existing discount first.",
          icon: "error",
          confirmButtonText: "OK"
        });
        return { isValid: false, errors: newErrors };
      }
    }

    return { isValid: true, errors: {} };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "productDto") {
      const hasActiveDiscount = allDiscounts.some(d => 
        d.productDto.id === value && 
        d.isActive && 
        d.productDiscountTypeDto.type === discountType &&
        (!selectedDiscount || (d.id !== selectedDiscount.id))
      );

      if (hasActiveDiscount && !selectedDiscount) {
        Swal.fire({
          title: "Warning",
          text: "This product already has an active discount. New discount will be created as inactive.",
          icon: "warning",
          confirmButtonText: "OK"
        });
        setFormData(prev => ({
          ...prev,
          productDto: { id: value },
          isActive: 0
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          productDto: { id: value }
        }));
      }
    } else if (name === "isActive") {
      const newValue = parseInt(value);
      if (newValue === 1) {
        const hasActiveDiscount = allDiscounts.some(d => 
          d.productDto.id === formData.productDto.id && 
          d.isActive && 
          d.productDiscountTypeDto.type === discountType &&
          (!selectedDiscount || (d.id !== selectedDiscount.id))
        );

        if (hasActiveDiscount) {
          Swal.fire({
            title: "Error",
            text: "Cannot activate: This product already has an active discount",
            icon: "error",
            confirmButtonText: "OK"
          });
          return;
        }
      }
      setFormData(prev => ({ ...prev, [name]: newValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleQuantityDiscountChange = (index, field, value) => {
    const updatedDiscounts = [...formData.quantityDiscounts];
    
    const processedValue = field === 'quantity' ? 
      parseInt(value) || '' : 
      parseFloat(value) || '';

    if (field === 'quantity' && processedValue) {
      const isDuplicate = formData.quantityDiscounts.some(
        (discount, i) => i !== index && parseInt(discount.quantity) === processedValue
      );
      
      if (isDuplicate) {
        Swal.fire({
          title: "Warning",
          text: `Quantity ${processedValue} already exists. Please use a different quantity.`,
          icon: "warning",
          confirmButtonText: "OK"
        });
        return;
      }
    }

    updatedDiscounts[index] = {
      ...updatedDiscounts[index],
      [field]: processedValue
    };

    const sortedDiscounts = [...updatedDiscounts].sort((a, b) => {
      const qtyA = parseInt(a.quantity) || 0;
      const qtyB = parseInt(b.quantity) || 0;
      return qtyA - qtyB;
    });

    setFormData(prev => ({
      ...prev,
      quantityDiscounts: sortedDiscounts
    }));
  };

  const addQuantityDiscount = () => {
    const maxQuantity = formData.quantityDiscounts.reduce(
      (max, discount) => Math.max(max, parseInt(discount.quantity) || 0),
      0
    );

    setFormData(prev => ({
      ...prev,
      quantityDiscounts: [
        ...prev.quantityDiscounts,
        { quantity: maxQuantity + 1, discount: "" }
      ].sort((a, b) => (parseInt(a.quantity) || 0) - (parseInt(b.quantity) || 0))
    }));
  };

  const removeQuantityDiscount = async (index) => {
    const discountToRemove = formData.quantityDiscounts[index];
    
    if (selectedDiscount && allDiscounts) {
      const existingDiscount = allDiscounts.find(d => 
        d.productDto.id === selectedDiscount.productDto.id && 
        d.quantity === discountToRemove.quantity &&
        d.productDiscountTypeDto.type === "Quantity"
      );

      if (existingDiscount) {
        try {
          const deactivatedDiscount = {
            ...existingDiscount,
            isActive: 0
          };
          await onUpdate(deactivatedDiscount);
        } catch (error) {
          console.error("Error deactivating discount:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove quantity discount. Please try again.",
            icon: "error",
            confirmButtonText: "OK"
          });
          return;
        }
      }
    }

    setFormData(prev => ({
      ...prev,
      quantityDiscounts: prev.quantityDiscounts.filter((_, i) => i !== index)
    }));
  };

  const handleBarcodeScan = (e) => {
    const barcode = e.target.value;
    setBarcodeInput(barcode);
  };

  const handleBarcodeKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const barcode = barcodeInput;
      
      if (barcode.trim() === "") return;
      
      const productByBarcode = products.find(product => 
        product.barcode && product.barcode.toLowerCase() === barcode.toLowerCase()
      );
      
      if (productByBarcode) {
        const isAvailable = !allDiscounts.some(d => 
          d.productDto.id === productByBarcode.id && 
          d.isActive && 
          d.productDiscountTypeDto.type === discountType &&
          (!selectedDiscount || (d.id !== selectedDiscount.id))
        );
        
        if (isAvailable || selectedDiscount) {
          setFormData(prev => ({
            ...prev,
            productDto: { id: productByBarcode.id }
          }));
        } else {
          Swal.fire({
            title: "Warning",
            text: "This product already has an active discount. New discount will be created as inactive.",
            icon: "warning",
            confirmButtonText: "OK"
          });
          setFormData(prev => ({
            ...prev,
            productDto: { id: productByBarcode.id },
            isActive: 0
          }));
        }
      } else {
        Swal.fire({
          title: "Product Not Found",
          text: `No product found with barcode: ${barcode}`,
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm();
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      let success = false;
      let allOperationsSuccessful = true;

      if (discountType === "Quantity") {
        if (selectedDiscount) {
          const existingDiscounts = allDiscounts.filter(d => 
            d.productDto.id === formData.productDto.id && 
            d.productDiscountTypeDto.type === "Quantity"
          );

          for (let i = 0; i < formData.quantityDiscounts.length; i++) {
            const qd = formData.quantityDiscounts[i];
            const existingQd = i === 0 ? selectedDiscount : existingDiscounts[i];
            
            const discountData = {
              ...formData,
              id: existingQd?.id || "",
              discount: qd.discount,
              quantity: qd.quantity,
              productDiscountTypeDto: {
                id: 3,
                type: "Quantity"
              }
            };

            let operationSuccess;
            if (existingQd) {
              operationSuccess = await onUpdate(discountData);
            } else {
              operationSuccess = await onSave(discountData);
            }

            if (!operationSuccess) {
              allOperationsSuccessful = false;
              break;
            }
          }

          success = allOperationsSuccessful;
        } else {
          // For new quantity discounts
          for (const qd of formData.quantityDiscounts) {
            const discountData = {
              ...formData,
              discount: qd.discount,
              quantity: qd.quantity,
              productDiscountTypeDto: {
                id: 3,
                type: "Quantity"
              }
            };
            const operationSuccess = await onSave(discountData);
            if (!operationSuccess) {
              allOperationsSuccessful = false;
              break;
            }
          }
          success = allOperationsSuccessful;
        }

        if (success) {
          Swal.fire({
            title: "Success!",
            text: `Quantity discounts ${selectedDiscount ? "updated" : "added"} successfully`,
            icon: "success",
            confirmButtonText: "OK"
          });
          resetForm();
          onHide();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to process all quantity discounts. Please try again.",
            icon: "error",
            confirmButtonText: "OK"
          });
        }
      } else {
        // Handle Cash and Percentage discounts
        const discountData = {
          ...formData,
          quantity: "1",
          productDiscountTypeDto: {
            id: discountType === "Cash" ? 1 : 2,
            type: discountType
          }
        };

        if (selectedDiscount) {
          success = await onUpdate(discountData);
        } else {
          success = await onSave(discountData);
        }

        if (success) {
          resetForm();
          onHide();
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
      dialogClassName="custom-modal-two"
    >
      <Modal.Header closeButton className="border-0 custom-modal-header">
        <Modal.Title>
          {selectedDiscount ? 'Edit' : 'Add'} {discountType} Discount
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Product Selection */}
            <div className="col-lg-12">
              <div className="input-blocks">
                <label>Product <span className="text-danger">*</span></label>
                <div className="d-flex">
                  <select
                    name="productDto"
                    value={formData.productDto.id}
                    onChange={handleChange}
                    className={`form-control ${errors.productDto ? 'is-invalid' : ''}`}
                    disabled={!!selectedDiscount}
                  >
                    <option value="">Select Product</option>
                    {availableProducts.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                    {selectedDiscount && (
                      <option value={selectedDiscount.productDto.id}>
                        {selectedDiscount.productDto.name}
                      </option>
                    )}
                  </select>
                  <div className="ms-2" style={{ width: '500px' }}>
                    <input
                      type="text"
                      placeholder="Scan Barcode"
                      value={barcodeInput}
                      onChange={handleBarcodeScan}
                      onKeyDown={handleBarcodeKeyDown}
                      className="form-control"
                      disabled={!!selectedDiscount}
                    />
                  </div>
                </div>
                {errors.productDto && (
                  <div className="invalid-feedback">{errors.productDto}</div>
                )}
              </div>
            </div>

            {/* Discount Input */}
            {discountType !== "Quantity" && (
              <div className="col-lg-12">
                <div className="input-blocks">
                  <label>
                    Discount ({discountType === "Percentage" ? "%" : `${priceSymbol}`}) 
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className={`form-control ${errors.discount ? 'is-invalid' : ''}`}
                    min="0"
                    max={discountType === "Percentage" ? "100" : undefined}
                    step="0.01"
                  />
                  {errors.discount && (
                    <div className="invalid-feedback">{errors.discount}</div>
                  )}
                </div>
              </div>
            )}

            {/* Quantity Discounts */}
            {discountType === "Quantity" && (
              <div className="col-lg-12">
                <div className="input-blocks">
                  <label>Quantity Discounts <span className="text-danger">*</span></label>
                  <div className="table-responsive mb-2">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Quantity (Min.)</th>
                          <th>Discount Amount ({priceSymbol})</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.quantityDiscounts.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="number"
                                value={row.quantity}
                                onChange={(e) => handleQuantityDiscountChange(index, "quantity", e.target.value)}
                                className={`form-control ${errors[`quantity_${index}`] ? 'is-invalid' : ''}`}
                                placeholder="Min Quantity"
                                min="1"
                              />
                              {errors[`quantity_${index}`] && (
                                <div className="invalid-feedback">{errors[`quantity_${index}`]}</div>
                              )}
                            </td>
                            <td>
                              <input
                                type="number"
                                value={row.discount}
                                onChange={(e) => handleQuantityDiscountChange(index, "discount", e.target.value)}
                                className={`form-control ${errors[`discount_${index}`] ? 'is-invalid' : ''}`}
                                placeholder="Discount Amount"
                                min="0"
                                step="0.01"
                              />
                              {errors[`discount_${index}`] && (
                                <div className="invalid-feedback">{errors[`discount_${index}`]}</div>
                              )}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => removeQuantityDiscount(index)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addQuantityDiscount}
                  >
                    Add Quantity Threshold
                  </button>
                  {errors.quantityDiscounts && (
                    <div className="text-danger mt-2">{errors.quantityDiscounts}</div>
                  )}
                </div>
              </div>
            )}

            {/* End Date */}
            <div className="col-lg-12">
              <div className="input-blocks">
                <label>End Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.endDate && (
                  <div className="invalid-feedback">{errors.endDate}</div>
                )}
              </div>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="modal-footer-btn">
            <button 
              type="button" 
              className="btn btn-cancel me-2" 
              onClick={onHide}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-submit">
              {selectedDiscount ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

ProductDiscountModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectedDiscount: PropTypes.object,
  discountType: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  defaultActive: PropTypes.bool,
};

export default ProductDiscountModal;