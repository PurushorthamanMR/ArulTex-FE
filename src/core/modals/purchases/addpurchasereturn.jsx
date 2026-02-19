import { DatePicker } from 'antd'
import React, { useState } from 'react'
import { PlusCircle } from 'react-feather'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import ImageWithBasePath from '../../img/imagewithbasebath'

const AddPurchaseReturn = () => {
    const suppliers = [
        { value: 'choose', label: 'Choose' },
        { value: 'apexComputers', label: 'Apex Computers' },
        { value: 'modernAutomobile', label: 'Modern Automobile' },
        { value: 'aimInfotech', label: 'AIM Infotech' },
      ];

      const [selectedDate, setSelectedDate] = useState(new Date());
      const handleDateChange = (date) => {
          setSelectedDate(date);
      };
      const status = [
        { value: 'choose', label: 'Choose' },
        { value: 'pending', label: 'Pending' },
        { value: 'received', label: 'Received' },
      ];
    return (
        <div>
            {/*add popup */}
            <div className="modal fade" id="add-sales-new">
                <div className="modal-dialog add-centered">
                    <div className="modal-content">
                        <div className="page-wrapper p-0 m-0">
                            <div className="content p-0">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4> Add Purchase Return</h4>
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
                                <div className="card">
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="input-blocks">
                                                        <label className="form-label">Supplier</label>
                                                        <div className="row">
                                                            <div className="col-lg-10 col-sm-10 col-10">
                                                                
                                                                <Select  className="select" options={suppliers} />
                                                            </div>
                                                            <div className="col-lg-2 col-sm-2 col-2 ps-0">
                                                                <div className="add-icon">
                                                                    <Link to="#" className="choose-add">
                                                                    
                                                                        <PlusCircle className="plus"/>

                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
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
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="input-blocks">
                                                        <label className="form-label">Reference No.</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-sm-6 col-12">
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
                                            </div>
                                            <div className="table-responsive no-pagination">
                                                <table className="table  datanew">
                                                    <thead>
                                                        <tr>
                                                            <th>Image</th>
                                                            <th>Date</th>
                                                            <th>Supplier</th>
                                                            <th>Reference</th>
                                                            <th>Status</th>
                                                            <th>Grand Total ($)</th>
                                                            <th>Paid ($)</th>
                                                            <th>Due ($)</th>
                                                            <th>Payment Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td />
                                                            <td />
                                                            <td />
                                                            <td />
                                                            <td />
                                                            <td />
                                                            <td />
                                                            <td />
                                                            <td />
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 ms-auto">
                                                    <div className="total-order w-100 max-widthauto m-auto mb-4">
                                                        <ul>
                                                            <li>
                                                                <h4>Order Tax</h4>
                                                                <h5>$ 0.00</h5>
                                                            </li>
                                                            <li>
                                                                <h4>Discount</h4>
                                                                <h5>$ 0.00</h5>
                                                            </li>
                                                            <li>
                                                                <h4>Shipping</h4>
                                                                <h5>$ 0.00</h5>
                                                            </li>
                                                            <li>
                                                                <h4>Grand Total</h4>
                                                                <h5>$ 0.00</h5>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-sm-6 col-12">
                                                    <div className="input-blocks">
                                                        <label>Order Tax</label>
                                                        <div className="input-groupicon select-code">
                                                            <input type="text" defaultValue={0} className="p-2" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12">
                                                    <div className="input-blocks">
                                                        <label>Discount</label>
                                                        <div className="input-groupicon select-code">
                                                            <input type="text" defaultValue={0} className="p-2" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12">
                                                    <div className="input-blocks">
                                                        <label>Shipping</label>
                                                        <div className="input-groupicon select-code">
                                                            <input type="text" defaultValue={0} className="p-2" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12">
                                                    <div className="input-blocks mb-5">
                                                        <label>Status</label>
                                                        
                                                        <Select options={status} className="select" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 text-end">
                                                    <button
                                                        type="button"
                                                        className="btn btn-cancel add-cancel me-3"
                                                        data-bs-dismiss="modal"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <Link to="#" className="btn btn-submit add-sale">
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
            </div>
            {/* /add popup */}
        </div>
    )
}

export default AddPurchaseReturn
