import React, { useState } from "react";
import Select from "react-select";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Filter, Sliders, User, Phone, Eye, Trash2 } from "react-feather";

import { Link } from "react-router-dom";
import Breadcrumbs from "../../core/breadcrumbs";
import Table from "../../core/pagination/datatable";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Callhistory = () => {
  const data = useSelector((state) => state.callhistory_data);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
  ];

  const optionsCalls = [
    { value: "all", label: "All Calls" },
    { value: "missed", label: "Missed Calls" },
    { value: "outgoing", label: "Outgoing Calls" },
    { value: "incoming", label: "Incoming Calls" },
  ];

  const optionsNames = [
    { value: "thomas", label: "Thomas" },
    { value: "rose", label: "Rose" },
  ];

  const columns = [
    // {
    //   render: () => (
    //     <label className="checkboxs">
    //       <input type="checkbox" />
    //       <span className="checkmarks" />
    //     </label>
    //   ),
    // },

    {
      title: "UserName",
      dataIndex: "username",
      render: (text, record) => (
        <span className="productimgname">
          <Link to="#" className="product-img stock-img">
            <ImageWithBasePath alt="" src={record.image_url} />
          </Link>
          <Link to="#">{text}</Link>
        </span>
      ),
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
    },

    {
      title: "Call Type",
      dataIndex: "call_type",
      sorter: (a, b) => a.call_type.length - b.call_type.length,
    },

    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },

    {
      title: "Duration",
      dataIndex: "duration",
      sorter: (a, b) => a.duration.length - b.duration.length,
    },
    {
      title: "Date & Time",
      dataIndex: "date_time",
      sorter: (a, b) => a.duration.length - b.duration.length,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <div className="input-block add-lists"></div>

            <Link className="me-2 p-2" to="#">
              <Eye className="feather-view" />
            </Link>

            <Link
              className="confirm-text p-2"
              to="#"
              onClick={showConfirmationAlert}
            >
              <Trash2 className="feather-trash-2" />
            </Link>
          </div>
        </td>
      ),
      sorter: (a, b) => a.createdby.length - b.createdby.length,
    },
  ];

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          className: "btn btn-success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else {
        MySwal.close();
      }
    });
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs maintitle="Call History" subtitle="Manage your products" />

        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control form-control-sm formsearch"
                  />
                  <Link to className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
              <div className="search-path">
                <Link
                  className={`btn btn-filter ${
                    isFilterVisible ? "setclose" : ""
                  }`}
                  id="filter_search"
                >
                  <Filter
                    className="filter-icon"
                    onClick={toggleFilterVisibility}
                  />
                  <span onClick={toggleFilterVisibility}>
                    <ImageWithBasePath
                      src="assets/img/icons/closes.svg"
                      alt="img"
                    />
                  </span>
                </Link>
              </div>
              <div className="form-sort">
                <Sliders className="info-img" />
                <Select
                  className="select stylewidth"
                  options={options}
                  placeholder="Sort By Date"
                />
              </div>
            </div>
            {/* /Filter */}
            <div
              className={`card${isFilterVisible ? " visible" : ""}`}
              id="filter_inputs"
              style={{ display: isFilterVisible ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="input-blocks">
                          <User className="info-img" />
                          <Select
                            className="select"
                            options={optionsNames}
                            placeholder="Choose Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Phone className="info-img" />
                          <Select
                            className="select"
                            options={optionsCalls}
                            placeholder="Choose Calls"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Link className="btn btn-filters ms-auto">
                            {" "}
                            <i
                              data-feather="search"
                              className="feather-search"
                            />{" "}
                            Search{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive product-list">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default Callhistory;
