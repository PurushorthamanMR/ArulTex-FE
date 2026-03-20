import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import * as productApi from '../../api/productApi'
import '../../styles/StockPage.css'

function PosStockPage() {
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

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products
    const q = searchQuery.toLowerCase()
    return products.filter((p) => {
      return (
        (p.productName || '').toLowerCase().includes(q) ||
        (p.barcode || p.barCode || '').toLowerCase().includes(q) ||
        (p.supplier?.supplierName || '').toLowerCase().includes(q)
      )
    })
  }, [products, searchQuery])

  return (
    <div className="stock-page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Stock</h1>
          <p className="page-subtitle">High stock (staff view)</p>
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
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="no-data">Loading...</td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No products found</td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.productName}</td>
                  <td>{p.barcode || p.barCode}</td>
                  <td>{p.category}</td>
                  <td>{p.supplier?.supplierName || 'NoSupplier'}</td>
                  <td>{p.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrap">
          <button type="button" className="pagination-btn" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages} ({totalElements} items)
          </span>
          <button type="button" className="pagination-btn" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default PosStockPage

