import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const ForgotpasswordThree = () => {
  const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper login-new">
          <div className="container">
            <div className="login-content user-login">
              <div className="login-logo">
                <ImageWithBasePath src="assets/img/logo.png" alt="img" />
                <Link to={route.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt />
                </Link>
              </div>
              <form action="signin-3">
                <div className="login-userset">
                  <div className="login-userheading">
                    <h3>Forgot password?</h3>
                    <h4>
                      If you forgot your password, well, then we’ll email you
                      instructions to reset your password.
                    </h4>
                  </div>
                  <div className="form-login">
                    <label>Email</label>
                    <div className="form-addons">
                      <input type="email" className="form-control" />
                      <ImageWithBasePath
                        src="assets/img/icons/mail.svg"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="form-login">
                    <Link to={route.signin} className="btn btn-login">
                      Sign Up
                    </Link>
                  </div>
                  <div className="signinform text-center">
                    <h4>
                      Return to
                      <Link to={route.signinthree} className="hover-a">
                        {" "}
                        login{" "}
                      </Link>
                    </h4>
                  </div>
                  <div className="form-setlogin or-text">
                    <h4>OR</h4>
                  </div>
                  <div className="form-sociallink">
                    <ul className="d-flex justify-content-center">
                      <li>
                        <Link to="#" className="facebook-logo">
                          <ImageWithBasePath
                            src="assets/img/icons/facebook-logo.svg"
                            alt="Facebook"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <ImageWithBasePath
                            src="assets/img/icons/google.png"
                            alt="Google"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="apple-logo">
                          <ImageWithBasePath
                            src="assets/img/icons/apple-logo.svg"
                            alt="Apple"
                          />
                        </Link>
                      </li>
                    </ul>
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
    </div>
  );
};

export default ForgotpasswordThree;
