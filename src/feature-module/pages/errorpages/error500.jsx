import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const Error500 = () => {
  const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <div className="error-img">
          <ImageWithBasePath
            src="assets/img/authentication/error-500.png"
            className="img-fluid"
            alt="img"
          />
        </div>
        <h3 className="h2 mb-3">Oops, something went wrong</h3>
        <p>
          Server Error 500. We apologise and are fixing the problem Please try
          again at a later stage
        </p>
        <Link to={route.dashboard} className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Error500;
