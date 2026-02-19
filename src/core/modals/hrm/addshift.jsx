import React from 'react'
import { Link } from 'react-router-dom'
import TextEditor from '../../../feature-module/inventory/texteditor'
import Select from 'react-select'
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from 'antd';

dayjs.extend(customParseFormat);

const AddShift = () => {
    const onChange = () => {
        // console.log(time, timeString, "timepicker");
      };
    

    const weekoff = [
        { value: 'Choose', label: 'Choose' },
        { value: 'Sunday, Monday', label: 'Sunday, Monday' },
        { value: 'Saturday, Sunday', label: 'Saturday, Sunday' },
        { value: 'Tuesday, Saturday', label: 'Tuesday, Saturday' },
    ];
   
    return (
        <div>
            {/* Add Shift */}
            <div className="modal fade" id="add-units">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Add New Shift</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body custom-modal-body">
                                    <form>
                                        <ul
                                            className="nav nav-pills modal-table-tab"
                                            id="pills-tab"
                                            role="tablist"
                                        >
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link active"
                                                    id="pills-add-shift-info-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-add-shift-info"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-add-shift-info"
                                                    aria-selected="true"
                                                >
                                                    Shift Info
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link"
                                                    id="pills-add-break-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-add-break"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-add-break"
                                                    aria-selected="false"
                                                >
                                                    Break Timings
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-add-shift-info"
                                                role="tabpanel"
                                                aria-labelledby="pills-add-shift-info-tab"
                                            >
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="input-blocks">
                                                            <label>Shift Name</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="input-blocks">
                                                            <label>From</label>
                                                            <div className="form-icon">
                                                            <TimePicker
                                                            className="input-group-text"
                                                            onChange={onChange}
                                                            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                                                          />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="input-blocks">
                                                            <label>To</label>
                                                            <div className="form-icon">
                                                            <TimePicker
                                                            className="input-group-text"
                                                            onChange={onChange}
                                                            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                                                          />
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input-blocks">
                                                            <label>Weekoff</label>
                                                           
                                                            <Select
                                                                className="select"
                                                                options={weekoff}
                                                                placeholder="Newest"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="modal-table-item">
                                                            <h4>Weekdays Defeniton</h4>
                                                            <div className="table-responsive no-pagination">
                                                                <table className="table  datanew">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Days</th>
                                                                            <th className="text-center">Weeks</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="status-toggle modal-status d-flex align-items-center">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id="day1"
                                                                                        className="check"
                                                                                    />
                                                                                    <label
                                                                                        htmlFor="day1"
                                                                                        className="checktoggle"
                                                                                    />
                                                                                    <span className="status-label ms-2">
                                                                                        Monday
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="text-end">
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        All
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        1st
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        2nd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        3rd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        4th
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        5th
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="status-toggle modal-status d-flex align-items-center">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id="day2"
                                                                                        className="check"
                                                                                    />
                                                                                    <label
                                                                                        htmlFor="day2"
                                                                                        className="checktoggle"
                                                                                    />
                                                                                    <span className="status-label ms-2">
                                                                                        Tuesday
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="text-end">
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        All
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        1st
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        2nd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        3rd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        4th
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        5th
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="status-toggle modal-status d-flex align-items-center">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id="day3"
                                                                                        className="check"
                                                                                    />
                                                                                    <label
                                                                                        htmlFor="day3"
                                                                                        className="checktoggle"
                                                                                    />
                                                                                    <span className="status-label ms-2">
                                                                                        Wednesday
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="text-end">
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        All
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        1st
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        2nd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        3rd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        4th
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        5th
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="status-toggle modal-status d-flex align-items-center">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id="day4"
                                                                                        className="check"
                                                                                    />
                                                                                    <label
                                                                                        htmlFor="day4"
                                                                                        className="checktoggle"
                                                                                    />
                                                                                    <span className="status-label ms-2">
                                                                                        Thursday
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="text-end">
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        All
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        1st
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        2nd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        3rd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        4th
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        5th
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="status-toggle modal-status d-flex align-items-center">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id="day5"
                                                                                        className="check"
                                                                                    />
                                                                                    <label
                                                                                        htmlFor="day5"
                                                                                        className="checktoggle"
                                                                                    />
                                                                                    <span className="status-label ms-2">
                                                                                        Friday
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="text-end">
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        All
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        1st
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        2nd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        3rd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        4th
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        5th
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="status-toggle modal-status d-flex align-items-center">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id="day6"
                                                                                        className="check"
                                                                                    />
                                                                                    <label
                                                                                        htmlFor="day6"
                                                                                        className="checktoggle"
                                                                                    />
                                                                                    <span className="status-label ms-2">
                                                                                        Saturday
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="text-end">
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        All
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        1st
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        2nd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        3rd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        4th
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        5th
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="status-toggle modal-status d-flex align-items-center">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id="day7"
                                                                                        className="check"
                                                                                    />
                                                                                    <label
                                                                                        htmlFor="day7"
                                                                                        className="checktoggle"
                                                                                    />
                                                                                    <span className="status-label ms-2">
                                                                                        Sunday
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="text-end">
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        All
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        1st
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        2nd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        3rd
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        4th
                                                                                    </label>
                                                                                    <label className="checkboxs modal-table-check">
                                                                                        <input type="checkbox" />
                                                                                        <span className="checkmarks" />
                                                                                        5th
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="input-blocks custom-form-check">
                                                                <label className="checkboxs modal-table-check">
                                                                    <input type="checkbox" />
                                                                    <span className="checkmarks" />
                                                                    Recurring Shift
                                                                </label>
                                                            </div>
                                                            <div className="input-blocks m-0">
                                                                <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                                    <span className="status-label">Status</span>
                                                                    <input
                                                                        type="checkbox"
                                                                        id="user6"
                                                                        className="check"
                                                                        defaultChecked="true"
                                                                    />
                                                                    <label
                                                                        htmlFor="user6"
                                                                        className="checktoggle mb-0"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="pills-add-break"
                                                role="tabpanel"
                                                aria-labelledby="pills-add-break-tab"
                                            >
                                                <div className="break-title">
                                                    <h4>Morning Break</h4>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="input-blocks">
                                                            <label>From</label>
                                                            <div className="form-icon">
                                                            <TimePicker
                                                            className="input-group-text"
                                                            onChange={onChange}
                                                            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                                                          />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="input-blocks">
                                                            <label>To</label>
                                                            <div className="form-icon">
                                                            <TimePicker
                                                            className="input-group-text"
                                                            onChange={onChange}
                                                            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                                                          />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="break-title">
                                                    <h4>Lunch</h4>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="input-blocks">
                                                            <label>From</label>
                                                            <div className="form-icon">
                                                            <TimePicker
                                                            className="input-group-text"
                                                            onChange={onChange}
                                                            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                                                          />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="input-blocks">
                                                            <label>To</label>
                                                            <div className="form-icon">
                                                            <TimePicker
                                                            className="input-group-text"
                                                            onChange={onChange}
                                                            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                                                          />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="break-title">
                                                    <h4>Evening Break</h4>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="input-blocks">
                                                            <label>From</label>
                                                            <div className="form-icon">
                                                            <TimePicker
                                                            className="input-group-text"
                                                            onChange={onChange}
                                                            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                                                          />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="input-blocks">
                                                            <label>To</label>
                                                            <div className="form-icon">
                                                            <TimePicker
                                                            className="input-group-text"
                                                            onChange={onChange}
                                                            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                                                          />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="input-blocks summer-description-box">
                                                    <label>Description</label>
                                                    <div id="summernote" />
                                                    <TextEditor />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"
                                                data-bs-dismiss="modal"
                                            >
                                                Cancel
                                            </button>
                                            <Link to="submit" className="btn btn-submit">
                                                Submit
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Shift */}
        </div>
    )
}

export default AddShift
