import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/NewDiscount.css'

function NewDiscount() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    percentage: '',
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
    console.log('Saving discount:', formData)
    navigate('/discount')
  }

  return (
    <div className="new-discount-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">New Discount</h1>
          <p className="page-subtitle">Create new discount</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/discount')}>
          ← Back to Discount
        </button>
      </div>

      <form className="discount-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="percentage">Discount Percentage</label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            value={formData.percentage}
            onChange={handleInputChange}
            placeholder="Enter Discount Percentage"
            className="form-input"
            step="0.01"
            min="0"
            max="100"
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
          <button type="button" className="cancel-btn" onClick={() => navigate('/discount')}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Discount
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewDiscount
