import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import * as userApi from '../api/userApi'
import '../styles/NewUser.css'

function NewUser({ initialData, onSave, onBack }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    id: initialData?.id || null,
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    mobileNumber: initialData?.mobileNumber || '',
    emailAddress: initialData?.emailAddress || '',
    address: initialData?.address || '',
    roleId: initialData?.userRoleDto?.id || '',
    password: '',
    status: initialData ? (initialData.isActive ? 'Active' : 'Inactive') : 'Active'
  })
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const currentUserRole = (localStorage.getItem('userRole') || '').toUpperCase()

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const data = await userApi.getAllRoles()
      if (Array.isArray(data)) {
        let allowedRoles = data
        if (currentUserRole === 'MANAGER') {
          allowedRoles = data.filter(r => r.userRole.toUpperCase() === 'STAFF')
        } else if (currentUserRole === 'ADMIN') {
          allowedRoles = data.filter(r => ['MANAGER', 'STAFF'].includes(r.userRole.toUpperCase()))
        }
        setRoles(allowedRoles)
      }
    } catch (err) {
      console.error('Error fetching roles:', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveAttempt = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.emailAddress,
        mobileNumber: formData.mobileNumber,
        address: formData.address,
        userRoleId: parseInt(formData.roleId),
        isActive: formData.status === 'Active'
      }

      if (formData.id) {
        await userApi.update(payload)
        alert('User updated successfully')
      } else {
        payload.password = formData.password
        await userApi.register(payload)
        alert('User created successfully')
      }

      if (onSave) {
        onSave()
      } else {
        navigate('/users')
      }
    } catch (err) {
      setError(err.message || 'Failed to save user')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (onBack) onBack()
    else navigate('/users')
  }

  return (
    <div className="new-user-container">
      <div className="page-header compact-header">
        <div>
          <h1 className="page-title">{formData.id ? 'Edit User' : 'New User'}</h1>
          <p className="page-subtitle">{formData.id ? 'Update user details' : 'Create new user'}</p>
        </div>
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
      </div>

      <form className="user-form compact-form" onSubmit={handleSaveAttempt}>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px', fontSize: '13px' }}>{error}</div>}

        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="roleId">Role</label>
            <select
              id="roleId"
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Select Role</option>
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.userRole}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {!formData.id && (
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper" style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="form-input"
                required={!formData.id}
                style={{ width: '100%', paddingRight: '40px' }}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
        )}

        <div className="form-group" style={{ marginBottom: '12px' }}>
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter Residence Address"
            className="form-textarea"
            rows="2"
          />
        </div>

        <div className="form-actions compact-actions">
          <button type="button" className="cancel-btn" onClick={handleBack}>
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : formData.id ? 'Update User' : 'Save User'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewUser
