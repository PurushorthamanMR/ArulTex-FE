import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faDollarSign, faPlus, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import CategoryModal from '../components/CategoryModal'
import DiscountModal from '../components/DiscountModal'
import '../styles/NewProduct.css'

function NewProduct({ onBack, onSave }) {
  const navigate = useNavigate()
  const [productInfoOpen, setProductInfoOpen] = useState(true)
  const [pricingStocksOpen, setPricingStocksOpen] = useState(true)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    productName: '',
    barcode: '',
    category: '',
    quantity: '',
    purchasedPrice: '',
    pricePerUnit: '',
    lowStock: '',
    discount: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Handle save logic here
    console.log('Saving product:', formData)
    if (onSave) {
      onSave()
    }
  }

  const handleCategorySave = (categoryData) => {
    console.log('Saving category:', categoryData)
    // Here you would typically add the category to the dropdown options
    // For now, we'll just update the formData
    setFormData(prev => ({
      ...prev,
      category: categoryData.categoryName
    }))
  }

  const handleDiscountSave = (discountData) => {
    console.log('Saving discount:', discountData)
    // Here you would typically add the discount to the dropdown options
    // For now, we'll just update the formData
    setFormData(prev => ({
      ...prev,
      discount: `${discountData.percentage}%`
    }))
  }

  return (
    <div className="new-product-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">New Product</h1>
          <p className="page-subtitle">Create new product</p>
        </div>
        <button className="back-btn" onClick={onBack}>
          ← Back to Product
        </button>
      </div>

      {/* Form */}
      <form className="product-form" onSubmit={handleSave}>
        {/* Product Information Section */}
        <div className="form-section">
          <div 
            className="section-header"
            onClick={() => setProductInfoOpen(!productInfoOpen)}
          >
            <div className="section-title-wrapper">
              <div className="section-icon purple">
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
              <h2 className="section-title">Product Information</h2>
            </div>
            <FontAwesomeIcon 
              icon={productInfoOpen ? faChevronUp : faChevronDown} 
              className="section-toggle"
            />
          </div>
          
          {productInfoOpen && (
            <div className="section-content">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter Product Name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="barcode">Barcode</label>
                <input
                  type="text"
                  id="barcode"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  placeholder="Enter Barcode"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <div className="category-wrapper">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Choose</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                  </select>
                  <button 
                    type="button" 
                    className="add-category-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsCategoryModalOpen(true)
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add New</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Stocks Section */}
        <div className="form-section">
          <div 
            className="section-header"
            onClick={() => setPricingStocksOpen(!pricingStocksOpen)}
          >
            <div className="section-title-wrapper">
              <div className="section-icon purple">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <h2 className="section-title">Pricing & Stocks</h2>
            </div>
            <FontAwesomeIcon 
              icon={pricingStocksOpen ? faChevronUp : faChevronDown} 
              className="section-toggle"
            />
          </div>
          
          {pricingStocksOpen && (
            <div className="section-content">
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter Quantity"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="purchasedPrice">Purchased Price</label>
                <input
                  type="number"
                  id="purchasedPrice"
                  name="purchasedPrice"
                  value={formData.purchasedPrice}
                  onChange={handleInputChange}
                  placeholder="Enter Purchased Price"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pricePerUnit">Price Per Unit</label>
                <input
                  type="number"
                  id="pricePerUnit"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  placeholder="Enter Price Per Unit"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lowStock">Low Stock</label>
                <input
                  type="number"
                  id="lowStock"
                  name="lowStock"
                  value={formData.lowStock}
                  onChange={handleInputChange}
                  placeholder="Enter Low Stock"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="discount">Discount</label>
                <div className="category-wrapper">
                  <select
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Choose</option>
                    <option value="discount1">10% Off</option>
                    <option value="discount2">20% Off</option>
                    <option value="discount3">30% Off</option>
                  </select>
                  <button 
                    type="button" 
                    className="add-category-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsDiscountModalOpen(true)
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add New</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onBack}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Product
          </button>
        </div>
      </form>

      {/* Modals */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleCategorySave}
      />
      <DiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        onSave={handleDiscountSave}
      />
    </div>
  )
}

export default NewProduct
