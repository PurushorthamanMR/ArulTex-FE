import { Download, Printer } from 'feather-icons-react/build/IconComponents'
import React from 'react'
import { Mail } from 'react-feather'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../core/img/imagewithbasebath'

const Payslip = () => {
    return (
        <div>
            <div className="page-wrapper">
                <div className="content mb-3">
                    <div className="pay-slip-box" id="pay-slip">
                        <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
                            <div className="modal-content">
                                <div className="page-wrapper-new p-0">
                                    <div className="contents">
                                        <div className="modal-header border-0 custom-modal-header">
                                            <div className="page-header mb-0 w-100">
                                                <div className="add-item payslip-list d-flex justify-content-between">
                                                    <div className="page-title">
                                                        <h4>Payslip</h4>
                                                    </div>
                                                    <div className="page-btn d-flex align-items-center mt-3 mt-md-0">
                                                        <div className="d-block d-sm-flex align-items-center">
                                                            <Link to="#" className="btn btn-added me-2">
                                                                <Mail className="me-2"/>
                                                                 Send Email
                                                            </Link>
                                                            <Link
                                                                to="#"
                                                                className="btn btn-added downloader mt-3 mb-3 m-sm-0"
                                                            >
                                                                <Download className="me-2"/>
                                                                Download
                                                            </Link>
                                                            <Link to="#" className="btn btn-added printer ms-2">
                                                                <Printer className="me-2"/>
                                                                Print
                                                                Barcode
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-body custom-modal-body">
                                            <div className="card mb-0">
                                                <div className="card-body border-0">
                                                    <div className="payslip-month d-flex">
                                                        <div className="slip-logo">
                                                            <ImageWithBasePath src="assets/img/logo-small.png" alt="Logo" />
                                                        </div>
                                                        <div className="month-of-slip">
                                                            <h4>Payslip for the Month of Sep 2023</h4>
                                                        </div>
                                                    </div>
                                                    <div className="emp-details d-flex">
                                                        <div className="emp-name-id">
                                                            <h6>
                                                                Emp Name : <span>Herald james</span>
                                                            </h6>
                                                            <h6>
                                                                Emp Id : <span>POS1234</span>
                                                            </h6>
                                                        </div>
                                                        <div className="emp-location-info">
                                                            <h6>
                                                                Location : <span>USA</span>
                                                            </h6>
                                                            <h6>
                                                                Pay Period : <span>Sep 2023</span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="table-responsive">
                                                            <table className="w-100">
                                                                <thead>
                                                                    <tr className="paysilp-table-border">
                                                                        <th colSpan={2}>Earnings</th>
                                                                        <th colSpan={2}>Deduction</th>
                                                                    </tr>
                                                                </thead>
                                                                <thead>
                                                                    <tr className="paysilp-table-border">
                                                                        <th>Pay Type</th>
                                                                        <th>Amount</th>
                                                                        <th>Pay Type</th>
                                                                        <th>Amount</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="paysilp-table-borders">
                                                                    <tr>
                                                                        <td>Basic Salary</td>
                                                                        <td>$32,000</td>
                                                                        <td>PF</td>
                                                                        <td>0.00</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>HRA Allowance</td>
                                                                        <td>0.00</td>
                                                                        <td>Professional Tax</td>
                                                                        <td>0.00</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Conveyance</td>
                                                                        <td>0.00</td>
                                                                        <td>TDS</td>
                                                                        <td>0.00</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Medical Allowance</td>
                                                                        <td>0.00</td>
                                                                        <td>Loans &amp; Others</td>
                                                                        <td>0.00</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Bonus</td>
                                                                        <td>0.00</td>
                                                                        <td>Bonus</td>
                                                                        <td>0.00</td>
                                                                    </tr>
                                                                    <tr className="payslip-border-bottom">
                                                                        <th>Total Earnings</th>
                                                                        <td>$32,000</td>
                                                                        <th>Total Earnings</th>
                                                                        <td>0.00</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="emp-details d-flex justify-content-start">
                                                            <div className="emp-name-id pay-slip-salery">
                                                                <h6>Net Salary</h6>
                                                                <span>Inwords</span>
                                                            </div>
                                                            <div className="emp-location-info pay-slip-salery">
                                                                <h6>$32,000</h6>
                                                                <span>Thirty Two Thousand Only</span>
                                                            </div>
                                                        </div>
                                                        <div className="product-name-slip text-center">
                                                            <h4>DreamsPOS</h4>
                                                            <p>
                                                                81, Randall Drive,Hornchurch <br />
                                                                RM126TA.
                                                            </p>
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
            </div>
        </div>
    )
}

export default Payslip
