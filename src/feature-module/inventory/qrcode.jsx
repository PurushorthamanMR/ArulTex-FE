import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../core/img/imagewithbasebath'
import Select from 'react-select'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import QRcodeModelPopup from '../../core/modals/inventory/qrcode'
import { useDispatch, useSelector } from 'react-redux'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ChevronUp, MinusCircle, PlusCircle, RotateCcw } from 'feather-icons-react/build/IconComponents'
import { setToogleHeader } from '../../core/redux/action'

const QRcode = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const store = [
        { value: 'choose', label: 'Choose' },
        { value: 'online', label: 'Online' },
        { value: 'offline', label: 'Offline' },
    ];
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
    const warehouse = [
        { value: 'manufacture', label: 'Manufacture' },
        { value: 'transport', label: 'Transport' },
        { value: 'customs', label: 'Customs' },
    ];
    const paper = [
        { value: 'choose', label: 'Choose' },
        { value: 'recent1', label: 'Recent1' },
        { value: 'recent2', label: 'Recent2' },
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

    const [quantity, setQuantity] = useState(4);

    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const handleIncrement = () => {
      setQuantity(quantity + 1);
    };
  
    return (
        <div>
            <div className="page-wrapper notes-page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Print QR Code</h4>
                                <h6>Manage your QR code</h6>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
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
                    </div>
                    <div className="barcode-content-list">
                        <form>
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="row seacrh-barcode-item">
                                        <div className="col-sm-6 seacrh-barcode-item-one">
                                            <label className="form-label">Warehouse</label>
                                            <Select options={warehouse} className="select" placeholder="Manufacture" />
                                        </div>
                                        <div className="col-sm-6 seacrh-barcode-item-one">
                                            <label className="form-label">Select Store</label>
                                            <Select options={store} className="select" placeholder="Choose" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="input-blocks search-form  seacrh-barcode-item">
                                        <div className="searchInput">
                                            <label className="form-label">Product</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Product by Codename"
                                            />
                                            <div className="resultBox"></div>
                                            <div className="icon">
                                                <i className="fas fa-search" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="col-lg-12">
                            <div className="modal-body-table search-modal-header">
                                <div className="table-responsive">
                                    <table className="table  datanew">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>SKU</th>
                                                <th>Code</th>
                                                <th>Reference No</th>
                                                <th>Qty</th>
                                                <th className="text-center no-sort">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="productimgname">
                                                        <Link
                                                            to="#"
                                                            className="product-img stock-img"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/products/stock-img-02.png"
                                                                alt="product"
                                                            />
                                                        </Link>
                                                        <Link to="#">Nike Jordan</Link>
                                                    </div>
                                                </td>
                                                <td>PT002</td>
                                                <td>HG3FK</td>
                                                <td>32RRR554</td>
                                                <td>
                                                    <div className="product-quantity">
                                                        <span className="quantity-btn" onClick={handleDecrement}>
                                                            <MinusCircle/>
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="quantity-input"
                                                            value={quantity}
                                                            readOnly
                                                        />
                                                        <span className="quantity-btn" onClick={handleIncrement}>
                                                            +
                                                            <PlusCircle/>
                                                        </span>
                                                    </div>

                                                </td>
                                                <td className="action-table-data justify-content-center">
                                                    <div className="edit-delete-action">
                                                        <Link onClick={showConfirmationAlert}
                                                            className="confirm-text barcode-delete-icon"
                                                            to="#"
                                                        >
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
                        <div className="paper-search-size">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <form>
                                        <label className="form-label">Paper Size</label>
                                        <Select options={paper} className="select" placeholder="Choose" />

                                    </form>
                                </div>
                                <div className="col-lg-6 pt-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="search-toggle-list">
                                                <p>Reference Number</p>
                                                <div className="input-blocks m-0">
                                                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                        <input
                                                            type="checkbox"
                                                            id="user7"
                                                            className="check"
                                                            defaultChecked="true"
                                                        />
                                                        <label htmlFor="user7" className="checktoggle mb-0">
                                                            {" "}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="search-barcode-button">
                            <Link
                                to="#"
                                className="btn btn-submit me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#prints-barcode"
                            >
                                <span>
                                    <i className="fas fa-eye me-2" />
                                </span>
                                Generate QR Code
                            </Link>
                            <Link to="#" className="btn btn-cancel me-2">
                                <span>
                                    <i className="fas fa-power-off me-2" />
                                </span>
                                Reset
                            </Link>
                            <Link to="#" className="btn btn-cancel close-btn">
                                <span>
                                    <i className="fas fa-print me-2" />
                                </span>
                                Print QRcode
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <QRcodeModelPopup />
        </div>
    )
}

export default QRcode
