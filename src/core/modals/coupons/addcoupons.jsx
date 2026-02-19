import { DatePicker } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select'

const AddCoupons = () => {
    const price = [
        { value: 'choose', label: 'Choose Type' },
        { value: 'fixed', label: 'Fixed' },
        { value: 'percentage', label: 'Percentage' },
      ];
      const list = [
        { value: 'choose', label: 'Choose' },
        { value: 'nikeJordan', label: 'Nike Jordan' },
        { value: 'amazonEchoDot', label: 'Amazon Echo Dot' },
      ];
      const [selectedDate, setSelectedDate] = useState(new Date());
      const handleDateChange = (date) => {
          setSelectedDate(date);
      };
      const [selectedDate1, setSelectedDate1] = useState(new Date());
      const handleDateChange1 = (date) => {
          setSelectedDate1(date);
      };
  return (
    <div>
       {/* Add coupons */}
  <div className="modal fade" id="add-units">
  <div className="modal-dialog modal-dialog-centered custom-modal-two">
    <div className="modal-content">
      <div className="page-wrapper-new p-0">
        <div className="content">
          <div className="modal-header border-0 custom-modal-header">
            <div className="page-title">
              <h4>Add Coupons</h4>
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
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Code</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                   
                    <Select
                    className="select"
                    options={price}
                    placeholder="Choose Type"
                  />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Discount</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="form-label"> Limit</label>
                    <input type="text" className="form-control" />
                    <span className="unlimited-text">0 for Unlimited</span>
                  </div>
                </div>
                <div className="col-lg-6">
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
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>End Date</label>
                    <div className="input-groupicon calender-input">
                    <DatePicker
                    selected={selectedDate1}
                    onChange={handleDateChange1}
                    type="date"
                    className="filterdatepicker"
                    dateFormat="dd-MM-yyyy"
                    placeholder='20-2-2024'
                />
                    </div>
                  </div>
                </div>
                <div className="input-blocks">
                  <div className="status-toggle modal-status d-flex justify-content-between align-items-center mb-2">
                    <span className="status-label">All Products</span>
                    <div className="d-flex align-items-center">
                      <input type="checkbox" id="user4" className="check" defaultChecked={true}/>
                      <label
                        htmlFor="user4"
                        className="checktoggle mb-0 me-1"
                      />
                      <span className="customer-toggle">
                        Once Per Customer
                      </span>
                    </div>
                  </div>
                  <Select
      className="select"
      options={list}
      placeholder="Choose"
    />
                </div>
                <div className="input-blocks m-0">
                  <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                    <span className="status-label">Status</span>
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
                  Create Coupon
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* /Add Coupons */}
    </div>
  )
}

export default AddCoupons
