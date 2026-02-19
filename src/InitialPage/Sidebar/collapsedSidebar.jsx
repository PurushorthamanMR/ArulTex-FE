import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";

const CollapsedSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive6, setIsActive6] = useState(false);
  const [isActive7, setIsActive7] = useState(false);

  const handleSelectClick = () => {
    setIsActive(!isActive);
  };
  const handleSelectClick2 = () => {
    setIsActive2(!isActive2);
  };
  const handleSelectClick3 = () => {
    setIsActive3(!isActive3);
  };
  const handleSelectClick4 = () => {
    setIsActive4(!isActive4);
  };
  const handleSelectClick5 = () => {
    setIsActive5(!isActive5);
  };
  const handleSelectClick6 = () => {
    setIsActive6(!isActive6);
  };
  const handleSelectClick7 = () => {
    setIsActive7(!isActive7);
  };

  return (
    <div className="sidebar collapsed-sidebar" id="collapsed-sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu-2" className="sidebar-menu sidebar-menu-three">
          <aside id="aside" className="ui-aside">
            <ul className="tab nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link"
                  to="#home"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  role="tab"
                  aria-selected="true"
                >
                  <ImageWithBasePath src="assets/img/icons/menu-icon.svg" alt="img" />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link"
                  to="#messages"
                  id="messages-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#product"
                  role="tab"
                  aria-selected="false"
                >
                  <ImageWithBasePath src="assets/img/icons/product.svg" alt="img" />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link"
                  to="#profile"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#sales"
                  role="tab"
                  aria-selected="false"
                >
                  <ImageWithBasePath src="assets/img/icons/sales1.svg" alt />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link"
                  to="#reports"
                  id="report-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#purchase"
                  role="tab"
                  aria-selected="true"
                >
                  <ImageWithBasePath src="assets/img/icons/purchase1.svg" alt />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link"
                  to="#set"
                  id="set-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#user"
                  role="tab"
                  aria-selected="true"
                >
                  <ImageWithBasePath src="assets/img/icons/users1.svg" alt />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link"
                  to="#set2"
                  id="set-tab2"
                  data-bs-toggle="tab"
                  data-bs-target="#employee"
                  role="tab"
                  aria-selected="true"
                >
                  <ImageWithBasePath src="assets/img/icons/calendars.svg" alt />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link active"
                  to="#set3"
                  id="set-tab3"
                  data-bs-toggle="tab"
                  data-bs-target="#report"
                  role="tab"
                  aria-selected="true"
                >
                  <ImageWithBasePath src="assets/img/icons/printer.svg" alt="" />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link"
                  to="#set4"
                  id="set-tab4"
                  data-bs-toggle="tab"
                  data-bs-target="#document"
                  role="tab"
                  aria-selected="true"
                >
                  <i data-feather="user" />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link"
                  to="#set5"
                  id="set-tab6"
                  data-bs-toggle="tab"
                  data-bs-target="#permission"
                  role="tab"
                  aria-selected="true"
                >
                  <i data-feather="file-text" />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className="tablinks nav-link"
                  to="#set6"
                  id="set-tab5"
                  data-bs-toggle="tab"
                  data-bs-target="#settings"
                  role="tab"
                  aria-selected="true"
                >
                  <i data-feather="settings" />
                </Link>
              </li>
            </ul>
          </aside>
          <div className="tab-content tab-content-four pt-2">
            <ul className="tab-pane" id="home" aria-labelledby="home-tab">
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSelectClick}
                  className={isActive ? "subdrop" : ""}
                >
                  <span>Dashboard</span> <span className="menu-arrow" />
                </Link>
                <ul style={{ display: isActive ? "block" : "none" }}>
                  <li>
                    <Link to="index">Admin Dashboard</Link>
                  </li>
                  <li>
                    <Link to="sales-dashboard">Sales Dashboard</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSelectClick2}
                  className={isActive2 ? "subdrop" : ""}
                >
                  <span>Application</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: isActive2 ? "block" : "none" }}>
                  <li>
                    <Link to="chat">Chat</Link>
                  </li>
                  <li className="submenu submenu-two">
                    <Link
                      to="#"
                      onClick={handleSelectClick7}
                      className={isActive7 ? "subdrop" : ""}
                    >
                      <span>Call</span>
                      <span className="menu-arrow inside-submenu" />
                    </Link>
                    <ul style={{ display: isActive7 ? "block" : "none" }}>
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
            <ul
              className="tab-pane"
              id="product"
              aria-labelledby="messages-tab"
            >
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
            <ul className="tab-pane" id="sales" aria-labelledby="profile-tab">
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
            <ul className="tab-pane" id="purchase" aria-labelledby="report-tab">
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
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSelectClick3}
                  className={isActive3 ? "subdrop" : ""}
                >
                  <span>Expenses</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: isActive3 ? "block" : "none" }}>
                  <li>
                    <Link to="expense-list">Expenses</Link>
                  </li>
                  <li>
                    <Link to="expense-category">Expense Category</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="tab-pane" id="user" aria-labelledby="set-tab">
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
            <ul className="tab-pane" id="employee" aria-labelledby="set-tab2">
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
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSelectClick4}
                  className={isActive4 ? "subdrop" : ""}
                >
                  <span>Attendence</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: isActive4 ? "block" : "none" }}>
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
                  onClick={handleSelectClick5}
                  className={isActive5 ? "subdrop" : ""}
                >
                  <span>Leaves</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: isActive5 ? "block" : "none" }}>
                  <li>
                    <Link to="leaves-admin">Admin Leaves</Link>
                  </li>
                  <li>
                    <Link to="leaves-employee">Employee Leaves</Link>
                  </li>
                  <li>
                    <Link to="leave-types">Leave Types</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="holidays">
                  <span>Holidays</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  onClick={handleSelectClick6}
                  className={isActive6 ? "subdrop" : ""}
                >
                  <span>Payroll</span>
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: isActive6 ? "block" : "none" }}>
                  <li>
                    <Link to="payroll-list">Employee Salary</Link>
                  </li>
                  <li>
                    <Link to="payslip">Payslip</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul
              className="tab-pane active"
              id="report"
              aria-labelledby="set-tab3"
            >
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
                <Link to="expense-report" className="active">
                  <span>Expense Report</span>
                </Link>
              </li>
              <li>
                <Link to="income-report">
                  <span>Income Report</span>
                </Link>
              </li>
              <li>
                <Link to="tax-report">
                  <span>Tax Report</span>
                </Link>
              </li>
              <li>
                <Link to="profit-and-loss">
                  <span>Profit &amp; Loss</span>
                </Link>
              </li>
            </ul>
            <ul className="tab-pane" id="permission" aria-labelledby="set-tab4">
              <li>
                <Link to="users">
                  <span>Users</span>
                </Link>
              </li>
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
              <li className="submenu">
                <Link to="#">
                  <span>Base UI</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>Advanced UI</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>Charts</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>Icons</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>Forms</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
                  <li className="submenu submenu-two">
                    <Link to="#">
                      Form Elements
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
                      Layouts
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
                <Link to="#">
                  <span>Tables</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
                  <li>
                    <Link to="tables-basic">Basic Tables </Link>
                  </li>
                  <li>
                    <Link to="data-tables">Data Table </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="tab-pane" id="document" aria-labelledby="set-tab5">
              <li>
                <Link to="profile">
                  <span>Profile</span>
                </Link>
              </li>
              <li className="submenu">
                <Link to="#">
                  <span>Authentication</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>Error Pages</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
                  <li>
                    <Link to="error-404">404 Error </Link>
                  </li>
                  <li>
                    <Link to="error-500">500 Error </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#">
                  <span>Places</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
                  <li>
                    <Link to="countries">Countries</Link>
                  </li>
                  <li>
                    <Link to="states">States</Link>
                  </li>
                </ul>
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
                  <span>Under Maintenance</span>
                </Link>
              </li>
            </ul>
            <ul className="tab-pane" id="settings" aria-labelledby="set-tab6">
              <li className="submenu">
                <Link to="#">
                  <span>General Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>Website Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>App Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>System Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>Financial Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>Other Settings</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
                <Link to="#">
                  <span>Multi Level</span>
                  <span className="menu-arrow" />
                </Link>
                <ul>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapsedSidebar;
