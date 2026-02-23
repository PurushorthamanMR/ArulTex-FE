import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import * as supplierApi from '../api/supplierApi'
import * as productApi from '../api/productApi'
import * as purchaseApi from '../api/purchaseApi'
import '../styles/Purchase.css'

function Purchase() {
  const navigate = useNavigate()
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [lines, setLines] = useState([]) // { productId, productName, barcode, quantity, costPrice, totalPrice }
  const [searchProduct, setSearchProduct] = useState('')
  const [purchaseDate, setPurchaseDate] = useState(() => new Date().toISOString().slice(0, 16))
  const [status, setStatus] = useState('Completed')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [savedPurchaseNo, setSavedPurchaseNo] = useState(null)

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
      const res = await productApi.getAll({ page: 1, pageSize: 50, isActive: true })
      setProducts(res.content || [])
    } catch {
      setProducts([])
    }
  }, [])

  useEffect(() => {
    fetchSuppliers()
    fetchProducts()
  }, [fetchSuppliers, fetchProducts])

  const addLine = (product) => {
    if (!product) return
    const costPrice = product.purchasedPrice ?? product.pricePerUnit ?? 0
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
          quantity: 1,
          costPrice,
          totalPrice: costPrice
        }
      ])
    }
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

  const filteredProducts = searchProduct.trim()
    ? products.filter((p) => p.productName.toLowerCase().includes(searchProduct.toLowerCase()) || (p.barcode && p.barcode.includes(searchProduct)))
    : products.slice(0, 10)

  const handleSave = async () => {
    if (!selectedSupplier) {
      setError('Select a supplier')
      return
    }
    if (lines.length === 0) {
      setError('Add at least one product')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const payload = {
        supplierId: Number(selectedSupplier),
        totalAmount: Math.round(totalAmount * 100) / 100,
        purchaseDate: purchaseDate ? new Date(purchaseDate).toISOString() : new Date().toISOString(),
        status,
        userId: 1,
        items: lines.map((l) => ({
          productId: l.productId,
          quantity: l.quantity,
          costPrice: l.costPrice
        }))
      }
      const saved = await purchaseApi.save(payload)
      setSavedPurchaseNo(saved.purchaseNo)
      setCompleted(true)
      setTimeout(() => {
        setLines([])
        setSelectedSupplier('')
        setSavedPurchaseNo(null)
        setCompleted(false)
      }, 3000)
    } catch (err) {
      setError(err.message || 'Failed to save purchase')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="purchase-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Create Purchase</h1>
          <p className="page-subtitle">Add multiple products and auto-calculate total</p>
        </div>
        <button type="button" className="back-btn" onClick={() => navigate('/purchases')}>← Back</button>
      </div>

      {error && <div className="purchase-error">{error}</div>}
      {completed && (
        <div className="purchase-success">
          Purchase saved. {savedPurchaseNo && <strong>{savedPurchaseNo}</strong>}
        </div>
      )}

      <div className="purchase-layout">
        <div className="purchase-form-card">
          <div className="form-row">
            <div className="form-group">
              <label>Supplier</label>
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
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Add Product (search by name or barcode)</label>
            <input type="text" className="form-input" placeholder="Search product..." value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
            <div className="product-search-list">
              {filteredProducts.slice(0, 8).map((p) => (
                <button type="button" key={p.id} className="product-search-item" onClick={() => addLine(p)}>
                  <FontAwesomeIcon icon={faPlus} /> {p.productName ?? p.name} — ₹{p.purchasedPrice ?? p.pricePerUnit ?? 0}
                </button>
              ))}
            </div>
          </div>

          <div className="purchase-lines">
            <h3>Products in purchase</h3>
            {lines.length === 0 ? (
              <p className="no-lines">No products added. Search and add above.</p>
            ) : (
              <table className="purchase-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l) => (
                    <tr key={l.productId}>
                      <td>{l.productName}</td>
                      <td>
                        <input type="number" min="1" value={l.quantity} onChange={(e) => updateLineQuantity(l.productId, e.target.value)} className="qty-input" />
                      </td>
                      <td>
                        <input type="number" min="0" step="0.01" value={l.costPrice} onChange={(e) => updateLineCostPrice(l.productId, e.target.value)} className="qty-input price-input" />
                      </td>
                      <td>₹{Number(l.totalPrice).toFixed(2)}</td>
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
            {lines.length > 0 && (
              <div className="purchase-total">
                <strong>Grand Total: ₹{totalAmount.toFixed(2)}</strong>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/purchases')}>Cancel</button>
            <button type="button" className="save-btn" onClick={handleSave} disabled={loading || lines.length === 0}>
              {loading ? 'Saving...' : 'Save Purchase'}
            </button>
          </div>
        </div>
      </div>

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default Purchase
