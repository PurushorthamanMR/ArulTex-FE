import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faPrint, faSearch } from '@fortawesome/free-solid-svg-icons'
import JsBarcode from 'jsbarcode'
import Swal from 'sweetalert2'
import * as productApi from '../../api/productApi'
import '../../styles/BarcodePage.css'

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
        lineColor: '#000000'
      })
    } catch {
      // invalid barcode, leave canvas empty
    }
  }, [value])

  if (!value) return <span className="barcode-no-value">—</span>
  return <canvas ref={canvasRef} className={className} />
}

function PosBarcodePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)

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

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return (
        (p.productName || '').toLowerCase().includes(q) ||
        (p.barCode ? String(p.barCode).toLowerCase().includes(q) : false) ||
        (p.barcode ? String(p.barcode).toLowerCase().includes(q) : false)
      )
    })
  }, [products, searchQuery])

  const getBarcodeDataUrl = useCallback((barcodeValue) => {
    const canvas = document.createElement('canvas')
    try {
      JsBarcode(canvas, barcodeValue, {
        format: 'CODE128',
        displayValue: false,
        margin: 0,
        // Use a slightly larger barcode so it fills the label area after scaling.
        width: 3,
        height: 70,
        lineColor: '#000000'
      })
      return canvas.toDataURL('image/png')
    } catch {
      return null
    }
  }, [])

  const handlePrintLabel = (product) => {
    const barcodeValue = product.barCode
      ? String(product.barCode).trim()
      : (product.barcode ? String(product.barcode).trim() : '')
    if (!barcodeValue) return
    const productNameUpper = (product.productName ? String(product.productName) : '').trim().toUpperCase()

    const barcodeDataUrl = getBarcodeDataUrl(barcodeValue)
    const imgTag = barcodeDataUrl
      ? `<img src="${barcodeDataUrl}" alt="Barcode" class="barcode-print-image" />`
      : ''

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Barcode Label</title>
          <style>
            * { box-sizing: border-box; }
            /* Print ONLY a single label (match the screenshot) */
            @page { size: 30mm 20mm; margin: 0; }
            html, body {
              margin: 0;
              padding: 0;
              width: 30mm;
              height: 20mm;
              font-family: Inter, Arial, sans-serif;
              background: #fff;
              overflow: hidden;
            }
            body {
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
            }
            .barcode-label {
              width: 30mm;
              height: 20mm;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              padding-top: 1mm;
            }
            .barcode-name {
              width: 100%;
              text-align: center;
              font-size: 8px;
              font-weight: 900;
              letter-spacing: 0.6px;
              color: #000000;
              line-height: 1.0;
              margin-bottom: 0.5mm;
              padding: 0 1mm;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .barcode-wrap {
              width: 30mm;
              height: 10mm;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .barcode-wrap img { width: 100%; height: 100%; display: block; object-fit: fill; }
            .barcode-number {
              font-size: 8px;
              color: #000000;
              text-align: center;
              width: 100%;
              line-height: 1.0;
              margin-top: 0.6mm;
              font-weight: 800;
              padding: 0 2px;
              font-family: 'Courier New', monospace;
              letter-spacing: 0.9px;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="barcode-label">
            <div class="barcode-name">${productNameUpper}</div>
            <div class="barcode-wrap">
              ${imgTag}
            </div>
            <div class="barcode-number">${barcodeValue}</div>
          </div>
        </body>
      </html>
    `

    // Make the print window match the label size (reduces unwanted whitespace/centering).
    const w = window.open('', '_blank', 'width=120,height=90')
    if (w) {
      w.document.write(printContent)
      w.document.close()
      w.focus()
      setTimeout(() => {
        w.print()
        w.close()
      }, 900)
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Pop-up blocked',
        text: 'Please allow pop-ups to print the barcode label.'
      })
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
            onClick={fetchProducts}
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
                      <div className="barcode-label-name">{(p.productName ? String(p.productName) : '').trim().toUpperCase()}</div>
                      <BarcodeCanvas
                        value={p.barCode ? String(p.barCode).trim() : (p.barcode ? String(p.barcode).trim() : '')}
                        className="barcode-preview-canvas"
                      />
                      <div className="barcode-preview-value">
                        {p.barCode ? String(p.barCode).trim() : (p.barcode ? String(p.barcode).trim() : '')}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="barcode-actions">
                      <button
                        type="button"
                        className="action-icon-btn print-btn"
                        title="Print barcode label"
                        aria-label="Print barcode label"
                        onClick={() => handlePrintLabel(p)}
                        disabled={!p.barCode && !p.barcode}
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
          <button
            type="button"
            className="pagination-btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
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
          <span className="pagination-info">
            Page {page} of {totalPages} ({totalElements} items)
          </span>
          <button
            type="button"
            className="pagination-btn"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default PosBarcodePage

