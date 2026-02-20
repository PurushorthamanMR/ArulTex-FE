import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/NewTax.css'

function NewTax() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    taxPercentage: '',
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
    console.log('Saving tax:', formData)
    navigate('/tax')
  }

  return (
    <div className="new-tax-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">New Tax</h1>
          <p className="page-subtitle">Create new tax</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/tax')}>
          ← Back to Tax
        </button>
      </div>

      <form className="tax-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="taxPercentage">Tax Percentage</label>
          <input
            type="number"
            id="taxPercentage"
            name="taxPercentage"
            value={formData.taxPercentage}
            onChange={handleInputChange}
            placeholder="Enter Tax Percentage"
            className="form-input"
            step="0.01"
            min="0"
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
          <button type="button" className="cancel-btn" onClick={() => navigate('/tax')}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Tax
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewTax
