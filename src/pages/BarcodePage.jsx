import { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faPrint, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import JsBarcode from 'jsbarcode'
import * as productApi from '../api/productApi'
import '../styles/BarcodePage.css'

function BarcodeCanvas({ value, className = '' }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    if (!value || !canvasRef.current) return
    try {
      JsBarcode(canvasRef.current, value, {
        format: 'CODE128',
        displayValue: false,
        margin: 8,
        width: 2,
        height: 48,
        lineColor: '#1e3a5f'
      })
    } catch {
      // invalid barcode, leave canvas empty
    }
  }, [value])
  if (!value) return <span className="barcode-no-value">—</span>
  return <canvas ref={canvasRef} className={className} />
}

function BarcodePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [editBarcodeProduct, setEditBarcodeProduct] = useState(null) // { id, productName, barCode }
  const [editBarcodeValue, setEditBarcodeValue] = useState('')
  const [savingBarcode, setSavingBarcode] = useState(false)
  const [barcodeError, setBarcodeError] = useState('')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await productApi.getAll({ page, pageSize, isActive: true })
      setProducts(res.content || [])
      setTotalPages(res.totalPages || 1)
      setTotalElements(res.totalElements || 0)
    } catch (err) {
      setError(err.message || 'Failed to load products')
      setProducts([])
      setTotalPages(1)
      setTotalElements(0)
    } finally {
      setLoading(false)
    }
  }, [page, pageSize])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [page, totalPages])

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      (p.productName || '').toLowerCase().includes(q) ||
      (p.barCode ? String(p.barCode).toLowerCase() : '').includes(q) ||
      (p.barcode ? String(p.barcode).toLowerCase() : '').includes(q)
    )
  })

  // GS1: 100% = 25.93mm height × 37.29mm width (incl. quiet zones). Generate at ~300dpi equivalent for sharp print.
  const getBarcodeDataUrl = useCallback((barcodeValue) => {
    const canvas = document.createElement('canvas')
    try {
      const moduleWidth = 2.5 // bar width for CODE128
      JsBarcode(canvas, barcodeValue, {
        format: 'CODE128',
        displayValue: false,
        margin: 12,
        width: moduleWidth,
        height: 80,
        lineColor: '#1e3a5f'
      })
      return canvas.toDataURL('image/png')
    } catch {
      return null
    }
  }, [])

  const handlePrintLabel = (product) => {
    const barcodeValue = product.barCode ? String(product.barCode).trim() : ''
    if (!barcodeValue) return
    const barcodeDataUrl = getBarcodeDataUrl(barcodeValue)
    const imgTag = barcodeDataUrl
      ? `<img src="${barcodeDataUrl}" alt="Barcode" class="barcode-print-image" />`
      : ''
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Barcode Label</title>
          <meta name="description" content="GS1-sized barcode label (100%: 25.93mm × 37.29mm)">
          <style>
            * { box-sizing: border-box; }
            body { font-family: Arial, sans-serif; margin: 0; padding: 24px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .barcode-label {
              background: #fff;
              border-radius: 8px;
              padding: 16px 20px;
              text-align: center;
              box-shadow: 0 2px 12px rgba(0,0,0,0.08);
              border: 1px solid #e2e8f0;
            }
            .barcode-label .barcode-wrap { margin-bottom: 10px; }
            .barcode-label .barcode-print-image { display: block; margin: 0 auto; }
            @media print {
              body { padding: 0; background: #fff; }
              .barcode-label {
                box-shadow: none; border: 1px solid #ccc;
                width: 42mm; min-height: 35mm;
                padding: 3mm 4mm;
              }
              .barcode-label .barcode-wrap { margin-bottom: 2mm; }
              .barcode-label .barcode-print-image {
                width: 37.29mm; height: 25.93mm;
                object-fit: contain; object-position: center;
              }
            }
          </style>
        </head>
        <body>
          <div class="barcode-label">
            <div class="barcode-wrap">${imgTag}</div>
          </div>
        </body>
      </html>
    `
    const w = window.open('', '_blank', 'width=420,height=320')
    if (w) {
      w.document.write(printContent)
      w.document.close()
      w.focus()
      setTimeout(() => {
        w.print()
        w.close()
      }, 300)
    } else {
      alert('Please allow pop-ups to print the barcode label.')
    }
  }

  const openEditBarcode = (p) => {
    setEditBarcodeProduct({ id: p.id, productName: p.productName, barCode: p.barCode || '' })
    setEditBarcodeValue(p.barCode ? String(p.barCode).trim() : '')
    setBarcodeError('')
  }

  const closeEditBarcode = () => {
    setEditBarcodeProduct(null)
    setEditBarcodeValue('')
    setBarcodeError('')
  }

  const handleSaveBarcode = async () => {
    if (!editBarcodeProduct) return
    setSavingBarcode(true)
    setBarcodeError('')
    try {
      await productApi.updateBarcodeOnly(editBarcodeProduct.id, editBarcodeValue.trim())
      await fetchProducts()
      closeEditBarcode()
    } catch (err) {
      setBarcodeError(err.message || 'Failed to update barcode')
    } finally {
      setSavingBarcode(false)
    }
  }

  return (
    <div className="barcode-page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Generate Barcode Labels</h1>
          <p className="page-subtitle">Print barcode labels for products</p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="action-btn refresh-btn"
            title="Refresh"
            onClick={() => fetchProducts()}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
        </div>
      </div>

      {error && <div className="barcode-page-error">{error}</div>}

      <div className="barcode-filters-container">
        <div className="search-wrapper">
          <span className="search-icon-wrap" aria-hidden="true">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by product name or barcode"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="barcode-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Barcode Label</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="no-data">Loading...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-text">No products found</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td className="product-name-cell">{p.productName}</td>
                  <td>
                    <div className="barcode-label-preview">
                      <BarcodeCanvas value={p.barCode ? String(p.barCode).trim() : ''} className="barcode-preview-canvas" />
                    </div>
                  </td>
                  <td>
                    <div className="barcode-actions">
                      <button
                        type="button"
                        className="action-icon-btn edit-btn"
                        title="Edit barcode"
                        aria-label="Edit barcode"
                        onClick={() => openEditBarcode(p)}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                      <button
                        type="button"
                        className="action-icon-btn print-btn"
                        title="Print barcode label"
                        aria-label="Print barcode label"
                        onClick={() => handlePrintLabel(p)}
                        disabled={!p.barCode}
                      >
                        <FontAwesomeIcon icon={faPrint} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrap" style={{ marginTop: 16 }}>
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

      {editBarcodeProduct && (
        <div className="barcode-edit-modal-overlay" onClick={closeEditBarcode} role="dialog" aria-modal="true" aria-labelledby="barcode-edit-modal-title">
          <div className="barcode-edit-modal" onClick={(e) => e.stopPropagation()}>
            <h2 id="barcode-edit-modal-title" className="barcode-edit-modal-title">Edit Barcode</h2>
            <p className="barcode-edit-modal-product">{editBarcodeProduct.productName}</p>
            <div className="barcode-edit-modal-field">
              <label htmlFor="barcode-edit-input">Barcode</label>
              <input
                id="barcode-edit-input"
                type="text"
                value={editBarcodeValue}
                onChange={(e) => setEditBarcodeValue(e.target.value)}
                placeholder="Enter barcode"
                className="barcode-edit-modal-input"
                autoFocus
              />
            </div>
            {barcodeError && <p className="barcode-edit-modal-error" role="alert">{barcodeError}</p>}
            <div className="barcode-edit-modal-actions">
              <button type="button" className="barcode-edit-modal-cancel" onClick={closeEditBarcode}>Cancel</button>
              <button type="button" className="barcode-edit-modal-save" onClick={handleSaveBarcode} disabled={savingBarcode}>
                {savingBarcode ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-accent-line" />
    </div>
  )
}

export default BarcodePage
