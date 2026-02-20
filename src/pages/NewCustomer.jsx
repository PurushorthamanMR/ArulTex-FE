import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/NewCustomer.css'

function NewCustomer() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    status: 'Active'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    console.log('Saving customer:', formData)
    navigate('/customers')
  }

  return (
    <div className="new-customer-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">New Customer</h1>
          <p className="page-subtitle">Create new customer</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/customers')}>
          ← Back to Customer
        </button>
      </div>

      <form className="customer-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            placeholder="Enter Customer Name"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter Mobile Number"
            className="form-input"
            required
          />
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

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/customers')}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Customer
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCustomer
