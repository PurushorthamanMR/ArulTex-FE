import { useState, useEffect, useCallback } from 'react'
import * as salesApi from '../api/salesApi'
import '../styles/DailyReport.css'

function DailyReport() {
  const [reportDate, setReportDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchReport = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await salesApi.getReportDaily(reportDate)
      setReport(data)
    } catch (err) {
      setError(err.message || 'Failed to load report')
      setReport(null)
    } finally {
      setLoading(false)
    }
  }, [reportDate])

  useEffect(() => {
    fetchReport()
  }, [fetchReport])

  const dateStr = report?.date ?? reportDate
  const totalSales = report?.totalSales ?? 0
  const count = report?.count ?? 0
  const sales = report?.sales ?? []

  return (
    <div className="daily-report-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Daily Sales Report</h1>
          <p className="page-subtitle">View daily sales and transaction reports</p>
        </div>
      </div>

      <div className="report-filters">
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} className="form-input" />
        </div>
        <button type="button" className="btn-primary" onClick={fetchReport} disabled={loading}>Refresh</button>
      </div>

      {error && <div className="report-error">{error}</div>}
      <div className="report-summary-cards">
        <div className="report-card">
          <div className="report-card-label">Date</div>
          <div className="report-card-value">{dateStr}</div>
        </div>
        <div className="report-card">
          <div className="report-card-label">Total Sales</div>
          <div className="report-card-value">₹{totalSales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="report-card">
          <div className="report-card-label">Total Transactions</div>
          <div className="report-card-value">{loading ? '...' : count}</div>
        </div>
      </div>

      <div className="report-table-wrap">
        <h3>Sales for the day</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="no-data">Loading...</td></tr>
            ) : sales.length === 0 ? (
              <tr><td colSpan="4" className="no-data">No sales for this date</td></tr>
            ) : (
              sales.map((s) => (
                <tr key={s.id}>
                  <td>{s.invoiceNo}</td>
                  <td>{s.saleDate ? new Date(s.saleDate).toLocaleString() : '-'}</td>
                  <td>₹{(s.totalAmount ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td>{s.status ?? '-'}</td>
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

export default DailyReport
