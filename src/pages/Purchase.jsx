import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faSearch, faCheck, faBoxOpen, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import * as supplierApi from '../api/supplierApi'
import * as productApi from '../api/productApi'
import * as purchaseApi from '../api/purchaseApi'
import '../styles/Purchase.css'

function Purchase() {
  const navigate = useNavigate()
  const { id: editId } = useParams() // if editing, this will have the purchase ID
  const isEditMode = Boolean(editId)

  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [lines, setLines] = useState([])
  const [searchProduct, setSearchProduct] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [purchaseDate, setPurchaseDate] = useState(() => new Date().toISOString().slice(0, 16))
  const [status, setStatus] = useState('Completed')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [error, setError] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [savedPurchaseNo, setSavedPurchaseNo] = useState(null)
  const [existingPurchaseNo, setExistingPurchaseNo] = useState(null)
  const searchRef = useRef(null)
  const dropdownRef = useRef(null)

  // Get logged-in user info
  const loggedUserId = localStorage.getItem('userId')
  const loggedUserName = `${localStorage.getItem('userFirstName') || ''} ${localStorage.getItem('userLastName') || ''}`.trim() || 'User'

  const fetchSuppliers = useCallback(async () => {
    try {
      const list = await supplierApi.getAll({ isActive: true })
      setSuppliers(Array.isArray(list) ? list : [])
    } catch {
      setSuppliers([])
    }
  }, [])

  const fetchProducts = useCallback(async () => {
    try {
      const res = await productApi.getAll({ page: 1, pageSize: 500, isActive: true })
      setProducts(res.content || [])
    } catch {
      setProducts([])
    }
  }, [])

  // Load existing purchase for edit mode
  const loadExistingPurchase = useCallback(async () => {
    if (!editId) return
    setPageLoading(true)
    try {
      const purchase = await purchaseApi.getById(editId)
      if (!purchase) {
        setError('Purchase not found')
        return
      }
      setExistingPurchaseNo(purchase.purchaseNo)
      setSelectedSupplier(String(purchase.supplierId || ''))
      setStatus(purchase.status || 'Completed')
      if (purchase.purchaseDate) {
        setPurchaseDate(new Date(purchase.purchaseDate).toISOString().slice(0, 16))
      }
      // Map items to lines
      if (purchase.items && purchase.items.length > 0) {
        setLines(purchase.items.map(it => ({
          productId: it.productId,
          productName: it.product?.productName || `Product #${it.productId}`,
          barcode: null,
          currentStock: 0,
          quantity: it.quantity,
          costPrice: Number(it.costPrice || 0),
          totalPrice: Number(it.totalPrice || 0)
        })))
      }
    } catch (err) {
      setError(err.message || 'Failed to load purchase')
    } finally {
      setPageLoading(false)
    }
  }, [editId])

  useEffect(() => {
    fetchSuppliers()
    fetchProducts()
    if (isEditMode) {
      loadExistingPurchase()
    }
  }, [fetchSuppliers, fetchProducts, isEditMode, loadExistingPurchase])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addLine = (product) => {
    if (!product) return
    const costPrice = product.purchasedPrice ?? product.costPrice ?? 0
    const existing = lines.find((l) => l.productId === product.id)
    if (existing) {
      setLines((prev) =>
        prev.map((l) =>
          l.productId === product.id
            ? { ...l, quantity: l.quantity + 1, totalPrice: (l.quantity + 1) * l.costPrice }
            : l
        )
      )
    } else {
      setLines((prev) => [
        ...prev,
        {
          productId: product.id,
          productName: product.productName ?? product.name,
          barcode: product.barcode,
          currentStock: product.quantity ?? product.stockQty ?? 0,
          quantity: 1,
          costPrice,
          totalPrice: costPrice
        }
      ])
    }
    setSearchProduct('')
    setShowDropdown(false)
  }

  const updateLineQuantity = (productId, quantity) => {
    const q = Math.max(0, Number(quantity) || 0)
    setLines((prev) =>
      prev
        .map((l) =>
          l.productId === productId ? { ...l, quantity: q, totalPrice: q * l.costPrice } : l
        )
        .filter((l) => l.quantity > 0)
    )
  }

  const updateLineCostPrice = (productId, costPrice) => {
    const cp = Math.max(0, Number(costPrice) || 0)
    setLines((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, costPrice: cp, totalPrice: l.quantity * cp } : l))
    )
  }

  const removeLine = (productId) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId))
  }

  const totalAmount = lines.reduce((sum, l) => sum + (l.totalPrice || 0), 0)
  const totalItems = lines.reduce((sum, l) => sum + l.quantity, 0)

  const filteredProducts = searchProduct.trim()
    ? products.filter((p) =>
      (p.productName || '').toLowerCase().includes(searchProduct.toLowerCase()) ||
      (p.barcode && p.barcode.includes(searchProduct))
    )
    : []

  const handleSave = async () => {
    if (!selectedSupplier) {
      setError('Please select a supplier')
      return
    }
    if (lines.length === 0) {
      setError('Add at least one product to the purchase')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const itemsPayload = lines.map((l) => ({
        productId: l.productId,
        quantity: l.quantity,
        costPrice: l.costPrice
      }))

      if (isEditMode) {
        // Update existing purchase
        const payload = {
          id: Number(editId),
          supplierId: Number(selectedSupplier),
          status,
          userId: loggedUserId ? Number(loggedUserId) : 1,
          items: itemsPayload
        }
        const saved = await purchaseApi.update(editId, payload)
        setSavedPurchaseNo(saved.purchaseNo || existingPurchaseNo)
      } else {
        // Create new purchase
        const payload = {
          supplierId: Number(selectedSupplier),
          totalAmount: Math.round(totalAmount * 100) / 100,
          purchaseDate: purchaseDate ? new Date(purchaseDate).toISOString() : new Date().toISOString(),
          status,
          userId: loggedUserId ? Number(loggedUserId) : 1,
          items: itemsPayload
        }
        const saved = await purchaseApi.save(payload)
        setSavedPurchaseNo(saved.purchaseNo)
      }
      setCompleted(true)
    } catch (err) {
      setError(err.message || `Failed to ${isEditMode ? 'update' : 'save'} purchase`)
    } finally {
      setLoading(false)
    }
  }

  const handleNewPurchase = () => {
    setLines([])
    setSelectedSupplier('')
    setSavedPurchaseNo(null)
    setExistingPurchaseNo(null)
    setCompleted(false)
    setError(null)
    setPurchaseDate(new Date().toISOString().slice(0, 16))
    setStatus('Completed')
    // If was editing, navigate to fresh purchase
    if (isEditMode) {
      navigate('/purchase')
    }
  }

  // ── Loading state ──
  if (pageLoading) {
    return (
      <div className="purchase-container">
        <div className="purchase-loading">Loading purchase data...</div>
      </div>
    )
  }

  // ── Success View ──
  if (completed) {
    return (
      <div className="purchase-container">
        <div className="purchase-success-card">
          <div className="success-icon-wrap">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <h2>Purchase {isEditMode ? 'Updated' : 'Saved'} Successfully!</h2>
          <p className="success-purchase-no">{savedPurchaseNo}</p>
          <p className="success-detail">
            {totalItems} item(s) &middot; LKR {totalAmount.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
            {status === 'Completed' && <span className="stock-updated-tag">Stock Updated ✓</span>}
          </p>
          <div className="success-actions">
            <button className="btn-primary" onClick={handleNewPurchase}>
              <FontAwesomeIcon icon={faPlus} /> New Purchase
            </button>
            <button className="btn-secondary" onClick={() => navigate('/purchases')}>
              <FontAwesomeIcon icon={faShoppingBag} /> View All Purchases
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="purchase-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEditMode ? `Edit Purchase` : 'Create Purchase'}</h1>
          <p className="page-subtitle">
            {isEditMode
              ? <>Editing <strong>{existingPurchaseNo}</strong></>
              : <>Add products from supplier &middot; Created by <strong>{loggedUserName}</strong></>
            }
          </p>
        </div>
        <button type="button" className="back-btn" onClick={() => navigate('/purchases')}>← Back to List</button>
      </div>

      {error && <div className="purchase-error">{error}</div>}

      <div className="purchase-layout">
        <div className="purchase-form-card">

          {/* ── Step 1: Purchase Info ── */}
          <div className="form-section-header">
            <span className="step-badge">1</span>
            <span>Purchase Information</span>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Supplier <span className="required">*</span></label>
              <select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)} className="form-select">
                <option value="">Select Supplier</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>{s.supplierName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Purchase Date</label>
              <input type="datetime-local" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {status === 'Completed' && <span className="status-hint">Stock will be updated automatically</span>}
              {status === 'Pending' && <span className="status-hint pending">Stock will NOT be updated</span>}
            </div>
          </div>

          {/* ── Step 2: Add Products ── */}
          <div className="form-section-header">
            <span className="step-badge">2</span>
            <span>Add Products</span>
          </div>
          <div className="form-group search-group">
            <label>Search Product <span className="search-tip">(by name or barcode)</span></label>
            <div className="search-input-wrap" ref={searchRef}>
              <FontAwesomeIcon icon={faSearch} className="search-field-icon" />
              <input
                type="text"
                className="form-input search-field"
                placeholder="Type product name or scan barcode..."
                value={searchProduct}
                onChange={(e) => {
                  setSearchProduct(e.target.value)
                  setShowDropdown(e.target.value.trim().length > 0)
                }}
                onFocus={() => {
                  if (searchProduct.trim().length > 0) setShowDropdown(true)
                }}
              />
            </div>
            {showDropdown && filteredProducts.length > 0 && (
              <div className="product-dropdown" ref={dropdownRef}>
                {filteredProducts.slice(0, 10).map((p) => (
                  <button type="button" key={p.id} className="product-dropdown-item" onClick={() => addLine(p)}>
                    <div className="dropdown-product-info">
                      <span className="dropdown-product-name">{p.productName}</span>
                      <span className="dropdown-product-meta">
                        {p.barcode && <span className="meta-barcode">{p.barcode}</span>}
                        <span className="meta-stock">Stock: {p.quantity ?? p.stockQty ?? 0}</span>
                      </span>
                    </div>
                    <span className="dropdown-product-price">LKR {(p.purchasedPrice ?? p.costPrice ?? 0).toLocaleString('en-LK')}</span>
                  </button>
                ))}
              </div>
            )}
            {showDropdown && searchProduct.trim() && filteredProducts.length === 0 && (
              <div className="product-dropdown">
                <div className="dropdown-empty">No products found for "{searchProduct}"</div>
              </div>
            )}
          </div>

          {/* ── Step 3: Review Items ── */}
          <div className="form-section-header">
            <span className="step-badge">3</span>
            <span>Review Items ({lines.length})</span>
          </div>
          <div className="purchase-lines">
            {lines.length === 0 ? (
              <div className="no-lines">
                <FontAwesomeIcon icon={faBoxOpen} className="no-lines-icon" />
                <p>No products added yet. Search and click a product above.</p>
              </div>
            ) : (
              <table className="purchase-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Cost Price (LKR)</th>
                    <th>Total (LKR)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l, idx) => (
                    <tr key={l.productId}>
                      <td className="row-num">{idx + 1}</td>
                      <td>
                        <span className="line-product-name">{l.productName}</span>
                        {l.barcode && <span className="line-barcode">{l.barcode}</span>}
                      </td>
                      <td>
                        <input type="number" min="1" value={l.quantity} onChange={(e) => updateLineQuantity(l.productId, e.target.value)} className="qty-input" />
                      </td>
                      <td>
                        <input type="number" min="0" step="0.01" value={l.costPrice} onChange={(e) => updateLineCostPrice(l.productId, e.target.value)} className="qty-input price-input" />
                      </td>
                      <td className="line-total">LKR {Number(l.totalPrice).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                      <td>
                        <button type="button" className="remove-line-btn" onClick={() => removeLine(l.productId)} title="Remove">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* ── Summary + Actions ── */}
          {lines.length > 0 && (
            <div className="purchase-summary">
              <div className="summary-row">
                <span>Products</span>
                <span>{lines.length}</span>
              </div>
              <div className="summary-row">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="summary-row grand-total">
                <span>Grand Total</span>
                <span>LKR {totalAmount.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/purchases')}>Cancel</button>
            <button type="button" className="save-btn" onClick={handleSave} disabled={loading || lines.length === 0}>
              {loading ? 'Saving...' : isEditMode ? 'Update Purchase' : 'Save Purchase'}
            </button>
          </div>
        </div>
      </div>

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default Purchase
