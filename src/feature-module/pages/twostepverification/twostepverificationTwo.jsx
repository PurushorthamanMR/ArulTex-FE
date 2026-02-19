import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const TwostepverificationTwo = () => {
  const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper">
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
                  <button type="submit" className="btn btn-login">
                    Verify My Account
                  </button>
                </div>
              </form>
              <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
              </div>
            </div>
          </div>
          <div className="login-img">
            <ImageWithBasePath
              src="assets/img/authentication/step-two.png"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwostepverificationTwo;
