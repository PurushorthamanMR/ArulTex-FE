import React from 'react'
import ImageWithBasePath from '../../img/imagewithbasebath'
import { Link } from 'react-router-dom'

const BarcodePrinter = () => {
  return (
    <div>
      {/* Print Barcode */}
      <div className="modal fade" id="prints-barcode">
        <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Barcode</h4>
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
                      Print Barcode
                    </Link>
                  </div>
                  <div className="barcode-scan-header">
                    <h5>Nike Jordan</h5>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="barcode-scanner-link text-center">
                        <h6>Grocery Alpha</h6>
                        <p>Nike Jordan</p>
                        <p>Price: $400</p>
                        <div className="barscaner-img">
                          <ImageWithBasePath
                            src="./assets/img/barcode/barcode-01.png"
                            alt="Barcode"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="barcode-scan-header">
                    <h5>Apple Series 5 Watch</h5>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="barcode-scanner-link text-center">
                        <h6>Grocery Alpha</h6>
                        <p>Apple Series 5 Watch</p>
                        <p>Price: $300</p>
                        <div className="barscaner-img">
                          <ImageWithBasePath
                            src="./assets/img/barcode/barcode-02.png"
                            alt="Barcode"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="barcode-scanner-link text-center">
                        <h6>Grocery Alpha</h6>
                        <p>Apple Series 5 Watch</p>
                        <p>Price: $300</p>
                        <div className="barscaner-img">
                          <ImageWithBasePath
                            src="./assets/img/barcode/barcode-02.png"
                            alt="Barcode"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="barcode-scanner-link text-center">
                        <h6>Grocery Alpha</h6>
                        <p>Apple Series 5 Watch</p>
                        <p>Price: $300</p>
                        <div className="barscaner-img">
                          <ImageWithBasePath
                            src="./assets/img/barcode/barcode-02.png"
                            alt="Barcode"
                            className="img-fluid"
                          />
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
      {/* /Print Barcode */}
    </div>

  )
}

export default BarcodePrinter
