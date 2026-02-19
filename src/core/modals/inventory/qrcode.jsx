import React from 'react'
import ImageWithBasePath from '../../img/imagewithbasebath'
import { Link } from 'react-router-dom'

const QRcodeModelPopup = () => {
    return (
        <div>
            <>
                {/* Print Qrcode */}
                <div className="modal fade" id="prints-barcode">
                    <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
                        <div className="modal-content">
                            <div className="page-wrapper-new p-0">
                                <div className="content">
                                    <div className="modal-header border-0 custom-modal-header">
                                        <div className="page-title">
                                            <h4>QR Codes</h4>
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
                                    <div className="modal-body custom-modal-body">
                                        <div className="d-flex justify-content-end">
                                            <Link
                                                to="#"
                                                className="btn btn-cancel close-btn"
                                            >
                                                <span>
                                                    <i className="fas fa-print me-2" />
                                                </span>
                                                Print QR Code
                                            </Link>
                                        </div>
                                        <div className="barcode-scan-header">
                                            <h5>Nike Jordan</h5>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="barcode-scanner-link text-center">
                                                    <div className="barscaner-img">
                                                        <ImageWithBasePath
                                                            src="./assets/img/barcode/qr-code.png"
                                                            alt="Barcode"
                                                            className="img-fluid"
                                                        />
                                                    </div>
                                                    <p>Ref No :32RRR554 </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Print Qrcode --
     */}
            </>

        </div>
    )
}

export default QRcodeModelPopup

