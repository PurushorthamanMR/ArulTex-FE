import React from "react";
import clsx from "clsx";
import "../../../style/scss/components/Pos Components/Pos_CategoryTabs.scss";
import PropTypes from "prop-types";

const Pos_CategoryTabs = ({ activeTab, onTabChange, darkMode, showInPos }) => {
  return (
    <div className="category-tabs-container" style={{ height: '50px' }}>
      <button
        className={clsx(
          "category-tab",
          activeTab === "category" ? "active-tab" : "inactive-tab",
          darkMode ? "dark-mode" : "light-mode"
        )}
        onClick={() => onTabChange("category")}
        style={{
          backgroundColor: activeTab === "category" ? "#4CAF50" : "",
          color: "white",
          borderRadius: "8px 0 0 0",
          flex: 1,
          height: '100%'
        }}
      >
        Category
      </button>
      {showInPos && (
        <button
          className={clsx(
            "category-tab",
            activeTab === "nonscan" ? "active-tab" : "inactive-tab",
            darkMode ? "dark-mode" : "light-mode"
          )}
          style={{
            backgroundColor: activeTab === "nonscan" ? "#2196F3" : "",
            color: "white",
            flex: 1,
            height: '100%'
          }}
          onClick={() => onTabChange("nonscan")}
        >
          Non-Scan
        </button>
      )}
      <button
        className={clsx(
          "category-tab",
          activeTab === "quick" ? "active-tab" : "inactive-tab",
          darkMode ? "dark-mode" : "light-mode"
        )}
        style={{
          backgroundColor: activeTab === "quick" ? "#9C27B0" : "",
          color: "white",
          borderRadius: showInPos ? "0" : "0 8px 0 0",
          flex: 1,
          height: '100%'
        }}
        onClick={() => onTabChange("quick")}
      >
        Quick Access
      </button>
    </div>
  );
};

Pos_CategoryTabs.propTypes = {
  activeTab: PropTypes.oneOf(["category", "quick", "nonscan"]).isRequired,
  onTabChange: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  showInPos: PropTypes.bool.isRequired,
};

export default Pos_CategoryTabs;