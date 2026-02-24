import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf,
  faSyncAlt,
  faSearch,
  faEye,
  faPrint,
  faTimes,
  faUndoAlt
} from '@fortawesome/free-solid-svg-icons'
import { downloadTablePdf } from '../utils/pdfExport'
import * as salesApi from '../api/salesApi'
import '../styles/TransactionReport.css'

function TransactionReport() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // Detail Modal State
  const [selectedSale, setSelectedSale] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [detailsLoading, setDetailsLoading] = useState(false)

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

  const handleViewDetails = async (saleId) => {
    setDetailsLoading(true)
    setShowModal(true)
    try {
      const detailed = await salesApi.getById(saleId)
      setSelectedSale(detailed)
    } catch (error) {
      console.error('Failed to fetch sale details:', error)
      alert('Could not load sale details')
    } finally {
      setDetailsLoading(false)
    }
  }

  const handlePrintSale = (sale) => {
    // Hidden print iframe strategy or shared print component logic
    // For now, we can show a print-friendly view or just an alert
    console.log('Printing sale:', sale.invoiceNo)
    window.print() // This will print the whole page; in a real app, we'd trigger a specific invoice print
  }

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Transaction Report',
      subtitle: fromDate && toDate ? `From ${fromDate} To ${toDate}` : 'All Transactions',
      columns: ['Invoice No', 'Date', 'Payment', 'Amount'],
      rows: filteredSales.map(s => [
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <th>Invoice No</th>
              <th>Date & Time</th>
              <th>Payment</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="loading-data">Loading transactions...</td></tr>
            ) : filteredSales.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon">📁</div>
                    <div className="no-data-text">No transactions found</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredSales.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.invoiceNo}</strong></td>
                  <td>{new Date(s.saleDate).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td><span className={`payment-badge ${s.paymentMethod}`}>{s.paymentMethod?.toUpperCase()}</span></td>
                  <td className="amount-cell">LKR {(s.totalAmount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                  <td className="actions-cell">
                    <button className="action-icon-btn view" title="View details" onClick={() => handleViewDetails(s.id)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="action-icon-btn print" title="Print Invoice" onClick={() => handlePrintSale(s)}>
                      <FontAwesomeIcon icon={faPrint} />
                    </button>
                    <button className="action-icon-btn refund" title="Process Refund" disabled={s.status === 'Refunded'}>
                      <FontAwesomeIcon icon={faUndoAlt} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="sale-detail-modal">
            <div className="modal-header">
              <h3>Order Details: {selectedSale?.invoiceNo || 'Loading...'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              {detailsLoading ? (
                <div className="loading-spinner">Loading order details...</div>
              ) : selectedSale ? (
                <>
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
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSale.items?.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.product?.productName || 'Unknown Product'}</td>
                            <td>{item.quantity}</td>
                            <td>LKR {Number(item.unitPrice).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                            <td>LKR {Number(item.totalPrice).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3" className="text-right"><strong>Total Amount</strong></td>
                          <td className="total-val">LKR {Number(selectedSale.totalAmount).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
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
        </div>
      )}

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default TransactionReport
