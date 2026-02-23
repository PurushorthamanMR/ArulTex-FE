import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faFileExcel, faSyncAlt, faArrowUp, faPlus, faSearch, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import * as supplierApi from '../api/supplierApi'
import { downloadTablePdf } from '../utils/pdfExport'
import '../styles/SupplierList.css'

function SupplierList() {
  const navigate = useNavigate()
  const [activeStatus, setActiveStatus] = useState('Active')
  const [searchQuery, setSearchQuery] = useState('')
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchSuppliers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const isActive = activeStatus === 'All' ? undefined : activeStatus === 'Active'
      const list = await supplierApi.getAll({ search: searchQuery.trim() || undefined, isActive })
      setSuppliers(Array.isArray(list) ? list : [])
    } catch (err) {
      setError(err.message || 'Failed to load suppliers')
      setSuppliers([])
    } finally {
      setLoading(false)
    }
  }, [activeStatus, searchQuery])

  useEffect(() => {
    fetchSuppliers()
  }, [fetchSuppliers])

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Supplier List',
      subtitle: 'Manage your suppliers',
      columns: ['Supplier Name', 'Contact Person', 'Phone', 'Email', 'Address', 'Status'],
      rows: suppliers.map((s) => [
        s.supplierName || '',
        s.contactPerson || '',
        s.phone || '',
        s.email || '',
        s.address || '',
        s.isActive ? 'Active' : 'Inactive'
      ]),
      filename: `Suppliers_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this supplier?')) return
    setDeletingId(id)
    try {
      await supplierApi.deleteSupplier(id)
      await fetchSuppliers()
    } catch (err) {
      setError(err.message || 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="supplier-list-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Supplier List</h1>
          <p className="page-subtitle">Manage Your Suppliers</p>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}><FontAwesomeIcon icon={faFilePdf} /></button>
          <button className="action-btn excel-btn" title="Export Excel"><FontAwesomeIcon icon={faFileExcel} /></button>
          <button className="action-btn refresh-btn" title="Refresh" onClick={() => fetchSuppliers()} disabled={loading}><FontAwesomeIcon icon={faSyncAlt} /></button>
          <button className="action-btn upload-btn" title="Upload"><FontAwesomeIcon icon={faArrowUp} /></button>
          <button className="action-btn add-btn" onClick={() => navigate('/suppliers/new')}>
            <FontAwesomeIcon icon={faPlus} /><span>Add New</span>
          </button>
        </div>
      </div>

      <div className="status-toggles">
        <button className={`status-toggle ${activeStatus === 'Active' ? 'active' : ''}`} onClick={() => setActiveStatus('Active')}>Active</button>
        <button className={`status-toggle ${activeStatus === 'Inactive' ? 'active' : ''}`} onClick={() => setActiveStatus('Inactive')}>Inactive</button>
        <button className={`status-toggle ${activeStatus === 'All' ? 'active' : ''}`} onClick={() => setActiveStatus('All')}>All</button>
      </div>

      <div className="filters-container">
        <div className="search-wrapper">
          <span className="search-icon-wrap" aria-hidden="true">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </span>
          <input type="text" className="search-input" placeholder="Search by name or email" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      {error && <div className="supplier-list-error">{error}</div>}

      <div className="table-container">
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="no-data">Loading...</td></tr>
            ) : suppliers.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon">📦</div>
                    <div className="no-data-text">No suppliers found</div>
                  </div>
                </td>
              </tr>
            ) : (
              suppliers.map((s) => (
                <tr key={s.id}>
                  <td>{s.supplierName}</td>
                  <td>{s.contactPerson}</td>
                  <td>{s.phone}</td>
                  <td>{s.email}</td>
                  <td>{s.address}</td>
                  <td>
                    <span className={`status-badge ${s.isActive ? 'status-active' : 'status-inactive'}`}>
                      {s.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="action-icon-btn edit-btn" title="Edit" onClick={() => navigate(`/suppliers/edit/${s.id}`)}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button type="button" className="action-icon-btn delete-btn" title="Delete" disabled={deletingId === s.id} onClick={() => handleDelete(s.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
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

export default SupplierList
