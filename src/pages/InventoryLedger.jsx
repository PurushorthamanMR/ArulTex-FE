import { useState, useMemo, useEffect, useCallback } from 'react'
import * as inventoryApi from '../api/inventoryApi'
import '../styles/InventoryLedger.css'

function InventoryLedger() {
  const [filterProductId, setFilterProductId] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchList = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {}
      if (filterProductId) params.productId = filterProductId
      if (filterDateFrom) params.fromDate = filterDateFrom
      if (filterDateTo) params.toDate = filterDateTo
      const data = await inventoryApi.search(params)
      setList(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to load inventory')
      setList([])
    } finally {
      setLoading(false)
    }
  }, [filterProductId, filterDateFrom, filterDateTo])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const productOptions = useMemo(() => {
    const names = [...new Set(list.map((m) => m.product?.productName).filter(Boolean))]
    return names.sort()
  }, [list])

  const filtered = useMemo(() => {
    let result = [...list]
    if (filterProductId) {
      result = result.filter((m) => String(m.productId) === String(filterProductId))
    }
    if (filterDateFrom) {
      const d = filterDateFrom
      result = result.filter((m) => m.createdAt && new Date(m.createdAt).toISOString().slice(0, 10) >= d)
    }
    if (filterDateTo) {
      const d = filterDateTo
      result = result.filter((m) => m.createdAt && new Date(m.createdAt).toISOString().slice(0, 10) <= d)
    }
    return result
  }, [list, filterProductId, filterDateFrom, filterDateTo])

  return (
    <div className="inventory-ledger-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Inventory Ledger</h1>
          <p className="page-subtitle">Stock movement history</p>
        </div>
      </div>

      {error && <div className="inventory-error">{error}</div>}
      <div className="filters-container">
        <div className="form-group">
          <label>Filter by Product ID</label>
          <input type="number" placeholder="Product ID" value={filterProductId} onChange={(e) => setFilterProductId(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label>Date From</label>
          <input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label>Date To</label>
          <input type="date" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)} className="form-input" />
        </div>
      </div>

      <div className="table-container">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Qty Change</th>
              <th>Prev. Stock</th>
              <th>New Stock</th>
              <th>Date</th>
              <th>Note/Reference</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="no-data">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No movements found</td>
              </tr>
            ) : (
              filtered.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div className="product-info-cell">
                      <span className="product-name">{m.product?.productName ?? m.productId}</span>
                      <span className="product-id">ID: {m.productId}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`movement-type ${m.transactionType?.toLowerCase()}`}>
                      {m.transactionType || '-'}
                    </span>
                  </td>
                  <td className={`qty-cell ${m.quantity > 0 ? 'qty-plus' : 'qty-minus'}`}>
                    {m.quantity > 0 ? '+' : ''}{m.quantity}
                  </td>
                  <td className="stock-cell">{m.previousStock ?? '-'}</td>
                  <td className="stock-cell highlight">{m.newStock ?? '-'}</td>
                  <td>
                    <div className="date-cell">
                      <span className="date-primary">{m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '-'}</span>
                      <span className="date-secondary">{m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    </div>
                  </td>
                  <td className="note-cell">{m.note ?? m.referenceId ?? '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default InventoryLedger
