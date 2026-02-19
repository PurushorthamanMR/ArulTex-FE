import React, { useState } from 'react'
import TextEditor from '../../../feature-module/inventory/texteditor'
import { DatePicker } from 'antd';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import { MinusCircle } from 'react-feather';
import ImageWithBasePath from '../../img/imagewithbasebath';

const EditQuotation = () => {
    const customer = [
        { value: 'Choose', label: 'Choose' },
        { value: 'Thomas', label: 'Thomas' },
        { value: 'Rose', label: 'Rose' },
    ];
    const status = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Completed', label: 'Completed' },
    ];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
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
    const [quantity3, setQuantity3] = useState(4);

    const handleDecrement3 = () => {
      if (quantity3 > 1) {
        setQuantity3(quantity3 - 1);
      }
    };
    const handleIncrement3 = () => {
      setQuantity3(quantity3 + 1);
    };
    return (
        <div>
            {/* edit popup */}
            <div className="modal fade" id="edit-units">
                <div className="modal-dialog edit-sales-modal">
                    <div className="modal-content">
                        <div className="page-wrapper p-0 m-0">
                            <div className="content p-0">
                                <div className="page-header p-4 mb-0">
                                    <div className="add-item new-sale-items d-flex">
                                        <div className="page-title">
                                            <h4>Edit Quotation</h4>
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
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="input-blocks">
                                                        <label>Customer Name</label>
                                                        <div className="row">
                                                            <div className="col-lg-10 col-sm-10 col-10">

                                                                <Select
                                                                    className="select"
                                                                    options={customer}
                                                                    placeholder="Choose Brand"
                                                                />
                                                            </div>
                                                            <div className="col-lg-2 col-sm-2 col-2 ps-0">
                                                                <div className="add-icon">
                                                                    <span className="choose-add">
                                                                      
                                                                        <PlusCircle className="plus"/>
                                                                    </span>
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
                                                        <label>Reference Number</label>
                                                        <input type="text" placeholder={123456} />
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
                                                                    src="assets/img/icons/scanners.svg"
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
                                                            <th>Product</th>
                                                            <th>Qty</th>
                                                            <th>Purchase Price($)</th>
                                                            <th>Discount($)</th>
                                                            <th>Tax(%)</th>
                                                            <th>Tax Amount($)</th>
                                                            <th>Unit Cost($)</th>
                                                            <th>Total Cost(%)</th>
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
                                                            <td>
                                                                <div className="product-quantity">
                                                                    <span className="quantity-btn" onClick={handleIncrement}>
                                                                    <PlusCircle className="plus-circle" />
                                                                       
                                                                    </span>
                                                                    <input  value={quantity}
                                                                        type="text"
                                                                        className="quntity-input"
                                                                        defaultValue={2}
                                                                    />
                                                                    <span className="quantity-btn" onClick={handleDecrement}>
                                                                    <MinusCircle />
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>2000</td>
                                                            <td>500</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>1500</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="productimgname">
                                                                    <Link
                                                                        to="#"
                                                                        className="product-img stock-img"
                                                                    >
                                                                       <ImageWithBasePath
                                                                            src="assets/img/products/stock-img-03.png"
                                                                            alt="product"
                                                                        />
                                                                    </Link>
                                                                    <Link to="#">
                                                                        Apple Series 5 Watch
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="product-quantity">
                                                                    <span className="quantity-btn" onClick={handleIncrement1}>
                                                                        <PlusCircle/>
                                                                 </span>
                                                                    <input value={quantity1}
                                                                        type="text"
                                                                        className="quntity-input"
                                                                        defaultValue={2}
                                                                    />
                                                                    <span className="quantity-btn" onClick={handleDecrement1}>
                                                                    <MinusCircle />
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>3000</td>
                                                            <td>400</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>1700</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="productimgname">
                                                                    <Link
                                                                        to="#"
                                                                        className="product-img stock-img"
                                                                    >
                                                                       <ImageWithBasePath
                                                                            src="assets/img/products/stock-img-05.png"
                                                                            alt="product"
                                                                        />
                                                                    </Link>
                                                                    <Link to="#">Lobar Handy</Link>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="product-quantity">
                                                                    <span className="quantity-btn" onClick={handleIncrement3}>
                                                                       <PlusCircle/>
                                                                    </span>
                                                                    <input  value={quantity1}
                                                                        type="text"
                                                                        className="quntity-input"
                                                                        defaultValue={2}
                                                                    />
                                                                    <span className="quantity-btn" onClick={handleDecrement3}>
                                                                       <MinusCircle/>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>2500</td>
                                                            <td>500</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>2000</td>
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
                                                                <h5>$5200.00</h5>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-sm-6 col-12">
                                                    <div className="input-blocks mb-3">
                                                        <label>Order Tax</label>
                                                        <div className="input-groupicon select-code">
                                                            <input type="text" placeholder={0} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12">
                                                    <div className="input-blocks mb-3">
                                                        <label>Discount</label>
                                                        <div className="input-groupicon select-code">
                                                            <input type="text" placeholder={0} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12">
                                                    <div className="input-blocks mb-3">
                                                        <label>Shipping</label>
                                                        <div className="input-groupicon select-code">
                                                            <input type="text" placeholder={0} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12">
                                                    <div className="input-blocks mb-3">
                                                        <label>Status</label>
                                                        <Select
                                                            className="select"
                                                            options={status}
                                                            placeholder="Choose"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input-blocks summer-description-box">
                                                        <label>Description</label>
                                                        <div id="summernote5" />
                                                        <TextEditor />
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
            {/* /edit popup */}
        </div>
    )
}

export default EditQuotation
