import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const ResetpasswordTwo = () => {
  const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper bg-img">
          <div className="login-content">
            <form action="success-2">
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <ImageWithBasePath src="assets/img/logo.png" alt="img" />
                </div>
                <Link to={route.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath
                    src="assets/img/logo-white.png"
                    alt="img"
                  />
                </Link>
                <div className="login-userheading">
                  <h3>Reset password?</h3>
                  <h4>
                    Enter New Password &amp; Confirm Password to get inside
                  </h4>
                </div>
                <div className="form-login">
                  <label> Old Password</label>
                  <div className="pass-group">
                    <input type="password" className="pass-input" />
                    <span className="fas toggle-password fa-eye-slash" />
                  </div>
                </div>
                <div className="form-login">
                  <label>New Password</label>
                  <div className="pass-group">
                    <input type="password" className="pass-inputa" />
                    <span className="fas toggle-passworda fa-eye-slash" />
                  </div>
                </div>
                <div className="form-login">
                  <label> New Confirm Passworrd</label>
                  <div className="pass-group">
                    <input type="password" className="pass-inputs" />
                    <span className="fas toggle-passwords fa-eye-slash" />
                  </div>
                </div>
                <div className="form-login">
                  <Link to={route.dashboard} className="btn btn-login">
                    Change Password
                  </Link>
                </div>
                <div className="signinform text-center">
                  <h4>
                    Return to{" "}
                    <Link to={route.signintwo} className="hover-a">
                      {" "}
                      login{" "}
                    </Link>
                  </h4>
                </div>
                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
                </div>
              </div>
            </form>
          </div>
          <div className="login-img">
            <ImageWithBasePath
              src="assets/img/authentication/reset02.png"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetpasswordTwo;
