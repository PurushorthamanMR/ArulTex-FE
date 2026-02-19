import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const EmailVerification = () => {
  const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper email-veri-wrap bg-img">
          <div className="login-content">
            <div className="login-userset">
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <ImageWithBasePath src="assets/img/logo.png" alt="img" />
                </div>
              </div>
              <Link to={route.dashboard} className="login-logo logo-white">
                <ImageWithBasePath src="assets/img/logo-white.png" alt />
              </Link>
              <div className="login-userheading text-center">
                <h3>Verify Your Email</h3>
                <h4 className="verfy-mail-content">
                  We&apos;ve sent a link to your email ter4@example.com. Please
                  follow the link inside to continue
                </h4>
              </div>
              <div className="signinform text-center">
                <h4>
                  Didn&apos;t receive an email?{" "}
                  <Link to="#" className="hover-a resend">
                    Resend Link
                  </Link>
                </h4>
              </div>
              <div className="form-login">
                <Link className="btn btn-login" to={route.dashboard}>
                  Skip Now
                </Link>
              </div>
              <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
