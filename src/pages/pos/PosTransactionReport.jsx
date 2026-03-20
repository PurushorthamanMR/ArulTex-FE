import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faSyncAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import * as salesApi from '../../api/salesApi'
import { downloadTablePdf } from '../../utils/pdfExport'
import '../../styles/TransactionReport.css'

const PAGE_SIZE = 10

function PosTransactionReport() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [searchQuery, setSearchQuery] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [page, setPage] = useState(1)

  const fetchSales = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const list = await salesApi.getAll()
      setSales(Array.isArray(list) ? list : [])
    } catch (e) {
      setSales([])
      setError(e?.message || 'Failed to load transactions')
      Swal.fire({ icon: 'error', title: 'Load failed', text: e?.message || 'Could not load transactions' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSales()
  }, [fetchSales])

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredSales = useMemo(() => {
    return sales.filter((s) => {
      const matchSearch =
        normalizedQuery === '' ||
        (s.invoiceNo || '').toLowerCase().includes(normalizedQuery) ||
        (s.user ? `${s.user.firstName || ''} ${s.user.lastName || ''}`.toLowerCase().includes(normalizedQuery) : false)

      let matchDate = true
      if (fromDate || toDate) {
        const saleDate = s.saleDate ? new Date(s.saleDate).toISOString().slice(0, 10) : ''
        if (fromDate && saleDate < fromDate) matchDate = false
        if (toDate && saleDate > toDate) matchDate = false
      }

      return matchSearch && matchDate
    })
  }, [sales, normalizedQuery, fromDate, toDate])

  const totalPages = Math.max(1, Math.ceil(filteredSales.length / PAGE_SIZE))
  const safePage = Math.min(Math.max(page, 1), totalPages)

  const visibleSales = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE
    return filteredSales.slice(startIndex, startIndex + PAGE_SIZE)
  }, [filteredSales, safePage])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, fromDate, toDate])

  const handleDownloadPdf = () => {
    const rows = visibleSales.map((s) => [
      s.invoiceNo,
      s.saleDate ? new Date(s.saleDate).toLocaleString() : '',
      (s.paymentMethod || '').toUpperCase(),
      `LKR ${(s.totalAmount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}`
    ])

    downloadTablePdf({
      title: 'Transaction Report',
      subtitle: fromDate && toDate ? `From ${fromDate} To ${toDate}` : 'All Transactions',
      columns: ['Invoice No', 'Date', 'Payment', 'Amount'],
      rows,
      filename: `TransactionReport_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  return (
    <div className="transaction-report-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Transaction Report</h1>
          <p className="page-subtitle">View transactions (export PDF)</p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="action-btn pdf-btn"
            title="Export PDF"
            onClick={handleDownloadPdf}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button
            type="button"
            className="action-btn refresh-btn"
            title="Refresh"
            onClick={fetchSales}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faSyncAlt} className={loading ? 'fa-spin' : ''} />
          </button>
        </div>
      </div>

      {error && (
        <div className="no-data" style={{ marginBottom: 16, color: '#b91c1c', fontWeight: 600 }}>
          {error}
        </div>
      )}

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
            disabled={loading}
          />
        </div>

        <div className="date-filters">
          <input
            type="date"
            className="filter-date-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            disabled={loading}
          />
          <span className="date-sep">to</span>
          <input
            type="date"
            className="filter-date-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="loading-data">
                  Loading…
                </td>
              </tr>
            ) : visibleSales.length === 0 ? (
              <tr>
                <td colSpan={4} className="no-data">
                  No transactions found
                </td>
              </tr>
            ) : (
              visibleSales.map((s) => (
                <tr key={s.id || s.invoiceNo}>
                  <td>{s.invoiceNo}</td>
                  <td>{s.saleDate ? new Date(s.saleDate).toLocaleString() : '—'}</td>
                  <td>{(s.paymentMethod || '—').toUpperCase()}</td>
                  <td>
                    LKR {(s.totalAmount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrap">
          <button type="button" className="pagination-btn" disabled={safePage <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span className="pagination-info">Page {safePage} of {totalPages}</span>
          <button type="button" className="pagination-btn" disabled={safePage >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default PosTransactionReport

