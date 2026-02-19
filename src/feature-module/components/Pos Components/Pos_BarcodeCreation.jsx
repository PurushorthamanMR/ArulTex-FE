import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Barcode from "react-barcode";
import { getProductByBarcode } from "../../Api/productApi";
import "../../../style/scss/components/Pos Components/Pos_BarcodeCreation.scss";

const Pos_BarcodeCreation = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [barcodeValue, setBarcodeValue] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productDetails, setProductDetails] = useState(null); // Store name and price
  const barcodeRef = useRef(null);
  const priceSymbol = localStorage.getItem("priceSymbol") || "$";

  // Handle input change without triggering barcode check
  const handleInputChange = (e) => {
    setInput(e.target.value.trim());
  };

  // Handle barcode submission (Enter key or button click)
  const handleBarcodeSubmit = async () => {
    const value = input.trim();
    
    if (value === "") {
      setProductStatus("Please enter a barcode");
      setBarcodeValue("");
      setProductDetails(null);
      return;
    }

    try {
      const productData = await getProductByBarcode(value);
      if (productData && productData.responseDto && productData.responseDto.length > 0) {
        const productItem = productData.responseDto[0];
        setProductStatus(`Product: ${productItem.name} - ${priceSymbol}${parseFloat(productItem.pricePerUnit).toFixed(2)}`);
        setBarcodeValue(value);
        setProductDetails({
          name: productItem.name,
          price: parseFloat(productItem.pricePerUnit).toFixed(2),
        });
      } else {
        setProductStatus("Product not found with this barcode");
        setBarcodeValue("");
        setProductDetails(null);
      }
    } catch (error) {
      setProductStatus("Error checking barcode");
      setBarcodeValue("");
      setProductDetails(null);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBarcodeSubmit();
    }
  };

  const handlePrint = () => {
    if (!barcodeValue || !productDetails) {
      return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            @media print {
              @page { size: 72mm auto; margin: 0; }
              body { margin: 0 auto; padding: 0 5px; font-family: 'Courier New', Courier, monospace; width: 72mm; min-height: 100%; box-sizing: border-box; font-weight: bold; color: #000; }
              header, footer, nav, .print-header, .print-footer { display: none !important; }
              html, body { width: 72mm; height: auto; margin: 0 auto; overflow: hidden; }
            }
            body { font-family: 'Courier New', Courier, monospace; width: 72mm; margin: 0 auto; padding: 0 5px; font-size: 12px; line-height: 1; box-sizing: border-box; text-align: center; }
            .barcode-container { display: inline-block; text-align: center; width: 100%; }
            .product-info { font-size: 16px; font-weight: bold; margin-bottom: 2px; font-family: Arial, sans-serif; }
            #barcodeImage { width: 100%; max-width: 100%; height: auto; margin-bottom: 2px; }
            .barcode-number { font-size: 12px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="barcode-container">
            <div class="product-info">
              ${productDetails.name}<br>${priceSymbol}${productDetails.price}
            </div>
            <img id="barcodeImage" />
          </div>
          <script>
            const img = document.getElementById('barcodeImage');
            img.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);

    const barcodeElement = barcodeRef.current;
    const svg = barcodeElement.querySelector('svg');
    
    if (svg) {
      const clonedSvg = svg.cloneNode(true);
      clonedSvg.setAttribute('width', '100%');
      clonedSvg.setAttribute('height', '10');
      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const img = printWindow.document.getElementById('barcodeImage');
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }

    printWindow.document.close();
  };

  return (
    <div className="barcode-popup-overlay">
      <div className="barcode-popup">
        <div className="barcode-popup-content">
          <h2 className="barcode-popup-title">Create Barcode Label</h2>
          <div className="barcode-popup-input-container">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter barcode"
              className="barcode-popup-input"
            />
            <button
              onClick={handleBarcodeSubmit}
              className="barcode-popup-button submit"
            >
              Generate Barcode
            </button>
            <p className="barcode-popup-status">
              {productStatus || "Enter a barcode and press Enter or click Generate"}
            </p>
          </div>
          {barcodeValue && (
            <div className="barcode-popup-barcode" ref={barcodeRef}>
              <Barcode
                value={barcodeValue}
                format="CODE128"
                width={1}
                height={30}
                displayValue={false}
                margin={10}
              />
            </div>
          )}
        </div>
        <div className="barcode-popup-actions">
          <button
            onClick={handlePrint}
            disabled={!barcodeValue}
            className="barcode-popup-button print"
          >
            Print Barcode
          </button>
          <button
            onClick={onClose}
            className="barcode-popup-button close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Pos_BarcodeCreation.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Pos_BarcodeCreation;