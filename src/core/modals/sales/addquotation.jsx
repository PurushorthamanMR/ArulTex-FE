import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextEditor from '../../../feature-module/inventory/texteditor'
import ImageWithBasePath from '../../img/imagewithbasebath'
import Select from 'react-select'
import { DatePicker } from 'antd'

const AddQuotation = () => {
    const customer = [
        { value: 'Choose', label: 'Choose' },
        { value: 'Benjamin', label: 'Benjamin' },
        { value: 'Nydia Fitzgerald', label: 'Nydia Fitzgerald' },
    ];
    const choose = [
        { value: 'Choose', label: 'Choose' },
    ];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <div>
            {/*Add Quotation */}
            <div className="modal fade" id="add-units">
                <div className="modal-dialog purchase modal-dialog-centered stock-adjust-modal">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Add Quotation</h4>
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
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="input-blocks add-product">
                                                    <label>Customer Name</label>
                                                    <div className="row">
                                                        <div className="col-lg-10 col-sm-10 col-10">

                                                            <Select
                                                                className="select"
                                                                options={customer}
                                                                placeholder="Choose Brand"
                                                            />
                                                        </div>
                                                        <div className="col-lg-2 col-sm-2 col-2 p-0">
                                                            <div className="add-icon tab">
                                                                <a
                                                                    className="btn btn-filter"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#add-units"
                                                                >
                                                                    <ImageWithBasePath src="assets/img/icons/plus1.svg" alt="img" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="input-blocks">
                                                    <label>Date</label>
                                                    <div className="input-groupicon calender-input">
                                                        <DatePicker
                                                            selected={selectedDate}
                                                            onChange={handleDateChange}
                                                            type="date"
                                                            className="filterdatepicker"
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholder='Choose Date'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="input-blocks">
                                                    <label>Reference Number</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input-blocks">
                                                    <label>Product Name</label>
                                                    <div className="input-groupicon select-code">
                                                        <input
                                                            type="text"
                                                            placeholder="Please type product code and select"
                                                        />
                                                        <div className="addonset">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/qrcode-scan.svg"
                                                                alt="img"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="modal-body-table">
                                                    <div className="table-responsive">
                                                        <table className="table  datanew">
                                                            <thead>
                                                                <tr>
                                                                    <th>Product</th>
                                                                    <th>Qty</th>
                                                                    <th>Purchase Price($)</th>
                                                                    <th>Discount($)</th>
                                                                    <th>Tax(%)</th>
                                                                    <th>Tax Amount($)</th>
                                                                    <th>Unit Cost($)</th>
                                                                    <th>Total Cost(%)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr style={{ background: "#ffffff" }}>
                                                                    <td className="p-5"></td>
                                                                    <td className="p-5"></td>
                                                                    <td className="p-5"></td>
                                                                    <td className="p-5"></td>
                                                                    <td className="p-5"></td>
                                                                    <td className="p-5"></td>
                                                                    <td className="p-5"></td>
                                                                    <td className="p-5"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-6 col-sm-12">
                                                    <div className="input-blocks mb-3">
                                                        <label>Order Tax</label>
                                                        <input type="text" defaultValue={true} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-12">
                                                    <div className="input-blocks mb-3">
                                                        <label>Discount</label>
                                                        <input type="text" defaultValue={true} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-12">
                                                    <div className="input-blocks mb-3">
                                                        <label>Shipping</label>
                                                        <input type="text" defaultValue={true} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-12">
                                                    <div className="input-blocks mb-3">
                                                        <label>Status</label>
                                                        <Select
                                                        className="select"
                                                        options={choose}
                                                        placeholder="Choose"
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-blocks summer-description-box">
                                                <label>Description</label>
                                                <div id="summernote" /><TextEditor />
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
        </div>
    )
}

export default AddQuotation
