import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select'
import { ChevronUp, MinusCircle, PlusCircle, RotateCcw, Search } from 'feather-icons-react/build/IconComponents';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import BarcodePrinter from '../../core/modals/inventory/barcodePrinter';
const PrintBarcode = () => {
    //const dataSource = useSelector((state) => state.barcode_data);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);

    const warehouseitems = [
        { value: 'choose', label: 'Choose' },
        { value: 'manufacture', label: 'Manufacture' },
        { value: 'transport', label: 'Transport' },
        { value: 'customs', label: 'Customs' },
    ];
    const selectstore = [
        { value: 'choose', label: 'Choose' },
        { value: 'Online', label: 'Online' },
        { value: 'Offline', label: 'Offline' },
    ];
    const papersize = [
        { value: 'choose', label: 'Choose' },
        { value: 'Recent1', label: 'Recent1' },
        { value: 'Recent2', label: 'Recent2' },
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
    const [quantity1, setQuantity1] = useState(4);
    const handleDecrement1 = () => {
      if (quantity1 > 1) {
        setQuantity1(quantity - 1);
      }
    };
    const handleIncrement1 = () => {
      setQuantity1(quantity1 + 1);
    };
    return (
        <div className="page-wrapper notes-page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Print Barcode</h4>
                            <h6>Manage your barcodes</h6>
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
                                    <div className="col-sm-6 mb-3 seacrh-barcode-item-one">
                                        <label className="form-label">Warehouse</label>
                                        <Select
                                            options={warehouseitems}
                                            placeholder="Choose"
                                        />

                                    </div>
                                    <div className="col-sm-6 mb-3 seacrh-barcode-item-one">
                                        <label className="form-label">Select Store</label>
                                        <Select
                                            options={selectstore}
                                            placeholder="Choose"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="input-blocks search-form seacrh-barcode-item">
                                    <div className="searchInput">
                                        <label className="form-label">Product</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Product by Codename"
                                        />
                                        <div className="resultBox"></div>
                                        <div className="icon">
                                            <Search className="fas fa-search" />
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
                                            <th>Qty</th>
                                            <th className="text-center no-sort">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="productimgname">
                                                    <Link to="#" className="product-img stock-img">
                                                        <ImageWithBasePath src="assets/img/products/stock-img-02.png" alt="product" />
                                                    </Link>
                                                    <Link to="#">Nike Jordan</Link>
                                                </div>
                                            </td>
                                            <td>PT002</td>
                                            <td>HG3FK</td>
                                            <td>
                                                <div className="product-quantity">
                                                    <span className="quantity-btn" onClick={handleDecrement}>
                                                        <MinusCircle />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="quantity-input"
                                                        value={quantity}
                                                        readOnly
                                                    />
                                                    <span className="quantity-btn" onClick={handleIncrement}>
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
                                        <tr>
                                            <td>
                                                <div className="productimgname">
                                                    <Link to="#" className="product-img stock-img">
                                                        <ImageWithBasePath src="assets/img/products/stock-img-03.png" alt="product" />
                                                    </Link>
                                                    <Link to="#">Apple Series 5 Watch</Link>
                                                </div>
                                            </td>
                                            <td>PT003</td>
                                            <td>TEUIU7</td>
                                            <td>
                                            <div className="product-quantity">
                                            <span className="quantity-btn" onClick={handleDecrement1}>
                                                <MinusCircle />
                                            </span>
                                            <input
                                                type="text"
                                                className="quantity-input"
                                                value={quantity1}
                                                readOnly
                                            />
                                            <span className="quantity-btn" onClick={handleIncrement1}>
                                                <PlusCircle/>
                                            </span>
                                        </div>
                                            </td>
                                            <td className="action-table-data justify-content-center">
                                                <div className="edit-delete-action">
                                                    <Link onClick={showConfirmationAlert}
                                                        className="barcode-delete-icon confirm-text"
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
                                <form className="mb-0">
                                    <label className="form-label">Paper Size</label>
                                    <Select
                                        options={papersize}
                                        placeholder="Choose"
                                    />
                                </form>
                            </div>
                            <div className="col-lg-6 pt-3">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="search-toggle-list">
                                            <p>Show Store Name</p>
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
                                    <div className="col-sm-4">
                                        <div className="search-toggle-list">
                                            <p>Show Product Name</p>
                                            <div className="input-blocks m-0">
                                                <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="user8"
                                                        className="check"
                                                        defaultChecked="true"
                                                    />
                                                    <label htmlFor="user8" className="checktoggle mb-0">
                                                        {" "}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="search-toggle-list">
                                            <p>Show Price</p>
                                            <div className="input-blocks m-0">
                                                <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="user9"
                                                        className="check"
                                                        defaultChecked="true"
                                                    />
                                                    <label htmlFor="user9" className="checktoggle mb-0">
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
                            Generate Barcode
                        </Link>
                        <Link to="#" className="btn btn-cancel me-2">
                            <span>
                                <i className="fas fa-power-off me-2" />
                            </span>
                            Reset Barcode
                        </Link>
                        <Link to="#" className="btn btn-cancel close-btn">
                            <span>
                                <i className="fas fa-print me-2" />
                            </span>
                            Print Barcode
                        </Link>
                    </div>

                </div>
            </div>
            <BarcodePrinter />
        </div>

    )
}

export default PrintBarcode
