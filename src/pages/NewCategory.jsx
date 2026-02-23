import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHexagon } from '@fortawesome/free-solid-svg-icons'
import * as categoryApi from '../api/categoryApi'
import {
  getIconByKey,
  getGroupForCategory,
  getStoredIconKey,
  setStoredIconKey,
  CATEGORY_ICON_OPTIONS
} from '../utils/categoryIcons'
import '../styles/NewCategory.css'

function NewCategory() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    categoryName: '',
    isActive: true
  })
  const [selectedIconKey, setSelectedIconKey] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [saveError, setSaveError] = useState(null)

  useEffect(() => {
    if (isEdit && id) {
      const stored = getStoredIconKey(id)
      const validKey = (stored >= 1 && stored <= 36) ? stored : null
      setSelectedIconKey(validKey ?? getGroupForCategory(id) ?? 1)
    } else {
      setSelectedIconKey(1)
    }
  }, [isEdit, id])

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    setLoadError(null)
    categoryApi
      .getById(id)
      .then((cat) => {
        if (!cancelled) {
          setFormData({
            categoryName: cat.categoryName || '',
            isActive: cat.isActive !== false
          })
          const stored = getStoredIconKey(cat.id)
          const validKey = (stored >= 1 && stored <= 36) ? stored : null
          setSelectedIconKey(validKey ?? getGroupForCategory(cat.id) ?? 1)
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || 'Failed to load category')
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
        await categoryApi.update(id, {
          categoryName: formData.categoryName,
          isActive: formData.isActive
        })
        setStoredIconKey(id, selectedIconKey)
      } else {
        const saved = await categoryApi.save({
          categoryName: formData.categoryName,
          isActive: formData.isActive
        })
        if (saved && saved.id != null) {
          setStoredIconKey(saved.id, selectedIconKey)
        }
      }
      navigate('/category')
    } catch (err) {
      setSaveError(err.message || 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="new-category-container">
      <div className="page-header">
        <div className="page-header-content">
          <FontAwesomeIcon icon={faHexagon} className="new-category-header-icon" aria-hidden />
          <div>
            <h1 className="page-title">{isEdit ? 'Edit Category' : 'New Category'}</h1>
            <p className="page-subtitle">{isEdit ? 'Update category' : 'Create new category'}</p>
          </div>
        </div>
        <button className="back-btn" type="button" onClick={() => navigate('/category')}>
          ← Back to Category
        </button>
      </div>

      {loadError && (
        <div className="category-form-error" role="alert">
          {loadError}
        </div>
      )}

      <form className="category-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <div className="category-name-input-wrap">
            <FontAwesomeIcon icon={getIconByKey(selectedIconKey)} className="category-form-icon" aria-hidden />
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
        </div>

        <div className="form-group">
          <label>Icon</label>
          <div className="icon-picker-grid" role="group" aria-label="Select category icon">
            {CATEGORY_ICON_OPTIONS.map(({ iconKey, icon, label }) => (
              <button
                key={iconKey}
                type="button"
                className={`icon-picker-btn ${selectedIconKey === iconKey ? 'selected' : ''}`}
                onClick={() => setSelectedIconKey(iconKey)}
                title={label}
                aria-pressed={selectedIconKey === iconKey}
              >
                <FontAwesomeIcon icon={icon} />
              </button>
            ))}
          </div>
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
          <div className="category-form-error" role="alert">
            {saveError}
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/category')}>
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Category' : 'Save Category'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCategory
