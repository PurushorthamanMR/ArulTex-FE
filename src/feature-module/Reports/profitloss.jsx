import React, { useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { DatePicker } from "antd";
import Breadcrumbs from "../../core/breadcrumbs";
import { Link } from "react-router-dom";

const ProfitLoss = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const initialSettings = {
    endDate: new Date("2020-08-11T12:30:00.000Z"),
    ranges: {
      "Last 30 Days": [
        new Date("2020-07-12T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last 7 Days": [
        new Date("2020-08-04T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last Month": [
        new Date("2020-06-30T18:30:00.000Z"),
        new Date("2020-07-31T18:29:59.999Z"),
      ],
      "This Month": [
        new Date("2020-07-31T18:30:00.000Z"),
        new Date("2020-08-31T18:29:59.999Z"),
      ],
      Today: [
        new Date("2020-08-10T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      Yesterday: [
        new Date("2020-08-09T04:57:17.076Z"),
        new Date("2020-08-09T04:57:17.076Z"),
      ],
    },
    startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
    timePicker: false,
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Profit & Loss Report"
          subtitle="Manage Your Profit & Loss Report"
        />
        <div className="card table-list-card border-0 mb-0">
          <div className="card-body mb-3">
            <div className="table-top mb-0 profit-table-top">
              <div className="search-path profit-head ">
                <div className="input-blocks mb-0">
                  <i data-feather="calendar" className="info-img" />
                  <div className="input-groupicon">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      className="form-control floating datetimepicker"
                      type="date"
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                </div>
              </div>
              <div className="position-relative daterange-wraper input-blocks mb-0">
                <DateRangePicker initialSettings={initialSettings}>
                  <input
                    className="form-control col-4 input-range"
                    type="text"
                    style={{ border: "none" }}
                  />
                </DateRangePicker>
              </div>
              <div className="date-btn">
                <Link
                  href="#"
                  className="btn btn-secondary d-flex align-items-center"
                >
                  <i
                    data-feather="database"
                    className="feather-14 info-img me-2"
                  />
                  Display Date
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table profit-table">
            <thead className="profit-table-bg">
              <tr>
                <th className="no-sort"></th>
                <th>Jan 2023</th>
                <th>Feb 2023</th>
                <th>Mar 2023</th>
                <th>Apr 2023</th>
                <th>May 2023</th>
                <th>Jun 2023</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-heading">
                <td>Income</td>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Sales</td>
                <td>$4,02,124.00</td>
                <td>$3,05,178.00</td>
                <td>$5,61,639.00</td>
                <td>$2,46,123.00</td>
                <td>$2,16,836.00</td>
                <td>$3,40,472.00</td>
              </tr>
              <tr>
                <td>Service</td>
                <td>$2,12,464.00</td>
                <td>$1,04,627.00</td>
                <td>$3,47,273.00</td>
                <td>$3,51,749.00</td>
                <td>$2,62,743.00</td>
                <td>$2,71,837.00</td>
              </tr>
              <tr>
                <td>Purchase Return</td>
                <td>$3,06,386.00</td>
                <td>$2,61,738.00</td>
                <td>$2,82,463.00</td>
                <td>$2,45,280.00</td>
                <td>$2,16,383.00</td>
                <td>$2,73,843.00</td>
              </tr>
              <tr className="profit-table-bg">
                <td>Gross Profit</td>
                <td>$1,45,547.00</td>
                <td>$2,62,813.00</td>
                <td>$2,74,832.00</td>
                <td>$2,52,725.00</td>
                <td>$2,57,248.00</td>
                <td>$2,94,270.00</td>
              </tr>
              <tr className="table-heading">
                <td>Expenses</td>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Sales</td>
                <td>$4,02,124.00</td>
                <td>$3,05,178.00</td>
                <td>$5,61,639.00</td>
                <td>$2,46,123.00</td>
                <td>$2,16,836.00</td>
                <td>$3,40,472.00</td>
              </tr>
              <tr>
                <td>Purrchase</td>
                <td>$1,45,547.00</td>
                <td>$2,62,813.00</td>
                <td>$2,74,832.00</td>
                <td>$2,52,725.00</td>
                <td>$2,57,248.00</td>
                <td>$2,94,270.00</td>
              </tr>
              <tr className="profit-table-bg">
                <td>Sales Return</td>
                <td>$4,02,124.00</td>
                <td>$3,05,178.00</td>
                <td>$5,61,639.00</td>
                <td>$2,46,123.00</td>
                <td>$2,16,836.00</td>
                <td>$3,40,472.00</td>
              </tr>
              <tr className="profit-table-bg">
                <td>Total Expense</td>
                <td>$2,58,136.00</td>
                <td>$1,38,471.00</td>
                <td>$2,61,682.00</td>
                <td>$2,16,747.00</td>
                <td>$2,79,328.00</td>
                <td>$2,94,840.00</td>
              </tr>
              <tr className="profit-table-bg">
                <td>Net Profit</td>
                <td>$2,69,276.00</td>
                <td>$2,75,638.00</td>
                <td>$2,51,629.00</td>
                <td>$1,36,836.00</td>
                <td>$2,05,634.00</td>
                <td>$1,32,951.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
