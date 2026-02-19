import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const Error404 = () => {
  const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <div className="error-img">
          <ImageWithBasePath
            src="assets/img/authentication/error-404.png"
            className="img-fluid"
            alt
          />
        </div>
        <h3 className="h2 mb-3">Oops, something went wrong</h3>
        <p>
          Error 404 Page not found. Sorry the page you looking for doesn’t exist
          or has been moved
        </p>
        <Link to={route.signin} className="btn btn-primary">
          Back to Signin
        </Link>
      </div>
    </div>
  );
};

export default Error404;
