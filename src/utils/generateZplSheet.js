function mmToDots(mm, dpi) {
  return Math.round((Number(mm) * Number(dpi)) / 25.4)
}

function escapeZplField(value) {
  // ZPL special chars: ^ and ~ must not appear in raw field data.
  // Keep it simple by stripping them.
  return String(value || '').replace(/\^/g, '').replace(/~/g, '')
}

/**
 * Generate a single ZPL sheet containing a fixed grid of labels.
 *
 * Grid placement is row-major:
 * slotIndex 0..columns-1 -> row 1
 * slotIndex columns..2*columns-1 -> row 2
 *
 * Any `items[slotIndex] === null` becomes an empty slot.
 */
export function generateZplSheet({
  items = [],
  columns = 3,
  rows = 1,
  productName = '',
  price = '',
  barcode = '',
  labelWidthMm = 50,
  labelHeightMm = 30,
  dpi = 203
} = {}) {
  const safeColumns = Math.max(1, Math.floor(Number(columns || 3)))
  const safeRows = Math.max(1, Math.floor(Number(rows || 1)))

  const labelW = mmToDots(labelWidthMm, dpi)
  const labelH = mmToDots(labelHeightMm, dpi)
  const sheetW = safeColumns * labelW
  const sheetH = safeRows * labelH

  // Relative layout inside one label (tuned for small 50x30mm stocks).
  const nameY = mmToDots(1.0, dpi)
  const nameFontH = mmToDots(3.2, dpi)
  const nameFontW = nameFontH

  const barcodeY = mmToDots(7.0, dpi)
  const barcodeHeight = mmToDots(13.0, dpi)
  const barcodeTextY = mmToDots(21.0, dpi)
  const barcodeTextFontH = mmToDots(3.4, dpi)

  const priceY = mmToDots(23.0, dpi)
  const priceFontH = mmToDots(3.4, dpi)

  // Barcode settings
  // ^BC orientation N, height=barcodeHeight, interpretation off.
  // ^BC format: ^BC[o],[h],[f],[g],[e],[m]
  // f=N -> no interpretation line (we print barcode ourselves below).
  const barcodeXInset = Math.round(labelW * 0.02)

  let zpl = ''
  zpl += '^XA\n'
  zpl += '^CI28\n' // UTF-8
  zpl += `^PW${sheetW}\n`
  zpl += `^LL${sheetH}\n`
  zpl += '^LH0,0\n'

  const totalSlots = safeColumns * safeRows
  for (let slotIndex = 0; slotIndex < totalSlots; slotIndex++) {
    const item = items[slotIndex]
    if (!item) continue

    const row = Math.floor(slotIndex / safeColumns)
    const col = slotIndex % safeColumns
    const baseX = col * labelW
    const baseY = row * labelH

    const itemName = escapeZplField(item.productName ?? productName)
    const itemPrice = escapeZplField(item.price ?? price)
    const itemBarcode = escapeZplField(item.barcode ?? barcode)

    // Product name (centered within label using ^FB)
    // ^FOx,y places origin for the following command.
    zpl += `^FO${baseX},${baseY + nameY}\n`
    zpl += `^A0N,${nameFontH},${nameFontW}\n`
    zpl += `^FB${labelW},1,0,C,0\n`
    zpl += `^FD${itemName}^FS\n`

    // Barcode (CODE128)
    zpl += `^FO${baseX + barcodeXInset},${baseY + barcodeY}\n`
    // ^BY: bar width, ratio, system of measurement (t)
    // w=2 dots; ratio=3; t=1 (fixed)
    zpl += `^BY2,3,1\n`
    zpl += `^BCN,${barcodeHeight},N,N,N,N\n`
    zpl += `^FD${itemBarcode}^FS\n`

    // Barcode number text (centered)
    zpl += `^FO${baseX},${baseY + barcodeTextY}\n`
    zpl += `^A0N,${barcodeTextFontH},${barcodeTextFontH}\n`
    zpl += `^FB${labelW},1,0,C,0\n`
    zpl += `^FD${itemBarcode}^FS\n`

    // Price
    zpl += `^FO${baseX},${baseY + priceY}\n`
    zpl += `^A0N,${priceFontH},${priceFontH}\n`
    zpl += `^FB${labelW},1,0,C,0\n`
    zpl += `^FD${itemPrice}^FS\n`
  }

  // Print exactly one sheet
  zpl += '^PQ1\n'
  zpl += '^XZ\n'

  return zpl
}

