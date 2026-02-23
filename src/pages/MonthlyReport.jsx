import { useState, useEffect, useCallback } from 'react'
import * as salesApi from '../api/salesApi'
import '../styles/MonthlyReport.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function MonthlyReport() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchReport = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await salesApi.getReportMonthly(year, month)
      setReport(data)
    } catch (err) {
      setError(err.message || 'Failed to load report')
      setReport(null)
    } finally {
      setLoading(false)
    }
  }, [year, month])

  useEffect(() => {
    fetchReport()
  }, [fetchReport])

  const totalSales = report?.totalSales ?? 0
  const count = report?.count ?? 0
  const sales = report?.sales ?? []
  const monthLabel = `${MONTHS[month - 1]} ${year}`

  return (
    <div className="monthly-report-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Monthly Sales Report</h1>
          <p className="page-subtitle">View monthly sales and transactions</p>
        </div>
      </div>

      <div className="report-filters">
        <div className="form-group">
          <label>Year</label>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="form-select">
            {[now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Month</label>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="form-select">
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn-primary" onClick={fetchReport} disabled={loading}>Refresh</button>
      </div>

      {error && <div className="report-error">{error}</div>}
      <div className="report-summary-cards">
        <div className="report-card">
          <div className="report-card-label">Month</div>
          <div className="report-card-value">{monthLabel}</div>
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
        <h3>Sales for the month</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="no-data">Loading...</td></tr>
            ) : sales.length === 0 ? (
              <tr><td colSpan="3" className="no-data">No sales for this month</td></tr>
            ) : (
              sales.map((s) => (
                <tr key={s.id}>
                  <td>{s.invoiceNo}</td>
                  <td>{s.saleDate ? new Date(s.saleDate).toLocaleString() : '-'}</td>
                  <td>₹{(s.totalAmount ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
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

export default MonthlyReport
