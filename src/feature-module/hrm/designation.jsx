import React, { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { Link } from 'react-router-dom';
import { ChevronUp, FileText, Filter, PlusCircle, RotateCcw, Sliders, Users } from 'feather-icons-react/build/IconComponents';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import AddDesignation from '../../core/modals/hrm/adddesignation';
import EditDesignation from '../../core/modals/hrm/editdesignation';
import { setToogleHeader } from '../../core/redux/action';

const Designation = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
  
    const oldandlatestvalue = [
        { value: 'date', label: 'Sort by Date' },
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ];
    const designation = [
        { value: 'Choose Designation', label: 'Choose Designation' },
        { value: 'UI/UX', label: 'UI/UX' },
        { value: 'HR', label: 'HR' },
        { value: 'Admin', label: 'Admin' },
        { value: 'Engineering', label: 'Engineering' },
    ];
    const hodlist = [
        { value: 'Choose HOD', label: 'Choose HOD' },
        { value: 'Mitchum Daniel', label: 'Mitchum Daniel' },
        { value: 'Susan Lopez', label: 'Susan Lopez' },

    ];

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
    };
    const renderTooltip = (props) => (
        <Tooltip id="pdf-tooltip" {...props}>
            Pdf
        </Tooltip>
    );
    const renderExcelTooltip = (props) => (
        <Tooltip id="excel-tooltip" {...props}>
            Excel
        </Tooltip>
    );
    const renderPrinterTooltip = (props) => (
        <Tooltip id="printer-tooltip" {...props}>
            Printer
        </Tooltip>
    );
    const renderRefreshTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Refresh
        </Tooltip>
    );
    const renderCollapseTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Collapse
        </Tooltip>
    );
 
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
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Designation</h4>
                            <h6>Manage your designation</h6>
                        </div>
                    </div>
                    <ul className="table-top-head">
                        <li>
                            <OverlayTrigger placement="top" overlay={renderTooltip}>
                                <Link>
                                    <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                                </Link>
                            </OverlayTrigger>
                        </li>
                        <li>
                            <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                                <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                    <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                                </Link>
                            </OverlayTrigger>
                        </li>
                        <li>
                            <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>

                                <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                    <i data-feather="printer" className="feather-printer" />
                                </Link>
                            </OverlayTrigger>
                        </li>
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
                    <div className="page-btn">
                        <Link
                            to="#"
                            className="btn btn-added"
                            data-bs-toggle="modal"
                            data-bs-target="#add-department"
                        >
                            <PlusCircle className="me-2" />
                            Add New Designation
                        </Link>
                    </div>
                </div>
                {/* /product list */}
                <div className="card table-list-card">
                    <div className="card-body pb-0">
                        <div className="table-top table-top-new">
                            <div className="search-set mb-0">
                                <div className="total-employees">
                                    <h6>
                                        <Users />
                                        Total Employees <span>21</span>
                                    </h6>
                                </div>
                                <div className="search-input">
                                    <Link to="#" className="btn btn-searchset">
                                        <i data-feather="search" className="feather-search" />
                                    </Link>
                                    <input type="search" className="form-control" />
                                </div>
                            </div>
                            <div className="search-path d-flex align-items-center search-path-new">
                                <div className="d-flex">
                                    <Link className="btn btn-filter" id="filter_search">
                                        <Filter
                                            className="filter-icon"
                                            onClick={toggleFilterVisibility}
                                        />
                                        <span>
                                            <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                                        </span>
                                    </Link>
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
                        </div>
                        {/* /Filter */}
                        <div
                            className={`card${isFilterVisible ? " visible" : ""}`}
                            id="filter_inputs"
                            style={{ display: isFilterVisible ? "block" : "none" }}
                        >                            <div className="card-body pb-0">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="input-blocks">
                                            <i data-feather="file-text" className="info-img" />
                                            <FileText className="info-img" />
                                            <Select
                                                className="select"
                                                options={designation}
                                                placeholder="Choose HOD"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="input-blocks">
                                            <Users className="info-img" />
                                            <Select
                                                className="select"
                                                options={hodlist}
                                                placeholder="Choose HOD"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                                        <div className="input-blocks">
                                            <Link className="btn btn-filters ms-auto">
                                                {" "}
                                                <i data-feather="search" className="feather-search" />{" "}
                                                Search{" "}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Filter */}
                        <div className="table-responsive">
                        <table className="table  datanew">
                        <thead>
                          <tr>
                            <th className="no-sort">
                              <label className="checkboxs">
                                <input type="checkbox" id="select-all" />
                                <span className="checkmarks" />
                              </label>
                            </th>
                            <th>Designation</th>
                            <th>Members</th>
                            <th>Created On</th>
                            <th>Total Members</th>
                            <th>Status</th>
                            <th className="no-sort">Action</th>
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
                            <td>Designer</td>
                            <td>
                              <ul className="team-members">
                                <li>
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-08.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-13.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-09.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-11.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-04.jpg" alt="" />
                                        <span>+3</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </td>
                            <td>07</td>
                            <td>25 May 2023</td>
                            <td>
                              <span className="badge badge-linesuccess">Active</span>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <Link className="me-2 p-2 ms-2" to="#">
                                  <i data-feather="eye" className="feather-eye" />
                                </Link>
                                <Link
                                  className="me-2 p-2 ms-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-department"
                                >
                                  <i data-feather="edit" className="feather-edit" />
                                </Link>
                                <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
                                  <i data-feather="trash-2" className="feather-trash-2" />
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
                            <td>Curator</td>
                            <td>
                              <ul className="team-members">
                                <li>
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-05.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-06.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-02.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-04.jpg" alt="" />
                                        <span>+5</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </td>
                            <td>08</td>
                            <td>27 June 2023</td>
                            <td>
                              <span className="badge badge-linesuccess">Active</span>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <Link className="me-2 p-2 ms-2" to="#">
                                  <i data-feather="eye" className="feather-eye" />
                                </Link>
                                <Link
                                  className="me-2 p-2 ms-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-department"
                                >
                                  <i data-feather="edit" className="feather-edit" />
                                </Link>
                                <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
                                  <i data-feather="trash-2" className="feather-trash-2" />
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
                            <td>System Administrator</td>
                            <td>
                              <ul className="team-members">
                                <li>
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-09.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-04.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-08.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-11.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-04.jpg" alt="" />
                                        <span>+2</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </td>
                            <td>06</td>
                            <td>29 June 2023</td>
                            <td>
                              <span className="badges-success">Active</span>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <Link className="me-2 p-2 ms-2" to="#">
                                  <i data-feather="eye" className="feather-eye" />
                                </Link>
                                <Link
                                  className="me-2 p-2 ms-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-department"
                                >
                                  <i data-feather="edit" className="feather-edit" />
                                </Link>
                                <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
                                  <i data-feather="trash-2" className="feather-trash-2" />
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
                            <td>Administrative Officer</td>
                            <td>
                              <ul className="team-members">
                                <li>
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-09.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-01.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-04.jpg" alt="" />
                                        <span>+1</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </td>
                            <td>03</td>
                            <td>15 July 2023</td>
                            <td>
                              <span className="badges-success">Active</span>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <Link className="me-2 p-2 ms-2" to="#">
                                  <i data-feather="eye" className="feather-eye" />
                                </Link>
                                <Link
                                  className="me-2 p-2 ms-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-department"
                                >
                                  <i data-feather="edit" className="feather-edit" />
                                </Link>
                                <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
                                  <i data-feather="trash-2" className="feather-trash-2" />
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
                            <td>Technician</td>
                            <td>
                              <ul className="team-members">
                                <li>
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-05.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-02.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-01.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-04.jpg" alt="" />
                                        <span>+2</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </td>
                            <td>05</td>
                            <td>19 July 2023</td>
                            <td>
                              <span className="badges-success">Active</span>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <Link className="me-2 p-2 ms-2" to="#">
                                  <i data-feather="eye" className="feather-eye" />
                                </Link>
                                <Link
                                  className="me-2 p-2 ms-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-department"
                                >
                                  <i data-feather="edit" className="feather-edit" />
                                </Link>
                                <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
                                  <i data-feather="trash-2" className="feather-trash-2" />
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
                            <td>Office Support Secretary</td>
                            <td>
                              <ul className="team-members">
                                <li>
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-07.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-11.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-09.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-04.jpg" alt="" />
                                        <span>+5</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </td>
                            <td>09</td>
                            <td>04 August 2023</td>
                            <td>
                              <span className="badges-success">Active</span>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <Link className="me-2 p-2 ms-2" to="#">
                                  <i data-feather="eye" className="feather-eye" />
                                </Link>
                                <Link
                                  className="me-2 p-2 ms-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-department"
                                >
                                  <i data-feather="edit" className="feather-edit" />
                                </Link>
                                <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
                                  <i data-feather="trash-2" className="feather-trash-2" />
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
                            <td>Tech Lead</td>
                            <td>
                              <ul className="team-members">
                                <li>
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-12.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-13.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-01.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-04.jpg" alt="" />
                                        <span>+6</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </td>
                            <td>10</td>
                            <td>13 August 2023</td>
                            <td>
                              <span className="badges-success">Active</span>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <Link className="me-2 p-2 ms-2" to="#">
                                  <i data-feather="eye" className="feather-eye" />
                                </Link>
                                <Link
                                  className="me-2 p-2 ms-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-department"
                                >
                                  <i data-feather="edit" className="feather-edit" />
                                </Link>
                                <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
                                  <i data-feather="trash-2" className="feather-trash-2" />
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
                            <td>Database administrator</td>
                            <td>
                              <ul className="team-members">
                                <li>
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-11.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-07.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-02.jpg" alt="" />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath src="assets/img/users/user-11.jpg" alt="" />
                                        <span>+1</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </td>
                            <td>04</td>
                            <td>24 August 2023</td>
                            <td>
                              <span className="badges-success">Active</span>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <Link className="me-2 p-2 ms-2" to="#">
                                  <i data-feather="eye" className="feather-eye" />
                                </Link>
                                <Link
                                  className="me-2 p-2 ms-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-department"
                                >
                                  <i data-feather="edit" className="feather-edit" />
                                </Link>
                                <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
                                  <i data-feather="trash-2" className="feather-trash-2" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      
                        </div>
                    </div>
                </div>
                {/* /product list */}
            </div>
            <AddDesignation />
            <EditDesignation />
        </div>

    )
}

export default Designation

