import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchProducts } from "../../../feature-module/Api/productApi";

const AddPurchases = ({ onSave, purchases = [] }) => {
  const initialFormState = {
    barcode: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [productName, setProductName] = useState("");
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [productStatus, setProductStatus] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingProduct(true);
      try {
        const productList = await fetchProducts();
        setProducts(productList || []);
      } catch (error) {
        setProductName("Error fetching products");
      } finally {
        setIsLoadingProduct(false);
      }
    };
    loadProducts();
    
    // Add event listener for modal hidden event to reset form
    const modalElement = document.getElementById('add-units');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', resetForm);
    }
    
    // Clean up event listener on component unmount
    return () => {
      if (modalElement) {
        modalElement.removeEventListener('hidden.bs.modal', resetForm);
      }
    };
  }, []);
  
  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setProductName("");
    setProductStatus("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.barcode.trim()) {
      newErrors.barcode = "Barcode is required";
    } else if (purchases && purchases.some((purchase) => purchase.barcode === formData.barcode)) {
      newErrors.barcode = "This barcode is already added to the purchase list";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "barcode") {
      setProductName("");
      setProductStatus("Scan barcode to check product");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const barcode = formData.barcode.trim();
      
      if (barcode === "") {
        setProductStatus("Enter a barcode to check");
        return;
      }

      const matchingProduct = products.find(
        (product) => product.barcode === barcode && product.isActive === true
      );
      
      if (matchingProduct && matchingProduct.name) {
        setProductName(matchingProduct.name);
        setProductStatus(`Product: ${matchingProduct.name}`);
      } else {
        setProductName("Product not found or inactive");
        setProductStatus("Product not found or inactive");
      }
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        productName: productName !== "Product not found or inactive" ? productName : null
      });
      document.querySelector("#add-units .close").click();
    }
  };

  return (
    <div>
      <div className="modal fade" id="add-units" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="modal-header border-0 custom-modal-header">
              <h4 className="page-title">Add New</h4>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body custom-modal-body">
              <form onSubmit={handleAddSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Barcode <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="form-control"
                        placeholder="Enter barcode and press Enter to check"
                      />
                      {errors.barcode && <span className="text-danger">{errors.barcode}</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks">
                      <label>Product Name</label>
                      <p className="form-control-static">
                        {isLoadingProduct ? "Loading..." : productStatus || "Enter a barcode and press Enter to check"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer-btn">
                  <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-submit" disabled={!productName}>
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

AddPurchases.propTypes = {
  onSave: PropTypes.func.isRequired,
  purchases: PropTypes.array,
};

AddPurchases.defaultProps = {
  purchases: [],
};

export default AddPurchases;