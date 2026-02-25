import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faFileExcel, faSyncAlt, faArrowUp, faPlus, faSearch, faEye, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import * as purchaseApi from '../api/purchaseApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { downloadTableExcel } from '../utils/excelExport'
import '../styles/PurchaseList.css'

function PurchaseList() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [viewDetail, setViewDetail] = useState(null)

  const fetchPurchases = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const status = statusFilter === 'All' ? undefined : statusFilter
      const res = await purchaseApi.getAll({
        search: searchQuery.trim() || undefined,
        status,
        pageSize: 100
      })
      setPurchases(res.content || [])
    } catch (err) {
      setError(err.message || 'Failed to load purchases')
      setPurchases([])
    } finally {
      setLoading(false)
    }
  }, [statusFilter, searchQuery])

  useEffect(() => {
    fetchPurchases()
  }, [fetchPurchases])

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Purchase List',
      subtitle: 'All purchases',
      columns: ['Purchase No', 'Supplier', 'Date', 'Total Amount', 'Status'],
      rows: purchases.map((p) => [
        p.purchaseNo || '',
        p.supplier?.supplierName || '',
        p.purchaseDate ? new Date(p.purchaseDate).toLocaleDateString() : '',
        `LKR ${Number(p.totalAmount ?? 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}`,
        p.status || ''
      ]),
      filename: `Purchases_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDownloadExcel = () => {
    downloadTableExcel({
      title: 'Purchases',
      columns: ['Purchase No', 'Supplier', 'Date', 'Total Amount', 'Status'],
      rows: purchases.map((p) => [
        p.purchaseNo || '',
        p.supplier?.supplierName || '',
        p.purchaseDate ? new Date(p.purchaseDate).toLocaleDateString() : '',
        p.totalAmount ?? 0,
        p.status || ''
      ]),
      filename: `Purchases_${new Date().toISOString().slice(0, 10)}.xlsx`
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this purchase? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await purchaseApi.deletePurchase(id)
      await fetchPurchases()
      if (viewDetail?.id === id) setViewDetail(null)
    } catch (err) {
      setError(err.message || 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  const openDetail = async (id) => {
    try {
      const detail = await purchaseApi.getById(id)
      setViewDetail(detail)
    } catch (err) {
      setError(err.message || 'Failed to load purchase details')
    }
  }

  const closeDetail = () => setViewDetail(null)

  return (
    <div className="purchase-list-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Purchase List</h1>
          <p className="page-subtitle">View and manage purchases</p>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button type="button" className="action-btn excel-btn" title="Export Excel" onClick={handleDownloadExcel}>
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
          <button type="button" className="action-btn refresh-btn" title="Refresh" onClick={() => fetchPurchases()} disabled={loading}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="action-btn upload-btn" title="Upload">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button className="action-btn add-btn" onClick={() => navigate('/purchase')}>
            <FontAwesomeIcon icon={faPlus} /><span>Create Purchase</span>
          </button>
        </div>
      </div>

      <div className="status-toggles">
        <button className={`status-toggle ${statusFilter === 'All' ? 'active' : ''}`} onClick={() => setStatusFilter('All')}>All</button>
        <button className={`status-toggle ${statusFilter === 'Pending' ? 'active' : ''}`} onClick={() => setStatusFilter('Pending')}>Pending</button>
        <button className={`status-toggle ${statusFilter === 'Completed' ? 'active' : ''}`} onClick={() => setStatusFilter('Completed')}>Completed</button>
        <button className={`status-toggle ${statusFilter === 'Cancelled' ? 'active' : ''}`} onClick={() => setStatusFilter('Cancelled')}>Cancelled</button>
      </div>

      <div className="filters-container">
        <div className="search-wrapper">
          <span className="search-icon-wrap" aria-hidden="true">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by purchase no"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="purchase-list-error">{error}</div>}

      <div className="table-container">
        <table className="purchase-list-table">
          <thead>
            <tr>
              <th>Purchase No</th>
              <th>Supplier</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="no-data">Loading...</td></tr>
            ) : purchases.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon">📋</div>
                    <div className="no-data-text">No purchases found</div>
                  </div>
                </td>
              </tr>
            ) : (
              purchases.map((p) => (
                <tr key={p.id}>
                  <td>{p.purchaseNo}</td>
                  <td>{p.supplier?.supplierName ?? '—'}</td>
                  <td>{p.purchaseDate ? new Date(p.purchaseDate).toLocaleDateString(undefined, { dateStyle: 'medium' }) : '—'}</td>
                  <td>LKR {Number(p.totalAmount ?? 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className={`status-badge status-${(p.status || '').toLowerCase()}`}>
                      {p.status || '—'}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="action-icon-btn view-btn" title="View" onClick={() => openDetail(p.id)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button type="button" className="action-icon-btn edit-btn" title="Edit" onClick={() => navigate(`/purchases/edit/${p.id}`)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button type="button" className="action-icon-btn delete-btn" title="Delete" disabled={deletingId === p.id} onClick={() => handleDelete(p.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewDetail && (
        <div className="purchase-detail-overlay" onClick={closeDetail} role="dialog" aria-modal="true" aria-label="Purchase detail">
          <div className="purchase-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="purchase-detail-header">
              <h2>Purchase {viewDetail.purchaseNo}</h2>
              <button type="button" className="close-detail-btn" onClick={closeDetail} aria-label="Close">×</button>
            </div>
            <div className="purchase-detail-body">
              <p><strong>Supplier:</strong> {viewDetail.supplier?.supplierName ?? '—'}</p>
              <p><strong>Date:</strong> {viewDetail.purchaseDate ? new Date(viewDetail.purchaseDate).toLocaleString() : '—'}</p>
              <p><strong>Status:</strong> {viewDetail.status}</p>
              <p><strong>Total:</strong> LKR {Number(viewDetail.totalAmount ?? 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
              {viewDetail.items?.length > 0 && (
                <table className="purchase-detail-items">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewDetail.items.map((it) => (
                      <tr key={it.id}>
                        <td>{it.product?.productName ?? `Product #${it.productId}`}</td>
                        <td>{it.quantity}</td>
                        <td>LKR {Number(it.costPrice ?? 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                        <td>LKR {Number(it.totalPrice ?? 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default PurchaseList
