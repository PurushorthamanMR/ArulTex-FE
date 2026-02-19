import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../../../core/redux/action";
import SettingsSideBar from "../settingssidebar";

const Notification = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  return (
    <div>
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Settings</h4>
                <h6>Manage your settings on portal</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={() => {
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="settings-page-wrap">
                  <div className="setting-title">
                    <h4>Notification Settings</h4>
                  </div>
                  <div className="security-settings">
                    <ul>
                      <li>
                        <div className="security-type">
                          <div className="security-title">
                            <h5>Mobile Push Notifications</h5>
                          </div>
                        </div>
                        <div className="status-toggle modal-status">
                          <input
                            type="checkbox"
                            id="user1"
                            className="check"
                            defaultChecked="true"
                          />
                          <label htmlFor="user1" className="checktoggle">
                            {" "}
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="security-type">
                          <div className="security-title">
                            <h5>Desktop Notifications</h5>
                          </div>
                        </div>
                        <div className="status-toggle modal-status">
                          <input
                            type="checkbox"
                            id="user2"
                            className="check"
                            defaultChecked="true"
                          />
                          <label htmlFor="user2" className="checktoggle">
                            {" "}
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="security-type">
                          <div className="security-title">
                            <h5>Email Notifications</h5>
                          </div>
                        </div>
                        <div className="status-toggle modal-status">
                          <input
                            type="checkbox"
                            id="user3"
                            className="check"
                            defaultChecked="true"
                          />
                          <label htmlFor="user3" className="checktoggle">
                            {" "}
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="security-type">
                          <div className="security-title">
                            <h5>MSMS Notifications</h5>
                          </div>
                        </div>
                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
                          <input
                            type="checkbox"
                            id="user4"
                            className="check"
                            defaultChecked="true"
                          />
                          <label htmlFor="user4" className="checktoggle">
                            {" "}
                          </label>
                        </div>
                      </li>
                    </ul>
                    <div className="table-responsive no-pagination">
                      <table className="table  datanew">
                        <thead>
                          <tr>
                            <th>General Notification</th>
                            <th>Push</th>
                            <th>SMS</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody className="custom-table-data">
                          <tr>
                            <td>Legendary</td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="users4"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label htmlFor="users4" className="checktoggle">
                                  {" "}
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="users5"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label htmlFor="users5" className="checktoggle">
                                  {" "}
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="users6"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label htmlFor="users6" className="checktoggle">
                                  {" "}
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Transaction</td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user5"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label htmlFor="user5" className="checktoggle">
                                  {" "}
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user6"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label htmlFor="user6" className="checktoggle">
                                  {" "}
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user7"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label htmlFor="user7" className="checktoggle">
                                  {" "}
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Email Verification</td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user8"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user8"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user9"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user9"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user10"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user10"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>OTP</td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user11"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user11"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user12"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user12"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user13"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user13"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Activity</td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user14"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user14"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user15"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user15"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user16"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user16"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Account</td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user17"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user17"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user18"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user18"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="status-toggle modal-status">
                                <input
                                  type="checkbox"
                                  id="user19"
                                  className="check"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="user19"
                                  className="checktoggle"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="text-end settings-bottom-btn">
                        <Link to="#" className="btn btn-cancel me-2">
                          Reset
                        </Link>
                        <Link
                          to={route.generalsettings}
                          className="btn btn-submit"
                        >
                          Save Changes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
