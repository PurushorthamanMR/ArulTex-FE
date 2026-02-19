import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const ResetpasswordThree = () => {
  const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper login-new">
          <div className="login-content user-login">
            <div className="login-logo">
              <ImageWithBasePath src="assets/img/logo.png" alt="img" />
              <Link to={route.dashboard} className="login-logo logo-white">
                <ImageWithBasePath src="assets/img/logo-white.png" alt />
              </Link>
            </div>
            <form action="success-3">
              <div className="login-userset">
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
                    <Link to={route.signinthree} className="hover-a">
                      {" "}
                      login{" "}
                    </Link>
                  </h4>
                </div>
              </div>
            </form>
          </div>
          <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
            <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetpasswordThree;
