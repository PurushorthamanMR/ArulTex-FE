import { DatePicker } from "antd";
import { ChevronUp, Info } from "feather-icons-react/build/IconComponents";
import ArrowLeft from "feather-icons-react/build/IconComponents/ArrowLeft";
import React, { useState } from "react";
import { PlusCircle } from "react-feather";
import { Link } from "react-router-dom";
import Select from "react-select";
import { all_routes } from "../../Router/all_routes";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { setToogleHeader } from "../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";

const EditEmployee = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const handleToggleConfirmPassword = () => {
    setConfirmPassword((prevShowPassword) => !prevShowPassword);
  };
  const gender = [
    { value: "Choose", label: "Choose" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const nationality = [
    { value: "Choose", label: "Choose" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "India", label: "India" },
  ];
  const types = [
    { value: "Choose", label: "Choose" },
    { value: "Regular", label: "Regular" },
  ];
  const departments = [
    { value: "Choose", label: "Choose" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "Support", label: "Support" },
    { value: "HR", label: "HR" },
    { value: "Engineering", label: "Engineering" },
  ];
  const designation = [
    { value: "Choose", label: "Choose" },
    { value: "Designer", label: "Designer" },
    { value: "Developer", label: "Developer" },
    { value: "Tester", label: "Tester" },
  ];
  const bloodgroup = [
    { value: "Select", label: "Select" },
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B-" },
    { value: "O+", label: "O-" },
    { value: "O+", label: "O-" },
    { value: "AB+", label: "AB-" },
    { value: "AB+", label: "AB-" },
  ];
  const country = [
    { value: "Choose", label: "Choose" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "USA", label: "USA" },
  ];
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Edit Employee</h4>
                <h6>Edit Employee</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <div className="page-btn">
                  <Link to={route.employeegrid} className="btn btn-secondary">
                    <ArrowLeft className="me-2" />
                    Back to Employee List
                  </Link>
                </div>
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
          {/* /product list */}
          <form>
            <div className="card">
              <div className="card-body">
                <div className="new-employee-field">
                  <div className="card-title-head">
                    <h6>
                      <span>
                        <Info className="feather-edit" />
                      </span>
                      Employee Information
                    </h6>
                  </div>
                  <div className="profile-pic-upload">
                    <div className="profile-pic">
                      <span>
                        <PlusCircle className="plus-down-add" />
                        Profile Photo
                      </span>
                    </div>
                    <div className="input-blocks mb-0">
                      <div className="image-upload mb-0">
                        <input type="file" />
                        <div className="image-uploads">
                          <h4>Change Image</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Emp Code</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="input-blocks">
                        <label>Date of Birth</label>
                        <div className="input-groupicon calender-input">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            type="date"
                            className="filterdatepicker"
                            dateFormat="dd-MM-yyyy"
                            placeholder="Choose Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Gender</label>

                        <Select
                          className="select"
                          options={gender}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Nationality</label>

                        <Select
                          className="select"
                          options={nationality}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="input-blocks">
                        <label>Joining Date</label>
                        <div className="input-groupicon calender-input">
                          <DatePicker
                            selected={selectedDate1}
                            onChange={handleDateChange1}
                            type="date"
                            className="filterdatepicker"
                            dateFormat="dd-MM-yyyy"
                            placeholder="Choose Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <div className="add-newplus">
                          <label className="form-label">Shift</label>
                          <Link to="#">
                            <span>
                              <PlusCircle className="plus-down-add" />
                              Add new
                            </span>
                          </Link>
                        </div>

                        <Select
                          className="select"
                          options={types}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Department</label>

                        <Select
                          className="select"
                          options={departments}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Designation</label>

                        <Select
                          className="select"
                          options={designation}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Blood Group</label>
                        <Select
                          className="select"
                          options={bloodgroup}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="other-info">
                    <div className="card-title-head">
                      <h6>
                        <span>
                          <Info className="feather-edit" />
                        </span>
                        Other Information
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Emergency No 1</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Emergency No 2</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6"></div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Country</label>

                          <Select
                            className="select"
                            options={country}
                            placeholder="Select"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Zipcode</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pass-info">
                    <div className="card-title-head">
                      <h6>
                        <span>
                          <Info />
                        </span>
                        Password
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="input-blocks mb-md-0 mb-sm-3">
                          <label>Password</label>
                          <div className="pass-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="pass-input"
                              placeholder="Enter your password"
                            />
                            <span
                              className={`fas toggle-password ${
                                showPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                              onClick={handleTogglePassword}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="input-blocks mb-0">
                          <label>Confirm Password</label>
                          <div className="pass-group">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="pass-input"
                              placeholder="Enter your password"
                            />
                            <span
                              className={`fas toggle-password ${
                                showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                              onClick={handleToggleConfirmPassword}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /product list */}
            <div className="text-end mb-3">
              <button type="button" className="btn btn-cancel me-2">
                Cancel
              </button>
              <Link to="#" className="btn btn-submit">
                Save Product
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
