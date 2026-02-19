import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../../style/scss/components/Pos Components/PriceCheckPopup.scss";
import { getProductByBarcode } from "../../Api/productApi";

const PriceCheckPopup = ({ onClose, darkMode }) => {
  const [barcode, setBarcode] = useState("");
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState("");
  const barcodeInputRef = useRef(null);
  const priceSymbol = localStorage.getItem("priceSymbol") || "$";

  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, []);

  const handleBarcodeChange = (e) => {
    const value = e.target.value.trim();
    setBarcode(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && barcode) {
      handlePriceCheck();
    }
  };

  const handlePriceCheck = async () => {
    if (barcode.length < 3) {
      setError("Barcode must be at least 3 characters long.");
      setItemDetails(null);
      return;
    }

    try {
      const product = await getProductByBarcode(barcode);
      if (!product || !product.responseDto || product.responseDto.length === 0) {
        setError("Item not found.");
        setItemDetails(null);
        return;
      }

      const productData = product.responseDto[0];
      const { name, pricePerUnit, quantity } = productData;
      if (!name || pricePerUnit === undefined || quantity === undefined) {
        setError("Invalid product data.");
        setItemDetails(null);
        return;
      }

      setItemDetails({ name, price: pricePerUnit, stock: quantity });
      setError("");
      setBarcode("");
    } catch (error) {
      setError("Error fetching price: " + error.message);
      setItemDetails(null);
    }
  };

  useEffect(() => {
    if (barcode.length >= 3) {
      const timer = setTimeout(() => {
        handlePriceCheck();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [barcode]);

  return (
    <div className={`price-check-content ${darkMode ? "dark-mode" : ""}`}>
      <div className="barcode-input">
        <label>Barcode</label>
        <input
          type="text"
          placeholder="Scan barcode"
          value={barcode}
          onChange={handleBarcodeChange}
          onKeyPress={handleKeyPress}
          ref={barcodeInputRef}
          className="barcode-field"
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      {itemDetails && (
        <div className="item-details">
          <table>
            <tbody>
              <tr>
                <td>Item</td>
                <td>{itemDetails.name}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{priceSymbol}{itemDetails.price.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>{itemDetails.stock}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <button onClick={onClose} className="close-btn">
        Close
      </button>
    </div>
  );
};

PriceCheckPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default PriceCheckPopup;