/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
//import { Search, XCircle } from "react-feather";
import { all_routes } from "../../Router/all_routes";
//import customisedstyles from "../../assets/css/customisedstyles.css";

const Header = () => {
  const route = all_routes;
  const [toggle, SetToggle] = useState(false);

  const isElementVisible = (element) => {
    return element.offsetWidth > 0 || element.offsetHeight > 0;
  };

  const slideDownSubmenu = () => {
    const subdropPlusUl = document.getElementsByClassName("subdrop");
    for (let i = 0; i < subdropPlusUl.length; i++) {
      const submenu = subdropPlusUl[i].nextElementSibling;
      if (submenu && submenu.tagName.toLowerCase() === "ul") {
        submenu.style.display = "block";
      }
    }
  };

  const slideUpSubmenu = () => {
    const subdropPlusUl = document.getElementsByClassName("subdrop");
    for (let i = 0; i < subdropPlusUl.length; i++) {
      const submenu = subdropPlusUl[i].nextElementSibling;
      if (submenu && submenu.tagName.toLowerCase() === "ul") {
        submenu.style.display = "none";
      }
    }
  };

  useEffect(() => {
    const handleMouseover = (e) => {
      e.stopPropagation();

      const body = document.body;
      const toggleBtn = document.getElementById("toggle_btn");

      if (
        body.classList.contains("mini-sidebar") &&
        isElementVisible(toggleBtn)
      ) {
        const target = e.target.closest(".sidebar, .header-left");

        if (target) {
          body.classList.add("expand-menu");
          slideDownSubmenu();
        } else {
          body.classList.remove("expand-menu");
          slideUpSubmenu();
        }

        e.preventDefault();
      }
    };

    document.addEventListener("mouseover", handleMouseover);

    return () => {
      document.removeEventListener("mouseover", handleMouseover);
    };
  }, []);

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
    SetToggle((current) => !current);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const sidebarOverlay = () => {
    document?.querySelector(".main-wrapper")?.classList?.toggle("slide-nav");
    document?.querySelector(".sidebar-overlay")?.classList?.toggle("opened");
    document?.querySelector("html")?.classList?.toggle("menu-opened");
  };

  let pathname = location.pathname;

  const exclusionArray = [
    "/reactjs/template/dream-pos/index-three",
    "/reactjs/template/dream-pos/index-one",
  ];
  if (exclusionArray.indexOf(window.location.pathname) >= 0) {
    return "";
  }

  const [isFullscreen, setIsFullscreen] = useState(false);
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
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);
  
  const [themeMode, setThemeMode] = useState("light");
  const toggleThemeMode = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
    localStorage.setItem("themeMode", newTheme); // Save the theme preference
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") || "light";
    setThemeMode(savedTheme);
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  }, []);

  const toggleThemeModes = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
    localStorage.setItem("themeMode", newTheme);
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") || "light";
    setThemeMode(savedTheme);
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  }, []);
  
  // Function to toggle fullscreen mode
  // This function is called when the user clicks the fullscreen button
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

  const firstName = localStorage.getItem("firstName") || "Guest";
  const lastName = localStorage.getItem("lastName") || "";
  const userRole = localStorage.getItem("userRole") || "Unknown Role";
  const tillName = localStorage.getItem("tillName") || "";
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <>
      <div className="header">
        {/* Logo */}
        <div
          className={`header-left ${toggle ? "" : "active"}`}
          onMouseLeave={expandMenu}
          onMouseOver={expandMenuOpen}
        >
          <Link to="/dashboard" className="logo logo-normal">
            <ImageWithBasePath src="assets/img/logo.png" alt="img" />
          </Link>
          <Link to="/dashboard" className="logo logo-white">
            <ImageWithBasePath src="assets/img/logo-white.png" alt="img" />
          </Link>
          <Link to="/dashboard" className="logo-small">
            <ImageWithBasePath src="assets/img/logo-small.png" alt="img" />
          </Link>
          <Link
            id="toggle_btn"
            to="#"
            style={{
              display: pathname.includes("tasks")
                ? "none"
                : pathname.includes("compose")
                  ? "none"
                  : "",
            }}
            onClick={handlesidebar}
          >
            <FeatherIcon icon="chevrons-left" className="feather-16" />
          </Link>
        </div>
        {/* /Logo */}
        <Link
          id="mobile_btn"
          className="mobile_btn"
          to="#"
          onClick={sidebarOverlay}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>
        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Placeholder to maintain layout */}
          <li className="nav-item" style={{ flexGrow: 1 }}></li>

          {/* Search */}
          {/* <li className="nav-item nav-searchinputs">
            <div className="top-nav-search">
              <Link to="#" className="responsive-search">
                <Search />
              </Link>
              <form action="#" className="dropdown">
                <div
                  className="searchinputs dropdown-toggle"
                  id="dropdownMenuClickable"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="false"
                >
                  <input type="text" placeholder="Search" />
                  <div className="search-addon">
                    <span>
                      <XCircle className="feather-14" />
                    </span>
                  </div>
                </div>
                <div
                  className="dropdown-menu search-dropdown"
                  aria-labelledby="dropdownMenuClickable"
                >
                  <div className="search-info">
                    <h6>
                      <span>
                        <i data-feather="search" className="feather-16" />
                      </span>
                      Recent Searches
                    </h6>
                    <ul className="search-tags">
                      <li>
                        <Link to="#">Products</Link>
                      </li>
                      <li>
                        <Link to="#">Sales</Link>
                      </li>
                      <li>
                        <Link to="#">Applications</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="search-info">
                    <h6>
                      <span>
                        <i data-feather="help-circle" className="feather-16" />
                      </span>
                      Help
                    </h6>
                    <p>
                      How to Change Product Volume from 0 to 200 on Inventory
                      management
                    </p>
                    <p>Change Product Name</p>
                  </div>
                  <div className="search-info">
                    <h6>
                      <span>
                        <i data-feather="user" className="feather-16" />
                      </span>
                      Customers
                    </h6>
                    <ul className="customers">
                      <li>
                        <Link to="#">
                          Aron Varu
                          <ImageWithBasePath
                            src="assets/img/profiles/avator1.jpg"
                            alt
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          Jonita
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-01.jpg"
                            alt
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          Aaron
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-10.jpg"
                            alt
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </li> */}
          {/* /Search */}

          {/* Select Store */}
          {/* <li className="nav-item dropdown has-arrow main-drop select-store-dropdown">
            <Link
              to="#"
              className="dropdown-toggle nav-link select-store"
              data-bs-toggle="dropdown"
            >
              <span className="user-info">
                <span className="user-letter">
                  <ImageWithBasePath
                    src="assets/img/store/store-01.png"
                    alt="Store Logo"
                    className="img-fluid"
                  />
                </span>
                <span className="user-detail">
                  <span className="user-name">Select Branch</span>
                </span>
              </span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-01.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Alpha
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-02.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Apex
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-03.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Bevy
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-04.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Eden
              </Link>
            </div>
          </li> */}
          {/* /Select Store */}

          <li className="nav-item nav-item-box">
            <Link
              to="#"
              id="btnFullscreen"
              onClick={() => toggleFullscreen()}
              className={isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
            >
              <FeatherIcon icon="maximize" />
            </Link>
          </li>

          <li className="nav-item nav-item-box">
            <Link
              to="#"
              onClick={toggleThemeModes}
              className="theme-toggle-btn"
              title={themeMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              <FeatherIcon icon={themeMode === "light" ? "moon" : "sun"} />
            </Link>
          </li>

          <li className="nav-item dropdown has-arrow main-drop">
            <Link
              to="#"
              className="dropdown-toggle nav-link userset"
              data-bs-toggle="dropdown"
            >
              <span className="user-info">
                {/* <span className="user-letter">
                  <ImageWithBasePath
                    src="assets/img/profiles/avator1.jpg"
                    alt="img"
                    className="img-fluid"
                  />
                </span> */}
                <span className="user-detail">
                  <span className="user-name">{fullName}</span>
                  <span className="user-role">
                    {userRole}
                    {tillName && <> | <span className="till-name">{tillName}</span></>}
                  </span>
                </span>
              </span>
            </Link>
            <div className="dropdown-menu menu-drop-user">
              <div className="profilename">
                <div className="profileset">
                  {/* <span className="user-img">
                    <ImageWithBasePath
                      src="assets/img/profiles/avator1.jpg"
                      alt="img"
                    />
                    <span className="status online" />
                  </span> */}
                  <div className="profilesets">
                    <h6>{fullName}</h6>
                    <h5>
                      {userRole}
                      {tillName && <> | <span className="till-name">{tillName}</span></>}
                    </h5>
                  </div>
                </div>
                <hr className="m-0" />
                <Link
                  className="dropdown-item"
                  to={route.signin}
                  onClick={() => {
                    localStorage.removeItem('registeredDevice');
                    localStorage.removeItem('tillName');
                    localStorage.removeItem('tillId');
                    localStorage.removeItem('deviceId');
                  }}
                >
                  <ImageWithBasePath
                    src="assets/img/icons/log-out.svg"
                    alt="img"
                    className="me-2"
                  />
                  Log Out
                </Link>
              </div>
            </div>
          </li>
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="profile">
              My Profile
            </Link>
            <Link className="dropdown-item" to="generalsettings">
              Settings
            </Link>
            <Link 
              className="dropdown-item" 
              to={route.signin}
            >
              Log Out
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
    </>
  );
};

export default Header;