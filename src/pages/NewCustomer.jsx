import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import * as customerApi from '../api/customerApi'
import '../styles/NewCustomer.css'

function NewCustomer() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    isActive: true
  })
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [saveError, setSaveError] = useState(null)

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    setLoadError(null)
    customerApi
      .getById(id)
      .then((c) => {
        if (!cancelled) {
          setFormData({
            customerName: c.customerName || '',
            phone: c.phone || '',
            email: c.email || '',
            address: c.address || '',
            isActive: c.isActive !== false
          })
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || 'Failed to load customer')
      })
    return () => { cancelled = true }
  }, [id, isEdit])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'isActive') {
      setFormData((prev) => ({ ...prev, isActive: value === 'true' }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaveError(null)
    setLoading(true)
    try {
      if (isEdit) {
        await customerApi.update(id, {
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          isActive: formData.isActive
        })
      } else {
        await customerApi.save({
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          isActive: formData.isActive
        })
      }
      navigate('/customer')
    } catch (err) {
      setSaveError(err.message || 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="new-customer-container">
      <div className="page-header">
        <div className="page-header-content">
          <FontAwesomeIcon icon={faUser} className="new-customer-header-icon" aria-hidden />
          <div>
            <h1 className="page-title">{isEdit ? 'Edit Customer' : 'New Customer'}</h1>
            <p className="page-subtitle">{isEdit ? 'Update customer' : 'Create new customer'}</p>
          </div>
        </div>
        <button className="back-btn" type="button" onClick={() => navigate('/customer')}>
          ← Back to Customer
        </button>
      </div>

      {loadError && (
        <div className="customer-form-error" role="alert">
          {loadError}
        </div>
      )}

      <form className="customer-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            placeholder="Enter customer name"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email address"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="form-input form-textarea"
            rows={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isActive">Status</label>
          <select
            id="isActive"
            name="isActive"
            value={formData.isActive === true ? 'true' : 'false'}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {saveError && (
          <div className="customer-form-error" role="alert">
            {saveError}
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/customer')}>
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Customer' : 'Save Customer'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCustomer
