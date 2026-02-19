import React, { useState, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link, useLocation } from "react-router-dom";
import { getSidebarData } from "../../core/json/siderbar_data";
import HorizontalSidebar from "./horizontalSidebar";
import CollapsedSidebar from "./collapsedSidebar";

const Sidebar = () => {
  const Location = useLocation();
  const [sidebarData, setSidebarData] = useState(getSidebarData());

  useEffect(() => {
    // Re-render sidebar when user role changes
    const handleStorageChange = () => {
      setSidebarData(getSidebarData());
    };

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for role changes on mount and when location changes
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [Location.pathname]);

  const [subOpen, setSubopen] = useState("");
  const [subsidebar, setSubsidebar] = useState("");

  const toggleSidebar = (title) => {
    if (title === subOpen) {
      setSubopen("");
    } else {
      setSubopen(title);
    }
  };

  const toggleSubsidebar = (subitem) => {
    if (subitem === subsidebar) {
      setSubsidebar("");
    } else {
      setSubsidebar(subitem);
    }
  };

  return (
    <div>
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {sidebarData?.map((mainLabel, index) => (
                  <li className="submenu-open" key={index}>
                    <h6 className="submenu-hdr">{mainLabel?.label}</h6>

                    <ul>
                      {mainLabel?.submenuItems?.map((title, i) => {
                        const isPOS = title?.label === "POS";
                        return (
                          <li className="submenu" key={i}>
                            <Link
                              to={title?.link}
                              onClick={() => toggleSidebar(title?.label)}
                              className={`${
                                subOpen === title?.label ? "subdrop" : ""
                              } ${
                                title?.link === Location.pathname
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span className="icon-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                                {title?.icon}
                              </span>
                              <span
                                style={{ color: isPOS ? "blue" : "inherit" }}
                              >
                                {title?.label}
                              </span>
                              <span
                                className={title?.submenu ? "menu-arrow" : ""}
                              />
                            </Link>
                            <ul
                              style={{
                                display:
                                  subOpen === title?.label ? "block" : "none",
                              }}
                            >
                              {title?.submenuItems?.map((item, titleIndex) => {
                                return (
                                  <li
                                    className="submenu submenu-two"
                                    key={titleIndex}
                                  >
                                    <Link
                                      to={item?.link}
                                      className={
                                        item?.link === Location.pathname
                                          ? "active"
                                          : ""
                                      }
                                      onClick={() => {
                                        toggleSubsidebar(item?.label);
                                      }}
                                    >
                                      {item?.label}
                                      <span
                                        className={
                                          item?.submenu ? "menu-arrow" : ""
                                        }
                                      />
                                    </Link>
                                    <ul
                                      style={{
                                        display:
                                          subsidebar === item?.label
                                            ? "block"
                                            : "none",
                                      }}
                                    >
                                      {item?.submenuItems?.map(
                                        (items, titleIndex) => (
                                          <li key={titleIndex}>
                                            <Link
                                              to={items?.link}
                                              className={`${
                                                subsidebar === items?.label
                                                  ? "submenu-two subdrop"
                                                  : "submenu-two"
                                              } ${
                                                items?.link === Location.pathname
                                                  ? "active"
                                                  : ""
                                              }`}
                                            >
                                              {items?.label}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
      <HorizontalSidebar />
      <CollapsedSidebar />
    </div>
  );
};

export default Sidebar;