import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import { registerDevice, getDeviceByTillName, getDeviceByTillId } from "../../Api/DeviceAuthApi";

const RegisterTill = () => {
  const route = all_routes;
  const [tillName, setTillName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get the stored device ID from localStorage
    const storedDeviceId = localStorage.getItem('posDeviceUUID');
    if (storedDeviceId) {
      console.log('%c 📱 Stored Device ID found:', 'color: #4CAF50; font-weight: bold;', storedDeviceId);
      setDeviceId(storedDeviceId);
    } else {
      console.log('%c ⚠️ No Device ID found in localStorage', 'color: #FF9800; font-weight: bold;');
    }
  }, []);

  const handleRegisterTill = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (!deviceId) {
        setMessage("Device ID not found. Please try again.");
        return;
      }

      if (!tillName.trim()) {
        setMessage("Please type Till Name");
        return;
      }

      // Check if till name already exists
      try {
        const existingTillByName = await getDeviceByTillName(tillName.trim());
        if (existingTillByName?.status && existingTillByName?.responseDto) {
          setMessage("Already Exist Try Another Name");
          setLoading(false);
          return;
        }
      } catch (error) {
        // If error occurs, continue with registration
        console.log("No existing till found with this name");
      }

      // Check if device ID is already registered
      try {
        const existingTillById = await getDeviceByTillId(deviceId);
        if (existingTillById?.status && existingTillById?.responseDto) {
          setMessage("This Till Already Register Contact Admin");
          setLoading(false);
          return;
        }
      } catch (error) {
        // If error occurs, continue with registration
        console.log("No existing till found with this device ID");
      }

      const deviceData = {
        tillName: tillName.trim(),
        tillId: deviceId
      };

      console.log('%c 📤 Registering device with data:', 'color: #4CAF50; font-weight: bold;', deviceData);
      
      const response = await registerDevice(deviceData);
      console.log('%c ✅ Registration response:', 'color: #4CAF50; font-weight: bold;', response);
      // Store the full register device response in localStorage
      localStorage.setItem('registeredDevice', JSON.stringify(response));

      if (response && response.status && response.responseDto) {
        const { tillId, approveStatus } = response.responseDto;
        
        // Store the tillId for future use
        localStorage.setItem('tillId', tillId);
        console.log('%c 💾 Till ID stored:', 'color: #4CAF50; font-weight: bold;', tillId);
        
        if (approveStatus === "Pending") {
          setMessage("Registration successful! Waiting for admin approval. Please try again later.");
          console.log('%c ⏳ Device pending approval:', 'color: #FF9800; font-weight: bold;', 'Admin approval required');
          
          // Navigate to device authentication after a delay
          setTimeout(() => navigate(route.signin), 3000);
        } else if (approveStatus === "Approved") {
          setMessage("Till registered and approved successfully!");
          setTimeout(() => navigate(route.signin), 1000);
        } else {
          setMessage("Registration failed. Please try again.");
        }
      } else {
        const errorMessage = response?.message || "Failed to register till. Please try again.";
        setMessage(errorMessage);
        console.error('%c ❌ Registration failed:', 'color: #F44336; font-weight: bold;', errorMessage);
      }
    } catch (error) {
      console.error('%c ❌ Registration error:', 'color: #F44336; font-weight: bold;', error);
      const errorMessage = error?.response?.data?.message || "An error occurred during registration. Please try again.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper forgot-pass-wrap bg-img">
          <div className="login-content">
            <form onSubmit={handleRegisterTill}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <ImageWithBasePath src="assets/img/logo.png" alt="img" />
                </div>
                <Link to={route.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt />
                </Link>
                <div className="login-userheading">
                  <h3>Register Till</h3>
                  <h4>
                    Please enter your Till Name to register your device for POS operations.
                  </h4>
                </div>
                <div className="form-login">
                  <label>Till Name</label>
                  <div className="form-addons">
                    <input
                      type="text"
                      className="form-control"
                      value={tillName}
                      onChange={(e) => setTillName(e.target.value)}
                      placeholder="Enter Till Name"
                    />
                  </div>
                  {message === "Please type Till Name" && (
                    <div className="text-danger mt-1">
                      {message}
                    </div>
                  )}
                </div>
                {message && message !== "Please type Till Name" && (
                  <div className={`text-center mb-3 ${message.includes("success") ? "text-success" : "text-danger"}`}>
                    {message}
                  </div>
                )}
                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login"
                    disabled={loading || !deviceId}
                  >
                    {loading ? "Registering..." : "Register Till"}
                  </button>
                </div>
                <div className="signinform text-center">
                  <h4>
                    Return to
                    <Link to={route.signin} className="hover-a">
                      {" "}Log In Page{" "}
                    </Link>
                  </h4>
                </div>
                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>Copyright © {new Date().getFullYear()} Codearson POS. All rights reserved</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTill; 