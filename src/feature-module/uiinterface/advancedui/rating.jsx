import React from "react";
import ReactStarsRating from "react-awesome-stars-rating";

const Rating = () => {
  return (
    <div className="page-wrapper cardhead">
      <div className="content">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Rating</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Rating</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">Basic Rater</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Show Some <span className="text-danger">❤</span> with rating
                    :
                  </p>
                  {/* <div id="rater-basic" /> */}

                  <ReactStarsRating value={3} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">5 star rater with steps</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Dont forget to rate the product :
                  </p>
                  {/* <div id="rater-steps" /> */}
                  <ReactStarsRating />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-12">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">Custom messages</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Your rating is much appreciated👏 :
                  </p>
                  {/* <div id="custom-messages" /> */}
                  <ReactStarsRating value={3} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">
                  Unlimited number of stars readOnly
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">Thanks for rating :</p>
                  {/* <div id="stars-unlimited" /> */}
                  <ReactStarsRating value={6} count={10} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">
                  5 Star rater with custom isBusyText and simulated backend
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">Thanks for rating :</p>
                  {/* <div id="stars-busytext" /> */}
                  <ReactStarsRating />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">On hover event</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Please give your valuable rating :
                  </p>
                  <div className="d-flex flex-wrap align-items-center">
                    {/* <div id="stars-hover" /> */}
                    <ReactStarsRating />

                    <span className="live-rating badge bg-success-transparent ms-3">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">Clear/reset rater</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Thank You so much for your support :
                  </p>
                  <div className="d-flex flex-wrap align-items-center">
                    {/* <div id="rater-reset" /> */}
                    <ReactStarsRating />

                    <button
                      className="btn btn-icon btn-sm btn-danger-light ms-3"
                      id="rater-reset-button"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Reset"
                    >
                      <i data-feather="rotate-cw" className="feather-16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
