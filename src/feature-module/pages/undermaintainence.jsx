import React from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { all_routes } from "../../Router/all_routes";
import { Link } from "react-router-dom";

const Undermaintainence = () => {
  const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <div className="error-img">
          <ImageWithBasePath
            src="assets/img/authentication/under-maintenance.png"
            className="img-fluid"
            alt
          />
        </div>
        <h3 className="h2 mb-3">We are Under Maintenance</h3>
        <p>
          Sorry for any inconvenience caused, we have almost done Will get back
          soon!
        </p>
        <Link to={route.signin} className="btn btn-primary">
          Back to Signin
        </Link>
      </div>
    </div>
  );
};

export default Undermaintainence;
