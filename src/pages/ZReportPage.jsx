import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faEye, faPrint, faTimes, faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import * as salesApi from '../api/salesApi'
import { downloadZReportPdf } from '../utils/pdfExport'
import '../styles/TransactionReport.css'

function formatMoney(val) {
  return `LKR ${Number(val || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}`
}

function ZReportPage() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const rows = await salesApi.getZReportArchives(100)
      setList(rows)
    } catch (e) {
      console.error(e)
      setList([])
      Swal.fire({ icon: 'error', title: 'Load failed', text: e.message || 'Could not load Z reports' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handlePrintRow = (row) => {
    downloadZReportPdf(row, `${row.fromDate} to ${row.toDate} | Archived #${row.id}`)
  }

  const handleView = async (id) => {
    setDetailLoading(true)
    setDetail(null)
    try {
      const dto = await salesApi.getZReportArchiveById(id)
      setDetail(dto)
    } catch (e) {
      Swal.fire({ icon: 'error', title: 'Error', text: e.message || 'Could not load report' })
    } finally {
      setDetailLoading(false)
    }
  }

  const closeModal = () => {
    setDetail(null)
  }

  const printDetail = () => {
    if (!detail) return
    downloadZReportPdf(detail, `${detail.fromDate} to ${detail.toDate} | Archived #${detail.id}`)
  }

  return (
    <div className="transaction-report-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Z Report Archives</h1>
          <p className="page-subtitle">Each Z closes a register shift. View or re-print anytime.</p>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn refresh-btn" onClick={load} disabled={loading}>
            <FontAwesomeIcon icon={faSyncAlt} className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Shift</th>
              <th>Closed at</th>
              <th>Period</th>
              <th>Transactions</th>
              <th>Grand total</th>
              <th>Closed by</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="loading-data">Loading Z reports...</td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">No archived Z reports yet. Run Z Report &amp; close shift from Sales Analysis.</td>
              </tr>
            ) : (
              list.map((row, idx) => (
                <tr key={row.id}>
                  <td className="row-num">{idx + 1}</td>
                  <td>{row.shiftId != null ? `#${row.shiftId}` : '—'}</td>
                  <td>{row.closedAt ? new Date(row.closedAt).toLocaleString() : '—'}</td>
                  <td>
                    <strong style={{ color: '#0d9488' }}>{row.fromDate}</strong>
                    {' → '}
                    <strong style={{ color: '#0d9488' }}>{row.toDate}</strong>
                  </td>
                  <td>{row.transactionCount}</td>
                  <td className="amount-cell">{formatMoney(row.grandTotal)}</td>
                  <td>
                    {row.closedBy
                      ? `${row.closedBy.firstName} ${row.closedBy.lastName}`
                      : '—'}
                  </td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="action-icon-btn view"
                      title="View"
                      onClick={() => handleView(row.id)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      type="button"
                      className="action-icon-btn print"
                      title="Print PDF"
                      onClick={() => handlePrintRow(row)}
                    >
                      <FontAwesomeIcon icon={faPrint} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {(detail || detailLoading) && (
        <div className="modal-overlay" role="presentation" onClick={closeModal}>
          <div
            className="sale-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="z-report-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 id="z-report-modal-title">
                <FontAwesomeIcon icon={faFileInvoice} /> Z Report #{detail?.id ?? '…'}
              </h3>
              <button type="button" className="close-btn" onClick={closeModal} aria-label="Close">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              {detailLoading ? (
                <p>Loading…</p>
              ) : detail ? (
                <>
                  <div className="detail-grid" style={{ marginBottom: '16px' }}>
                    <div className="detail-item">
                      <label>Shift</label>
                      <span>{detail.shiftId != null ? `#${detail.shiftId}` : '—'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Period</label>
                      <span>{detail.fromDate} → {detail.toDate}</span>
                    </div>
                    <div className="detail-item">
                      <label>Closed at</label>
                      <span>{detail.closedAt ? new Date(detail.closedAt).toLocaleString() : '—'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Closed by</label>
                      <span>
                        {detail.closedBy
                          ? `${detail.closedBy.firstName} ${detail.closedBy.lastName}`
                          : '—'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <label>Grand total</label>
                      <span className="amount-cell">{formatMoney(detail.grandTotal)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Transactions</label>
                      <span>{detail.transactionCount}</span>
                    </div>
                    <div className="detail-item">
                      <label>Total cash</label>
                      <span>{formatMoney(detail.totalCashSale ?? 0)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Total card</label>
                      <span>{formatMoney(detail.totalCardSale ?? 0)}</span>
                    </div>
                  </div>
                  <div className="modal-return-bar">
                    <button type="button" className="action-btn refresh-btn" onClick={printDetail}>
                      <FontAwesomeIcon icon={faPrint} /> Print PDF
                    </button>
                  </div>
                  <div className="items-table-wrapper">
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Txns</th>
                          <th>Total</th>
                          <th>Cash</th>
                          <th>Card</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(detail.dailyTotals || []).length === 0 ? (
                          <tr><td colSpan="5">No daily rows</td></tr>
                        ) : (
                          (detail.dailyTotals || []).map((d) => (
                            <tr key={d.date}>
                              <td>{d.date}</td>
                              <td>{d.transactionCount}</td>
                              <td>{formatMoney(d.totalSales)}</td>
                              <td>{formatMoney(d.cashSales ?? 0)}</td>
                              <td>{formatMoney(d.cardSales ?? 0)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <div className="bottom-accent-line" />
    </div>
  )
}

export default ZReportPage
