import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "../../../style/scss/components/Pos Components/Pos_Header.scss";
import PropTypes from 'prop-types';
import { fetchCustomers, saveCustomer } from "../../Api/customerApi";
import { getAllManagerToggles } from "../../Api/ManagerToggle";
import FeatherIcon from "feather-icons-react";
import { fetchCashTotal } from "../../Api/TransactionApi";
import { fetchMinimamBanking } from "../../Api/MinimamBankingApi";

export const Pos_Header = ({ currentTime, darkMode, toggleDarkMode, onCustomerAdded }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [errors, setErrors] = useState({ phoneNumber: "", customerName: "" });
  const [existingCustomer, setExistingCustomer] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [bankingRequired, setBankingRequired] = useState(false);
  const [blinkState, setBlinkState] = useState(true);

  // Effect for blinking animation
  useEffect(() => {
    if (bankingRequired) {
      const blinkInterval = setInterval(() => {
        setBlinkState(prev => !prev);
      }, 500);
      
      return () => clearInterval(blinkInterval);
    }
  }, [bankingRequired]);

  // Check banking status on component mount
  useEffect(() => {
    // Check if we should trigger a banking check (set during login)
    const shouldCheckBanking = localStorage.getItem("shouldCheckBanking");
    if (shouldCheckBanking === "true") {
      // Clear the flag
      localStorage.removeItem("shouldCheckBanking");
      // Trigger an immediate banking check
      checkBankingStatus();
    } else {
      // Even if no flag, do an initial check
      checkBankingStatus();
    }
    
    // Set up interval to check banking status every 30 seconds
    const bankingCheckInterval = setInterval(() => {
      checkBankingStatus();
    }, 30000); // 30000 ms = 30 seconds
    
    // Listen for banking status changes from other components
    const handleBankingStatusChange = (event) => {
      const { isRequired } = event.detail;
      setBankingRequired(isRequired);
    };
    
    window.addEventListener('bankingStatusChanged', handleBankingStatusChange);
    
    return () => {
      clearInterval(bankingCheckInterval);
      window.removeEventListener('bankingStatusChanged', handleBankingStatusChange);
    };
  }, []);

  const checkBankingStatus = async () => {
    try {
      // Get cash total data
      const cashTotalResult = await fetchCashTotal();
      
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
      
      // Update state
      setBankingRequired(isRequired);
      
      // Dispatch a custom event to notify other components
      const event = new CustomEvent('bankingStatusChanged', { 
        detail: { isRequired, difference, minBankingAmount } 
      });
      window.dispatchEvent(event);
    } catch (error) {
      // Error handling without console.error
    }
  };

  useEffect(() => {
    const checkAddCustomerToggle = async () => {
      try {
        const toggles = await getAllManagerToggles();
        const addCustomerToggle = toggles.responseDto.find(
          toggle => toggle.action === "Add Customer"
        );
        setShowAddCustomer(addCustomerToggle?.isActive || false);
      } catch (error) {
        console.error('Error fetching Add Customer toggle:', error);
        setShowAddCustomer(false);
      }
    };

    checkAddCustomerToggle();
  }, []);

  // Fullscreen effect
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Customer check effect
  useEffect(() => {
    const checkCustomer = async () => {
      if (phoneNumber.length === 10) {
        try {
          const customers = await fetchCustomers();
          const customer = customers.find(
            (c) => c.mobileNumber === phoneNumber && c.isActive === true
          );
          if (customer) {
            setExistingCustomer(customer);
            setCustomerName(customer.name);
          } else {
            setExistingCustomer(null);
            setCustomerName("");
          }
        } catch (error) {
          setExistingCustomer(null);
          setCustomerName("");
        }
      } else {
        setExistingCustomer(null);
        setCustomerName("");
      }
    };

    checkCustomer();
  }, [phoneNumber]);

  const toggleFullscreen = (elem) => {
    elem = elem || document.documentElement;
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const validateInput = () => {
    let newErrors = {};

    if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!existingCustomer && !customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    } else if (!existingCustomer && !/^[A-Za-z\s]+$/.test(customerName)) {
      newErrors.customerName = "Customer name must contain only letters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (validateInput()) {
      if (!existingCustomer) {
        const customerData = {
          name: customerName,
          mobileNumber: phoneNumber,
          isActive: 1,
        };
        try {
          await saveCustomer(customerData);
        } catch (error) {
          return;
        }
      }

      onCustomerAdded(customerName);
      setPhoneNumber("");
      setCustomerName("");
      setErrors({});
      setExistingCustomer(null);
      setShowPopup(false);
    }
  };

  const handleCancel = () => {
    setPhoneNumber("");
    setCustomerName("");
    setErrors({});
    setExistingCustomer(null);
    setShowPopup(false);
  };

  const handleCustomerNameChange = (e) => {
    if (!existingCustomer) {
      setCustomerName(e.target.value);
    }
  };

  return (
    <header className={`pos-header ${darkMode ? "dark-header" : "light-header"}`}>
      <button onClick={toggleDarkMode} className="toggle-mode-btn">
        {darkMode ? "🌙" : "☀️"}
      </button>

      <div className="header-right">
        {bankingRequired && (
          <div className={`banking-required ${blinkState ? 'visible' : 'hidden'}`}>
            Banking Required!
          </div>
        )}
        
        <button
          id="btnFullscreen"
          onClick={() => toggleFullscreen()}
          className={`fullscreen-btn ${isFullscreen ? "exit-fullscreen" : "go-fullscreen"}`}
        >
          <FeatherIcon icon="maximize" />
        </button>

        {showAddCustomer && (
          <button
            className="add-customer-btn"
            onClick={() => setShowPopup(true)}
          >
            Add Customer
          </button>
        )}

        <div className="time-display">
          <div className="date">
            {format(currentTime, "EEEE, dd MMM yyyy")}
          </div>
          <div className="time">
            {format(currentTime, "HH:mm:ss")}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2 className="popup-title">Add Customer</h2>

            <label className="popup-label">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="**********"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPhoneNumber(value.slice(0, 10));
              }}
              className="popup-input"
              maxLength={10}
              required
            />
            {errors.phoneNumber && <p className="popup-error">{errors.phoneNumber}</p>}

            <label className="popup-label">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={handleCustomerNameChange}
              className="popup-input"
              disabled={!!existingCustomer}
              required
            />
            {errors.customerName && <p className="popup-error">{errors.customerName}</p>}

            <div className="popup-buttons">
              <button className="popup-btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="popup-btn-save" onClick={handleAdd}>
                {existingCustomer ? "Continue" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

Pos_Header.propTypes = {
  currentTime: PropTypes.instanceOf(Date).isRequired,
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  onCustomerAdded: PropTypes.func.isRequired,
};

export default Pos_Header;