import { ChevronUp, PlusCircle, RotateCcw } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToogleHeader } from '../../../core/redux/action';
import AddTaxRates from '../../../core/modals/settings/addtaxrates';
import EditTaxRates from '../../../core/modals/settings/edittaxrates';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import SettingsSideBar from '../settingssidebar';

const TaxRates = () => {
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
                                        <h4>Tax Rates</h4>
                                    </div>
                                    <div className="page-header bank-settings justify-content-end">
                                        <div className="page-btn">
                                            <Link
                                                to="#"
                                                className="btn btn-added"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add-tax"
                                            >
                                                <PlusCircle className="me-2" />
                                                Add New Tax Rate
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
                                                    </div>
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
                                                                    <th>Name</th>
                                                                    <th>Tax rates% </th>
                                                                    <th>Created On</th>
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
                                                                    <td>VAT</td>
                                                                    <td>16</td>
                                                                    <td>12 Jul 2023</td>
                                                                    <td className="action-table-data justify-content-end">
                                                                        <div className="edit-delete-action">
                                                                            <Link
                                                                                className="me-2 p-2"
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#edit-tax"
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
                                                                    <td>TGST</td>
                                                                    <td>14</td>
                                                                    <td>17 Jul 2023</td>
                                                                    <td className="action-table-data justify-content-end">
                                                                        <div className="edit-delete-action">
                                                                            <Link
                                                                                className="me-2 p-2"
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#edit-tax"
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
                                                                    <td>HST</td>
                                                                    <td>12</td>
                                                                    <td>23 Jul 2023</td>
                                                                    <td className="action-table-data justify-content-end">
                                                                        <div className="edit-delete-action">
                                                                            <Link
                                                                                className="me-2 p-2"
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#edit-tax"
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
            <AddTaxRates />
            <EditTaxRates />
        </div>
    )
}

export default TaxRates