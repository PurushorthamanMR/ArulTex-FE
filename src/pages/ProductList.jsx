import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
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
  faBox,
  faUndo
} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import * as productApi from '../api/productApi'
import * as categoryApi from '../api/categoryApi'
import * as supplierApi from '../api/supplierApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { downloadTableExcel } from '../utils/excelExport'
import { getCategoryIcon } from '../utils/categoryIcons'
import '../styles/ProductList.css'

const PAGE_SIZE = 10

function ProductList({ onAddNew }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [deletingId, setDeletingId] = useState(null)

  const fetchCategories = useCallback(async () => {
    try {
      const list = await categoryApi.getAll()
      setCategories(Array.isArray(list) ? list : [])
    } catch {
      setCategories([])
    }
  }, [])

  const fetchSuppliers = useCallback(async () => {
    try {
      const list = await supplierApi.getAll({ isActive: true })
      setSuppliers(Array.isArray(list) ? list : [])
    } catch {
      setSuppliers([])
    }
  }, [])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const isActive = activeTab === 'All' ? undefined : activeTab === 'Active'
      const res = await productApi.getAll({
        page,
        pageSize: PAGE_SIZE,
        categoryId: selectedCategory || undefined,
        supplierId: selectedSupplier || undefined,
        search: searchQuery.trim() || undefined,
        isActive
      })
      setProducts(res.content || [])
      setTotalPages(res.totalPages || 1)
      setTotalElements(res.totalElements || 0)
    } catch (err) {
      setError(err.message || 'Failed to load products')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [page, activeTab, selectedCategory, selectedSupplier, searchQuery])

  useEffect(() => {
    fetchCategories()
    fetchSuppliers()
  }, [fetchCategories, fetchSuppliers])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete this product?',
      text: 'This will move the product to Inactive. You can restore it later.',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#b91c1c',
      cancelButtonColor: '#6b7280'
    })
    if (!result.isConfirmed) return
    setDeletingId(id)
    try {
      await productApi.deleteProduct(id)
      await fetchProducts()
    } catch (err) {
      setError(err.message || 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  const handleReactivate = async (id) => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Restore this product?',
      text: 'This will move the product back to Active.',
      showCancelButton: true,
      confirmButtonText: 'Yes, restore',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#0d9488',
      cancelButtonColor: '#6b7280'
    })
    if (!result.isConfirmed) return

    setDeletingId(id)
    try {
      await productApi.setActive(id, true)
      await fetchProducts()
    } catch (err) {
      setError(err.message || 'Redo failed')
    } finally {
      setDeletingId(null)
    }
  }

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Product List',
      subtitle: 'Manage your products',
      columns: ['Product Name', 'Bar Code', 'Category', 'Supplier', 'Cost Price', 'Selling Price'],
      rows: products.map((p) => [
        p.productName || '',
        p.barcode || '',
        p.category || '',
        p.supplier?.supplierName || 'NoSupplier',
        `LKR ${p.purchasedPrice ?? ''}`,
        `LKR ${p.pricePerUnit ?? ''}`
      ]),
      filename: `Products_${new Date().toISOString().slice(0, 10)}.pdf`
    })
  }

  const handleDownloadExcel = () => {
    downloadTableExcel({
      title: 'Products',
      columns: ['Product Name', 'Bar Code', 'Category', 'Supplier', 'Cost Price', 'Selling Price'],
      rows: products.map((p) => [
        p.productName || '',
        p.barcode || '',
        p.category || '',
        p.supplier?.supplierName || 'NoSupplier',
        p.purchasedPrice ?? '',
        p.pricePerUnit ?? ''
      ]),
      filename: `Products_${new Date().toISOString().slice(0, 10)}.xlsx`
    })
  }

  return (
    <div className="product-list-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Product List</h1>
          <p className="page-subtitle">Manage your products</p>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn pdf-btn" title="Export PDF" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button type="button" className="action-btn excel-btn" title="Export Excel" onClick={handleDownloadExcel}>
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
          <button className="action-btn refresh-btn" title="Refresh" onClick={() => fetchProducts()} disabled={loading}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="action-btn upload-btn" title="Upload">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button className="action-btn add-btn" onClick={() => onAddNew && onAddNew()}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="tabs-container">
        <button className={`tab ${activeTab === 'Active' ? 'active' : ''}`} onClick={() => { setActiveTab('Active'); setPage(1) }}>
          Active
        </button>
        <button className={`tab ${activeTab === 'Inactive' ? 'active' : ''}`} onClick={() => { setActiveTab('Inactive'); setPage(1) }}>
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
            placeholder="Search by name or barcode"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
          />
        </div>
        <div className="dropdown-filters">
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setPage(1)
            }}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.categoryName}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={selectedSupplier}
            onChange={(e) => {
              setSelectedSupplier(e.target.value)
              setPage(1)
            }}
          >
            <option value="">All Suppliers</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.supplierName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="product-list-error">{error}</div>}

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Bar Code</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="no-data">Loading...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon"><FontAwesomeIcon icon={faBox} /></div>
                    <div className="no-data-text">No products found</div>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const isInactiveTab = activeTab === 'Inactive'
                return (
                  <tr key={p.id}>
                    <td>{p.productName}</td>
                    <td>{p.barcode}</td>
                    <td>
                      <span className="category-cell-with-icon">
                        <FontAwesomeIcon icon={getCategoryIcon(p.categoryId)} className="category-icon" />
                        {p.category}
                      </span>
                    </td>
                    <td>{p.supplier?.supplierName || 'NoSupplier'}</td>
                    <td>LKR {p.purchasedPrice}</td>
                    <td>LKR {p.pricePerUnit}</td>
                    <td>
                      <div className="product-list-actions">
                        <button type="button" className="action-icon-btn edit-btn" title="Edit" onClick={() => navigate(`/products/edit/${p.id}`)}>
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        {isInactiveTab ? (
                          <button
                            type="button"
                            className="action-icon-btn delete-btn"
                            title="Redo (make active)"
                            disabled={deletingId === p.id}
                            onClick={() => handleReactivate(p.id)}
                          >
                            <FontAwesomeIcon icon={faUndo} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="action-icon-btn delete-btn"
                            title="Delete"
                            disabled={deletingId === p.id}
                            onClick={() => handleDelete(p.id)}
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
          <button type="button" className="pagination-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <div className="pagination-numbers" role="navigation" aria-label="Pagination">
            {(() => {
              const visibleCount = 5
              const start = Math.max(1, Math.min(page - 2, totalPages - visibleCount + 1))
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
                    className={`pagination-btn ${p === page ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                    aria-current={p === page ? 'page' : undefined}
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
          <span className="pagination-info">Page {page} of {totalPages} ({totalElements} items)</span>
          <button type="button" className="pagination-btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default ProductList
