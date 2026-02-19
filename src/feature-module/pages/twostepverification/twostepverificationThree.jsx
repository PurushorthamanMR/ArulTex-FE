import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const TwostepverificationThree = () => {
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
            <div className="login-userset">
              <div className="login-userheading">
                <h3>Login With Your Email Address</h3>
                <h4 className="verfy-mail-content">
                  We sent a verification code to your email. Enter the code from
                  the email in the field below
                </h4>
              </div>
              <form action="index" className="digit-group">
                <div className="wallet-add">
                  <div className="otp-box">
                    <div className="forms-block text-center">
                      <input
                        type="text"
                        id="digit-1"
                        maxLength={1}
                        defaultValue
                      />
                      <input
                        type="text"
                        id="digit-2"
                        maxLength={1}
                        defaultValue
                      />
                      <input
                        type="text"
                        id="digit-3"
                        maxLength={1}
                        defaultValue
                      />
                      <input
                        type="text"
                        id="digit-4"
                        maxLength={1}
                        defaultValue
                      />
                    </div>
                  </div>
                </div>
                <div className="Otp-expire text-center">
                  <p>Otp will expire in 09 :10</p>
                </div>
                <div className="form-login mt-4">
                  <Link to={route.dashboard} className="btn btn-login">
                    Verify My Account
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
            <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwostepverificationThree;
