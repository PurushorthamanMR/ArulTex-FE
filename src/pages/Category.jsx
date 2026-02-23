import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHexagon,
  faFilePdf,
  faFileExcel,
  faSyncAlt,
  faArrowUp,
  faPlus,
  faSearch,
  faSortUp,
  faSortDown,
  faPen,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import * as categoryApi from '../api/categoryApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { getCategoryIcon } from '../utils/categoryIcons'
import '../styles/Category.css'

function Category() {
  const navigate = useNavigate()
  const [activeStatus, setActiveStatus] = useState('Active') // 'Active' | 'Inactive' | 'All'
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = searchQuery.trim()
        ? await categoryApi.search(searchQuery.trim())
        : await categoryApi.getAll()
      setCategories(Array.isArray(list) ? list : [])
    } catch (err) {
      setError(err.message || 'Failed to load categories')
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [searchQuery])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleRefresh = () => {
    fetchCategories()
  }

  const filteredCategories = categories.filter((cat) => {
    if (activeStatus === 'All') return true
    if (activeStatus === 'Active') return cat.isActive === true
    return cat.isActive === false
  })

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Category',
      subtitle: 'Manage your categories',
      columns: ['Category', 'Status'],
      rows: filteredCategories.map((c) => [c.categoryName || '', c.isActive ? 'Active' : 'Inactive']),
      filename: `Category_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return
    setDeletingId(id)
    try {
      await categoryApi.deleteCategory(id)
      await fetchCategories()
    } catch (err) {
      setError(err.message || 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="category-container">
      <div className="page-header">
        <div className="page-header-content">
          <FontAwesomeIcon icon={faHexagon} className="page-header-icon" aria-hidden />
          <div>
            <h1 className="page-title">Category</h1>
            <p className="page-subtitle">Manage your categories</p>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button className="action-btn excel-btn" title="Export Excel">
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
          <button className="action-btn refresh-btn" title="Refresh" onClick={handleRefresh} disabled={loading}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="action-btn upload-btn" title="Upload">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            className="action-btn add-btn"
            onClick={() => navigate('/category/new')}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="status-toggles">
        <button
          className={`status-toggle ${activeStatus === 'Active' ? 'active' : ''}`}
          onClick={() => setActiveStatus('Active')}
        >
          Active
        </button>
        <button
          className={`status-toggle ${activeStatus === 'Inactive' ? 'active' : ''}`}
          onClick={() => setActiveStatus('Inactive')}
        >
          Inactive
        </button>
        <button
          className={`status-toggle ${activeStatus === 'All' ? 'active' : ''}`}
          onClick={() => setActiveStatus('All')}
        >
          All
        </button>
      </div>

      <div className="filters-container">
        <div className="search-wrapper">
          <span className="search-icon-wrap" aria-hidden="true">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by category name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="category-filter-select"
          value={activeStatus}
          onChange={(e) => setActiveStatus(e.target.value)}
        >
          <option value="Active">Active only</option>
          <option value="Inactive">Inactive only</option>
          <option value="All">Show all categories</option>
        </select>
      </div>

      {error && (
        <div className="category-error" role="alert">
          {error}
        </div>
      )}

      <div className="table-container">
        <table className="category-table">
          <thead>
            <tr>
              <th>
                Category
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>
                Status
                <span className="sort-icons">
                  <FontAwesomeIcon icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="no-data">
                  <div className="no-data-content">Loading...</div>
                </td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon">📦</div>
                    <div className="no-data-text">No categories found</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredCategories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <span className="category-cell-with-icon">
                      <FontAwesomeIcon icon={getCategoryIcon(cat.id)} className="category-icon" />
                      {cat.categoryName}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${cat.isActive ? 'status-active' : 'status-inactive'}`}>
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="action-icon-btn edit-btn"
                        title="Edit"
                        onClick={() => navigate(`/category/edit/${cat.id}`)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        type="button"
                        className="action-icon-btn delete-btn"
                        title="Delete"
                        disabled={deletingId === cat.id}
                        onClick={() => handleDelete(cat.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default Category
