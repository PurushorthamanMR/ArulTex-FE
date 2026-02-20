import { useState } from 'react'
import '../styles/Modal.css'

function DiscountModal({ isOpen, onClose, onSave }) {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    setFormData({ percentage: '', status: 'Active' })
    onClose()
  }

  const handleCancel = () => {
    setFormData({ percentage: '', status: 'Active' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
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
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Discount
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DiscountModal
