import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faDollarSign, faPlus, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import * as productApi from '../api/productApi'
import * as categoryApi from '../api/categoryApi'
import { getCategoryIcon } from '../utils/categoryIcons'
import '../styles/NewProduct.css'

function NewProduct({ onBack, onSave }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [productInfoOpen, setProductInfoOpen] = useState(true)
  const [pricingStocksOpen, setPricingStocksOpen] = useState(true)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [saveError, setSaveError] = useState(null)

  const [formData, setFormData] = useState({
    productName: '',
    barcode: '',
    categoryId: '',
    quantity: '',
    purchasedPrice: '',
    pricePerUnit: '',
    lowStock: '',
    discountPercent: '0',
    isActive: true
  })

  useEffect(() => {
    let cancelled = false
    categoryApi.getAll().then((list) => {
      if (!cancelled) setCategories(Array.isArray(list) ? list : [])
    }).catch(() => { if (!cancelled) setCategories([]) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    setLoadError(null)
    productApi.getById(id).then((p) => {
      if (!cancelled) {
        setFormData({
          productName: p.productName || '',
          barcode: p.barcode || '',
          categoryId: p.categoryId ?? '',
          quantity: String(p.quantity ?? ''),
          purchasedPrice: String(p.purchasedPrice ?? ''),
          pricePerUnit: String(p.pricePerUnit ?? ''),
          lowStock: String(p.lowStock ?? ''),
          discountPercent: String(p.discountPercent ?? 0),
          isActive: p.isActive !== false
        })
      }
    }).catch((err) => {
      if (!cancelled) setLoadError(err.message || 'Failed to load product')
    })
    return () => { cancelled = true }
  }, [id, isEdit])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'isActive') {
      setFormData((prev) => ({ ...prev, isActive: value === 'true' }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const finalPrice = productApi.calcFinalPrice(
    Number(formData.pricePerUnit) || 0,
    Number(formData.discountPercent) || 0
  )

  const handleGenerateBarcode = () => {
    const newBarcode = productApi.generateBarcode()
    setFormData((prev) => ({ ...prev, barcode: newBarcode }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaveError(null)
    setLoading(true)
    try {
      const categoryId = formData.categoryId ? Number(formData.categoryId) : null
      if (!categoryId) {
        setSaveError('Please select a category')
        setLoading(false)
        return
      }
      const payload = {
        productName: formData.productName,
        barcode: (formData.barcode && String(formData.barcode).trim()) || undefined,
        categoryId,
        quantity: Number(formData.quantity) || 0,
        purchasedPrice: Number(formData.purchasedPrice) || 0,
        pricePerUnit: Number(formData.pricePerUnit) || 0,
        lowStock: Number(formData.lowStock) || 0,
        discountPercent: Number(formData.discountPercent) || 0,
        isActive: formData.isActive
      }
      if (isEdit) {
        await productApi.update(id, payload)
      } else {
        await productApi.save(payload)
      }
      if (onSave) onSave()
      else navigate('/products')
    } catch (err) {
      setSaveError(err.message || 'Save failed')
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="new-product-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'Edit Product' : 'New Product'}</h1>
          <p className="page-subtitle">{isEdit ? 'Update product' : 'Create new product'}</p>
        </div>
        <button type="button" className="back-btn" onClick={onBack || (() => navigate('/products'))}>
          ← Back to Product
        </button>
      </div>

      {loadError && <div className="product-form-error">{loadError}</div>}

      <form className="product-form" onSubmit={handleSave}>
        <div className="form-section">
          <div className="section-header" onClick={() => setProductInfoOpen(!productInfoOpen)}>
            <div className="section-title-wrapper">
              <div className="section-icon purple">
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
              <h2 className="section-title">Product Information</h2>
            </div>
            <FontAwesomeIcon icon={productInfoOpen ? faChevronUp : faChevronDown} className="section-toggle" />
          </div>
          {productInfoOpen && (
            <div className="section-content">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleInputChange} placeholder="Enter Product Name" className="form-input" required />
              </div>
              <div className="form-group">
                <label htmlFor="barcode">Barcode</label>
                <div className="barcode-input-wrap">
                  <input type="text" id="barcode" name="barcode" value={formData.barcode} onChange={handleInputChange} placeholder="Auto-generated if left blank" className="form-input" />
                  <button type="button" className="barcode-generate-btn" onClick={handleGenerateBarcode} title="Generate barcode">
                    Generate
                  </button>
                </div>
                {!isEdit && <span className="form-hint">Leave blank to auto-generate on save</span>}
              </div>
              <div className="form-group">
                <label htmlFor="categoryId">Category</label>
                <div className="category-wrapper">
                  {formData.categoryId && (
                    <FontAwesomeIcon icon={getCategoryIcon(formData.categoryId)} className="category-select-icon" aria-hidden />
                  )}
                  <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="form-select" required>
                    <option value="">Choose</option>
                    {categories.filter((c) => c.isActive).map((c) => (
                      <option key={c.id} value={c.id}>{c.categoryName}</option>
                    ))}
                  </select>
                  <button type="button" className="add-category-btn" onClick={(e) => { e.preventDefault(); navigate('/category/new') }}>
                    <FontAwesomeIcon icon={faPlus} /><span>Add New</span>
                  </button>
                </div>
              </div>
              {isEdit && (
                <div className="form-group">
                  <label>Status</label>
                  <select name="isActive" value={formData.isActive ? 'true' : 'false'} onChange={handleInputChange} className="form-select">
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="form-section">
          <div className="section-header" onClick={() => setPricingStocksOpen(!pricingStocksOpen)}>
            <div className="section-title-wrapper">
              <div className="section-icon purple">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <h2 className="section-title">Pricing & Stocks</h2>
            </div>
            <FontAwesomeIcon icon={pricingStocksOpen ? faChevronUp : faChevronDown} className="section-toggle" />
          </div>
          {pricingStocksOpen && (
            <div className="section-content">
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" min="0" value={formData.quantity} onChange={handleInputChange} placeholder="Enter Quantity" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="purchasedPrice">Purchased Price (LKR)</label>
                <input type="number" id="purchasedPrice" name="purchasedPrice" min="0" step="0.01" value={formData.purchasedPrice} onChange={handleInputChange} placeholder="Enter Purchased Price" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="pricePerUnit">Price Per Unit (LKR)</label>
                <input type="number" id="pricePerUnit" name="pricePerUnit" min="0" step="0.01" value={formData.pricePerUnit} onChange={handleInputChange} placeholder="Enter Price Per Unit" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="discountPercent">Discount (%)</label>
                <input
                  type="number"
                  id="discountPercent"
                  name="discountPercent"
                  min="0"
                  max="100"
                  step="0.5"
                  value={formData.discountPercent}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Final Price (after discount)</label>
                <div className="final-price-display">LKR {finalPrice.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="form-group">
                <label htmlFor="lowStock">Low Stock Threshold</label>
                <input type="number" id="lowStock" name="lowStock" min="0" value={formData.lowStock} onChange={handleInputChange} placeholder="Enter Low Stock" className="form-input" />
              </div>
            </div>
          )}
        </div>

        {saveError && <div className="product-form-error">{saveError}</div>}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onBack || (() => navigate('/products'))}>Cancel</button>
          <button type="submit" className="save-btn" disabled={loading}>{loading ? 'Saving...' : isEdit ? 'Update Product' : 'Save Product'}</button>
        </div>
      </form>

    </div>
  )
}

export default NewProduct
