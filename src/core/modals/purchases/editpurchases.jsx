import { DatePicker } from 'antd';
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import TextEditor from '../../../feature-module/inventory/texteditor';

const EditPurchases = () => {

    const status = [
        { value: 'choose', label: 'Choose' },
        { value: 'received', label: 'Received' },
        { value: 'pending', label: 'Pending' },
    ];
    const productlist = [
        { value: 'choose', label: 'Choose' },
        { value: 'Shoe', label: 'Shoe' },
        { value: 'Mobile', label: 'Mobile' },
    ];
    const customers = [
        { value: 'Select Customer', label: 'Select Customer' },
        { value: 'Apex Computers', label: 'Apex Computers' },
        { value: 'Dazzle Shoes', label: 'Dazzle Shoes' },
        { value: 'Best Accessories', label: 'Best Accessories' },
    ];

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            {/* Add Purchase */}
            <div className="modal fade" id="edit-units">
                <div className="modal-dialog purchase modal-dialog-centered stock-adjust-modal">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Add Purchase</h4>
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
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="input-blocks add-product">
                                                    <label>Supplier Name</label>
                                                    <div className="row">
                                                        <div className="col-lg-10 col-sm-10 col-10">

                                                            <Select options={customers} className="select" placeholder="Choose" />

                                                        </div>
                                                        <div className="col-lg-2 col-sm-2 col-2 ps-0">
                                                            <div className="add-icon tab">
                                                                <Link to="#">
                                                                    <PlusCircle className="feather-plus-circles"/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="input-blocks">
                                                    <label>Purchase Date</label>
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
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="input-blocks">
                                                    <label>Product Name</label>
                                                    <Select options={productlist} className="select" placeholder="Choose" />

                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="input-blocks">
                                                    <label>Reference No</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input-blocks">
                                                    <label>Product Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Please type product code and select"
                                                    />
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
                                                                <tr>
                                                                    <td className="p-5" />
                                                                    <td className="p-5" />
                                                                    <td className="p-5" />
                                                                    <td className="p-5" />
                                                                    <td className="p-5" />
                                                                    <td className="p-5" />
                                                                    <td className="p-5" />
                                                                    <td className="p-5" />
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-6 col-sm-12">
                                                    <div className="input-blocks">
                                                        <label>Order Tax</label>
                                                        <input type="text" defaultValue={0} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-12">
                                                    <div className="input-blocks">
                                                        <label>Discount</label>
                                                        <input type="text" defaultValue={0} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-12">
                                                    <div className="input-blocks">
                                                        <label>Shipping</label>
                                                        <input type="text" defaultValue={0} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-12">
                                                    <div className="input-blocks">
                                                        <label>Status</label>
                                                        <Select options={status} className="select" placeholder="Choose" />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-blocks summer-description-box">
                                                <label>Notes</label>
                                                <div id="summernote" /> 
                                                <TextEditor />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Purchase */}
        </div>
    )
}

export default EditPurchases
