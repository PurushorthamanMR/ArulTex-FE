import { useState } from 'react'
import * as categoryApi from '../api/categoryApi'
import '../styles/Modal.css'

function CategoryModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    categoryName: '',
    status: 'Active'
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const saved = await categoryApi.save({
        categoryName: formData.categoryName.trim(),
        isActive: formData.status === 'Active'
      })
      onSave(saved)
      setFormData({ categoryName: '', status: 'Active' })
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to save category')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({ categoryName: '', status: 'Active' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {error && <div className="modal-error">{error}</div>}
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              placeholder="Enter Category Name"
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
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryModal
