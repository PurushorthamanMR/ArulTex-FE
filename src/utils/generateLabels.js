/**
 * Generate label placement for a fixed-column label sheet.
 *
 * Example:
 * - columns = 3
 * - skipUsedCount = 2 (first two slots already used on the sheet)
 * - quantity = 4
 *
 * grid slots length = columns * rows
 * where rows = ceil((skipUsedCount + quantity) / columns)
 */
export function generateLabels({
  productName,
  price,
  barcode,
  quantity,
  skipUsedCount = 0,
  columns = 3,
}) {
  const safeQty = Math.max(0, Math.floor(Number(quantity || 0)))
  const safeSkip = Math.max(0, Math.floor(Number(skipUsedCount || 0)))
  const safeColumns = Math.max(1, Math.floor(Number(columns || 3)))

  const totalToPlace = safeSkip + safeQty
  const rows = Math.max(1, Math.ceil(totalToPlace / safeColumns))
  const totalSlots = safeColumns * rows

  const items = Array.from({ length: totalSlots }, (_, slotIndex) => {
    const labelIndex = slotIndex - safeSkip
    if (labelIndex < 0 || labelIndex >= safeQty) return null

    return {
      productName,
      price,
      barcode,
      labelIndex, // 0-based index within printed quantity
    }
  })

  return { items, rows, columns: safeColumns, totalSlots }
}

