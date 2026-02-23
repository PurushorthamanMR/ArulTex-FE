import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFilePdf, 
  faFileExcel, 
  faSyncAlt, 
  faArrowUp,
  faSearch,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons'
import { downloadTablePdf } from '../utils/pdfExport'
import '../styles/TransactionReport.css'

function TransactionReport() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedUser, setSelectedUser] = useState('')

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Transaction Report',
      subtitle: 'Manage your transaction report',
      columns: ['Transaction ID', 'Branch Name', 'Shop Name', 'User Name', 'Customer Name', 'Total Amount', 'Date Time'],
      rows: [],
      filename: `TransactionReport_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  return (
    <div className="transaction-report-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Transaction Report</h1>
          <p className="page-subtitle">Manage Your Transaction Report</p>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button className="action-btn excel-btn" title="Export Excel">
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
          <button className="action-btn refresh-btn" title="Refresh">
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="action-btn upload-btn" title="Upload">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="search-wrapper">
          <span className="search-icon-wrap" aria-hidden="true">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="filter-select"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="">Select Branch</option>
          <option value="branch1">Branch 1</option>
          <option value="branch2">Branch 2</option>
        </select>
        <select 
          className="filter-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>
                Transaction ID
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Branch Name
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Shop Name
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                User Name
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Customer Name
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Total Amount
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Date Time
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="no-data">
                <div className="no-data-content">
                  <div className="no-data-icon">📁</div>
                  <div className="no-data-text">No data</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Accent Line */}
      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default TransactionReport
