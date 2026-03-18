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
  faTrash,
  faBox
} from '@fortawesome/free-solid-svg-icons'
import * as categoryApi from '../api/categoryApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { downloadTableExcel } from '../utils/excelExport'
import { getCategoryIcon } from '../utils/categoryIcons'
import '../styles/Category.css'
import Swal from 'sweetalert2'

function Category() {
  const navigate = useNavigate()
  const [activeStatus, setActiveStatus] = useState('Active') // 'Active' | 'Inactive' | 'All'
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const isActive = activeStatus === 'Active'
      const list = await categoryApi.search({
        categoryName: searchQuery.trim() || undefined,
        isActive
      })
      setCategories(Array.isArray(list) ? list : [])
      setPage(1)
    } catch (err) {
      setError(err.message || 'Failed to load categories')
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [searchQuery, activeStatus])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleRefresh = () => {
    fetchCategories()
  }

  // Backend already filters by active/inactive; we paginate on frontend.
  const filteredCategories = categories
  const totalElements = filteredCategories.length
  const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const visibleCategories = filteredCategories.slice(startIndex, startIndex + PAGE_SIZE)

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Category',
      subtitle: 'Manage your categories',
      columns: ['Category'],
      rows: filteredCategories.map((c) => [c.categoryName || '']),
      filename: `Category_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDownloadExcel = () => {
    downloadTableExcel({
      title: 'Categories',
      columns: ['Category'],
      rows: filteredCategories.map((c) => [c.categoryName || '']),
      filename: `Categories_${new Date().toISOString().slice(0, 10)}.xlsx`
    })
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete this category?',
      text: 'This will move the category to Inactive. You can restore it later.',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#b91c1c',
      cancelButtonColor: '#6b7280'
    })
    if (!result.isConfirmed) return
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

  const handleReactivate = async (id) => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Restore this category?',
      text: 'This will move the category back to Active.',
      showCancelButton: true,
      confirmButtonText: 'Yes, restore',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#0d9488',
      cancelButtonColor: '#6b7280'
    })
    if (!result.isConfirmed) return
    setDeletingId(id)
    try {
      await categoryApi.setActive(id, true)
      await fetchCategories()
    } catch (err) {
      setError(err.message || 'Redo failed')
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
          <button type="button" className="action-btn excel-btn" title="Export Excel" onClick={handleDownloadExcel}>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" className="no-data">
                  <div className="no-data-content">Loading...</div>
                </td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="2" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon"><FontAwesomeIcon icon={faBox} /></div>
                    <div className="no-data-text">No categories found</div>
                  </div>
                </td>
              </tr>
            ) : (
              visibleCategories.map((cat) => {
                const isInactive = activeStatus === 'Inactive'
                return (
                  <tr key={cat.id}>
                    <td>
                      <span className="category-cell-with-icon">
                        <FontAwesomeIcon icon={getCategoryIcon(cat.id)} className="category-icon" />
                        {cat.categoryName}
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
                        {isInactive ? (
                          <button
                            type="button"
                            className="action-icon-btn delete-btn"
                            title="Redo (make active)"
                            disabled={deletingId === cat.id}
                            onClick={() => handleReactivate(cat.id)}
                          >
                            <FontAwesomeIcon icon={faPlus} style={{ transform: 'rotate(45deg)' }} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="action-icon-btn delete-btn"
                            title="Delete"
                            disabled={deletingId === cat.id}
                            onClick={() => handleDelete(cat.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrap">
          <button
            type="button"
            className="pagination-btn"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <div className="pagination-numbers" role="navigation" aria-label="Pagination">
            {(() => {
              const visibleCount = 5
              const start = Math.max(1, Math.min(safePage - 2, totalPages - visibleCount + 1))
              const end = Math.min(totalPages, start + visibleCount - 1)
              const items = []

              if (start > 1) {
                items.push(
                  <span key="start-ellipsis" className="pagination-ellipsis" aria-hidden>
                    ...
                  </span>
                )
              }

              for (let p = start; p <= end; p++) {
                items.push(
                  <button
                    key={p}
                    type="button"
                    className={`pagination-btn ${p === safePage ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                    aria-current={p === safePage ? 'page' : undefined}
                  >
                    {p}
                  </button>
                )
              }

              if (end < totalPages) {
                items.push(
                  <span key="end-ellipsis" className="pagination-ellipsis" aria-hidden>
                    ...
                  </span>
                )
              }

              return items
            })()}
          </div>
          <span className="pagination-info">Page {safePage} of {totalPages} ({totalElements} items)</span>
          <button
            type="button"
            className="pagination-btn"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default Category
