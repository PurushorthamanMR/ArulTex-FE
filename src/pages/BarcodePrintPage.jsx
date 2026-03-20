import { useMemo } from 'react'
import JsBarcode from 'jsbarcode'
import LabelGrid from '../components/LabelGrid'
import { generateLabels } from '../utils/generateLabels'
import { generateZplSheet } from '../utils/generateZplSheet'
import { printZpl } from '../api/printerApi'
import '../styles/BarcodePrintPage.css'

function barcodeValueToDataUrl(barcodeValue) {
  if (typeof document === 'undefined') return null
  const v = String(barcodeValue || '').trim()
  if (!v) return null

  try {
    const canvas = document.createElement('canvas')
    // CODE128 barcode image; we render as PNG then let CSS scale it into label area.
    JsBarcode(canvas, v, {
      format: 'CODE128',
      displayValue: false,
      margin: 0,
      width: 2,
      height: 90,
      lineColor: '#000000'
    })
    return canvas.toDataURL('image/png')
  } catch {
    return null
  }
}

/**
 * Professional retail/POS-like barcode label printing page.
 *
 * Props example:
 * {
 *   productName: "Milk 1L",
 *   price: "Rs 450",
 *   barcode: "8901000000001",
 *   quantity: 10,
 *   skipUsedCount: 2
 * }
 */
const BarcodePrintPage = ({
  productName = '',
  price = '',
  barcode = '',
  quantity = 0,
  skipUsedCount = 0,
  columns = 3,
  labelWidthMm = 50,
  labelHeightMm = 30,
  printTitle = 'Barcode Labels',
  printMode = 'zpl', // 'zpl' (raw GT800) or 'browser' (window.print)
  zebraDpi = 203
}) => {
  const { items, rows } = useMemo(() => {
    const res = generateLabels({
      productName,
      price,
      barcode,
      quantity,
      skipUsedCount,
      columns
    })
    return res
  }, [productName, price, barcode, quantity, skipUsedCount, columns])

  const barcodeDataUrl = useMemo(() => barcodeValueToDataUrl(barcode), [barcode])

  const handlePrint = async () => {
    if (printMode === 'browser') {
      window.print()
      return
    }

    // Raw ZPL mode: generate a full sheet and send to backend printer service.
    const zpl = generateZplSheet({
      items,
      columns,
      rows,
      productName,
      price,
      barcode,
      labelWidthMm,
      labelHeightMm,
      dpi: zebraDpi
    })

    await printZpl({ zpl })
  }

  const sheetWmm = columns * labelWidthMm
  const sheetHmm = rows * labelHeightMm

  // Dynamic @page size so Zebra/driver prints at the correct label sheet dimensions.
  const dynamicPageStyle = `
    @page { size: ${sheetWmm}mm ${sheetHmm}mm; margin: 0; }
  `

  return (
    <div className="bpp-root">
      <div className="bpp-toolbar">
        <button className="bpp-print-btn" type="button" onClick={handlePrint}>
          Print
        </button>
      </div>

      <div className="bpp-sheet">
        <style>{dynamicPageStyle}</style>
        <LabelGrid
          items={items}
          barcodeDataUrl={barcodeDataUrl}
          columns={columns}
          rows={rows}
          labelWidthMm={labelWidthMm}
          labelHeightMm={labelHeightMm}
        />
      </div>
    </div>
  )
}

export default BarcodePrintPage

