import React from 'react'

const LabelItem = ({
  productName,
  price,
  barcodeValue,
  barcodeDataUrl,
  labelWidthMm = 50,
  labelHeightMm = 30
}) => {
  const nameUpper = String(productName || '').trim().toUpperCase()
  const barcodeText = String(barcodeValue || '').trim()
  const priceText = String(price || '').trim()

  return (
    <div
      className="bpp-label-item"
      style={{ width: `${labelWidthMm}mm`, height: `${labelHeightMm}mm` }}
    >
      <div className="bpp-label-name" title={nameUpper}>
        {nameUpper}
      </div>

      <div className="bpp-label-barcode">
        {barcodeDataUrl ? (
          <img
            className="bpp-label-barcode-img"
            src={barcodeDataUrl}
            alt={`Barcode ${barcodeText}`}
          />
        ) : null}
      </div>

      <div className="bpp-label-barcode-text" title={barcodeText}>
        {barcodeText}
      </div>

      <div className="bpp-label-price" title={priceText}>
        {priceText}
      </div>
    </div>
  )
}

export default React.memo(LabelItem)

