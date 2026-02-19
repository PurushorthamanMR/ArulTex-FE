import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { all_routes } from "../../../Router/all_routes";
import "../../../style/scss/components/Pos Components/Pos_Sidebar.scss";
import Swal from "sweetalert2";

const Pos_Sidebar = ({ darkMode }) => {
  const navigate = useNavigate();
  const route = all_routes;

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    userRole: "",
    tillName: ""
  });

  const circleColor = "#4ECDC4";

  useEffect(() => {
    const fetchUserDetails = () => {
      const firstName = localStorage.getItem("firstName") || "Unknown";
      const lastName = localStorage.getItem("lastName") || "";
      const userRole = localStorage.getItem("userRole") || "";
      const tillName = localStorage.getItem("tillName") || "";

      setUserDetails({
        firstName,
        lastName,
        userRole,
        tillName
      });
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    // Clear relevant localStorage items
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userId");
    localStorage.removeItem("branchId");
    localStorage.removeItem("deviceId");
    localStorage.removeItem("registeredDevice");
    // Clear theme settings
    localStorage.removeItem("colorschema");
    localStorage.removeItem("layoutStyling");
    localStorage.removeItem("layoutThemeColors");
    localStorage.removeItem("themeMode");
    // Reset theme to light mode
    document.documentElement.setAttribute("data-layout-mode", "light_mode");
    document.documentElement.setAttribute("data-layout-style", "default");
    document.documentElement.setAttribute("data-nav-color", "light");
    document.body.classList.remove("dark-mode");
    // Go directly to signin page
    navigate(route.signin);
  };

  const handleHomeClick = () => {
    const searchInput = document.querySelector('.search-input');
    const inputScreenBox = document.querySelector('.input-screen-box');
    const displayBox = document.querySelector('.display-box');

    // Check if elements exist
    if (!searchInput || !inputScreenBox || !displayBox) {
      console.log('Some elements not found');
      navigate(route.dashboard);
      return;
    }

    // More precise checks
    const hasSearchInput = searchInput.value.trim() !== '';
    const hasInputScreen = inputScreenBox.textContent.trim() !== '';
    const hasDisplayItems = displayBox.querySelector('.result-row') !== null;

    console.log('Check results:', {
      hasSearchInput,
      hasInputScreen,
      hasDisplayItems,
      searchInputValue: searchInput.value,
      inputScreenContent: inputScreenBox.textContent,
      displayBoxChildren: displayBox.children.length
    });

    if (hasSearchInput || hasInputScreen || hasDisplayItems) {
      Swal.fire({
        title: 'Complete Transaction',
        text: 'Please complete the current transaction before leaving.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    navigate(route.dashboard);
  };

  const firstLetter = userDetails.userRole.charAt(0).toUpperCase() || "U";

  return (
    <aside className={`sidebar-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="logo-section">
        <ImageWithBasePath
          src="assets/img/logo-small.png"
          alt="Logo"
          className="logo-img"
        />
      </div>

      <nav className="nav-section">
        {(userDetails.userRole === "ADMIN" || userDetails.userRole === "MANAGER") && (
          <button onClick={handleHomeClick} className="nav-item active">
            <div className="nav-icon home-icon">
              <ImageWithBasePath
                src="assets/img/dashboard.png"
                alt="dashboard"
                className="dashboard-img"
              />
            </div>
          </button>
        )}
      </nav>

      <div className="user-section">
        <div className="user-avatar">
          <div className="avatar-circle" style={{ backgroundColor: circleColor }}>
            {firstLetter}
          </div>
          <span
            className="user-role"
            style={{ color: darkMode ? "#ffffff" : "#666" }}
          >
            {userDetails.firstName || "User"}
            {userDetails.tillName && (
              <> <span className="till-name">{userDetails.tillName}</span></>
            )}
          </span>
        </div>
        <button className="logout-button" onClick={handleLogout} type="button">
          <ImageWithBasePath
            src="assets/img/icons/log-out.svg"
            alt="Logout"
            className="logout-icon"
          />
        </button>
      </div>
    </aside>
  );
};

Pos_Sidebar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Pos_Sidebar;