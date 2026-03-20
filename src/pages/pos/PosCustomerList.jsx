import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faPlus,
  faPen,
  faTrash,
  faFilePdf,
  faFileExcel,
  faSyncAlt,
  faRedo,
  faSearch
} from '@fortawesome/free-solid-svg-icons'

import * as customerApi from '../../api/customerApi'
import { downloadTablePdf } from '../../utils/pdfExport'
import { downloadTableExcel } from '../../utils/excelExport'
import { getPhoneValidationError } from '../../utils/phoneValidation'
import '../../styles/PosCustomer.css'

function PosCustomerList() {
  const navigate = useNavigate()
  const location = useLocation()

  const userRole = (localStorage.getItem('userRole') || '').toUpperCase()
  const isStaff = userRole === 'STAFF'

  const [activeStatus, setActiveStatus] = useState('Active')
  const [searchQuery, setSearchQuery] = useState('')
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const PAGE_SIZE = 10

  useEffect(() => {
    // Basic title sync (optional) - no side effects needed.
  }, [location.pathname])

  const fetchCustomers = async () => {
    setLoading(true)
    setError(null)
    try {
      const isActive = activeStatus === 'Active'
      const list = await customerApi.search({
        customerName: searchQuery.trim() || undefined,
        isActive
      })
      setCustomers(Array.isArray(list) ? list : [])
    } catch (err) {
      setError(err.message || 'Failed to load customers')
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatus, searchQuery])

  const totalPages = Math.max(1, Math.ceil(customers.length / PAGE_SIZE))
  const [page, setPage] = useState(1)
  const safePage = Math.min(Math.max(page, 1), totalPages)

  const visibleCustomers = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE
    return customers.slice(startIndex, startIndex + PAGE_SIZE)
  }, [customers, safePage])

  useEffect(() => {
    setPage(1)
  }, [activeStatus, searchQuery])

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'POS Customers',
      subtitle: isStaff ? 'Staff view' : 'Manage customers',
      columns: ['Customer Name', 'Phone', 'Email', 'Address'],
      rows: customers.map((c) => [
        c.customerName || '',
        c.phone || '—',
        c.email || '—',
        c.address || '—'
      ]),
      filename: `POS_Customers_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDownloadExcel = () => {
    downloadTableExcel({
      title: 'POS Customers',
      columns: ['Customer Name', 'Phone', 'Email', 'Address'],
      rows: customers.map((c) => [
        c.customerName || '',
        c.phone || '—',
        c.email || '—',
        c.address || '—'
      ]),
      filename: `POS_Customers_${new Date().toISOString().slice(0, 10)}.xlsx`
    })
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete this customer?',
      text: 'This will move the customer to Inactive.',
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
      setError(err.message || 'Restore failed')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="pos-customer-container">
      <div className="pos-customer-header">
        <div className="pos-customer-header-left">
          <FontAwesomeIcon icon={faUser} className="pos-customer-header-icon" aria-hidden />
          <div>
            <h1 className="pos-customer-title">Customer</h1>
            <p className="pos-customer-subtitle">{isStaff ? 'Manage customers (POS)' : 'Manage customers'}</p>
          </div>
        </div>

        <div className="pos-customer-header-actions">
          <button type="button" className="pos-customer-action-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button type="button" className="pos-customer-action-btn" title="Export Excel" onClick={handleDownloadExcel}>
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
          <button type="button" className="pos-customer-action-btn" title="Refresh" onClick={fetchCustomers} disabled={loading}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button
            type="button"
            className="pos-customer-add-btn"
            onClick={() => navigate('/pos/customer/new')}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="pos-customer-status">
        <button className={`pos-customer-status-btn ${activeStatus === 'Active' ? 'active' : ''}`} onClick={() => setActiveStatus('Active')}>
          Active
        </button>
        <button className={`pos-customer-status-btn ${activeStatus === 'Inactive' ? 'active' : ''}`} onClick={() => setActiveStatus('Inactive')}>
          Inactive
        </button>
      </div>

      <div className="pos-customer-filters">
        <div className="pos-customer-search">
          <FontAwesomeIcon icon={faSearch} className="pos-customer-search-icon" aria-hidden />
          <input
            type="text"
            className="pos-customer-search-input"
            placeholder="Search by customer name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="pos-customer-error">{error}</div>}

      <div className="pos-customer-table-wrap">
        <table className="pos-customer-table">
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
                <td colSpan={5} className="pos-customer-no-data">Loading...</td>
              </tr>
            ) : visibleCustomers.length === 0 ? (
              <tr>
                <td colSpan={5} className="pos-customer-no-data">No customers found</td>
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
                      <div className="pos-customer-row-actions">
                        <button
                          type="button"
                          className="pos-customer-icon-btn"
                          title="Edit"
                          onClick={() => navigate(`/pos/customer/edit/${c.id}`)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        {isInactiveTab ? (
                          <button
                            type="button"
                            className="pos-customer-icon-btn"
                            title="Restore"
                            disabled={deletingId === c.id}
                            onClick={() => handleReactivate(c.id)}
                          >
                            <FontAwesomeIcon icon={faRedo} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="pos-customer-icon-btn"
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

      <div className="pos-customer-pagination">
        <button type="button" className="pos-customer-page-btn" disabled={safePage <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span className="pos-customer-page-info">Page {safePage} of {totalPages}</span>
        <button type="button" className="pos-customer-page-btn" disabled={safePage >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default PosCustomerList

