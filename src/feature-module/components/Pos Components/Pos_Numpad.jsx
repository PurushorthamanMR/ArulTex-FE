import React from "react";
import PropTypes from "prop-types";
import "../../../style/scss/components/Pos Components/Pos_Numpad.scss";
import { fetchCashTotal } from "../../Api/TransactionApi";
import { fetchMinimamBanking } from "../../Api/MinimamBankingApi";

const Pos_Numpad = ({ darkMode, onNumpadClick }) => {
  const handleButtonClick = (type, value) => {
    if (onNumpadClick) {
      onNumpadClick({ type, value });
    }
    
    // If Enter button is clicked, check banking status
    if (type === "enter") {
      checkBankingStatus();
    }
  };

  const checkBankingStatus = async () => {
    try {
      // Check if user is authenticated
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;
      }
      
      // Get userId from localStorage, default to 1 if not available
      const userId = localStorage.getItem("userId") || 1;
      if (!userId) {
        return;
      }
      
      // Get cash total data
      const cashTotalResult = await fetchCashTotal(userId);
      
      if (!cashTotalResult.success) {
        return;
      }
      
      const difference = cashTotalResult.data.responseDto.difference;
      
      // Get minimum banking amount
      const bankingData = await fetchMinimamBanking();
      if (!bankingData || bankingData.length === 0) {
        return;
      }
      
      // Find the active minimum banking amount
      const activeBanking = bankingData.find(item => item.isActive === true);
      if (!activeBanking) {
        return;
      }
      
      const minBankingAmount = activeBanking.amount;
      
      // Check if banking is required (difference >= 2 * minBankingAmount)
      const isRequired = difference >= (2 * minBankingAmount);
      
      // Save to localStorage
      localStorage.setItem('bankingRequired', JSON.stringify({
        isRequired,
        difference,
        minBankingAmount,
        timestamp: new Date().toISOString()
      }));
      
      // Dispatch a custom event to notify other components
      const event = new CustomEvent('bankingStatusChanged', { 
        detail: { isRequired, difference, minBankingAmount } 
      });
      window.dispatchEvent(event);
    } catch (error) {
      // Error handling without console.error
    }
  };

  return (
    <div className={`numpad-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="numpad-grid">
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 7)}
        >
          7
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 8)}
        >
          8
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 9)}
        >
          9
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 4)}
        >
          4
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 5)}
        >
          5
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 6)}
        >
          6
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 1)}
        >
          1
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 2)}
        >
          2
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 3)}
        >
          3
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", ".")}
        >
          .
        </button>
        <button
          className={`numpad-button ${darkMode ? "dark-button" : "light-button"}`}
          onClick={() => handleButtonClick("number", 0)}
        >
          0
        </button>
        <button
          className="numpad-button enter-button double-height"
          onClick={() => handleButtonClick("enter", null)}
        >
          Enter
        </button>
        <button
          className="numpad-button clear-button"
          onClick={() => handleButtonClick("clear", null)}
        >
          C
        </button>
        <button
          className="numpad-button multiply-button"
          onClick={() => handleButtonClick("multiply", null)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

Pos_Numpad.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  onNumpadClick: PropTypes.func.isRequired,
};

export default Pos_Numpad;