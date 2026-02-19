import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { all_routes } from "../../Router/all_routes";
import AddCategory from "../../core/modals/inventory/addcategory";
import AddTax from "../../core/modals/inventory/addtax";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Info,
  LifeBuoy,
  PlusCircle,
} from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { fetchProductCategories } from "../Api/ProductCategoryApi";
import { fetchTaxes } from "../Api/TaxApi";
import { fetchProducts, updateProduct } from "../Api/productApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAllManagerToggles } from "../Api/ManagerToggle";

const EditProduct = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const MySwal = withReactContent(Swal);
  
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('id');

  const data = useSelector((state) => state.toggle_header);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTaxes, setLoadingTaxes] = useState(true);
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);
  const [productName, setProductName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [addQuantity, setAddQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [taxType, setTaxType] = useState(null);
  const [taxes, setTaxes] = useState([]);
  const [lowStock, setLowStock] = useState("");
  
  const [errors, setErrors] = useState({
    productName: "",
    barcode: "",
    category: "",
    quantity: "",
    addQuantity: "",
    purchasePrice: "",
    pricePerUnit: "",
    taxType: "",
    lowStock: ""
  });

  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  useEffect(() => {
    loadCategoriesData();
    loadTaxesData();
    if (productId) {
      loadProductData();
    }
    const fetchTaxToggle = async () => {
      try {
        const toggles = await getAllManagerToggles();
        const taxToggle = toggles.responseDto.find(toggle => toggle.action === "Tax");
        setIsTaxEnabled(taxToggle?.isActive || false);
      } catch (error) {
        console.error('Error fetching tax toggle:', error);
        setIsTaxEnabled(false);
      }
    };
    fetchTaxToggle();
  }, [productId]);

  const loadProductData = async () => {
    try {
      const products = await fetchProducts();
      const product = products.find(p => p.id === parseInt(productId));
      
      if (product) {
        setProductName(product.name);
        setBarcode(product.barcode);
        setCategory({ value: product.productCategoryDto.id, label: product.productCategoryDto.productCategoryName });
        setQuantity(product.quantity.toString());
        setAddQuantity("");
        setPurchasePrice(product.purchasePrice.toString());
        setPricePerUnit(product.pricePerUnit.toString());
        setTaxType({ value: product.taxDto.id, label: `${product.taxDto.taxPercentage}%` });
        setLowStock(product.lowStock.toString());
      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "Failed to load product data.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const loadCategoriesData = async () => {
    setLoadingCategories(true);
    try {
      const data = await fetchProductCategories();
      const reversedData = [...data].reverse();
      setCategories(reversedData
        .filter(cat => 
          cat.isActive === true && 
          cat.productCategoryName.toLowerCase() !== 'custom' &&
          cat.productCategoryName.toLowerCase() !== 'non scan'
        )
        .map((cat) => ({ value: cat.id, label: cat.productCategoryName }))
      );
    } catch (error) {
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };
  
  const loadTaxesData = async () => {
    setLoadingTaxes(true);
    try {
      const data = await fetchTaxes();
      const reversedData = [...data].reverse();
      setTaxes(reversedData
        .filter(tax => tax.isActive === true)
        .map((tax) => ({ value: tax.id, label: `${tax.taxPercentage}%` }))
      );
    } catch (error) {
      setTaxes([]);
    } finally {
      setLoadingTaxes(false);
    }
  };

  const validateForm = () => {
    const newErrors = {
      productName: "",
      barcode: "",
      category: "",
      quantity: "",
      addQuantity: "",
      purchasePrice: "",
      pricePerUnit: "",
      taxType: "",
      lowStock: ""
    };
    
    let isValid = true;

    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
      isValid = false;
    } else if (productName.length < 2) {
      newErrors.productName = "Product name must be at least 2 characters";
      isValid = false;
    }

    if (!barcode.trim()) {
      newErrors.barcode = "Barcode is required";
      isValid = false;
    }

    if (!category) {
      newErrors.category = "Please select a category";
      isValid = false;
    }

    if (!quantity) {
      newErrors.quantity = "Quantity is required";
      isValid = false;
    } else if (isNaN(quantity) || parseInt(quantity) < 0) {
      newErrors.quantity = "Please enter a valid quantity";
      isValid = false;
    }

    if (addQuantity && (isNaN(addQuantity) || parseInt(addQuantity) < 0)) {
      newErrors.addQuantity = "Please enter a valid quantity to add";
      isValid = false;
    }

    if (!purchasePrice) {
      newErrors.purchasePrice = "Purchase price is required";
      isValid = false;
    } else if (isNaN(purchasePrice) || parseFloat(purchasePrice) < 0) {
      newErrors.purchasePrice = "Please enter a valid purchase price";
      isValid = false;
    }

    if (!pricePerUnit) {
      newErrors.pricePerUnit = "Price per unit is required";
      isValid = false;
    } else if (isNaN(pricePerUnit) || parseFloat(pricePerUnit) < 0) {
      newErrors.pricePerUnit = "Please enter a valid price per unit";
      isValid = false;
    }

    if (isTaxEnabled && !taxType) {
      newErrors.taxType = "Please select a tax percentage";
      isValid = false;
    }

    if (!lowStock) {
      newErrors.lowStock = "Low stock value is required";
      isValid = false;
    } else if (isNaN(lowStock) || parseInt(lowStock) < 0) {
      newErrors.lowStock = "Please enter a valid low stock value";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdateProduct = async () => {
    if (!validateForm()) {
      MySwal.fire({
        title: "Validation Error!",
        text: "Please check the form for errors.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
      return;
    }

    try {
      const products = await fetchProducts();
      const existingProductByName = products.find(p => 
        p.name.toLowerCase() === productName.toLowerCase() && p.id !== parseInt(productId)
      );
      
      if (existingProductByName) {
        MySwal.fire({
          title: "Error!",
          text: "A product with this name already exists.",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }

      const existingProductByBarcode = products.find(p => 
        p.barcode === barcode && p.id !== parseInt(productId)
      );
      
      if (existingProductByBarcode) {
        MySwal.fire({
          title: "Error!",
          text: "A product with this barcode already exists.",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }

      const totalQuantity = parseInt(quantity) + (addQuantity ? parseInt(addQuantity) : 0);

      const productData = {
        id: parseInt(productId),
        name: productName,
        barcode: barcode,
        pricePerUnit: parseFloat(pricePerUnit),
        taxDto: { id: isTaxEnabled ? parseInt(taxType.value) : 1 },
        isActive: true,
        productCategoryDto: { id: parseInt(category.value) },
        expiryDate: "2025-12-31T23:59:59",
        createdDate: new Date().toISOString(),
        lowStock: parseInt(lowStock),
        purchasePrice: parseFloat(purchasePrice),
        quantity: totalQuantity,
      };

      const response = await updateProduct(productData);
      
      if (response) {
        MySwal.fire({
          title: "Success!",
          text: "Product updated successfully!",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          navigate(route.productlist);
        });
      } else {
        MySwal.fire({
          title: "Error!",
          text: "Failed to update product.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const handleCancel = () => {
    navigate(route.productlist);
  };

  const handleCategoryAdded = (newCategory) => {
    setCategory(newCategory);
  };

  const handleTaxAdded = (newTax) => {
    setTaxType(newTax);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Edit Product</h4>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="page-btn me-2">
                <Link 
                  to={route.productlist} 
                  className="btn btn-secondary d-flex align-items-center"
                  style={{ padding: '6px 25px', minWidth: '180px', color: '#ffffff' }}
                >
                  <ArrowLeft className="me-1" style={{ width: '16px', height: '16px', color: '#ffffff' }} />
                  Back to Product
                </Link>
              </div>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Collapse"
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={() => {
                    dispatch(setToogleHeader(!data));
                  }}
                >
                  <ChevronUp className="feather-chevron-up" />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
        <form>
          <div className="card">
            <div className="card-body add-product pb-0">
              <div className="accordion-card-one accordion" id="accordionExample">
                <div className="accordion-item">
                  <div className="accordion-header" id="headingOne">
                    <div className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-controls="collapseOne">
                      <div className="addproduct-icon">
                        <h5>
                          <Info className="add-info" />
                          <span>Product Information</span>
                        </h5>
                        <Link to="#">
                          <ChevronDown className="chevron-down-add" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="mb-3 add-product">
                            <label className="form-label">Product Name</label>
                            <input
                              type="text"
                              className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                              placeholder="Enter Product Name"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                              required
                            />
                            {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="input-blocks add-product list">
                            <label>Barcode</label>
                            <input
                              type="text"
                              className={`form-control list ${errors.barcode ? 'is-invalid' : ''}`}
                              placeholder="Enter Barcode"
                              value={barcode}
                              onChange={(e) => setBarcode(e.target.value)}
                              required
                            />
                            {errors.barcode && <div className="invalid-feedback">{errors.barcode}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="addservice-info">
                        <div className="row">
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="mb-3 add-product">
                              <div className="add-newplus">
                                <label className="form-label">Category</label>
                                <Link to="#" data-bs-toggle="modal" data-bs-target="#add-units-category">
                                  <PlusCircle className="plus-down-add" />
                                  <span>Add New</span>
                                </Link>
                              </div>
                              {loadingCategories ? (
                                <p>Loading categories...</p>
                              ) : (
                                <div>
                                  <Select
                                    options={categories}
                                    placeholder="Choose"
                                    value={category}
                                    onChange={setCategory}
                                    className={errors.category ? 'is-invalid' : ''}
                                    required
                                  />
                                  {errors.category && <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.category}</div>}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-card-one accordion" id="accordionExample2">
                <div className="accordion-item">
                  <div className="accordion-header" id="headingTwo">
                    <div className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-controls="collapseTwo">
                      <div className="text-editor add-list">
                        <div className="addproduct-icon list icon">
                          <h5>
                            <LifeBuoy className="add-info" />
                            <span>Pricing & Stocks</span>
                          </h5>
                          <Link to="#">
                            <ChevronDown className="chevron-down-add" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                          <div className="row">
                            <div className="col-lg-4 col-sm-6 col-12">
                              <div className="input-blocks add-product">
                                <label>Current Quantity</label>
                                <input
                                  type="text"
                                  className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                  placeholder="Enter Quantity"
                                  value={quantity}
                                  readOnly
                                  required
                                />
                                {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                              <div className="input-blocks add-product">
                                <label>Add Quantity</label>
                                <input
                                  type="text"
                                  className={`form-control ${errors.addQuantity ? 'is-invalid' : ''}`}
                                  placeholder="Enter quantity to add"
                                  value={addQuantity}
                                  onChange={(e) => setAddQuantity(e.target.value)}
                                />
                                {errors.addQuantity && <div className="invalid-feedback">{errors.addQuantity}</div>}
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                              <div className="input-blocks add-product">
                                <label>Purchase Price</label>
                                <input
                                  type="text"
                                  className={`form-control ${errors.purchasePrice ? 'is-invalid' : ''}`}
                                  placeholder="Enter Purchase Price"
                                  value={purchasePrice}
                                  onChange={(e) => setPurchasePrice(e.target.value)}
                                  required
                                />
                                {errors.purchasePrice && <div className="invalid-feedback">{errors.purchasePrice}</div>}
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                              <div className="input-blocks add-product">
                                <label>Price Per Unit</label>
                                <input
                                  type="text"
                                  className={`form-control ${errors.pricePerUnit ? 'is-invalid' : ''}`}
                                  placeholder="Enter Price Per Unit"
                                  value={pricePerUnit}
                                  onChange={(e) => setPricePerUnit(e.target.value)}
                                  required
                                />
                                {errors.pricePerUnit && <div className="invalid-feedback">{errors.pricePerUnit}</div>}
                              </div>
                            </div>
                            {isTaxEnabled && (
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="input-blocks add-product">
                                  <div className="add-newplus">
                                    <label>Tax Percentage</label>
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#add-units-tax">
                                      <PlusCircle className="plus-down-add" />
                                      <span>Add New</span>
                                    </Link>
                                  </div>
                                  {loadingTaxes ? (
                                    <p>Loading taxes...</p>
                                  ) : (
                                    <div>
                                      <Select
                                        options={taxes}
                                        placeholder="Select Option"
                                        value={taxType}
                                        onChange={setTaxType}
                                        className={errors.taxType ? 'is-invalid' : ''}
                                        required
                                      />
                                      {errors.taxType && <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.taxType}</div>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            <div className="col-lg-4 col-sm-6 col-12">
                              <div className="input-blocks add-product">
                                <label>Low Stock</label>
                                <input
                                  type="text"
                                  className={`form-control ${errors.lowStock ? 'is-invalid' : ''}`}
                                  placeholder="Enter Low Stock"
                                  value={lowStock}
                                  onChange={(e) => setLowStock(e.target.value)}
                                  required
                                />
                                {errors.lowStock && <div className="invalid-feedback">{errors.lowStock}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="btn-addproduct mb-4">
              <button 
                type="button" 
                className="btn btn-cancel me-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-submit"
                onClick={handleUpdateProduct}
              >
                Update Product
              </button>
            </div>
          </div>
        </form>
      </div>
      <AddCategory 
        refreshCategories={loadCategoriesData} 
        onCategoryAdded={handleCategoryAdded}
      />
      <AddTax 
        refreshTaxes={loadTaxesData} 
        onTaxAdded={handleTaxAdded}
      />
    </div>
  );
};

export default EditProduct;