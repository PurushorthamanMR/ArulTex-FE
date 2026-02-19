import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import { forgotPassword } from "../../Api/config"; 

const Forgotpassword = () => {
  const route = all_routes;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await forgotPassword(email);
      if (response == "Password reset email sent successfully") {
        setMessage(response);
        setLoading(false);
        setTimeout(() => navigate(route.resetpassword), 1000);
      } else {
        throw new Error(response);
      }
    } catch (error) {
      let errorMessage = "Failed to connect to the server";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setMessage(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper forgot-pass-wrap bg-img">
          <div className="login-content">
            <form onSubmit={handleForgotPassword}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <ImageWithBasePath src="assets/img/logo.png" alt="img" />
                </div>
                <Link to={route.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt />
                </Link>
                <div className="login-userheading">
                  <h3>Forgot password?</h3>
                  <h4>
                    If you forgot your password, we will email you the code to
                    reset your password.
                  </h4>
                </div>
                <div className="form-login">
                  <label>Email</label>
                  <div className="form-addons">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <ImageWithBasePath
                      src="assets/img/icons/mail.svg"
                      alt="img"
                    />
                  </div>
                </div>
                {message && (
                  <div
                    className={`text-center mb-3 ${
                      message.includes("success") ? "text-success" : "text-danger"
                    }`}
                    style={message.includes("Access Denied") ? { lineHeight: "1.5" } : {}}
                  >
                    {message}
                  </div>
                )}
                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Continue"}
                  </button>
                </div>
                <div className="signinform text-center">
                  <h4>
                    Return to
                    <Link to={route.signin} className="hover-a">
                      {" "}
                      login{" "}
                    </Link>
                  </h4>
                </div>
                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>Copyright © 2025 Codearson POS. All rights reserved</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;