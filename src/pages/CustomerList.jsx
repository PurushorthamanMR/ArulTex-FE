import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  faTrash,
  faSyncAlt as faRedo
} from '@fortawesome/free-solid-svg-icons'
import * as customerApi from '../api/customerApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { downloadTableExcel } from '../utils/excelExport'
import '../styles/Customer.css'
import Swal from 'sweetalert2'

function CustomerList() {
  const navigate = useNavigate()
  const location = useLocation()
  const isInPos = (location.pathname || '').startsWith('/pos/')
  const [activeStatus, setActiveStatus] = useState('Active')
  const [searchQuery, setSearchQuery] = useState('')
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const isActive = activeStatus === 'Active'
      const list = await customerApi.search({
        customerName: searchQuery.trim() || undefined,
        isActive
      })
      setCustomers(Array.isArray(list) ? list : [])
      setPage(1)
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

  // Backend already filters by active/inactive; we paginate on frontend.
  const filteredCustomers = customers
  const totalElements = filteredCustomers.length
  const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const visibleCustomers = filteredCustomers.slice(startIndex, startIndex + PAGE_SIZE)

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Customer',
      subtitle: 'Manage your customers',
      columns: ['Customer Name', 'Phone', 'Email', 'Address'],
      rows: filteredCustomers.map((c) => [
        c.customerName || '',
        c.phone || '—',
        c.email || '—',
        c.address || '—'
      ]),
      filename: `Customer_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDownloadExcel = () => {
    downloadTableExcel({
      title: 'Customers',
      columns: ['Customer Name', 'Phone', 'Email', 'Address'],
      rows: filteredCustomers.map((c) => [
        c.customerName || '',
        c.phone || '—',
        c.email || '—',
        c.address || '—'
      ]),
      filename: `Customers_${new Date().toISOString().slice(0, 10)}.xlsx`
    })
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete this customer?',
      text: 'This will move the customer to Inactive. You can restore it later.',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#b91c1c',
      cancelButtonColor: '#6b7280'
    })
    if (!result.isConfirmed) return
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

  const handleReactivate = async (id) => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Restore this customer?',
      text: 'This will move the customer back to Active.',
      showCancelButton: true,
      confirmButtonText: 'Yes, restore',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#0d9488',
      cancelButtonColor: '#6b7280'
    })
    if (!result.isConfirmed) return
    setDeletingId(id)
    try {
      await customerApi.setActive(id, true)
      await fetchCustomers()
    } catch (err) {
      setError(err.message || 'Redo failed')
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
          <button
            className="action-btn add-btn"
            onClick={() => navigate(isInPos ? '/pos/customer/new' : '/customer/new')}
          >
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="no-data">
                  <div className="no-data-content">Loading...</div>
                </td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon"><FontAwesomeIcon icon={faUser} /></div>
                    <div className="no-data-text">No customers found</div>
                  </div>
                </td>
              </tr>
            ) : (
              visibleCustomers.map((c) => {
                const isInactiveTab = activeStatus === 'Inactive'
                return (
                  <tr key={c.id}>
                    <td>{c.customerName}</td>
                    <td>{c.phone || '—'}</td>
                    <td>{c.email || '—'}</td>
                    <td>{c.address || '—'}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="action-icon-btn edit-btn"
                          title="Edit"
                        onClick={() => navigate(isInPos ? `/pos/customer/edit/${c.id}` : `/customer/edit/${c.id}`)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        {isInactiveTab ? (
                          <button
                            type="button"
                            className="action-icon-btn delete-btn"
                            title="Redo (make active)"
                            disabled={deletingId === c.id}
                            onClick={() => handleReactivate(c.id)}
                          >
                            <FontAwesomeIcon icon={faRedo} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="action-icon-btn delete-btn"
                            title="Delete"
                            disabled={deletingId === c.id}
                            onClick={() => handleDelete(c.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrap">
          <button
            type="button"
            className="pagination-btn"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <div className="pagination-numbers" role="navigation" aria-label="Pagination">
            {(() => {
              const visibleCount = 5
              const start = Math.max(1, Math.min(safePage - 2, totalPages - visibleCount + 1))
              const end = Math.min(totalPages, start + visibleCount - 1)
              const items = []

              if (start > 1) {
                items.push(
                  <span key="start-ellipsis" className="pagination-ellipsis" aria-hidden>
                    ...
                  </span>
                )
              }

              for (let p = start; p <= end; p++) {
                items.push(
                  <button
                    key={p}
                    type="button"
                    className={`pagination-btn ${p === safePage ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                    aria-current={p === safePage ? 'page' : undefined}
                  >
                    {p}
                  </button>
                )
              }

              if (end < totalPages) {
                items.push(
                  <span key="end-ellipsis" className="pagination-ellipsis" aria-hidden>
                    ...
                  </span>
                )
              }

              return items
            })()}
          </div>
          <span className="pagination-info">Page {safePage} of {totalPages} ({totalElements} items)</span>
          <button
            type="button"
            className="pagination-btn"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}

      <div className="bottom-accent-line" />
    </div>
  )
}

export default CustomerList
