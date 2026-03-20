import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import * as customerApi from '../../api/customerApi'
import { getPhoneValidationError } from '../../utils/phoneValidation'
import '../../styles/PosCustomer.css'

function PosCustomerNew() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    isActive: true
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (loading) return

    const name = (formData.customerName || '').trim()
    if (!name) {
      setError('Customer name is required.')
      return
    }

    const phoneTrimmed = (formData.phone || '').trim()
    if (phoneTrimmed) {
      const phoneError = getPhoneValidationError(phoneTrimmed)
      if (phoneError) {
        setError(phoneError)
        return
      }
    }

    setLoading(true)
    setError('')
    try {
      const saved = await customerApi.save({
        customerName: name,
        phone: phoneTrimmed || null,
        email: (formData.email || '').trim() || null,
        address: (formData.address || '').trim() || null,
        isActive: formData.isActive
      })
      await Swal.fire({ icon: 'success', title: 'Customer created', timer: 1200, showConfirmButton: false })
      if (saved?.id != null) {
        navigate(`/pos/customer/edit/${saved.id}`)
      } else {
        navigate('/pos/customer')
      }
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pos-customer-container">
      <div className="pos-customer-page-header">
        <div className="pos-customer-header-left">
          <FontAwesomeIcon icon={faUser} className="pos-customer-header-icon" aria-hidden />
          <div>
            <h1 className="pos-customer-title">New Customer</h1>
            <p className="pos-customer-subtitle">Create customer for POS</p>
          </div>
        </div>
        <button type="button" className="pos-customer-back-btn" onClick={() => navigate('/pos/customer')}>
          ← Back
        </button>
      </div>

      <form className="pos-customer-form" onSubmit={handleSave}>
        {error && <div className="pos-customer-error">{error}</div>}

        <div className="pos-customer-form-grid">
          <div className="pos-customer-field">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
              className="pos-customer-input"
              autoComplete="off"
            />
          </div>

          <div className="pos-customer-field">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="pos-customer-input"
              placeholder="Enter phone number"
              autoComplete="off"
            />
          </div>

          <div className="pos-customer-field">
            <label htmlFor="email">Email (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="pos-customer-input"
              placeholder="Enter email"
              autoComplete="off"
            />
          </div>

          <div className="pos-customer-field pos-customer-field-full">
            <label htmlFor="address">Address (optional)</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="pos-customer-textarea"
              rows={3}
              placeholder="Enter address"
            />
          </div>
        </div>

        <div className="pos-customer-form-actions">
          <button type="button" className="pos-customer-cancel-btn" onClick={() => navigate('/pos/customer')} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="pos-customer-save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PosCustomerNew

