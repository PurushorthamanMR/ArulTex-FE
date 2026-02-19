import React from 'react'

const BrandListFilter = () => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="input-blocks">
            <i data-feather="zap" className="info-img" />
            <select className="select">
              <option>Choose Brand</option>
              <option>Lenevo</option>
              <option>Boat</option>
              <option>Nike</option>
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="input-blocks">
          <DatePicker
          selected={selectedDate1}
          onChange={handleDateChange1}
          className="form-control floating datetimepicker"
          type="date"
          dateFormat="dd-MM-yyyy"
        />
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="input-blocks">
            <i data-feather="stop-circle" className="info-img" />
            <select className="select">
              <option>Choose Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12 ms-auto">
          <div className="input-blocks">
            <a className="btn btn-filters ms-auto">
              {" "}
              <i data-feather="search" className="feather-search" />{" "}
              Search{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandListFilter
