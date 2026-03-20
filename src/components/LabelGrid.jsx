import React from 'react'
import LabelItem from './LabelItem'

const LabelGrid = ({
  items = [],
  barcodeDataUrl = null,
  columns = 3,
  rows = 1,
  labelWidthMm = 50,
  labelHeightMm = 30
}) => {
  const safeColumns = Math.max(1, Math.floor(Number(columns || 3)))
  const safeRows = Math.max(1, Math.floor(Number(rows || 1)))

  return (
    <div
      className="bpp-label-grid"
      style={{
        width: `${safeColumns * labelWidthMm}mm`,
        height: `${safeRows * labelHeightMm}mm`,
        gridTemplateColumns: `repeat(${safeColumns}, ${labelWidthMm}mm)`,
        gridTemplateRows: `repeat(${safeRows}, ${labelHeightMm}mm)`
      }}
    >
      {items.map((item, idx) => {
        if (!item) {
          return <div key={idx} className="bpp-label-empty" />
        }

        return (
          <LabelItem
            key={idx}
            productName={item.productName}
            price={item.price}
            barcodeValue={item.barcode}
            barcodeDataUrl={barcodeDataUrl}
            labelWidthMm={labelWidthMm}
            labelHeightMm={labelHeightMm}
          />
        )
      })}
    </div>
  )
}

export default React.memo(LabelGrid)

