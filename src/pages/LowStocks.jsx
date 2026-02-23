import { useState, useMemo, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFilePdf, 
  faFileExcel, 
  faSyncAlt, 
  faArrowUp,
  faPrint,
  faSearch,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons'
import * as productApi from '../api/productApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { getCategoryIcon } from '../utils/categoryIcons'
import '../styles/LowStocks.css'

function LowStocks() {
  const [searchQuery, setSearchQuery] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Frontend-only low stock logic: fetch all products, then filter where quantity <= lowStock threshold
  const fetchLowStock = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const allProducts = []
      let page = 1
      const pageSize = 500
      let hasMore = true
      while (hasMore) {
        const res = await productApi.getAll({ page, pageSize, isActive: true })
        const content = res.content || []
        allProducts.push(...content)
        hasMore = page * pageSize < (res.totalElements ?? 0)
        page += 1
      }
      // Low stock = quantity <= low stock threshold (frontend filter)
      const lowStockOnly = allProducts.filter(
        (p) => (Number(p.quantity) ?? 0) <= (Number(p.lowStock) ?? 0)
      )
      setList(lowStockOnly)
    } catch (err) {
      setError(err.message || 'Failed to load products')
      setList([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLowStock()
  }, [fetchLowStock])

  const filteredList = useMemo(() => {
    let result = list
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = list.filter(
        (p) =>
          (p.productName || '').toLowerCase().includes(q) ||
          (p.barcode || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q)
      )
    }
    return result
  }, [list, searchQuery])

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Low Stocks',
      subtitle: 'Products where quantity ≤ low stock threshold',
      columns: ['Product Name', 'Bar Code', 'Category', 'Purchase Price', 'Price/Unit', 'Qty', 'Low Stock'],
      rows: filteredList.map((p) => [
        p.productName || '',
        p.barcode || '',
        p.category || '',
        `₹${Number(p.purchasedPrice ?? p.costPrice).toFixed(2)}`,
        `₹${Number(p.pricePerUnit ?? p.sellingPrice).toFixed(2)}`,
        String(p.quantity ?? ''),
        String(p.lowStock ?? '')
      ]),
      filename: `LowStocks_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  return (
    <div className="low-stocks-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Low Stocks</h1>
          <p className="page-subtitle">Products where quantity ≤ low stock threshold</p>
        </div>
        <div className="header-actions">
          <button className="action-btn print-btn" title="Print">
            <FontAwesomeIcon icon={faPrint} />
          </button>
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button className="action-btn excel-btn" title="Export Excel">
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
          <button type="button" className="action-btn refresh-btn" title="Refresh" onClick={fetchLowStock} disabled={loading}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="action-btn upload-btn" title="Upload">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>

      {error && <div className="low-stocks-error">{error}</div>}
      {/* Search */}
      <div className="filters-container">
        <div className="search-wrapper">
          <span className="search-icon-wrap" aria-hidden="true">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by product, barcode or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="low-stocks-table">
          <thead>
            <tr>
              <th>
                Product Name
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Bar Code
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Category
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Purchase Price
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Price Per Unit
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Qty
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Low St
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-text">Loading...</div>
                  </div>
                </td>
              </tr>
            ) : filteredList.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon">📦</div>
                    <div className="no-data-text">No low stock products</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredList.map((p) => (
                <tr key={p.id}>
                  <td>{p.productName}</td>
                  <td>{p.barcode ?? p.barCode}</td>
                  <td>
                  <span className="category-cell-with-icon">
                    <FontAwesomeIcon icon={getCategoryIcon(p.categoryId)} className="category-icon" />
                    {p.category}
                  </span>
                </td>
                  <td>₹{Number(p.purchasedPrice ?? p.costPrice).toFixed(2)}</td>
                  <td>₹{Number(p.pricePerUnit ?? p.sellingPrice).toFixed(2)}</td>
                  <td>{p.quantity ?? p.stockQty}</td>
                  <td>{p.lowStock ?? p.minStockLevel}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Accent Line */}
      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default LowStocks
