import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextEditor from '../../../feature-module/inventory/texteditor'
import Select from 'react-select'
import { DatePicker } from 'antd'

const EditLeaveEmployee = () => {
    const leavetype = [
        { value: 'Choose Status', label: 'Choose Status' },
        { value: 'Full Day', label: 'Full Day' },
        { value: 'Half Day', label: 'Half Day' },
    ];
    const leavetype1 = [
        { value: 'Choose Status', label: 'Choose Status' },
        { value: 'Full Day', label: 'Full Day' },
        { value: 'Half Day', label: 'Half Day' },
    ];
    const leaves = [
        { value: 'Choose', label: 'Choose' },
        { value: 'Sick Leave', label: 'Sick Leave' },
        { value: 'Paternity', label: 'Paternity' },
    ];
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <div>
            {/* Add Leave */}
            <div className="modal fade" id="edit-units">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Edit Leave</h4>
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
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input-blocks">
                                                    <label>Start Date</label>
                                                    <div className="input-groupicon calender-input">
                                                        <DatePicker
                                                            selected={selectedDate}
                                                            onChange={handleDateChange}
                                                            type="date"
                                                            className="filterdatepicker"
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholder='20-2-2024'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Select Leave Type </label>

                                                    <Select
                                                        className="select"
                                                        options={leaves}
                                                        placeholder="Sick Leave"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="apply-leave">
                                                    <div className="leave-apply">
                                                        <div className="leave-date">
                                                            <span>Day 1</span>
                                                            <p>16 Aug 2023</p>
                                                        </div>
                                                        <div className="leave-time">
                                                            <div className="input-blocks mb-0">
                                                                <Select
                                                                    className="select"
                                                                    options={leavetype1}
                                                                    placeholder="Full Day"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="leave-apply">
                                                        <div className="leave-date">
                                                            <span>Day 1</span>
                                                            <p>16 Aug 2023</p>
                                                        </div>
                                                        <div className="leave-time">
                                                            <div className="input-blocks mb-0">

                                                                <Select
                                                                    className="select"
                                                                    options={leavetype}
                                                                    placeholder="Full Day"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3 summer-description-box mb-0">
                                                    <label className="form-label">Reason</label>
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
                                            <Link to="#" className="btn btn-submit">
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
            {/* /Add Leave */}
        </div>
    )
}

export default EditLeaveEmployee