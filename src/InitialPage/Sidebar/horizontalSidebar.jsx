import React, { useState } from "react";
import { Grid, User } from "react-feather";
import { Link } from "react-router-dom";

const HorizontalSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive6, setIsActive6] = useState(false);
  const [isActive7, setIsActive7] = useState(false);

  const [subActive, setsubActive] = useState(false);
  const [subActive2, setsubActive2] = useState(false);
  const [subActive3, setsubActive3] = useState(false);
  const [subActive4, setsubActive4] = useState(false);
  const [subActive5, setsubActive5] = useState(false);
  const [subActive6, setsubActive6] = useState(false);
  const [subActive7, setsubActive7] = useState(false);
  const [subActive8, setsubActive8] = useState(false);
  const [subActive9, setsubActive9] = useState(false);
  const [subActive10, setsubActive10] = useState(false);
  const [subActive11, setsubActive11] = useState(false);
  const [subActive12, setsubActive12] = useState(false);
  const [subActive13, setsubActive13] = useState(false);
  const [subActive14, setSubActive14] = useState(false);
  const [subActive15, setSubActive15] = useState(false);
  const [subActive16, setSubActive16] = useState(false);
  const [subActive17, setSubActive17] = useState(false);
  const [subActive18, setSubActive18] = useState(false);
  const [subActive19, setSubActive19] = useState(false);
  const [subActive20, setSubActive20] = useState(false);
  const [subActive21, setSubActive21] = useState(false);
  const [subActive22, setSubActive22] = useState(false);
  const [subActive23, setSubActive23] = useState(false);
  const [subActive24, setSubActive24] = useState(false);
  const [subActive25, setSubActive25] = useState(false);
  const [subActive26, setSubActive26] = useState(false);

  const handleSubClick = () => {
    setsubActive(!subActive);
  };
  const handleSubClick2 = () => {
    setsubActive2(!subActive2);
  };
  const handleSubClick3 = () => {
    setsubActive3(!subActive3);
  };
  const handleSubClick4 = () => {
    setsubActive4(!subActive4);
  };
  const handleSubClick5 = () => {
    setsubActive5(!subActive5);
  };
  const handleSubClick6 = () => {
    setsubActive6(!subActive6);
  };
  const handleSubClick7 = () => {
    setsubActive7(!subActive7);
  };
  const handleSubClick8 = () => {
    setsubActive8(!subActive8);
  };
  const handleSubClick9 = () => {
    setsubActive9(!subActive9);
  };
  const handleSubClick10 = () => {
    setsubActive10(!subActive10);
  };
  const handleSubClick11 = () => {
    setsubActive11(!subActive11);
  };
  const handleSubClick12 = () => {
    setsubActive12(!subActive12);
  };
  const handleSubClick13 = () => {
    setsubActive13(!subActive13);
  };

  const handleSubClick14 = () => {
    setSubActive14(!subActive14);
  };

  const handleSubClick15 = () => {
    setSubActive15(!subActive15);
  };

  const handleSubClick16 = () => {
    setSubActive16(!subActive16);
  };

  const handleSubClick17 = () => {
    setSubActive17(!subActive17);
  };

  const handleSubClick18 = () => {
    setSubActive18(!subActive18);
  };

  const handleSubClick19 = () => {
    setSubActive19(!subActive19);
  };

  const handleSubClick20 = () => {
    setSubActive20(!subActive20);
  };

  const handleSubClick21 = () => {
    setSubActive21(!subActive21);
  };

  const handleSubClick22 = () => {
    setSubActive22(!subActive22);
  };

  const handleSubClick23 = () => {
    setSubActive23(!subActive23);
  };

  const handleSubClick24 = () => {
    setSubActive24(!subActive24);
  };

  const handleSubClick25 = () => {
    setSubActive25(!subActive25);
  };

  const handleSubClick26 = () => {
    setSubActive26(!subActive26);
  };

  const handleSelectClick = () => {
    setIsActive(!isActive);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
  };
  const handleSelectClick2 = () => {
    setIsActive(false);
    setIsActive2(!isActive2);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
  };
  const handleSelectClick3 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(!isActive3);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
  };
  const handleSelectClick4 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(!isActive4);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
  };
  const handleSelectClick5 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(!isActive5);
    setIsActive6(false);
    setIsActive7(false);
  };
  const handleSelectClick6 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(!isActive6);
    setIsActive7(false);
  };
  const handleSelectClick7 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(!isActive7);
  };

  return (
    <div className="sidebar horizontal-sidebar">
      <div id="sidebar-menu-3" className="sidebar-menu">
        <ul className="nav">
          <li className="submenu">
            <Link
              to="#"
              onClick={handleSelectClick}
              className={isActive ? "subdrop" : ""}
            >
              <Grid />
              <span> Main Menu</span> <span className="menu-arrow" />
            </Link>
            <ul style={{ display: isActive ? "block" : "none" }}>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick}
                  className={subActive ? "subdrop" : ""}
                >
                  <span>Dashboard</span> <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive ? "block" : "none" }}>
                  <li>
                    <Link to="index">Admin Dashboard</Link>
                  </li>
                  <li>
                    <Link to="sales-dashboard" className="active">
                      Sales Dashboard
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#">
                  <span>Application</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
                  <li>
                    <Link to="chat">Chat</Link>
                  </li>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      <span>Call</span>
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="video-call">Video Call</Link>
                      </li>
                      <li>
                        <Link to="audio-call">Audio Call</Link>
                      </li>
                      <li>
                        <Link to="call-history">Call History</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="calendar">Calendar</Link>
                  </li>
                  <li>
                    <Link to="email">Email</Link>
                  </li>
                  <li>
                    <Link to="todo">To Do</Link>
                  </li>
                  <li>
                    <Link to="notes">Notes</Link>
                  </li>
                  <li>
                    <Link to="file-manager">File Manager</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="submenu">
            <Link
              to="#"
              onClick={handleSelectClick2}
              className={isActive2 ? "subdrop" : ""}
            >
              <img src="assets/img/icons/product.svg" alt="img" />
              <span> Inventory </span> <span className="menu-arrow" />
            </Link>
            <ul style={{ display: isActive2 ? "block" : "none" }}>
              <li>
                <Link to="product-list">
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link to="add-product">
                  <span>Create Product</span>
                </Link>
              </li>
              <li>
                <Link to="expired-products">
                  <span>Expired Products</span>
                </Link>
              </li>
              <li>
                <Link to="low-stocks">
                  <span>Low Stocks</span>
                </Link>
              </li>
              <li>
                <Link to="category-list">
                  <span>Category</span>
                </Link>
              </li>
              <li>
                <Link to="sub-categories">
                  <span>Sub Category</span>
                </Link>
              </li>
              <li>
                <Link to="brand-list">
                  <span>Brands</span>
                </Link>
              </li>
              <li>
                <Link to="units">
                  <span>Units</span>
                </Link>
              </li>
              <li>
                <Link to="varriant-attributes">
                  <span>Variant Attributes</span>
                </Link>
              </li>
              <li>
                <Link to="warranty">
                  <span>Warranties</span>
                </Link>
              </li>
              <li>
                <Link to="barcode">
                  <span>Print Barcode</span>
                </Link>
              </li>
              <li>
                <Link to="qrcode">
                  <span>Print QR Code</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="submenu">
            <Link
              to="#"
              onClick={handleSelectClick3}
              className={isActive3 ? "subdrop" : ""}
            >
              <img src="assets/img/icons/purchase1.svg" alt="img" />
              <span>Sales &amp; Purchase</span> <span className="menu-arrow" />
            </Link>
            <ul style={{ display: isActive3 ? "block" : "none" }}>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick2}
                  className={subActive2 ? "subdrop" : ""}
                >
                  <span>Sales</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive2 ? "block" : "none" }}>
                  <li>
                    <Link to="sales-list">
                      <span>Sales</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="invoice-report">
                      <span>Transaction</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="sales-returns">
                      <span>Sales Return</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="quotation-list">
                      <span>Quotation</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="pos">
                      <span>POS</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="coupons">
                      <span>Coupons</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick3}
                  className={subActive3 ? "subdrop" : ""}
                >
                  <span>Purchase</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive3 ? "block" : "none" }}>
                  <li>
                    <Link to="purchase-list">
                      <span>Purchases</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="purchase-order-report">
                      <span>Purchase Order</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="purchase-returns">
                      <span>Purchase Return</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="manage-stocks">
                      <span>Manage Stock</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="stock-adjustment">
                      <span>Stock Adjustment</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="stock-transfer">
                      <span>Stock Transfer</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick4}
                  className={subActive4 ? "subdrop" : ""}
                >
                  <span>Expenses</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive4 ? "block" : "none" }}>
                  <li>
                    <Link to="expense-list">Expenses</Link>
                  </li>
                  <li>
                    <Link to="expense-category">Expense Category</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="submenu">
            <Link
              to="#"
              onClick={handleSelectClick4}
              className={isActive4 ? "subdrop" : ""}
            >
              <img src="assets/img/icons/users1.svg" alt="img" />
              <span>User Management</span> <span className="menu-arrow" />
            </Link>
            <ul style={{ display: isActive4 ? "block" : "none" }}>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick5}
                  className={subActive5 ? "subdrop" : ""}
                >
                  <span>People</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive5 ? "block" : "none" }}>
                  <li>
                    <Link to="customers">
                      <span>Customers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="suppliers">
                      <span>Suppliers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="store-list">
                      <span>Branches</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="warehouse">
                      <span>Warehouses</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick6}
                  className={subActive6 ? "subdrop" : ""}
                >
                  <span>Roles &amp; Permissions</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive6 ? "block" : "none" }}>
                  <li>
                    <Link to="roles-permissions">
                      <span>Roles &amp; Permissions</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="delete-account">
                      <span>Delete Account Request</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick7}
                  className={subActive7 ? "subdrop" : ""}
                >
                  <span>Base UI</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive7 ? "block" : "none" }}>
                  <li>
                    <Link to="ui-alerts">Alerts</Link>
                  </li>
                  <li>
                    <Link to="ui-accordion">Accordion</Link>
                  </li>
                  <li>
                    <Link to="ui-avatar">Avatar</Link>
                  </li>
                  <li>
                    <Link to="ui-badges">Badges</Link>
                  </li>
                  <li>
                    <Link to="ui-borders">Border</Link>
                  </li>
                  <li>
                    <Link to="ui-buttons">Buttons</Link>
                  </li>
                  <li>
                    <Link to="ui-buttons-group">Button Group</Link>
                  </li>
                  <li>
                    <Link to="ui-breadcrumb">Breadcrumb</Link>
                  </li>
                  <li>
                    <Link to="ui-cards">Card</Link>
                  </li>
                  <li>
                    <Link to="ui-carousel">Carousel</Link>
                  </li>
                  <li>
                    <Link to="ui-colors">Colors</Link>
                  </li>
                  <li>
                    <Link to="ui-dropdowns">Dropdowns</Link>
                  </li>
                  <li>
                    <Link to="ui-grid">Grid</Link>
                  </li>
                  <li>
                    <Link to="ui-images">Images</Link>
                  </li>
                  <li>
                    <Link to="ui-lightbox">Lightbox</Link>
                  </li>
                  <li>
                    <Link to="ui-media">Media</Link>
                  </li>
                  <li>
                    <Link to="ui-modals">Modals</Link>
                  </li>
                  <li>
                    <Link to="ui-offcanvas">Offcanvas</Link>
                  </li>
                  <li>
                    <Link to="ui-pagination">Pagination</Link>
                  </li>
                  <li>
                    <Link to="ui-popovers">Popovers</Link>
                  </li>
                  <li>
                    <Link to="ui-progress">Progress</Link>
                  </li>
                  <li>
                    <Link to="ui-placeholders">Placeholders</Link>
                  </li>
                  <li>
                    <Link to="ui-rangeslider">Range Slider</Link>
                  </li>
                  <li>
                    <Link to="ui-spinner">Spinner</Link>
                  </li>
                  <li>
                    <Link to="ui-sweetalerts">Sweet Alerts</Link>
                  </li>
                  <li>
                    <Link to="ui-nav-tabs">Tabs</Link>
                  </li>
                  <li>
                    <Link to="ui-toasts">Toasts</Link>
                  </li>
                  <li>
                    <Link to="ui-tooltips">Tooltips</Link>
                  </li>
                  <li>
                    <Link to="ui-typography">Typography</Link>
                  </li>
                  <li>
                    <Link to="ui-video">Video</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick8}
                  className={subActive8 ? "subdrop" : ""}
                >
                  <span>Advanced UI</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive8 ? "block" : "none" }}>
                  <li>
                    <Link to="ui-ribbon">Ribbon</Link>
                  </li>
                  <li>
                    <Link to="ui-clipboard">Clipboard</Link>
                  </li>
                  <li>
                    <Link to="ui-drag-drop">Drag &amp; Drop</Link>
                  </li>
                  <li>
                    <Link to="ui-rangeslider">Range Slider</Link>
                  </li>
                  <li>
                    <Link to="ui-rating">Rating</Link>
                  </li>
                  <li>
                    <Link to="ui-text-editor">Text Editor</Link>
                  </li>
                  <li>
                    <Link to="ui-counter">Counter</Link>
                  </li>
                  <li>
                    <Link to="ui-scrollbar">Scrollbar</Link>
                  </li>
                  <li>
                    <Link to="ui-stickynote">Sticky Note</Link>
                  </li>
                  <li>
                    <Link to="ui-timeline">Timeline</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick9}
                  className={subActive9 ? "subdrop" : ""}
                >
                  <span>Charts</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive9 ? "block" : "none" }}>
                  <li>
                    <Link to="chart-apex">Apex Charts</Link>
                  </li>
                  <li>
                    <Link to="chart-c3">Chart C3</Link>
                  </li>
                  <li>
                    <Link to="chart-js">Chart Js</Link>
                  </li>
                  <li>
                    <Link to="chart-morris">Morris Charts</Link>
                  </li>
                  <li>
                    <Link to="chart-flot">Flot Charts</Link>
                  </li>
                  <li>
                    <Link to="chart-peity">Peity Charts</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick10}
                  className={subActive10 ? "subdrop" : ""}
                >
                  <span>Primary Icons</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive10 ? "block" : "none" }}>
                  <li>
                    <Link to="icon-fontawesome">Fontawesome Icons</Link>
                  </li>
                  <li>
                    <Link to="icon-feather">Feather Icons</Link>
                  </li>
                  <li>
                    <Link to="icon-ionic">Ionic Icons</Link>
                  </li>
                  <li>
                    <Link to="icon-material">Material Icons</Link>
                  </li>
                  <li>
                    <Link to="icon-pe7">Pe7 Icons</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick11}
                  className={subActive11 ? "subdrop" : ""}
                >
                  <span>Secondary Icons</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive11 ? "block" : "none" }}>
                  <li>
                    <Link to="icon-simpleline">Simpleline Icons</Link>
                  </li>
                  <li>
                    <Link to="icon-themify">Themify Icons</Link>
                  </li>
                  <li>
                    <Link to="icon-weather">Weather Icons</Link>
                  </li>
                  <li>
                    <Link to="icon-typicon">Typicon Icons</Link>
                  </li>
                  <li>
                    <Link to="icon-flag">Flag Icons</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick12}
                  className={subActive12 ? "subdrop" : ""}
                >
                  <span> Forms</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive12 ? "block" : "none" }}>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      <span>Form Elements</span>
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="form-basic-inputs">Basic Inputs</Link>
                      </li>
                      <li>
                        <Link to="form-checkbox-radios">
                          Checkbox &amp; Radios
                        </Link>
                      </li>
                      <li>
                        <Link to="form-input-groups">Input Groups</Link>
                      </li>
                      <li>
                        <Link to="form-grid-gutters">Grid &amp; Gutters</Link>
                      </li>
                      <li>
                        <Link to="form-select">Form Select</Link>
                      </li>
                      <li>
                        <Link to="form-mask">Input Masks</Link>
                      </li>
                      <li>
                        <Link to="form-fileupload">File Uploads</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      <span> Layouts</span>
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="form-horizontal">Horizontal Form</Link>
                      </li>
                      <li>
                        <Link to="form-vertical">Vertical Form</Link>
                      </li>
                      <li>
                        <Link to="form-floating-labels">Floating Labels</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="form-validation">Form Validation</Link>
                  </li>
                  <li>
                    <Link to="form-select2">Select2</Link>
                  </li>
                  <li>
                    <Link to="form-wizard">Form Wizard</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick13}
                  className={subActive13 ? "subdrop" : ""}
                >
                  <span>Tables</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive13 ? "block" : "none" }}>
                  <li>
                    <Link to="tables-basic">Basic Tables </Link>
                  </li>
                  <li>
                    <Link to="data-tables">Data Table </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="submenu">
            <Link
              to="#"
              onClick={handleSelectClick5}
              className={isActive5 ? "subdrop" : ""}
            >
              <User />
              <span>Profile</span> <span className="menu-arrow" />
            </Link>
            <ul style={{ display: isActive5 ? "block" : "none" }}>
              <li>
                <Link to="profile">
                  <span>Profile</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick14}
                  className={subActive14 ? "subdrop" : ""}
                >
                  <span>Authentication</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive14 ? "block" : "none" }}>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      Login
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="signin">Cover</Link>
                      </li>
                      <li>
                        <Link to="signin-2">Illustration</Link>
                      </li>
                      <li>
                        <Link to="signin-3">Basic</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      Register
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="register">Cover</Link>
                      </li>
                      <li>
                        <Link to="register-2">Illustration</Link>
                      </li>
                      <li>
                        <Link to="register-3">Basic</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      Forgot Password
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="forgot-password">Cover</Link>
                      </li>
                      <li>
                        <Link to="forgot-password-2">Illustration</Link>
                      </li>
                      <li>
                        <Link to="forgot-password-3">Basic</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      Reset Password
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="reset-password">Cover</Link>
                      </li>
                      <li>
                        <Link to="reset-password-2">Illustration</Link>
                      </li>
                      <li>
                        <Link to="reset-password-3">Basic</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      Email Verification
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="email-verification">Cover</Link>
                      </li>
                      <li>
                        <Link to="email-verification-2">Illustration</Link>
                      </li>
                      <li>
                        <Link to="email-verification-3">Basic</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      2 Step Verification
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="two-step-verification">Cover</Link>
                      </li>
                      <li>
                        <Link to="two-step-verification-2">Illustration</Link>
                      </li>
                      <li>
                        <Link to="two-step-verification-3">Basic</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="lock-screen">Lock Screen</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick15}
                  className={subActive15 ? "subdrop" : ""}
                >
                  <span>Pages</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive15 ? "block" : "none" }}>
                  <li>
                    <Link to="error-404">404 Error </Link>
                  </li>
                  <li>
                    <Link to="error-500">500 Error </Link>
                  </li>
                  <li>
                    <Link to="blank-page">
                      <span>Blank Page</span>{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="coming-soon">
                      <span>Coming Soon</span>{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="under-maintenance">
                      <span>Under Maintenance</span>{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick16}
                  className={subActive16 ? "subdrop" : ""}
                >
                  <span>Places</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive16 ? "block" : "none" }}>
                  <li>
                    <Link to="countries">Countries</Link>
                  </li>
                  <li>
                    <Link to="states">States</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick17}
                  className={subActive17 ? "subdrop" : ""}
                >
                  <span>Employees</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive17 ? "block" : "none" }}>
                  <li>
                    <Link to="employees-grid">
                      <span>Employees</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="department-grid">
                      <span>Departments</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="designation">
                      <span>Designation</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="shift">
                      <span>Shifts</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick18}
                  className={subActive18 ? "subdrop" : ""}
                >
                  <span>Attendence</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive18 ? "block" : "none" }}>
                  <li>
                    <Link to="attendance-employee">Employee Attendence</Link>
                  </li>
                  <li>
                    <Link to="attendance-admin">Admin Attendence</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick19}
                  className={subActive19 ? "subdrop" : ""}
                >
                  <span>Leaves &amp; Holidays</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive19 ? "block" : "none" }}>
                  <li>
                    <Link to="leaves-admin">Admin Leaves</Link>
                  </li>
                  <li>
                    <Link to="leaves-employee">Employee Leaves</Link>
                  </li>
                  <li>
                    <Link to="leave-types">Leave Types</Link>
                  </li>
                  <li>
                    <Link to="holidays">
                      <span>Holidays</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="payroll-list"
                  onClick={handleSubClick20}
                  className={subActive20 ? "subdrop" : ""}
                >
                  <span>Payroll</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive20 ? "block" : "none" }}>
                  <li>
                    <Link to="payroll-list">Employee Salary</Link>
                  </li>
                  <li>
                    <Link to="payslip">Payslip</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="submenu">
            <Link
              to="#"
              onClick={handleSelectClick6}
              className={isActive6 ? "subdrop" : ""}
            >
              <img src="assets/img/icons/printer.svg" alt="img" />
              <span>Reports</span> <span className="menu-arrow" />
            </Link>
            <ul style={{ display: isActive6 ? "block" : "none" }}>
              <li>
                <Link to="sales-report">
                  <span>Sales Report</span>
                </Link>
              </li>
              <li>
                <Link to="purchase-report">
                  <span>Purchase report</span>
                </Link>
              </li>
              <li>
                <Link to="inventory-report">
                  <span>Inventory Report</span>
                </Link>
              </li>
              <li>
                <Link to="invoice-report">
                  <span>Invoice Report</span>
                </Link>
              </li>
              <li>
                <Link to="supplier-report">
                  <span>Supplier Report</span>
                </Link>
              </li>
              <li>
                <Link to="customer-report">
                  <span>Customer Report</span>
                </Link>
              </li>
              <li>
                <Link to="expense-report">
                  <span>Expense Report</span>
                </Link>
              </li>
              <li>
                <Link to="income-report">
                  <span>Income Report</span>
                </Link>
              </li>
              <li>
                <Link to="tax-reports">
                  <span>Tax Report</span>
                </Link>
              </li>
              <li>
                <Link to="profit-and-loss">
                  <span>Profit &amp; Loss</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="submenu">
            <Link
              to="#"
              onClick={handleSelectClick7}
              className={isActive7 ? "subdrop" : ""}
            >
              <img src="assets/img/icons/settings.svg" alt="img" />
              <span> Settings</span> <span className="menu-arrow" />
            </Link>
            <ul style={{ display: isActive7 ? "block" : "none" }}>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick21}
                  className={subActive21 ? "subdrop" : ""}
                >
                  <span>General Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive21 ? "block" : "none" }}>
                  <li>
                    <Link to="general-settings">Profile</Link>
                  </li>
                  <li>
                    <Link to="security-settings">Security</Link>
                  </li>
                  <li>
                    <Link to="notification">Notifications</Link>
                  </li>
                  <li>
                    <Link to="connected-apps">Connected Apps</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick22}
                  className={subActive22 ? "subdrop" : ""}
                >
                  <span>Website Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive22 ? "block" : "none" }}>
                  <li>
                    <Link to="system-settings">System Settings</Link>
                  </li>
                  <li>
                    <Link to="company-settings">Company Settings </Link>
                  </li>
                  <li>
                    <Link to="localization-settings">Localization</Link>
                  </li>
                  <li>
                    <Link to="prefixes">Prefixes</Link>
                  </li>
                  <li>
                    <Link to="preference">Preference</Link>
                  </li>
                  <li>
                    <Link to="appearance">Appearance</Link>
                  </li>
                  <li>
                    <Link to="social-authentication">
                      Social Authentication
                    </Link>
                  </li>
                  <li>
                    <Link to="language-settings">Language</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick23}
                  className={subActive23 ? "subdrop" : ""}
                >
                  <span>App Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive23 ? "block" : "none" }}>
                  <li>
                    <Link to="invoice-settings">Invoice</Link>
                  </li>
                  <li>
                    <Link to="printer-settings">Printer</Link>
                  </li>
                  <li>
                    <Link to="pos-settings">POS</Link>
                  </li>
                  <li>
                    <Link to="custom-fields">Custom Fields</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick23}
                  className={subActive23 ? "subdrop" : ""}
                >
                  <span>System Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive23 ? "block" : "none" }}>
                  <li>
                    <Link to="email-settings">Email</Link>
                  </li>
                  <li>
                    <Link to="sms-gateway">SMS Gateways</Link>
                  </li>
                  <li>
                    <Link to="otp-settings">OTP</Link>
                  </li>
                  <li>
                    <Link to="gdpr-settings">GDPR Cookies</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick24}
                  className={subActive24 ? "subdrop" : ""}
                >
                  <span>Financial Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive24 ? "block" : "none" }}>
                  <li>
                    <Link to="payment-gateway-settings">Payment Gateway</Link>
                  </li>
                  <li>
                    <Link to="bank-settings-grid">Bank Accounts</Link>
                  </li>
                  <li>
                    <Link to="tax-rates">Tax Rates</Link>
                  </li>
                  <li>
                    <Link to="currency-settings">Currencies</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick25}
                  className={subActive25 ? "subdrop" : ""}
                >
                  <span>Other Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive25 ? "block" : "none" }}>
                  <li>
                    <Link to="storage-settings">Storage</Link>
                  </li>
                  <li>
                    <Link to="ban-ip-address">Ban IP Address</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="#">
                  <span>Documentation</span>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <span>Changelog v2.0.3</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSubClick26}
                  className={subActive26 ? "subdrop" : ""}
                >
                  <span>Multi Level</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: subActive26 ? "block" : "none" }}>
                  <li>
                    <Link to="#">Level 1.1</Link>
                  </li>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      Level 1.2
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="#">Level 2.1</Link>
                      </li>
                      <li className="submenu submenu-two submenu-three">
                        <Link to="#">
                          Level 2.2
                          <span className="menu-arrow inside-submenu inside-submenu-two" />
                        </Link>
                        <ul>
                          <li>
                            <Link to="#">Level 3.1</Link>
                          </li>
                          <li>
                            <Link to="#">Level 3.2</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HorizontalSidebar;
