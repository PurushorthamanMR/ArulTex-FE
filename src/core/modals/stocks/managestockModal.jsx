import React, { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { fetchProducts } from "../../../feature-module/Api/productApi";
import { updateStock, saveStock, fetchStocks } from "../../../feature-module/Api/StockApi";
import { fetchBranches } from "../../../feature-module/Api/BranchApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ManageStockModal = ({ selectedStock, refreshData }) => {
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    branch: null,
    product: null,
    quantity: ''
  });
  const [errors, setErrors] = useState({
    branch: '',
    product: '',
    quantity: ''
  });
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts();
        const transformedProducts = response.map(product => ({
          value: product.id,
          label: product.name || '-'
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getBranches = async () => {
      setLoading(true);
      try {
        const response = await fetchBranches();
        console.log('Branches response:', response);
        
        const transformedBranches = response.map(branch => ({
          value: branch.id,
          label: branch.branchName
        }));
        
        console.log('Transformed branches:', transformedBranches);
        setBranches(transformedBranches);
      } catch (error) {
        console.error("Error fetching branches:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch branches",
          icon: "error",
          confirmButtonText: "OK"
        });
      } finally {
        setLoading(false);
      }
    };

    getBranches();
  }, []);

  useEffect(() => {
    if (selectedStock) {
      console.log('Selected Stock:', selectedStock);
      setFormData({
        branch: selectedStock.branchDto ? {
          value: selectedStock.branchDto.id,
          label: selectedStock.branchDto.branchName
        } : null,
        product: selectedStock.productDto ? {
          value: selectedStock.productDto.id,
          label: selectedStock.productDto.name
        } : null,
        quantity: selectedStock.quantity || ''
      });
    } else {
      setFormData({
        branch: null,
        product: null,
        quantity: ''
      });
    }
  }, [selectedStock]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrors({
      branch: '',
      product: '',
      quantity: ''
    });

    let hasErrors = false;

    if (!formData.branch?.value) {
      setErrors(prev => ({...prev, branch: 'Please select a branch'}));
      hasErrors = true;
    }

    if (!formData.product?.value) {
      setErrors(prev => ({...prev, product: 'Please select a product'}));
      hasErrors = true;
    }

    const quantity = parseInt(formData.quantity);
    if (!formData.quantity || isNaN(quantity) || quantity < 0) {
      setErrors(prev => ({...prev, quantity: 'Please enter a valid quantity (must be 0 or greater)'}));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Check for duplicate stock (same branch and product, excluding current stock)
    try {
      const stocks = await fetchStocks();
      const existingStock = stocks.find(stock => 
        stock.branchDto.id === parseInt(formData.branch.value) &&
        stock.productDto.id === parseInt(formData.product.value) &&
        stock.id !== selectedStock?.id
      );
      
      if (existingStock) {
        MySwal.fire({
          title: "Error!",
          text: "A stock entry with this branch and product already exists.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: { confirmButton: "btn btn-danger" },
        });
        return;
      }

      const updatedData = {
        id: selectedStock?.id,
        isActive: 1,
        quantity: parseInt(formData.quantity),
        branchDto: {
          id: parseInt(formData.branch?.value)
        },
        productDto: {
          id: parseInt(formData.product?.value)
        }
      };

      const response = await updateStock(updatedData);

      if (response?.data?.status === true) {
        document.getElementById('edit-units').classList.remove('show');
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');

        await MySwal.fire({
          title: "Success!",
          text: "Stock has been updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });

        setFormData({
          branch: null,
          product: null,
          quantity: ''
        });

        refreshData();
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      MySwal.fire({
        title: "Error!",
        text: "Failed to update stock: " + (error.message || "Unknown error"),
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
      setFormData(prev => ({
        ...prev,
        quantity: value
      }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    setErrors({
      branch: '',
      product: '',
      quantity: ''
    });

    let hasErrors = false;

    if (!formData.branch?.value) {
      setErrors(prev => ({...prev, branch: 'Please select a branch'}));
      hasErrors = true;
    }

    if (!formData.product?.value) {
      setErrors(prev => ({...prev, product: 'Please select a product'}));
      hasErrors = true;
    }

    const quantity = parseInt(formData.quantity);
    if (!formData.quantity || isNaN(quantity) || quantity < 0) {
      setErrors(prev => ({...prev, quantity: 'Please enter a valid quantity (must be 0 or greater)'}));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Check for duplicate stock (same branch and product)
    try {
      const stocks = await fetchStocks();
      const existingStock = stocks.find(stock => 
        stock.branchDto.id === parseInt(formData.branch.value) &&
        stock.productDto.id === parseInt(formData.product.value)
      );
      
      if (existingStock) {
        MySwal.fire({
          title: "Error!",
          text: "A stock entry with this branch and product already exists.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: { confirmButton: "btn btn-danger" },
        });
        return;
      }

      const newStock = {
        quantity: parseInt(formData.quantity),
        productDto: {
            id: parseInt(formData.product.value)
        },
        branchDto: {
            id: parseInt(formData.branch.value)
        },
        isActive: 1
      };

      const response = await saveStock(newStock);
      
      if (response && response.status === true) {
          MySwal.fire({
              title: "Success!",
              text: "Stock saved successfully!",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                  confirmButton: "btn btn-primary",
              },
          });
          
          setFormData({
              branch: null,
              product: null,
              quantity: ''
          });

          document.getElementById('add-units').classList.remove('show');
          document.querySelector('.modal-backdrop').remove();
          document.body.classList.remove('modal-open');
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');
          
          if (refreshData) {
              refreshData();
          }
      } else {
          MySwal.fire({
              title: "Error!",
              text: "Failed to save stock.",
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

  const handleCancel = () => {
    if (selectedStock) {
      setFormData({
        branch: selectedStock.branchDto ? {
          value: selectedStock.branchDto.id,
          label: selectedStock.branchDto.branchName
        } : null,
        product: selectedStock.productDto ? {
          value: selectedStock.productDto.id,
          label: selectedStock.productDto.name
        } : null,
        quantity: selectedStock.quantity || ''
      });
    }
    setErrors({
      branch: '',
      product: '',
      quantity: ''
    });
  };

  useEffect(() => {
    window.resetStockForm = () => {
      setFormData({
        branch: null,
        product: null,
        quantity: ''
      });
    };

    return () => {
      delete window.resetStockForm;
    };
  }, []);

  useEffect(() => {
    const addModal = document.getElementById('add-units');
    if (addModal) {
      addModal.addEventListener('show.bs.modal', () => {
        setFormData({
          branch: null,
          product: null,
          quantity: ''
        });
      });
    }

    return () => {
      const addModal = document.getElementById('add-units');
      if (addModal) {
        addModal.removeEventListener('show.bs.modal', () => {});
      }
    };
  }, []);

  useEffect(() => {
    const addModal = document.getElementById('add-units');
    const editModal = document.getElementById('edit-units');

    const clearErrorsOnClose = () => {
      setErrors({
        branch: '',
        product: '',
        quantity: ''
      });
    };

    if (addModal) {
      addModal.addEventListener('hidden.bs.modal', clearErrorsOnClose);
    }

    if (editModal) {
      editModal.addEventListener('hidden.bs.modal', clearErrorsOnClose);
    }

    return () => {
      if (addModal) {
        addModal.removeEventListener('hidden.bs.modal', clearErrorsOnClose);
      }
      if (editModal) {
        editModal.removeEventListener('hidden.bs.modal', clearErrorsOnClose);
      }
    };
  }, []);

  return (
    <>
      {/* Add Stock */}
      <div 
        className="modal fade" 
        id="add-units"
        tabIndex="-1"
        aria-labelledby="addStockModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4 id="addStockModalLabel">Add Stock</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    tabIndex="0"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleCreate}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Branch<span className="text-danger">*</span></label>
                          <Select 
                            className={`select ${errors.branch ? 'is-invalid' : ''}`}
                            placeholder="Select Branch"
                            options={branches}
                            value={formData.branch}
                            onChange={(selected) => {
                              setFormData(prev => ({...prev, branch: selected}));
                              setErrors(prev => ({...prev, branch: ''}));
                            }}
                            isLoading={loading}
                            isClearable
                          />
                          {errors.branch && <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.branch}</div>}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Product<span className="text-danger">*</span></label>
                          <Select 
                            className={`select ${errors.product ? 'is-invalid' : ''}`}
                            options={products}
                            placeholder="Select Product"
                            value={formData.product}
                            onChange={(selected) => {
                              setFormData(prev => ({...prev, product: selected}));
                              setErrors(prev => ({...prev, product: ''}));
                            }}
                            isLoading={loading}
                            isClearable
                          />
                          {errors.product && <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.product}</div>}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Quantity<span className="text-danger">*</span></label>
                          <input
                            type="number"
                            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                            placeholder="Enter Quantity"
                            value={formData.quantity}
                            onChange={(e) => {
                              handleQuantityChange(e);
                              setErrors(prev => ({...prev, quantity: ''}));
                            }}
                            min="0"
                            step="1"
                            onKeyPress={(e) => {
                              if (e.key === '-' || e.key === '.' || e.key === 'e') {
                                e.preventDefault();
                              }
                            }}
                           
                          />
                          {errors.quantity && <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.quantity}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                        tabIndex="0"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-submit"
                        tabIndex="0"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Stock */}

      {/* Edit Stock */}
      <div 
        className="modal fade" 
        id="edit-units"
        tabIndex="-1"
        aria-labelledby="editStockModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4 id="editStockModalLabel">Edit Stock</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    tabIndex="0"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Branch<span className="text-danger">*</span></label>
                          <Select 
                            className={`select ${errors.branch ? 'is-invalid' : ''}`}
                            placeholder="Select Branch"
                            options={branches}
                            value={formData.branch}
                            onChange={(selected) => {
                              setFormData(prev => ({...prev, branch: selected}));
                              setErrors(prev => ({...prev, branch: ''}));
                            }}
                            isLoading={loading}
                            isClearable
                          />
                          {errors.branch && <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.branch}</div>}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Product<span className="text-danger">*</span></label>
                          <Select 
                            className={`select ${errors.product ? 'is-invalid' : ''}`}
                            options={products}
                            placeholder="Select Product"
                            value={formData.product}
                            onChange={(selected) => {
                              setFormData(prev => ({...prev, product: selected}));
                              setErrors(prev => ({...prev, product: ''}));
                            }}
                            isLoading={loading}
                            isClearable
                          />
                          {errors.product && <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.product}</div>}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Quantity<span className="text-danger">*</span></label>
                          <input
                            type="number"
                            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                            value={formData.quantity}
                            onChange={(e) => {
                              handleQuantityChange(e);
                              setErrors(prev => ({...prev, quantity: ''}));
                            }}
                            min="0"
                            step="1"
                            onKeyPress={(e) => {
                              if (e.key === '-' || e.key === '.' || e.key === 'e') {
                                e.preventDefault();
                              }
                            }}
                            required
                          />
                          {errors.quantity && <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.quantity}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                        onClick={handleCancel}
                        tabIndex="0"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit" tabIndex="0">
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
      {/* /Edit Stock */}
    </>
  );
};

ManageStockModal.propTypes = {
  selectedStock: PropTypes.shape({
    id: PropTypes.number,
    branchId: PropTypes.number,
    productId: PropTypes.number,
    branchDto: PropTypes.shape({
      id: PropTypes.number,
      branchName: PropTypes.string
    }),
    productDto: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    quantity: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }),
  refreshData: PropTypes.func
};

ManageStockModal.defaultProps = {
  selectedStock: null,
  refreshData: () => {}
};

export default ManageStockModal;
