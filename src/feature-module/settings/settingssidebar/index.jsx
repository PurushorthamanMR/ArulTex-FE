import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { all_routes } from "../../../Router/all_routes";
import { Link, useLocation } from "react-router-dom";
import {
  Airplay,
  Archive,
  Server,
  Settings,
} from "feather-icons-react/build/IconComponents";
import { CreditCard, Layout } from "react-feather";

const SettingsSideBar = (props) => {
  const route = all_routes;
  const location = useLocation();

  const [isGeneralSettingsOpen, setIsGeneralSettingsOpen] = useState(false);
  const [isWebsiteSettingsOpen, setIsWebsiteSettingsOpen] = useState(false);

  const toggleGeneralSettings = () => {
    setIsGeneralSettingsOpen((prev) => !prev);
    setIsWebsiteSettingsOpen(false);
  };

  const toggleWebsiteSettings = () => {
    setIsWebsiteSettingsOpen((prev) => !prev);
    setIsGeneralSettingsOpen(false);
  };

  const [isAppSettingsOpen, setIsAppSettingsOpen] = useState(false);

  const toggleAppSettings = () => {
    setIsAppSettingsOpen((prev) => !prev);
  };
  const [isSystemSettingsOpen, setIsSystemSettingsOpen] = useState(false);
  const toggleSystemSettings = () => {
    setIsSystemSettingsOpen((prev) => !prev);
  };
  const [isFinancialSettingsOpen, setIsFinancialSettingsOpen] = useState(false);
  const toggleFinancialSettings = () => {
    setIsFinancialSettingsOpen((prev) => !prev);
  };

  const [isOtherSettingsOpen, setIsOtherSettingsOpen] = useState(false);

  const toggleOtherSettings = () => {
    setIsOtherSettingsOpen((prev) => !prev);
  };
  return (
    <div>
      <div
        className="sidebars settings-sidebar theiaStickySidebar"
        id="sidebar2"
      >
        <div className="sidebar-inner slimscroll">
          <Scrollbars
            style={{ width: 255, height: 800 }}
            autoHide
            autoHeight
            autoHeightMin={400} // Set a minimum height for the scrollbar
            {...props}
            // width={100}
            // autoHideTimeout={1000}
            // autoHideDuration={200}
            // autoHeight
            // autoHeightMin={0}
            // autoHeightMax="95vh"
            // thumbMinSize={30}
            // universal={false}
            // hideTracksWhenNotNeeded={true}
          >
            <div id="sidebar-menu5" className="sidebar-menu">
              <ul>
                <li className="submenu-open">
                  <ul>
                    <li
                      className={`submenu${
                        isGeneralSettingsOpen ? "active subdrop" : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleGeneralSettings}>
                        <Settings />
                        <span>General Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                      <ul>
                        <li>
                          <Link
                            to={route.generalsettings}
                            className={
                              location.pathname === route.generalsettings
                                ? "active"
                                : ""
                            }
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.securitysettings}
                            className={
                              location.pathname === route.securitysettings
                                ? "active"
                                : ""
                            }
                          >
                            Security
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.notification}
                            className={
                              location.pathname === route.notification
                                ? "active"
                                : ""
                            }
                          >
                            Notifications
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.connectedapps}
                            className={
                              location.pathname === route.connectedapps
                                ? "active"
                                : ""
                            }
                          >
                            Connected Apps
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={`submenu${
                        isWebsiteSettingsOpen ? "active subdrop" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        onClick={toggleWebsiteSettings}
                        className={`active ${
                          isWebsiteSettingsOpen ? "subdrop" : ""
                        }`}
                      >
                        <Airplay />
                        <span>Website Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                      <ul
                        style={{
                          display: isWebsiteSettingsOpen ? "block" : "none",
                        }}
                      >
                        <li>
                          <Link
                            to={route.systemsettings}
                            className={
                              location.pathname === route.systemsettings
                                ? "active"
                                : ""
                            }
                          >
                            System Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.companysettings}
                            className={
                              location.pathname === route.companysettings
                                ? "active"
                                : ""
                            }
                          >
                            Company Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.localizationsettings}
                            className={
                              location.pathname === route.localizationsettings
                                ? "active"
                                : ""
                            }
                          >
                            Localization
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.prefixes}
                            className={
                              location.pathname === route.prefixes
                                ? "active"
                                : ""
                            }
                          >
                            Prefixes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.preference}
                            className={
                              location.pathname === route.preference
                                ? "active"
                                : ""
                            }
                          >
                            Preference
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.appearance}
                            className={
                              location.pathname === route.appearance
                                ? "active"
                                : ""
                            }
                          >
                            Appearance
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.socialauthendication}
                            className={
                              location.pathname === route.socialauthendication
                                ? "active"
                                : ""
                            }
                          >
                            Social Authentication
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.languagesettings}
                            className={
                              location.pathname === route.languagesettings
                                ? "active"
                                : ""
                            }
                          >
                            Language
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={`submenu${
                        isAppSettingsOpen ? " subdrop" : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleAppSettings}>
                        <Archive />
                        <span>App Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                      <ul
                        style={{
                          display: isAppSettingsOpen ? "block" : "none",
                        }}
                      >
                        <li>
                          <Link
                            to={route.invoicesettings}
                            className={
                              location.pathname === route.invoicesettings
                                ? "active"
                                : ""
                            }
                          >
                            Invoice
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.printersettings}
                            className={
                              location.pathname === route.printersettings
                                ? "active"
                                : ""
                            }
                          >
                            Printer
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.possettings}
                            className={
                              location.pathname === route.possettings
                                ? "active"
                                : ""
                            }
                          >
                            POS
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.customfields}
                            className={
                              location.pathname === route.customfields
                                ? "active"
                                : ""
                            }
                          >
                            Custom Fields
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={`submenu${
                        isSystemSettingsOpen ? " subdrop" : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleSystemSettings}>
                        <Server />
                        <span>System Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                      <ul
                        style={{
                          display: isSystemSettingsOpen ? "block" : "none",
                        }}
                      >
                        <li>
                          <Link
                            to={route.emailsettings}
                            className={
                              location.pathname === route.emailsettings
                                ? "active"
                                : ""
                            }
                          >
                            Email
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.smssettings}
                            className={
                              location.pathname === route.smssettings
                                ? "active"
                                : ""
                            }
                          >
                            SMS Gateways
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.otpsettings}
                            className={
                              location.pathname === route.otpsettings
                                ? "active"
                                : ""
                            }
                          >
                            OTP
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.gdbrsettings}
                            className={
                              location.pathname === route.gdbrsettings
                                ? "active"
                                : ""
                            }
                          >
                            GDPR Cookies
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={`submenu${
                        isFinancialSettingsOpen ? " subdrop" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className={`active ${
                          isFinancialSettingsOpen ? "subdrop" : ""
                        }`}
                        onClick={toggleFinancialSettings}
                      >
                        <CreditCard />
                        <span>Financial Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                      <ul
                        style={{
                          display: isFinancialSettingsOpen ? "block" : "none",
                        }}
                      >
                        <li>
                          <Link
                            to={route.paymentgateway}
                            className={
                              location.pathname === route.paymentgateway
                                ? "active"
                                : ""
                            }
                          >
                            Payment Gateway
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.banksettingslist}
                            className={
                              location.pathname === route.banksettingslist
                                ? "active"
                                : ""
                            }
                          >
                            Bank Accounts
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.taxrates}
                            className={
                              location.pathname === route.taxrates
                                ? "active"
                                : ""
                            }
                          >
                            Tax Rates
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.currencysettings}
                            className={
                              location.pathname === route.currencysettings
                                ? "active"
                                : ""
                            }
                          >
                            Currencies
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={`submenu${
                        isOtherSettingsOpen ? " subdrop" : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleOtherSettings}>
                        <Layout />
                        <span>Other Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                      <ul
                        style={{
                          display: isOtherSettingsOpen ? "block" : "none",
                        }}
                      >
                        <li>
                          <Link
                            to={route.storagesettings}
                            className={
                              location.pathname === route.storagesettings
                                ? "active"
                                : ""
                            }
                          >
                            Storage
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.banipaddress}
                            className={
                              location.pathname === route.banipaddress
                                ? "active"
                                : ""
                            }
                          >
                            Ban IP Address
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};
export default SettingsSideBar;
