import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf,
  faFileExcel,
  faSyncAlt,
  faArrowUp,
  faPlus,
  faSearch,
  faPen,
  faTrash,
  faEye,
  faTimes,
  faUser,
  faSyncAlt as faRedo
} from '@fortawesome/free-solid-svg-icons'
import * as userApi from '../api/userApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { downloadTableExcel } from '../utils/excelExport'
import NewUser from './NewUser'
import StatusToggle from '../components/StatusToggle'
import Swal from 'sweetalert2'
import '../styles/UserList.css'

function UserList() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeStatus, setActiveStatus] = useState('Active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [roles, setRoles] = useState([])

  // State for Edit Mode
  const [isEditing, setIsEditing] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  // State for View Mode
  const [viewingUser, setViewingUser] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    fetchRoles()
    fetchUsers()
  }, [activeStatus, searchQuery, selectedRole])

  const fetchRoles = async () => {
    try {
      const data = await userApi.getAllRoles()
      setRoles(data || [])
    } catch (err) {
      console.error('Error fetching roles:', err)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      let statusValue
      if (activeStatus === 'Active') statusValue = true
      else if (activeStatus === 'Inactive') statusValue = false
      else statusValue = undefined // 'All'
      const data = await userApi.getAllPage({
        pageNumber: 1,
        pageSize: 10,
        status: statusValue
      })

      let filtered = data.content || []

      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        filtered = filtered.filter(u =>
          (u.firstName + ' ' + u.lastName).toLowerCase().includes(q) ||
          u.emailAddress?.toLowerCase().includes(q) ||
          u.mobileNumber?.includes(q)
        )
      }

      if (selectedRole) {
        filtered = filtered.filter(u => u.userRoleDto?.userRole?.toLowerCase() === selectedRole.toLowerCase())
      }

      setUsers(filtered)
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setIsEditing(true)
  }

  const handleView = (user) => {
    setViewingUser(user)
    setIsViewModalOpen(true)
  }

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Deactivate this user?',
      text: 'This will move the user to Inactive. You can restore later.',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#b91c1c',
      cancelButtonColor: '#6b7280'
    })
    if (!result.isConfirmed) return
    try {
      await userApi.softDelete(userId)
      fetchUsers()
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Failed to deactivate user' })
    }
  }

  const handleReactivate = async (userId) => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Restore this user?',
      text: 'This will move the user back to Active.',
      showCancelButton: true,
      confirmButtonText: 'Yes, restore',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#0d9488',
      cancelButtonColor: '#6b7280'
    })
    if (!result.isConfirmed) return
    try {
      await userApi.reactivate(userId)
      fetchUsers()
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Failed to restore user' })
    }
  }

  const handleSaveSuccess = () => {
    setIsEditing(false)
    setEditingUser(null)
    fetchUsers()
  }

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'User List',
      subtitle: `Status: ${activeStatus}`,
      columns: ['Name', 'Mobile Number', 'Email Address', 'Address', 'Role', 'Status'],
      rows: users.map(u => [
        `${u.firstName} ${u.lastName}`,
        u.mobileNumber || '',
        u.emailAddress || '',
        u.address || '',
        u.userRoleDto?.userRole || '',
        u.isActive ? 'Active' : 'Inactive'
      ]),
      filename: `Users_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDownloadExcel = () => {
    downloadTableExcel({
      title: 'Users',
      columns: ['Name', 'Mobile Number', 'Email Address', 'Address', 'Role', 'Status'],
      rows: users.map(u => [
        `${u.firstName} ${u.lastName}`,
        u.mobileNumber || '',
        u.emailAddress || '',
        u.address || '',
        u.userRoleDto?.userRole || '',
        u.isActive ? 'Active' : 'Inactive'
      ]),
      filename: `Users_${new Date().toISOString().slice(0, 10)}.xlsx`
    })
  }

  if (isEditing) {
    return (
      <NewUser
        initialData={editingUser}
        onSave={handleSaveSuccess}
        onBack={() => {
          setIsEditing(false)
          setEditingUser(null)
        }}
      />
    )
  }

  return (
    <div className="user-list-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">User List</h1>
          <p className="page-subtitle">Manage Your Users</p>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button type="button" className="action-btn excel-btn" title="Export Excel" onClick={handleDownloadExcel}>
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
          <button className="action-btn refresh-btn" title="Refresh" onClick={fetchUsers} disabled={loading}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="action-btn upload-btn" title="Upload">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            className="action-btn add-btn"
            onClick={() => navigate('/users/new')}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Register</span>
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
        <button
          className={`status-toggle ${activeStatus === 'All' ? 'active' : ''}`}
          onClick={() => setActiveStatus('All')}
        >
          All
        </button>
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
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Select Role</option>
          {roles.map(r => (
            <option key={r.id} value={r.userRole}>{r.userRole}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email Address</th>
              <th>Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="loading-text">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon"><FontAwesomeIcon icon={faUser} /></div>
                    <div className="no-data-text">No users found</div>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const isInactiveTab = activeStatus === 'Inactive'
                return (
                  <tr key={u.id}>
                    <td>{u.firstName} {u.lastName}</td>
                    <td>{u.mobileNumber}</td>
                    <td>{u.emailAddress}</td>
                    <td>{u.address}</td>
                    <td>{u.userRoleDto?.userRole}</td>
                    <td>
                      <div className="table-actions">
                        <button className="view-btn" title="View Details" onClick={() => handleView(u)}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button className="edit-btn" title="Edit User" onClick={() => handleEdit(u)}>
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        {isInactiveTab ? (
                          <button className="delete-btn" title="Redo (make active)" onClick={() => handleReactivate(u.id)}>
                            <FontAwesomeIcon icon={faRedo} />
                          </button>
                        ) : (
                          <button className="delete-btn" title="Deactivate" onClick={() => handleDelete(u.id)}>
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

      {/* View Modal */}
      {isViewModalOpen && viewingUser && (
        <div className="user-modal-overlay" onClick={() => setIsViewModalOpen(false)}>
          <div className="user-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button className="close-btn" onClick={() => setIsViewModalOpen(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-item">
                <label>First Name:</label>
                <span>{viewingUser.firstName}</span>
              </div>
              <div className="detail-item">
                <label>Last Name:</label>
                <span>{viewingUser.lastName}</span>
              </div>
              <div className="detail-item">
                <label>Email Address:</label>
                <span>{viewingUser.emailAddress}</span>
              </div>
              <div className="detail-item">
                <label>Mobile Number:</label>
                <span>{viewingUser.mobileNumber}</span>
              </div>
              <div className="detail-item">
                <label>Address:</label>
                <span>{viewingUser.address}</span>
              </div>
              <div className="detail-item">
                <label>Role:</label>
                <span>{viewingUser.userRoleDto?.userRole}</span>
              </div>
              <div className="detail-item">
                <label>Status:</label>
                <span className={`status-badge ${viewingUser.isActive ? 'active' : 'inactive'}`}>
                  {viewingUser.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="detail-item">
                <label>Created Date:</label>
                <span>{viewingUser.createdDate ? new Date(viewingUser.createdDate).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-close-btn" onClick={() => setIsViewModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Accent Line */}
      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default UserList
