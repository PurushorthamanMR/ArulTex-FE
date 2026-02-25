import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf,
  faFileExcel,
  faSyncAlt,
  faArrowUp,
  faPlus,
  faSortUp,
  faSortDown,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { discountsMock } from '../api/mockData'
import { downloadTablePdf } from '../utils/pdfExport'
import { downloadTableExcel } from '../utils/excelExport'
import '../styles/Discount.css'

function Discount() {
  const navigate = useNavigate()
  const [activeStatus, setActiveStatus] = useState('Active')

  const filteredList = useMemo(() => {
    return discountsMock.filter((d) =>
      activeStatus === 'Active' ? d.isActive === true : d.isActive === false
    )
  }, [activeStatus])

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Discount',
      subtitle: 'Manage your discounts',
      columns: ['Discount', 'Status'],
      rows: filteredList.map((d) => [`${d.discountLabel} (${d.percentage}%)`, d.isActive ? 'Active' : 'Inactive']),
      filename: `Discount_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDownloadExcel = () => {
    downloadTableExcel({
      title: 'Discounts',
      columns: ['Discount', 'Status'],
      rows: filteredList.map((d) => [`${d.discountLabel} (${d.percentage}%)`, d.isActive ? 'Active' : 'Inactive']),
      filename: `Discounts_${new Date().toISOString().slice(0, 10)}.xlsx`
    })
  }

  return (
    <div className="discount-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Discount</h1>
          <p className="page-subtitle">Manage your discounts</p>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button type="button" className="action-btn excel-btn" title="Export Excel" onClick={handleDownloadExcel}>
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
          <button className="action-btn refresh-btn" title="Refresh">
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="action-btn upload-btn" title="Upload">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            className="action-btn add-btn"
            onClick={() => navigate('/discount/new')}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Status Toggles */}
      <div className="status-toggles">
        <button
          className={`status-toggle ${activeStatus === 'Active' ? 'active' : ''}`}
          onClick={() => setActiveStatus('Active')}
        >
          Active
        </button>
        <button
          className={`status-toggle ${activeStatus === 'Inactive' ? 'active' : ''}`}
          onClick={() => setActiveStatus('Inactive')}
        >
          Inactive
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="discount-table">
          <thead>
            <tr>
              <th>
                Discount
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Status
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon">📦</div>
                    <div className="no-data-text">No data</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredList.map((d) => (
                <tr key={d.id}>
                  <td>
                    {d.discountLabel} ({d.percentage}%)
                  </td>
                  <td>{d.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button type="button" className="action-icon-btn" title="Edit" aria-label="Edit">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button type="button" className="action-icon-btn" title="Delete" aria-label="Delete">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Accent Line */}
      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default Discount
