import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf,
  faSyncAlt,
  faSearch,
  faEye,
  faTimes,
  faFolderOpen,
  faUndo
} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { downloadTablePdf } from '../utils/pdfExport'
import * as salesApi from '../api/salesApi'
import '../styles/TransactionReport.css'

function TransactionReport() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  // Detail View State
  const [selectedSale, setSelectedSale] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [viewMode, setViewMode] = useState('list') // 'list' | 'detail'
  const [returnSelection, setReturnSelection] = useState(new Set())

  const fetchSales = useCallback(async () => {
    setLoading(true)
    try {
      const list = await salesApi.getAll()
      setSales(list)
    } catch (error) {
      console.error('Failed to fetch sales:', error)
      setSales([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSales()
  }, [fetchSales])

  const filteredSales = sales.filter(s => {
    const q = searchQuery.toLowerCase().trim()
    const matchSearch = q === '' ||
      (s.invoiceNo || '').toLowerCase().includes(q) ||
      (s.user ? `${s.user.firstName} ${s.user.lastName}`.toLowerCase().includes(q) : false)

    let matchDate = true
    if (fromDate || toDate) {
      const saleDate = new Date(s.saleDate).toISOString().slice(0, 10)
      if (fromDate && saleDate < fromDate) matchDate = false
      if (toDate && saleDate > toDate) matchDate = false
    }

    return matchSearch && matchDate
  })

  const totalElements = filteredSales.length
  const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const visibleSales = filteredSales.slice(startIndex, startIndex + PAGE_SIZE)

  const handleViewDetails = async (saleId) => {
    setDetailsLoading(true)
    setViewMode('detail')
    try {
      const detailed = await salesApi.getById(saleId)
      setSelectedSale(detailed)
      const selectable = (detailed.items || []).filter(
        (i) => (i.quantity || 0) > (i.returnedQty || 0)
      )
      setReturnSelection(new Set(selectable.map((i) => i.id)))
    } catch (error) {
      console.error('Failed to fetch sale details:', error)
      Swal.fire({ icon: 'error', title: 'Error', text: 'Could not load sale details' })
    } finally {
      setDetailsLoading(false)
    }
  }

  const handleRequestReturn = async (sale) => {
    if (!sale || sale.status === 'Refunded') {
      Swal.fire({ icon: 'info', title: 'Already refunded', text: 'This sale is already refunded.' })
      return
    }

    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: 'Return sale?',
      text: 'You will be able to select which products to restore in Order Details.',
      showCancelButton: true,
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#0d9488',
      cancelButtonColor: '#6b7280'
    })

    if (!isConfirmed) return
    await handleViewDetails(sale.id)
  }

  const handleReturnSelected = async () => {
    if (!selectedSale) return
    if (selectedSale.status === 'Refunded') {
      Swal.fire({ icon: 'info', title: 'Already refunded', text: 'This sale is already refunded.' })
      return
    }
    try {
      const items = (selectedSale.items || [])
        .filter((i) => returnSelection.has(i.id))
        .map((i) => ({
          saleItemId: i.id,
          returnQty: Math.max(0, (i.quantity || 0) - (i.returnedQty || 0))
        }))
        .filter((i) => i.returnQty > 0)

      if (!items.length) {
        Swal.fire({
          icon: 'info',
          title: 'No items selected',
          text: 'Please select at least one product to return.'
        })
        return
      }

      const { isConfirmed } = await Swal.fire({
        icon: 'question',
        title: 'Return selected products?',
        text: `Return ${items.length} selected product(s) from invoice ${selectedSale.invoiceNo}?`,
        showCancelButton: true,
        confirmButtonText: 'Yes, return',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#0d9488',
        cancelButtonColor: '#6b7280'
      })
      if (!isConfirmed) return

      await salesApi.returnSale(selectedSale.id, items)
      await fetchSales()
      setViewMode('list')
      setSelectedSale(null)
      await Swal.fire({
        icon: 'success',
        title: 'Returned',
        text: 'Selected products were returned and quantities restored.'
      })
    } catch (error) {
      console.error('Return failed:', error)
      Swal.fire({ icon: 'error', title: 'Return failed', text: error?.message || 'Return failed.' })
    }
  }

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Transaction Report',
      subtitle: fromDate && toDate ? `From ${fromDate} To ${toDate}` : 'All Transactions',
      columns: ['Invoice No', 'Date', 'Payment', 'Amount'],
      rows: visibleSales.map(s => [
        s.invoiceNo,
        new Date(s.saleDate).toLocaleString(),
        s.paymentMethod?.toUpperCase(),
        `LKR ${(s.totalAmount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}`
      ]),
      filename: `TransactionReport_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  return (
    <div className="transaction-report-container">
      {viewMode === 'list' && (
        <>
          <div className="page-header">
            <div>
              <h1 className="page-title">Transaction Report</h1>
              <p className="page-subtitle">View and manage all sales transactions</p>
            </div>
            <div className="header-actions">
              <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
                <FontAwesomeIcon icon={faFilePdf} />
              </button>
              <button className="action-btn refresh-btn" title="Refresh" onClick={fetchSales} disabled={loading}>
                <FontAwesomeIcon icon={faSyncAlt} className={loading ? 'fa-spin' : ''} />
              </button>
            </div>
          </div>

          <div className="filters-container">
            <div className="search-wrapper">
              <span className="search-icon-wrap" aria-hidden="true">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Search by Invoice or User..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setPage(1)
                }}
              />
            </div>
            <div className="date-filters">
              <input
                type="date"
                className="filter-date-input"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="From Date"
              />
              <span className="date-sep">to</span>
              <input
                type="date"
                className="filter-date-input"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="To Date"
              />
            </div>
          </div>

          <div className="table-container">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Cashier</th>
                  <th>Payment</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8" className="loading-data">Loading transactions...</td></tr>
                ) : filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-data">
                      <div className="no-data-content">
                        <div className="no-data-icon"><FontAwesomeIcon icon={faFolderOpen} /></div>
                        <div className="no-data-text">No transactions found</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  visibleSales.map((s, idx) => (
                    <tr key={s.id}>
                      <td className="row-num">{idx + 1}</td>
                      <td><strong style={{ color: '#0d9488' }}>{s.invoiceNo}</strong></td>
                      <td>{new Date(s.saleDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td>{s.user ? `${s.user.firstName} ${s.user.lastName}` : '—'}</td>
                      <td><span className={`payment-badge ${s.paymentMethod}`}>{s.paymentMethod?.toUpperCase()}</span></td>
                      <td className="amount-cell">LKR {(s.totalAmount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                      <td><span className={`status-pill ${s.status?.toLowerCase()}`}>{s.status || 'Completed'}</span></td>
                      <td className="actions-cell">
                        <button className="action-icon-btn view" title="View details" onClick={() => handleViewDetails(s.id)}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                          className="action-icon-btn refund"
                          title="Return sale (restore quantities)"
                          onClick={() => handleRequestReturn(s)}
                          disabled={s.status === 'Refunded'}
                        >
                          <FontAwesomeIcon icon={faUndo} />
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
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <div className="pagination-numbers" role="navigation" aria-label="Pagination">
                {(() => {
                  const visibleCount = 5
                  const start = Math.max(1, Math.min(safePage - 2, totalPages - visibleCount + 1))
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
                        className={`pagination-btn ${p === safePage ? 'active' : ''}`}
                        onClick={() => setPage(p)}
                        aria-current={p === safePage ? 'page' : undefined}
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
              <span className="pagination-info">Page {safePage} of {totalPages} ({totalElements} items)</span>
              <button
                type="button"
                className="pagination-btn"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {viewMode === 'detail' && (
        <div className="sale-detail-page">
          <div className="page-header">
            <div>
              <h1 className="page-title">Order Details</h1>
              <p className="page-subtitle">Invoice #{selectedSale?.invoiceNo || ''}</p>
            </div>
            <div className="header-actions">
              <button
                type="button"
                className="action-btn refresh-btn"
                onClick={() => {
                  setViewMode('list')
                  setSelectedSale(null)
                  setReturnSelection(new Set())
                }}
              >
                <FontAwesomeIcon icon={faTimes} /> Close
              </button>
            </div>
          </div>

          <div className="sale-detail-content">
            {detailsLoading ? (
              <div className="loading-spinner">Loading order details...</div>
            ) : selectedSale ? (
              <>
                {selectedSale.status !== 'Refunded' && (
                  <div className="modal-return-bar">
                    <button
                      type="button"
                      className="action-btn return-btn"
                      onClick={handleReturnSelected}
                    >
                      <FontAwesomeIcon icon={faUndo} /> Return selected products
                    </button>
                  </div>
                )}
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>User</label>
                    <span>{selectedSale.user ? `${selectedSale.user.firstName} ${selectedSale.user.lastName}` : 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Payment Method</label>
                    <span className="uppercase">{selectedSale.paymentMethod}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status</label>
                    <span className={`status-badge ${selectedSale.status?.toLowerCase()}`}>{selectedSale.status}</span>
                  </div>
                  <div className="detail-item">
                    <label>Date</label>
                    <span>{new Date(selectedSale.saleDate).toLocaleString()}</span>
                  </div>
                </div>

                <div className="items-table-wrapper">
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Returned</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSale.items?.map((item, idx) => {
                        const qty = Number(item.quantity) || 0
                        const returned = Number(item.returnedQty) || 0
                        const remaining = Math.max(0, qty - returned)
                        const disabled = remaining <= 0
                        const checked = returnSelection.has(item.id)
                        return (
                          <tr key={idx}>
                            <td>{item.product?.productName || 'Unknown Product'}</td>
                            <td>{qty}</td>
                            <td>{returned}/{qty}</td>
                            <td>LKR {Number(item.unitPrice).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                            <td>LKR {Number(item.totalPrice).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                            <td>
                              <input
                                type="checkbox"
                                disabled={disabled}
                                checked={checked && !disabled}
                                onChange={(e) => {
                                  setReturnSelection(prev => {
                                    const next = new Set(prev)
                                    if (e.target.checked) {
                                      next.add(item.id)
                                    } else {
                                      next.delete(item.id)
                                    }
                                    return next
                                  })
                                }}
                              />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-right"><strong>Total Amount</strong></td>
                        <td className="total-val" colSpan="3">LKR {Number(selectedSale.totalAmount).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            ) : (
              <p>No details found.</p>
            )}
          </div>
        </div>
      )}

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default TransactionReport
