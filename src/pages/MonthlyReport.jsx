import '../styles/MonthlyReport.css'

function MonthlyReport() {
  return (
    <div className="monthly-report-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Monthly Report</h1>
          <p className="page-subtitle">View monthly sales and transaction reports</p>
        </div>
      </div>

      <div className="report-content">
        <div className="report-placeholder">
          <h2>Monthly Report</h2>
          <p>Monthly report content will appear here.</p>
        </div>
      </div>
    </div>
  )
}

export default MonthlyReport
