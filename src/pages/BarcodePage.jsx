import { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faPrint, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import JsBarcode from 'jsbarcode'
import { renderToStaticMarkup } from 'react-dom/server'
import * as productApi from '../api/productApi'
import Swal from 'sweetalert2'
import '../styles/BarcodePage.css'

// Retail label size: 3cm x 2cm
const LABEL_WIDTH_MM = 30
const LABEL_HEIGHT_MM = 20
const DEFAULT_GRID_COLS = 3
const DEFAULT_GRID_ROWS = 2

function barcodeValueToDataUrl(barcodeValue) {
  if (typeof document === 'undefined') return null
  if (!barcodeValue) return null
  try {
    const canvas = document.createElement('canvas')
    // CODE128 barcodes need enough height for Zebra GT800 scanning.
    // We generate a crisp bitmap, then let CSS scale it into the exact mm slot size.
    JsBarcode(canvas, String(barcodeValue), {
      format: 'CODE128',
      displayValue: false,
      margin: 0,
      width: 2,
      height: 110,
      lineColor: '#000000',
    })
    return canvas.toDataURL('image/png')
  } catch {
    return null
  }
}

function BarcodeLabelPrintSheet({ productNameUpper, barcodeValue, columns, rows, labelsCount }) {
  const safeColumns = Math.max(1, Math.floor(Number(columns || DEFAULT_GRID_COLS)))
  const safeRows = Math.max(1, Math.floor(Number(rows || DEFAULT_GRID_ROWS)))
  const totalSlots = safeColumns * safeRows
  const safeLabelsCount = Math.max(0, Math.min(Math.floor(Number(labelsCount || 0)), totalSlots))

  const dataUrl = barcodeValueToDataUrl(barcodeValue)

  return (
    <div className="barcode-print-root">
      <style>{`
        * { box-sizing: border-box; }
        @page { size: ${safeColumns * LABEL_WIDTH_MM}mm ${safeRows * LABEL_HEIGHT_MM}mm; margin: 0; }
        html, body {
          margin: 0;
          padding: 0;
          width: ${safeColumns * LABEL_WIDTH_MM}mm;
          height: ${safeRows * LABEL_HEIGHT_MM}mm;
          background: #ffffff;
        }

        /* Ensure browser/printer doesn't introduce offsets */
        @media print {
          html, body { margin: 0 !important; padding: 0 !important; }
          body {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
        }

        .barcode-print-root {
          width: ${safeColumns * LABEL_WIDTH_MM}mm;
          height: ${safeRows * LABEL_HEIGHT_MM}mm;
          margin: 0;
          padding: 0;
        }

        .barcode-label-grid {
          width: 100%;
          height: 100%;
          display: grid;
          grid-auto-flow: row; /* Ensure left-to-right, then top-to-bottom placement */
          grid-template-columns: repeat(${safeColumns}, ${LABEL_WIDTH_MM}mm);
          grid-template-rows: repeat(${safeRows}, ${LABEL_HEIGHT_MM}mm);
          align-content: start;
          justify-content: start;
        }

        .barcode-slot {
          width: ${LABEL_WIDTH_MM}mm;
          height: ${LABEL_HEIGHT_MM}mm;
          overflow: hidden;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 0;
          margin: 0;
        }

        .barcode-name {
          width: 100%;
          text-align: center;
          font-weight: 900;
          letter-spacing: 0.6px;
          font-size: 8px;
          color: #000000;
          line-height: 1.0;
          margin-bottom: 0.5mm;
          padding: 0 1mm;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .barcode-wrap {
          width: 100%;
          height: 11mm;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .barcode-slot-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: fill;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        .barcode-number {
          width: 100%;
          text-align: center;
          font-weight: 800;
          font-size: 8px;
          color: #000000;
          letter-spacing: 1px;
          font-family: 'Courier New', monospace;
          line-height: 1.0;
          margin-top: 0.6mm;
          padding: 0 2px;
          word-break: break-all;
        }
      `}</style>

      <div className="barcode-label-grid">
        {Array.from({ length: totalSlots }, (_, slotIndex) => {
          const shouldRender = slotIndex < safeLabelsCount && dataUrl
          return (
            <div className="barcode-slot" key={slotIndex}>
              {shouldRender ? (
                <>
                  <div className="barcode-name">{productNameUpper}</div>
                  <div className="barcode-wrap">
                    <img src={dataUrl} alt="Barcode" className="barcode-slot-image" />
                  </div>
                  <div className="barcode-number">{barcodeValue}</div>
                </>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

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

  // Label print layouts (sheet/grid)
  const [labelsNumber, setLabelsNumber] = useState(6)
  const [layoutColumns, setLayoutColumns] = useState(DEFAULT_GRID_COLS)
  const [layoutRows, setLayoutRows] = useState(DEFAULT_GRID_ROWS)

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

  const handlePrintLabel = (product) => {
    const barcodeValue = product.barCode
      ? String(product.barCode).trim()
      : (product.barcode ? String(product.barcode).trim() : '')
    if (!barcodeValue) return

    const productNameUpper = (product.productName ? String(product.productName) : '').trim().toUpperCase()

    const doPrintSheet = ({ nextLabelsNumber, nextColumns, nextRows }) => {
      const sheetMarkup = renderToStaticMarkup(
        <BarcodeLabelPrintSheet
          productNameUpper={productNameUpper}
          barcodeValue={barcodeValue}
          columns={nextColumns}
          rows={nextRows}
          labelsCount={nextLabelsNumber}
        />,
      )

      const sheetW = Math.max(1, Math.floor(Number(nextColumns))) * LABEL_WIDTH_MM
      const sheetH = Math.max(1, Math.floor(Number(nextRows))) * LABEL_HEIGHT_MM

      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Barcode Label</title>
            <style>
              @page { size: ${sheetW}mm ${sheetH}mm; margin: 0; }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                width: ${sheetW}mm;
                height: ${sheetH}mm;
                background: #ffffff;
                overflow: hidden;
              }
              body {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
              }
              .barcode-print-root {
                position: fixed;
                top: 0;
                left: 0;
                width: ${sheetW}mm;
                height: ${sheetH}mm;
                margin: 0;
                padding: 0;
              }
            </style>
          </head>
          <body>${sheetMarkup}</body>
        </html>
      `

      const approxW = Math.min(1200, 260 + nextColumns * 220)
      const approxH = Math.min(900, 220 + nextRows * 160)
      const w = window.open('', '_blank', `width=${approxW},height=${approxH}`)
      if (w) {
        w.document.write(printContent)
        w.document.close()
        w.focus()
        setTimeout(() => {
          w.print()
          w.close()
        }, 500)
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Pop-up blocked',
          text: 'Please allow pop-ups to print the barcode label.'
        })
      }
    }

    Swal.fire({
      title: 'Label Print Layouts',
      icon: 'question',
      html: `
        <div style="display:flex; flex-direction:column; gap:12px; text-align:left;">
          <div>
            <label for="sw-labels-number" style="display:block; font-weight:700; margin-bottom:6px;">Labels Number</label>
            <input
              id="sw-labels-number"
              type="number"
              min="1"
              step="1"
              placeholder="Enter labels number"
              value=""
              style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:10px; font-family:'Courier New', monospace;"
            />
            <div id="sw-layout-hint" style="font-size:12px; color:#64748b; margin-top:6px;">
              Columns: ${DEFAULT_GRID_COLS} | Rows: — | Capacity: —
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Print',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        const root = Swal.getHtmlContainer()
        const labelsEl = root?.querySelector('#sw-labels-number')
        const hintEl = root?.querySelector('#sw-layout-hint')

        const recalc = () => {
          if (!labelsEl || !hintEl) return
          const v = Number(labelsEl.value)
          if (!Number.isFinite(v) || v < 1) return
          const rows = Math.ceil(v / DEFAULT_GRID_COLS)
          hintEl.textContent = `Columns: ${DEFAULT_GRID_COLS} | Rows: ${rows} | Capacity: ${DEFAULT_GRID_COLS * rows}`
        }

        if (labelsEl && hintEl) {
          hintEl.textContent = `Columns: ${DEFAULT_GRID_COLS} | Rows: — | Capacity: —`
          labelsEl.addEventListener('input', recalc)
        }
      },
      preConfirm: () => {
        const root = Swal.getHtmlContainer()
        const labelsVal = root?.querySelector('#sw-labels-number')?.value
        const nextLabelsNumber = Number(labelsVal)

        if (!Number.isFinite(nextLabelsNumber) || nextLabelsNumber < 1) {
          Swal.showValidationMessage('Labels Number should be at least 1.')
          return false
        }

        const nextColumns = DEFAULT_GRID_COLS
        const nextRows = Math.ceil(nextLabelsNumber / nextColumns)

        return { nextLabelsNumber, nextColumns, nextRows }
      }
    }).then((res) => {
      if (!res.isConfirmed || !res.value) return

      const { nextLabelsNumber, nextColumns, nextRows } = res.value

      setLabelsNumber(nextLabelsNumber)
      setLayoutColumns(nextColumns)
      setLayoutRows(nextRows)

      doPrintSheet({ nextLabelsNumber, nextColumns, nextRows })
    })
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
                      <div className="barcode-label-name">{(p.productName ? String(p.productName) : '').trim().toUpperCase()}</div>
                      <BarcodeCanvas value={p.barCode ? String(p.barCode).trim() : ''} className="barcode-preview-canvas" />
                      <div className="barcode-preview-value">
                        {p.barCode ? String(p.barCode).trim() : ''}
                      </div>
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
