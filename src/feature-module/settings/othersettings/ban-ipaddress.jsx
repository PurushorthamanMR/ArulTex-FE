import { ChevronUp, PlusCircle, RotateCcw, Sliders } from 'feather-icons-react/build/IconComponents';
import React, { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setToogleHeader } from '../../../core/redux/action';
import { Filter } from 'react-feather';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import EditIpAddress from '../../../core/modals/settings/editipaddress';
import AddIpAddress from '../../../core/modals/settings/addipaddress';
import SettingsSideBar from '../settingssidebar';

const BanIpaddress = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);

    const renderRefreshTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Refresh
        </Tooltip>
    );
    const renderCollapseTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Collapse
        </Tooltip>
    )

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
    };
    const oldandlatestvalue = [
        { value: "date", label: "Sort by Date" },
        { value: "newest", label: "Newest" },
        { value: "oldest", label: "Oldest" },
      ];

      const MySwal = withReactContent(Swal);

      const showConfirmationAlert = () => {
          MySwal.fire({
              title: 'Are you sure?',
              text: 'You won\'t be able to revert this!',
              showCancelButton: true,
              confirmButtonColor: '#00ff00',
              confirmButtonText: 'Yes, delete it!',
              cancelButtonColor: '#ff0000',
              cancelButtonText: 'Cancel',
          }).then((result) => {
              if (result.isConfirmed) {
  
                  MySwal.fire({
                      title: 'Deleted!',
                      text: 'Your file has been deleted.',
                      className: "btn btn-success",
                      confirmButtonText: 'OK',
                      customClass: {
                          confirmButton: 'btn btn-success',
                      },
                  });
              } else {
                  MySwal.close();
              }
  
          });
      };
  
    return (
        <div>
            <div className="page-wrapper">
                <div className="content settings-content">
                    <div className="page-header settings-pg-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Settings</h4>
                                <h6>Manage your settings on portal</h6>
                            </div>
                        </div>
                        <ul className="table-top-head">
                            <li>
                                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>

                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <RotateCcw />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>

                                    <Link
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        id="collapse-header"
                                        className={data ? "active" : ""}
                                        onClick={() => { dispatch(setToogleHeader(!data)) }}
                                    >
                                        <ChevronUp />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="settings-wrapper d-flex">
                            <SettingsSideBar/>
                                <div className="settings-page-wrap w-50">
                                    <div className="setting-title">
                                        <h4>Ban IP Address</h4>
                                    </div>
                                    <div className="page-header bank-settings justify-content-end">
                                        <div className="page-btn">
                                            <Link
                                                to="#"
                                                className="btn btn-added"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add-banip"
                                            >
                                                <PlusCircle className="me-2" />
                                                Add New Ban IP
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
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
                                                            <div className="d-flex align-items-center">
                                                                <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`} id="filter_search">
                                                                    <Filter
                                                                        className="filter-icon"
                                                                        onClick={toggleFilterVisibility}
                                                                    />
                                                                    <span onClick={toggleFilterVisibility}>
                                                                        <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="form-sort">
                                                        <Sliders className="info-img" />
                                                        <Select
                                                          className="select"
                                                          options={oldandlatestvalue}
                                                          placeholder="Newest"
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
                                                                <div className="col-lg-4 col-sm-6 col-12">
                                                                    <div className="input-blocks">
                                                                        <i data-feather="zap" className="info-img" />
                                                                        <select className="select">
                                                                            <option>Choose IP</option>
                                                                            <option>211.11.0.25</option>
                                                                            <option>211.03.0.11</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3 col-sm-6 col-12 ms-auto">
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
                                                    {/* /Filter */}
                                                    <div className="table-responsive">
                                                        <table className="table datanew">
                                                            <thead>
                                                                <tr>
                                                                    <th className="no-sort">
                                                                        <label className="checkboxs">
                                                                            <input type="checkbox" id="select-all" />
                                                                            <span className="checkmarks" />
                                                                        </label>
                                                                    </th>
                                                                    <th>IP Address</th>
                                                                    <th>Reason</th>
                                                                    <th>Date</th>
                                                                    <th className="no-sort text-end">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <label className="checkboxs">
                                                                            <input type="checkbox" />
                                                                            <span className="checkmarks" />
                                                                        </label>
                                                                    </td>
                                                                    <td>211.11.0.25</td>
                                                                    <td>
                                                                        <p>
                                                                            You can get on-demand services in order to find
                                                                            a nearby service.
                                                                        </p>
                                                                    </td>
                                                                    <td>12 Jul 2023</td>
                                                                    <td className="action-table-data justify-content-end">
                                                                        <div className="edit-delete-action">
                                                                            <Link
                                                                                className="me-2 p-2"
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#edit-banip"
                                                                            >
                                                                                <i
                                                                                    data-feather="edit"
                                                                                    className="feather-edit"
                                                                                />
                                                                            </Link>
                                                                            <Link onClick={showConfirmationAlert}
                                                                                className="confirm-text p-2"
                                                                                to="#"
                                                                            >
                                                                                <i
                                                                                    data-feather="trash-2"
                                                                                    className="feather-trash-2"
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label className="checkboxs">
                                                                            <input type="checkbox" />
                                                                            <span className="checkmarks" />
                                                                        </label>
                                                                    </td>
                                                                    <td>211.03.0.11</td>
                                                                    <td>
                                                                        <p>
                                                                            Extract pricing information at inventory levels.
                                                                        </p>
                                                                    </td>
                                                                    <td>24 Aug 2023</td>
                                                                    <td className="action-table-data justify-content-end">
                                                                        <div className="edit-delete-action">
                                                                            <Link
                                                                                className="me-2 p-2"
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#edit-banip"
                                                                            >
                                                                                <i
                                                                                    data-feather="edit"
                                                                                    className="feather-edit"
                                                                                />
                                                                            </Link>
                                                                            <Link onClick={showConfirmationAlert}
                                                                                className="confirm-text p-2"
                                                                                to="#"
                                                                            >
                                                                                <i
                                                                                    data-feather="trash-2"
                                                                                    className="feather-trash-2"
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label className="checkboxs">
                                                                            <input type="checkbox" />
                                                                            <span className="checkmarks" />
                                                                        </label>
                                                                    </td>
                                                                    <td>211.24.0.17</td>
                                                                    <td>
                                                                        <p>
                                                                            Fetching data for competitors to gain
                                                                            competitive advantage.
                                                                        </p>
                                                                    </td>
                                                                    <td>07 Sep 2023</td>
                                                                    <td className="action-table-data justify-content-end">
                                                                        <div className="edit-delete-action">
                                                                            <Link
                                                                                className="me-2 p-2"
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#edit-banip"
                                                                            >
                                                                                <i
                                                                                    data-feather="edit"
                                                                                    className="feather-edit"
                                                                                />
                                                                            </Link>
                                                                            <Link onClick={showConfirmationAlert}
                                                                                className="confirm-text p-2"
                                                                                to="#"
                                                                            >
                                                                                <i
                                                                                    data-feather="trash-2"
                                                                                    className="feather-trash-2"
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label className="checkboxs">
                                                                            <input type="checkbox" />
                                                                            <span className="checkmarks" />
                                                                        </label>
                                                                    </td>
                                                                    <td>211.12.0.34</td>
                                                                    <td>
                                                                        <p>
                                                                            Temporarily block to protect user accounts from
                                                                            internet fraudsters.
                                                                        </p>
                                                                    </td>
                                                                    <td>13 Oct 2023</td>
                                                                    <td className="action-table-data justify-content-end">
                                                                        <div className="edit-delete-action">
                                                                            <Link
                                                                                className="me-2 p-2"
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#edit-banip"
                                                                            >
                                                                                <i
                                                                                    data-feather="edit"
                                                                                    className="feather-edit"
                                                                                />
                                                                            </Link>
                                                                            <Link onClick={showConfirmationAlert}
                                                                                className="confirm-text p-2"
                                                                                to="#"
                                                                            >
                                                                                <i
                                                                                    data-feather="trash-2"
                                                                                    className="feather-trash-2"
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddIpAddress/>
            <EditIpAddress/>
        </div>
    )
}

export default BanIpaddress

