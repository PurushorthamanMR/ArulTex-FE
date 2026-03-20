import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faDollarSign, faPlus, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import * as productApi from '../api/productApi'
import * as categoryApi from '../api/categoryApi'
import * as supplierApi from '../api/supplierApi'
import { CATEGORY_ICON_OPTIONS, getCategoryIcon, setStoredIconKey } from '../utils/categoryIcons'
import { getPhoneValidationError } from '../utils/phoneValidation'
import '../styles/NewProduct.css'

function NewProduct({ onBack, onSave }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [productInfoOpen, setProductInfoOpen] = useState(true)
  const [pricingStocksOpen, setPricingStocksOpen] = useState(true)
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [saveError, setSaveError] = useState(null)
  const [nameSuggestions, setNameSuggestions] = useState([])
  const [nameSuggestionsLoading, setNameSuggestionsLoading] = useState(false)

  const [formData, setFormData] = useState({
    productName: '',
    barcode: '', // create: optional; edit: readonly display
    categoryId: '',
    supplierId: '',
    quantity: '',
    purchasedPrice: '',
    pricePerUnit: '',
    lowStock: '',
    discountPercent: '0',
    isActive: true
  })

  // ---- Popups: Add Category / Add Supplier (inline modal) ----
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false)

  const [addCategoryFormData, setAddCategoryFormData] = useState({
    categoryName: '',
    selectedIconKey: 1,
    isActive: true
  })
  const [addCategoryLoading, setAddCategoryLoading] = useState(false)
  const [addCategoryError, setAddCategoryError] = useState(null)

  const [addSupplierFormData, setAddSupplierFormData] = useState({
    supplierName: '',
    email: '',
    mobileNumber: '',
    address: '',
    isActive: true
  })
  const [addSupplierLoading, setAddSupplierLoading] = useState(false)
  const [addSupplierError, setAddSupplierError] = useState(null)

  useEffect(() => {
    if (!showAddCategoryModal && !showAddSupplierModal) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowAddCategoryModal(false)
        setShowAddSupplierModal(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showAddCategoryModal, showAddSupplierModal])

  // Live product-name suggestions when creating new product
  useEffect(() => {
    if (isEdit) {
      setNameSuggestions([])
      return
    }
    const raw = formData.productName || ''
    const q = raw.trim()
    if (q.length < 2) {
      setNameSuggestions([])
      return
    }

    let cancelled = false
    setNameSuggestionsLoading(true)
    const timeoutId = setTimeout(() => {
      productApi
        .search({ productName: q, isActive: true })
        .then((list) => {
          if (cancelled) return
          const lowerQ = q.toLowerCase()
          const filtered = (Array.isArray(list) ? list : [])
            .filter((p) => (p.productName || '').toLowerCase().includes(lowerQ))
            .slice(0, 5)
          setNameSuggestions(filtered)
        })
        .catch(() => {
          if (!cancelled) setNameSuggestions([])
        })
        .finally(() => {
          if (!cancelled) setNameSuggestionsLoading(false)
        })
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [formData.productName, isEdit])

  useEffect(() => {
    let cancelled = false
    categoryApi.getAll().then((list) => {
      if (!cancelled) setCategories(Array.isArray(list) ? list : [])
    }).catch(() => { if (!cancelled) setCategories([]) })
    supplierApi.getAll().then((list) => {
      if (!cancelled) setSuppliers(Array.isArray(list) ? list : [])
    }).catch(() => { if (!cancelled) setSuppliers([]) })
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
          supplierId: p.supplierId != null ? String(p.supplierId) : '',
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

  const refreshCategories = async () => {
    try {
      const list = await categoryApi.getAll()
      setCategories(Array.isArray(list) ? list : [])
    } catch (_) {
      setCategories([])
    }
  }

  const refreshSuppliers = async () => {
    try {
      const list = await supplierApi.getAll()
      setSuppliers(Array.isArray(list) ? list : [])
    } catch (_) {
      setSuppliers([])
    }
  }

  const handleAddCategorySave = async (e) => {
    e.preventDefault()
    if (addCategoryLoading) return

    const categoryName = addCategoryFormData.categoryName.trim()
    if (!categoryName) {
      setAddCategoryError('Please enter category name')
      return
    }

    setAddCategoryLoading(true)
    setAddCategoryError(null)
    try {
      const saved = await categoryApi.save({
        categoryName,
        isActive: addCategoryFormData.isActive
      })

      if (saved?.id != null) {
        setStoredIconKey(saved.id, addCategoryFormData.selectedIconKey)
      }

      await refreshCategories()
      setFormData((prev) => ({
        ...prev,
        categoryId: saved?.id != null ? String(saved.id) : prev.categoryId
      }))
      setShowAddCategoryModal(false)
    } catch (err) {
      setAddCategoryError(err.message || 'Failed to add category')
    } finally {
      setAddCategoryLoading(false)
    }
  }

  const handleAddSupplierSave = async (e) => {
    e.preventDefault()
    if (addSupplierLoading) return

    const supplierName = addSupplierFormData.supplierName.trim()
    if (!supplierName) {
      setAddSupplierError('Please enter supplier name')
      return
    }

    const phoneError = getPhoneValidationError(addSupplierFormData.mobileNumber)
    if (phoneError) {
      setAddSupplierError(phoneError)
      return
    }

    setAddSupplierLoading(true)
    setAddSupplierError(null)
    try {
      const saved = await supplierApi.save({
        supplierName,
        email: addSupplierFormData.email?.trim() || null,
        mobileNumber: addSupplierFormData.mobileNumber,
        address: addSupplierFormData.address?.trim() || null,
        isActive: addSupplierFormData.isActive
      })

      await refreshSuppliers()
      setFormData((prev) => ({
        ...prev,
        supplierId: saved?.id != null ? String(saved.id) : prev.supplierId
      }))
      setShowAddSupplierModal(false)
    } catch (err) {
      setAddSupplierError(err.message || 'Failed to add supplier')
    } finally {
      setAddSupplierLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'isActive') {
      setFormData((prev) => ({ ...prev, isActive: value === 'true' }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const finalPrice = productApi.calcFinalPrice(
    Number(formData.purchasedPrice) || 0,
    Number(formData.discountPercent) || 0
  )

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
        categoryId,
        supplierId: formData.supplierId ? Number(formData.supplierId) : null,
        // barcode is optional: if empty, backend auto-generates
        barcode: formData.barcode?.trim() || undefined,
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
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter Product Name"
                  className="form-input"
                  required
                  autoComplete="off"
                />
                {!isEdit && (
                  <div className="product-name-suggestions">
                    {nameSuggestionsLoading && <div className="product-name-suggestion-loading">Searching existing products…</div>}
                    {!nameSuggestionsLoading && nameSuggestions.length > 0 && (
                      <>
                        <div className="product-name-suggestion-label">Similar existing products:</div>
                        <ul>
                          {nameSuggestions.map((p) => (
                            <li key={p.id}>
                              <button
                                type="button"
                                className="product-name-suggestion-item"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    productName: p.productName || prev.productName
                                  }))
                                }
                              >
                                <span className="product-name-suggestion-name">{p.productName}</span>
                                {p.barcode && <span className="product-name-suggestion-meta">Barcode: {p.barcode}</span>}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
              {!isEdit && (
                <div className="form-group">
                  <label htmlFor="barcode">Barcode (optional)</label>
                  <input
                    type="text"
                    id="barcode"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    placeholder="Leave empty to auto-generate"
                    className="form-input"
                  />
                </div>
              )}
              {isEdit && (
                <div className="form-group">
                  <label>Barcode</label>
                  <div className="form-input form-input-readonly">
                    {formData.barcode != null && formData.barcode !== '' ? formData.barcode : '— (generated on save)'}
                  </div>
                </div>
              )}
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
                  <button
                    type="button"
                    className="add-category-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      setAddCategoryFormData({
                        categoryName: '',
                        selectedIconKey: 1,
                        isActive: true
                      })
                      setAddCategoryError(null)
                      setShowAddCategoryModal(true)
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add New</span>
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="supplierId">Supplier</label>
                <div className="category-wrapper">
                  <select
                    id="supplierId"
                    name="supplierId"
                    value={formData.supplierId}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Choose</option>
                    {suppliers.filter((s) => s.isActive !== false).map((s) => (
                      <option key={s.id} value={s.id}>{s.supplierName}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="add-category-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      setAddSupplierFormData({
                        supplierName: '',
                        email: '',
                        mobileNumber: '',
                        address: '',
                        isActive: true
                      })
                      setAddSupplierError(null)
                      setShowAddSupplierModal(true)
                    }}
                    title="Add new supplier"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add New</span>
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
                <label htmlFor="purchasedPrice">Cost Price (LKR)</label>
                <input
                  type="number"
                  id="purchasedPrice"
                  name="purchasedPrice"
                  min="0"
                  step="0.01"
                  value={formData.purchasedPrice}
                  onChange={handleInputChange}
                  placeholder="Enter Cost Price"
                  className="form-input"
                />
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

      {showAddCategoryModal && (
        <div
          className="np-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="np-add-category-title"
          onMouseDown={() => setShowAddCategoryModal(false)}
        >
          <div className="np-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="np-modal-header">
              <h2 id="np-add-category-title" className="np-modal-title">Add Category</h2>
              <button
                type="button"
                className="np-modal-close"
                onClick={() => setShowAddCategoryModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddCategorySave}>
              <div className="np-modal-body">
                {addCategoryError && <div className="np-modal-error" role="alert">{addCategoryError}</div>}

                <div className="form-group">
                  <label htmlFor="np-category-name">Category Name</label>
                  <input
                    id="np-category-name"
                    type="text"
                    className="form-input"
                    value={addCategoryFormData.categoryName}
                    onChange={(e) => setAddCategoryFormData((prev) => ({ ...prev, categoryName: e.target.value }))}
                    placeholder="Enter Category Name"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Icon</label>
                  <div className="np-icon-picker-grid" role="group" aria-label="Select category icon">
                    {CATEGORY_ICON_OPTIONS.map(({ iconKey, icon, label }) => (
                      <button
                        key={iconKey}
                        type="button"
                        className={`np-icon-picker-btn ${addCategoryFormData.selectedIconKey === iconKey ? 'selected' : ''}`}
                        onClick={() => setAddCategoryFormData((prev) => ({ ...prev, selectedIconKey: iconKey }))}
                        title={label}
                        aria-pressed={addCategoryFormData.selectedIconKey === iconKey}
                      >
                        <FontAwesomeIcon icon={icon} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={addCategoryFormData.isActive ? 'true' : 'false'}
                    onChange={(e) => setAddCategoryFormData((prev) => ({ ...prev, isActive: e.target.value === 'true' }))}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="np-modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddCategoryModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={addCategoryLoading}>
                  {addCategoryLoading ? 'Saving...' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddSupplierModal && (
        <div
          className="np-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="np-add-supplier-title"
          onMouseDown={() => setShowAddSupplierModal(false)}
        >
          <div className="np-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="np-modal-header">
              <h2 id="np-add-supplier-title" className="np-modal-title">Add Supplier</h2>
              <button
                type="button"
                className="np-modal-close"
                onClick={() => setShowAddSupplierModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddSupplierSave}>
              <div className="np-modal-body">
                {addSupplierError && <div className="np-modal-error" role="alert">{addSupplierError}</div>}

                <div className="form-group">
                  <label htmlFor="np-supplier-name">Supplier Name</label>
                  <input
                    id="np-supplier-name"
                    type="text"
                    className="form-input"
                    value={addSupplierFormData.supplierName}
                    onChange={(e) => setAddSupplierFormData((prev) => ({ ...prev, supplierName: e.target.value }))}
                    placeholder="Enter Supplier Name"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="np-supplier-email">Email</label>
                  <input
                    id="np-supplier-email"
                    type="email"
                    className="form-input"
                    value={addSupplierFormData.email}
                    onChange={(e) => setAddSupplierFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter Email"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="np-supplier-mobile">Phone / Mobile</label>
                  <input
                    id="np-supplier-mobile"
                    type="tel"
                    className="form-input"
                    value={addSupplierFormData.mobileNumber}
                    onChange={(e) => setAddSupplierFormData((prev) => ({ ...prev, mobileNumber: e.target.value }))}
                    placeholder="Enter Mobile Number"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="np-supplier-address">Address</label>
                  <input
                    id="np-supplier-address"
                    type="text"
                    className="form-input"
                    value={addSupplierFormData.address}
                    onChange={(e) => setAddSupplierFormData((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter Address"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={addSupplierFormData.isActive ? 'true' : 'false'}
                    onChange={(e) => setAddSupplierFormData((prev) => ({ ...prev, isActive: e.target.value === 'true' }))}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="np-modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddSupplierModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={addSupplierLoading}>
                  {addSupplierLoading ? 'Saving...' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default NewProduct
