import { useState, useMemo, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf,
  faFileExcel,
  faSyncAlt,
  faArrowUp,
  faPrint,
  faSearch,
  faSortUp,
  faSortDown,
  faBox,
  faPen
} from '@fortawesome/free-solid-svg-icons'
import * as productApi from '../api/productApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { downloadTableExcel } from '../utils/excelExport'
import { getCategoryIcon } from '../utils/categoryIcons'
import '../styles/LowStocks.css'

function LowStocks({ onSummaryRefresh }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)

  const fetchLowStock = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Backend low-stock page: products where stockQty <= minStockLevel
      const res = await productApi.getLowStockPaginated({ pageNumber: page, pageSize: PAGE_SIZE })
      setList(res.content || [])
      setTotalPages(res.totalPages || 1)
      setTotalElements(res.totalElements || 0)
      onSummaryRefresh?.()
    } catch (err) {
      setError(err.message || 'Failed to load products')
      setList([])
    } finally {
      setLoading(false)
    }
  }, [page, onSummaryRefresh])

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
      subtitle: 'Products where quantity low stock threshold',
      columns: ['Product Name', 'Bar Code', 'Category', 'Supplier', 'Min Stock'],
      rows: filteredList.map((p) => [
        p.productName || '',
        p.barcode || '',
        p.category || '',
        p.supplier?.supplierName || 'NoSupplier',
        String(p.lowStock ?? p.minStockLevel ?? '')
      ]),
      filename: `LowStocks_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDownloadExcel = () => {
    downloadTableExcel({
      title: 'Low Stocks',
      columns: ['Product Name', 'Bar Code', 'Category', 'Supplier', 'Min Stock'],
      rows: filteredList.map((p) => [
        p.productName || '',
        p.barcode || '',
        p.category || '',
        p.supplier?.supplierName || 'NoSupplier',
        p.lowStock ?? p.minStockLevel ?? 0
      ]),
      filename: `LowStocks_${new Date().toISOString().slice(0, 10)}.xlsx`
    })
  }

  const handleEdit = (product) => {
    const supplierId = product.supplierId ?? product.supplier?.id ?? ''
    const params = new URLSearchParams()
    if (supplierId) params.set('supplierId', String(supplierId))
    params.set('productName', product.productName || '')
    navigate(`/purchase?${params.toString()}`)
  }

  return (
    <div className="low-stocks-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Low Stocks</h1>
          <p className="page-subtitle">Products where quantity low stock threshold</p>
        </div>
        <div className="header-actions">
          <button className="action-btn print-btn" title="Print">
            <FontAwesomeIcon icon={faPrint} />
          </button>
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button type="button" className="action-btn excel-btn" title="Export Excel" onClick={handleDownloadExcel}>
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
              <th>Bar Code</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>
                Min Stock
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-text">Loading...</div>
                  </div>
                </td>
              </tr>
            ) : filteredList.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon"><FontAwesomeIcon icon={faBox} /></div>
                    <div className="no-data-text">No low stock products</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredList.map((p) => (
                <tr key={p.id}>
                  <td>{p.productName}</td>
                  <td>{p.barcode ?? p.barCode}</td>
                  <td>{p.category}</td>
                  <td>{p.supplier?.supplierName || 'NoSupplier'}</td>
                  <td>{p.lowStock ?? p.minStockLevel}</td>
                  <td>
                    <button
                      type="button"
                      className="action-icon-btn edit-btn"
                      title="Add purchase for this product"
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

      {/* Bottom Accent Line */}
      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default LowStocks
