import React from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../img/imagewithbasebath';
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import Select from 'react-select';

const ImportPurchases = () => {
    const purchasesstatus = [
        { value: 'choose', label: 'Choose' },
        { value: 'received', label: 'Received' },
        { value: 'ordered', label: 'Ordered' },
        { value: 'pending', label: 'Pending' },
    ];
    const options = [
        { value: 'choose', label: 'Choose' },
        { value: 'apexComputers1', label: 'Apex Computers' },
        { value: 'apexComputers2', label: 'Apex Computers' },
    ];
    
    return (

        <div className="modal fade" id="view-notes" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">
                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>Import Purchase</h4>
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
                                <form>
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <label>Supplier Name</label>
                                                <div className="row">
                                                    <div className="col-lg-10 col-sm-10 col-10">
                                                    <Select options={options} className="select" placeholder="Choose" />

                                                    </div>
                                                    <div className="col-lg-2 col-sm-2 col-2 ps-0">
                                                        <div className="add-icon tab">
                                                            <Link to="#">
                                                                <PlusCircle  className="feather-plus-circles"/>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <label>Purchase Status </label>
                                                <Select options={purchasesstatus} className="select" placeholder="Choose" />

                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-sm-6 col-12">
                                            <div className="row">
                                                <div>
                                                    {/* <div class="input-blocks download">
                                                  <a class="btn btn-submit">Download Sample File</a>
                                              </div> */}
                                                    <div className="modal-footer-btn download-file">
                                                        <Link
                                                            to="#"
                                                            className="btn btn-submit"
                                                        >
                                                            Download Sample File
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-blocks image-upload-down">
                                                <label> Upload CSV File</label>
                                                <div className="image-upload download">
                                                    <input type="file" />
                                                    <div className="image-uploads">
                                                        <ImageWithBasePath src="assets/img/download-img.png" alt="img" />
                                                        <h4>
                                                            Drag and drop a <span>file to upload</span>
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <label>Order Tax</label>
                                                <input type="text" defaultValue={0} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <label>Discount</label>
                                                <input type="text" defaultValue={0} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <label>Shipping</label>
                                                <input type="text" defaultValue={0} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-blocks summer-description-box transfer">
                                        <label>Description</label>
                                        <div id="summernote3"></div>
                                        <p>Maximum 60 Characters</p>
                                    </div>
                                    <div className="modal-footer-btn">
                                        <button
                                            type="button"
                                            className="btn btn-cancel me-2"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <Link to="#" className="btn btn-submit">
                                            Submit
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ImportPurchases
