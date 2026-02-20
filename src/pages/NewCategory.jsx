import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/NewCategory.css'

function NewCategory() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    categoryName: '',
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
    console.log('Saving category:', formData)
    navigate('/category')
  }

  return (
    <div className="new-category-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">New Category</h1>
          <p className="page-subtitle">Create new category</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/category')}>
          ← Back to Category
        </button>
      </div>

      <form className="category-form" onSubmit={handleSave}>
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
          <button type="button" className="cancel-btn" onClick={() => navigate('/category')}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Category
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCategory
