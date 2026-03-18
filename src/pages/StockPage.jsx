import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faSyncAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import * as productApi from '../api/productApi'
import '../styles/StockPage.css'

function StockPage({ onEdit }) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Backend high-stock page: products where stockQty > minStockLevel
      const res = await productApi.getHighStockPaginated({ pageNumber: page, pageSize: PAGE_SIZE })
      setProducts(res.content || [])
      setTotalPages(res.totalPages || 1)
      setTotalElements(res.totalElements || 0)
    } catch (err) {
      setError(err.message || 'Failed to load stock')
      setProducts([])
      setTotalPages(1)
      setTotalElements(0)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleEdit = (product) => {
    if (onEdit) {
      onEdit(product.id)
      return
    }
    const supplierId = product.supplierId ?? product.supplier?.id ?? ''
    const params = new URLSearchParams()
    if (supplierId) params.set('supplierId', String(supplierId))
    params.set('productName', product.productName || '')
    navigate(`/purchase?${params.toString()}`)
  }

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      (p.productName || '').toLowerCase().includes(q) ||
      (p.barcode || '').toLowerCase().includes(q) ||
      (p.supplier?.supplierName || '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="stock-page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Stock</h1>
          <p className="page-subtitle">Products and current stock quantities</p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="action-btn refresh-btn"
            title="Refresh"
            onClick={fetchProducts}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
        </div>
      </div>

      {error && <div className="stock-error">{error}</div>}

      <div className="filters-container">
        <div className="search-wrapper">
          <span className="search-icon-wrap" aria-hidden="true">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by product, barcode or supplier"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Bar Code</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Stock Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="no-data">Loading...</td></tr>
            ) : filteredProducts.length === 0 ? (
              <tr><td colSpan="6" className="no-data">No products found</td></tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.productName}</td>
                  <td>{p.barcode ?? p.barCode}</td>
                  <td>{p.category}</td>
                  <td>{p.supplier?.supplierName || 'NoSupplier'}</td>
                  <td>{p.quantity}</td>
                  <td>
                    <button
                      type="button"
                      className="action-icon-btn edit-btn"
                      title="Edit product"
                      onClick={() => handleEdit(p)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrap">
          <button
            type="button"
            className="pagination-btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <div className="pagination-numbers" role="navigation" aria-label="Pagination">
            {(() => {
              const visibleCount = 5
              const start = Math.max(1, Math.min(page - 2, totalPages - visibleCount + 1))
              const end = Math.min(totalPages, start + visibleCount - 1)
              const items = []

              if (start > 1) {
                items.push(
                  <span key="start-ellipsis" className="pagination-ellipsis" aria-hidden>
                    ...
                  </span>
                )
              }

              for (let p = start; p <= end; p++) {
                items.push(
                  <button
                    key={p}
                    type="button"
                    className={`pagination-btn ${p === page ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                    aria-current={p === page ? 'page' : undefined}
                  >
                    {p}
                  </button>
                )
              }

              if (end < totalPages) {
                items.push(
                  <span key="end-ellipsis" className="pagination-ellipsis" aria-hidden>
                    ...
                  </span>
                )
              }

              return items
            })()}
          </div>
          <span className="pagination-info">Page {page} of {totalPages} ({totalElements} items)</span>
          <button
            type="button"
            className="pagination-btn"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default StockPage

