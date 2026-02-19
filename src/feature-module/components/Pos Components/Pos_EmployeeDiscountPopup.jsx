import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../Api/UserApi";
import "../../../style/scss/components/Pos Components/Pos_EmployeeDiscountPopup.scss";
import PropTypes from "prop-types";

const Pos_EmployeeDiscountPopup = ({ 
  onClose, 
  onApplyDiscount, 
  darkMode = false,
  discountPercentage = 0
}) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers(1, 100, true);
        if (response && response.payload) {
          const filteredUsers = response.payload.filter(user => 
            user.userRoleDto?.userRole === "MANAGER" || 
            user.userRoleDto?.userRole === "USER"
          );
          setUsers(filteredUsers);
          if (filteredUsers.length > 0) {
            setSelectedUser(filteredUsers[0]);
          }
        } else {
          setError("Failed to load users");
        }
      } catch (err) {
        console.error("Error loading users:", err);
        setError("Error loading users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleApplyDiscount = () => {
    if (!selectedUser) {
      setError("Please select an employee");
      return;
    }

    onApplyDiscount(selectedUser.id, selectedUser.firstName, discountPercentage);
    onClose();
  };

  return (
    <div className={`employee-discount-popup ${darkMode ? "dark-mode" : ""}`}>
      <div className="popup-header">
        <div className="header-content">
          <h2>Employee Discount</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="popup-content">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading employees...</p>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="discount-info">
              <p>Discount Percentage: <strong>{discountPercentage}%</strong></p>
            </div>
            
            <div className="form-group">
              <label>Select Employee:</label>
              <select 
                value={selectedUser ? selectedUser.id : ""} 
                onChange={(e) => {
                  const user = users.find(u => u.id === parseInt(e.target.value));
                  setSelectedUser(user);
                }}
                className="employee-select"
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName || ""}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedUser && (
              <div className="selected-employee">
                <div className="employee-avatar">
                  {selectedUser.firstName.charAt(0)}
                </div>
                <div className="employee-details">
                  <h3>{selectedUser.firstName} {selectedUser.lastName || ""}</h3>
                </div>
              </div>
            )}
            
            {error && <div className="error-message">{error}</div>}
          </>
        )}
      </div>
      
      <div className="popup-footer">
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button 
          className="apply-btn" 
          onClick={handleApplyDiscount}
          disabled={loading || !selectedUser}
        >
          Apply Discount
        </button>
      </div>
    </div>
  );
};

Pos_EmployeeDiscountPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onApplyDiscount: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  discountPercentage: PropTypes.number.isRequired
};

export default Pos_EmployeeDiscountPopup; 