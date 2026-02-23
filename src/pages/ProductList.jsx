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
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import * as productApi from '../api/productApi'
import * as categoryApi from '../api/categoryApi'
import { downloadTablePdf } from '../utils/pdfExport'
import { getCategoryIcon } from '../utils/categoryIcons'
import '../styles/ProductList.css'

const PAGE_SIZE = 5

function ProductList({ onAddNew }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState([])
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

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const isActive = activeTab === 'All' ? undefined : activeTab === 'Active'
      const res = await productApi.getAll({
        page,
        pageSize: PAGE_SIZE,
        categoryId: selectedCategory || undefined,
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
  }, [page, activeTab, selectedCategory, searchQuery])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
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

  const finalPrice = (p) => productApi.calcFinalPrice(p.pricePerUnit, p.discountPercent || 0)

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: 'Product List',
      subtitle: 'Manage your products',
      columns: ['Product Name', 'Bar Code', 'Category', 'Purchase Price', 'Price/Unit', 'Final Price', 'Qty', 'Low Stock', 'Status'],
      rows: products.map((p) => [
        p.productName || '',
        p.barcode || '',
        p.category || '',
        `₹${p.purchasedPrice ?? ''}`,
        `₹${p.pricePerUnit ?? ''}`,
        `₹${finalPrice(p)}`,
        String(p.quantity ?? ''),
        String(p.lowStock ?? ''),
        p.isActive ? 'Active' : 'Inactive'
      ]),
      filename: `Products_${new Date().toISOString().slice(0, 10)}.pdf`
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
          <button className="action-btn excel-btn" title="Export Excel">
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
        <button className={`tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => { setActiveTab('All'); setPage(1) }}>
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
            placeholder="Search by name or barcode"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="category-select-wrap">
          {selectedCategory && (
            <FontAwesomeIcon icon={getCategoryIcon(selectedCategory)} className="category-select-icon" aria-hidden />
          )}
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setPage(1) }}
          >
            <option value="">All Categories</option>
            {categories.filter((c) => c.isActive).map((c) => (
              <option key={c.id} value={c.id}>{c.categoryName}</option>
            ))}
          </select>
        </span>
      </div>

      {error && <div className="product-list-error">{error}</div>}

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Bar Code</th>
              <th>Category</th>
              <th>Purchase Price</th>
              <th>Price Per Unit</th>
              <th>Final Price</th>
              <th>Qty</th>
              <th>Low Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="no-data">Loading...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon">📦</div>
                    <div className="no-data-text">No products found</div>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.productName}</td>
                  <td>{p.barcode}</td>
                  <td>
                    <span className="category-cell-with-icon">
                      <FontAwesomeIcon icon={getCategoryIcon(p.categoryId)} className="category-icon" />
                      {p.category}
                    </span>
                  </td>
                  <td>₹{p.purchasedPrice}</td>
                  <td>₹{p.pricePerUnit}</td>
                  <td>₹{finalPrice(p)}</td>
                  <td>{p.quantity}</td>
                  <td>{p.lowStock}</td>
                  <td>
                    <span className={`status-badge ${p.isActive ? 'status-active' : 'status-inactive'}`}>
                      {p.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="action-icon-btn edit-btn" title="Edit" onClick={() => navigate(`/products/edit/${p.id}`)}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button type="button" className="action-icon-btn delete-btn" title="Delete" disabled={deletingId === p.id} onClick={() => handleDelete(p.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrap">
          <button type="button" className="pagination-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <span className="pagination-info">Page {page} of {totalPages} ({totalElements} items)</span>
          <button type="button" className="pagination-btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}

      <div className="bottom-accent-line"></div>
    </div>
  )
}

export default ProductList
