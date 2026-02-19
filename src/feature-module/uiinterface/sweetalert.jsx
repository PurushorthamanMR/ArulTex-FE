/* eslint-disable no-unused-vars */
import { RotateCcw } from 'feather-icons-react/build/IconComponents';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const SweetAlert = () => {
    const MySwal = withReactContent(Swal);

    const showAlert = (config) => {
        MySwal.fire(config);
    };

    const handleBasicAlert = () => {
        showAlert({
            text: 'Any fool can use a computer',
            confirmButtonText: 'OK',
        });
    };

    const handleWithTitle = () => {
        showAlert({
          title: 'The Internet?,',
          text: 'That thing is still around?',
          // confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      };
      
    const handleFooterAlert = () => {
        showAlert({
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<p>Why do I have this issue?</p>',
        });
    };
    // const [position, setPosition] = useState('');

    const handleButtonClick = (position) => {
        displayAlert(position);
    };

    const displayAlert = (position) => {
        MySwal.fire({
            text: `Your work has been saved`,
            position: position,
            showConfirmButton: false, // Hide the "OK" button

        });
    };
    const [type, setType] = useState('');

    const showAlert1 = (title) => {
        MySwal.fire({
            title: title,
            text: 'You clicked the button!',
            // icon: type,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    };

    const initialTime = 1600;
    const endTime = 700;

    const showCustomTimerAlert = () => {
        MySwal.fire({
            title: 'Auto Close Alert',
            text: 'This alert will close automatically!',
            confirmButtonText: 'OK',

            showConfirmButton: false, // Hide the default confirm button
            timer: initialTime, // Initial timer value
            didOpen: () => {
                const updateTimer = () => {
                    MySwal.update({
                        timer: MySwal.getTimerLeft() - 100,
                    });

                    if (MySwal.getTimerLeft() <= endTime) {
                        clearInterval(timerInterval);
                    }
                };

                const timerInterval = setInterval(updateTimer, 100);
            },
            onClose: () => {
                MySwal.fire({
                    title: 'OK Button Clicked',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            },
        });
    };


    const showClickOutsideAlert = () => {
        MySwal.fire({
            title: 'Click Outside Alert',
            text: 'Try clicking outside the modal!',
            confirmButtonText: 'OK',
        });
    };

    const showQuestionAlert = () => {
        MySwal.fire({
            title: 'Question 1',
            html: '<p>Chaining swal2 modals is easy</p><input id="swal-input1" class="swal2-input">',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '<span style="display: flex; align-items: center;">Next <i class="fas fa-arrow-right" style="margin-left: 5px;"></i></span>',

            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const answer1 = document.getElementById('swal-input1').value;
                showQuestion2Alert(answer1);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // The alert will automatically close due to allowOutsideClick: false
            }
        });
    };



    const showQuestion2Alert = (answer1) => {
        MySwal.fire({
            title: 'Question 2',
            text: 'Chaining swal2 modals is easy',
            html: `<p>Your answer from Question 1: <strong>${answer1}</strong></p>` +
                '<input id="swal-input2" class="swal2-input" placeholder="">',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '<span style="display: flex; align-items: center;">Next <i class="fas fa-arrow-right" style="margin-left: 5px;"></i></span>',
            cancelButtonText: 'Cancel',
            icon: 'false'
        }).then((result) => {
            if (result.isConfirmed) {
                const answer2 = document.getElementById('swal-input2').value;
                showQuestion3Alert(answer1, answer2);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // The alert will automatically close due to allowOutsideClick: false
            }
        });
    };

    const showQuestion3Alert = (answer1, answer2) => {
        MySwal.fire({
            title: 'Question 3',
            text: 'Chaining swal2 modals is still easy',
            html: `<p>Your answers from Questions 1 and 2: <strong>${answer1}</strong>, <strong>${answer2}</strong></p>` +
                '<input id="swal-input3" class="swal2-input" placeholder="">',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '<span style="display: flex; align-items: center;">Next <i class="fas fa-arrow-right" style="margin-left: 5px;"></i></span>',
            cancelButtonText: 'Cancel',
            icon: 'false'
        }).then((result) => {
            if (result.isConfirmed) {
                const answer3 = document.getElementById('swal-input3').value;
                MySwal.fire({
                    title: 'All Done',
                    text: `Your answers: ["${answer1}", "${answer2}", "${answer3}"]`,
                    confirmButtonText: 'Lovely!'
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // The alert will automatically close due to allowOutsideClick: false
            }
        });
    };



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
                MySwal.fire({
                    title: 'Cancelled',
                    text: 'Your imaginary file is safe :)',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn btn-success',
                    },
                });
            }

        });
    };
    return (
        <div>
            <div className="page-wrapper cardhead">
                <div className="content ">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Sweetalerts</h3>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-md-12">
                            {/* Basic Examples */}
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Basic Examples</h4>
                                </div>
                                <div className="card-body">
                                    <p>
                                        SweetAlert automatically centers itself on the page and looks great no matter if you are using a desktop computer,
                                        mobile, or tablet. Its even highly customizable, as you can see below!
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mr-1 mb-1 me-1"
                                        onClick={handleBasicAlert}
                                    >
                                        Basic
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mr-1 mb-1 me-1"
                                        onClick={handleWithTitle}
                                    >
                                        With Title
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mr-1 mb-1"
                                        onClick={handleFooterAlert}
                                    >
                                        With Footer
                                    </button>
                                </div>
                            </div>
                            {/* /Basic Examples */}
                            {/* Position */}
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Position</h4>
                                </div>
                                <div className="card-body">
                                    <p>
                                        You can specify the position of your alert with{' '}
                                        <code>
                                            position : {"{"} top-start | top-end | bottom-start | bottom-end {"}"}
                                        </code>{' '}
                                        in JS.
                                    </p>
                                    <button
                                        className="btn btn-outline-success mr-1 mb-1 me-1"
                                        onClick={() => handleButtonClick('top-start')}
                                    >
                                        Top Start
                                    </button>
                                    <button
                                        className="btn btn-outline-success mr-1 mb-1 me-1"
                                        onClick={() => handleButtonClick('top-end')}
                                    >
                                        Top End
                                    </button>
                                    <button
                                        className="btn btn-outline-success mr-1 mb-1 me-1"
                                        onClick={() => handleButtonClick('bottom-start')}
                                    >
                                        Bottom Start
                                    </button>
                                    <button
                                        className="btn btn-outline-success mr-1 mb-1 me-1"
                                        onClick={() => handleButtonClick('bottom-end')}
                                    >
                                        Bottom End
                                    </button>
                                </div>
                            </div>

                            {/* \Position */}
                            {/* Types */}
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Types</h4>
                                </div>
                                <div className="card-body">
                                    <p>
                                        The type of the modal. SweetAlert comes with 4 built-in types which will show a corresponding icon animation: &apos;warning&apos; &apos;error&apos;success&apos;info. You can also set it as &apos;input to get a prompt modal. It can either be put in the object under the key &apos;icon or passed as the third parameter of the function.
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-success mr-1 mb-1 me-1"
                                        onClick={() => {
                                            showAlert1('Good job!', 'Good job!');
                                            setType('Good job!');
                                        }}
                                    >
                                        Success
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-info mr-1 mb-1 me-1"
                                        onClick={() => {
                                            showAlert1('Info!', 'Info!');
                                            setType('Info!');
                                        }}
                                    >
                                        Info
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-warning mr-1 mb-1 me-1"
                                        onClick={() => {
                                            showAlert1('Warning!', 'Warning!');
                                            setType('Warning!');
                                        }}
                                    >
                                        Warning
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger mr-1 mb-1 me-1"
                                        onClick={() => {
                                            showAlert1('Error !', 'Error!');
                                            setType('Error !');
                                        }}
                                    >
                                        Error
                                    </button>

                                    {type && (
                                        <p>
                                            Last shown alert type: <strong>{type}</strong>
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* \Types */}
                            {/* Options */}
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Options</h4>
                                </div>
                                <div className="card-body">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mr-1 mb-1 me-2"
                                        onClick={showCustomTimerAlert}
                                    >
                                        Auto Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mr-1 mb-1 me-1"
                                        onClick={showClickOutsideAlert}
                                    >
                                        Click Outside
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mr-1 mb-1"
                                        onClick={showQuestionAlert}
                                    >
                                        Question
                                    </button>
                                </div>
                            </div>
                            {/* \Options */}
                            {/* Confirm Options */}
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Confirm Options</h4>
                                </div>
                                <div className="card-body">
                                    <h5>Confirm Button Text</h5>
                                    <p>
                                        Use <code>confirmButtonText: &quot;Your text here!</code> option to
                                        change the text of the &quot;Confirm button.
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mb-3"
                                        id="confirm-text"
                                    >
                                        Confirm Text
                                    </button>
                                    <h5>Confirm Button Color</h5>
                                    <p>
                                        Use{" "}
                                        <code>
                                            confirmButtonClass: &apos;btn btn-{"{"}colorName{"}"}
                                        </code>{" "}
                                        option to change the color of the &apos;Confirm button.
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mb-2"
                                        onClick={showConfirmationAlert}
                                    >
                                        Confirm Button Color
                                    </button>
                                </div>
                            </div>
                            {/* \Confirm Options */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SweetAlert
