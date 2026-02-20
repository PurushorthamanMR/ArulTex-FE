import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/NewSupplier.css'

function NewSupplier() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    supplierName: '',
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
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
    console.log('Saving supplier:', formData)
    navigate('/suppliers')
  }

  return (
    <div className="new-supplier-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">New Supplier</h1>
          <p className="page-subtitle">Create new supplier</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/suppliers')}>
          ← Back to Supplier
        </button>
      </div>

      <form className="supplier-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="supplierName">Supplier Name</label>
          <input
            type="text"
            id="supplierName"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleInputChange}
            placeholder="Enter Supplier Name"
            className="form-input"
            required
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
            placeholder="Enter Email"
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
          <label htmlFor="whatsappNumber">WhatsApp Number</label>
          <input
            type="tel"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp Number"
            className="form-input"
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
          <button type="button" className="cancel-btn" onClick={() => navigate('/suppliers')}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Supplier
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewSupplier
