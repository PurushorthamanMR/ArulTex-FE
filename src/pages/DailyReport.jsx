import '../styles/DailyReport.css'

function DailyReport() {
  return (
    <div className="daily-report-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Daily Report</h1>
          <p className="page-subtitle">View daily sales and transaction reports</p>
        </div>
      </div>

      <div className="report-content">
        <div className="report-placeholder">
          <h2>Daily Report</h2>
          <p>Daily report content will appear here.</p>
        </div>
      </div>
    </div>
  )
}

export default DailyReport
