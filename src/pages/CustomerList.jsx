import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faFilePdf,
  faFileExcel,
  faSyncAlt,
  faArrowUp,
  faPlus,
  faSearch,
  faPen,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import * as customerApi from '../api/customerApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { downloadTableExcel } from '../utils/excelExport'
import '../styles/Customer.css'

function CustomerList() {
  const navigate = useNavigate()
  const [activeStatus, setActiveStatus] = useState('Active')
  const [searchQuery, setSearchQuery] = useState('')
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = searchQuery.trim()
        ? await customerApi.search({
            customerName: searchQuery.trim(),
            ...(activeStatus !== 'All' && { isActive: activeStatus === 'Active' })
          })
        : await customerApi.getAll()
      setCustomers(Array.isArray(list) ? list : [])
    } catch (err) {
      setError(err.message || 'Failed to load customers')
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }, [searchQuery, activeStatus])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  const filteredCustomers = customers.filter((c) => {
    if (activeStatus === 'All') return true
    if (activeStatus === 'Active') return c.isActive === true
    return c.isActive === false
  })

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Customer',
      subtitle: 'Manage your customers',
      columns: ['Customer Name', 'Phone', 'Email', 'Address', 'Status'],
      rows: filteredCustomers.map((c) => [
        c.customerName || '',
        c.phone || '—',
        c.email || '—',
        c.address || '—',
        c.isActive ? 'Active' : 'Inactive'
      ]),
      filename: `Customer_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDownloadExcel = () => {
    downloadTableExcel({
      title: 'Customers',
      columns: ['Customer Name', 'Phone', 'Email', 'Address', 'Status'],
      rows: filteredCustomers.map((c) => [
        c.customerName || '',
        c.phone || '—',
        c.email || '—',
        c.address || '—',
        c.isActive ? 'Active' : 'Inactive'
      ]),
      filename: `Customers_${new Date().toISOString().slice(0, 10)}.xlsx`
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return
    setDeletingId(id)
    try {
      await customerApi.deleteCustomer(id)
      await fetchCustomers()
    } catch (err) {
      setError(err.message || 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="customer-container">
      <div className="page-header">
        <div className="page-header-content">
          <FontAwesomeIcon icon={faUser} className="page-header-icon" aria-hidden />
          <div>
            <h1 className="page-title">Customer</h1>
            <p className="page-subtitle">Manage your customers</p>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button type="button" className="action-btn excel-btn" title="Export Excel" onClick={handleDownloadExcel}>
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
          <button className="action-btn refresh-btn" title="Refresh" onClick={() => fetchCustomers()} disabled={loading}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="action-btn upload-btn" title="Upload">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button className="action-btn add-btn" onClick={() => navigate('/customer/new')}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add New</span>
          </button>
        </div>
      </div>

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
        <button
          className={`status-toggle ${activeStatus === 'All' ? 'active' : ''}`}
          onClick={() => setActiveStatus('All')}
        >
          All
        </button>
      </div>

      <div className="filters-container">
        <div className="search-wrapper">
          <span className="search-icon-wrap" aria-hidden="true">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by customer name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="customer-filter-select"
          value={activeStatus}
          onChange={(e) => setActiveStatus(e.target.value)}
        >
          <option value="Active">Active only</option>
          <option value="Inactive">Inactive only</option>
          <option value="All">Show all</option>
        </select>
      </div>

      {error && (
        <div className="customer-error" role="alert">
          {error}
        </div>
      )}

      <div className="table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">Loading...</div>
                </td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon"><FontAwesomeIcon icon={faUser} /></div>
                    <div className="no-data-text">No customers found</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td>{c.customerName}</td>
                  <td>{c.phone || '—'}</td>
                  <td>{c.email || '—'}</td>
                  <td>{c.address || '—'}</td>
                  <td>
                    <span className={`status-badge ${c.isActive ? 'status-active' : 'status-inactive'}`}>
                      {c.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="action-icon-btn edit-btn"
                        title="Edit"
                        onClick={() => navigate(`/customer/edit/${c.id}`)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        type="button"
                        className="action-icon-btn delete-btn"
                        title="Delete"
                        disabled={deletingId === c.id}
                        onClick={() => handleDelete(c.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bottom-accent-line" />
    </div>
  )
}

export default CustomerList
