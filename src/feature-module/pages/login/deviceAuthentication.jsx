import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { v4 as uuidv4 } from 'uuid';
import { loginDevice } from "../../Api/DeviceAuthApi";

const DeviceAuthentication = () => {
  const route = all_routes;
  const navigate = useNavigate();
  const [deviceId, setDeviceId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeviceReady, setIsDeviceReady] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Device authentication logic with UUID and FingerprintJS
    const authenticateDevice = async () => {
      try {
        // 1. Persistent UUID
        let uuid = localStorage.getItem('posDeviceUUID');
        if (!uuid) {
          uuid = uuidv4();
          localStorage.setItem('posDeviceUUID', uuid);
          console.log('%c 🆕 New Device UUID generated:', 'color: #4CAF50; font-weight: bold;', uuid);
        } else {
          console.log('%c 🗂️ Existing Device UUID found:', 'color: #2196F3; font-weight: bold;', uuid);
        }

        // 2. FingerprintJS visitorId
        console.log('%c 🔍 FingerprintJS: Initializing...', 'color: #4CAF50; font-weight: bold;');
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const visitorId = result.visitorId;
        console.log('%c 🔑 FingerprintJS visitorId:', 'color: #4CAF50; font-weight: bold;', visitorId);

        // 3. Hybrid ID
        const hybridId = `${uuid}_${visitorId}`;
        console.log('%c 🛡️ Hybrid Device ID:', 'color: #FF9800; font-weight: bold;', hybridId);

        // Store for later use
        localStorage.setItem('hybridDeviceId', hybridId);
        // Set the UUID part
        setDeviceId(uuid);
        console.log('%c 📝 Device ID stored in state:', 'color: #9C27B0; font-weight: bold;', {
          deviceId: uuid,
          hybridId: hybridId,
          visitorId: visitorId
        });
        setIsDeviceReady(true);
        setIsLoading(false);
      } catch (error) {
        console.error('%c ❌ Error initializing FingerprintJS:', 'color: #F44336; font-weight: bold;', error);
        setError("Failed to initialize device authentication");
        setIsLoading(false);
      }
    };

    authenticateDevice();
  }, []);

  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");
    setIsVerifying(true);

    try {
      if (!deviceId) {
        setError("Device ID not found");
        return;
      }

      console.log('%c 🔄 Attempting to login device with ID:', 'color: #2196F3; font-weight: bold;', deviceId);
      const response = await loginDevice(deviceId);
      console.log('%c ✅ Login device response:', 'color: #4CAF50; font-weight: bold;', response);
      
      if (response && response.status && response.responseDto) {
        const { tillId, tillName, approveStatus, loginStatus } = response.responseDto;
        
        // Store device information
        localStorage.setItem("deviceId", deviceId);
        localStorage.setItem("tillId", tillId);
        localStorage.setItem("tillName", tillName);
        
        console.log('%c 💾 Device data stored:', 'color: #4CAF50; font-weight: bold;', {
          deviceId,
          tillId,
          tillName,
          approveStatus,
          loginStatus
        });

        // Check if device is approved and can login
        if (approveStatus === "Approved" && loginStatus === "True") {
          console.log('%c 🚀 Navigating to signin page...', 'color: #4CAF50; font-weight: bold;');
          navigate(route.signin);
        } else {
          setError("Device is not approved for login. Please contact administrator.");
        }
      } else {
        setError("Failed to verify device. Please try again.");
        console.error('%c ❌ Login failed:', 'color: #F44336; font-weight: bold;', 'Invalid response format');
      }
    } catch (error) {
      console.error('%c ❌ Error during device verification:', 'color: #F44336; font-weight: bold;', error);
      const errorMessage = error?.response?.data?.message || "An error occurred during device verification. Please try again.";
      setError(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper bg-img">
          <div className="login-content">
            <form onSubmit={handleContinue}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <ImageWithBasePath src="assets/img/logo.png" alt="img" />
                </div>
                <Link to={route.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt />
                </Link>
                <div className="login-userheading">
                  <h3>Device Authentication</h3>
                  <h4>
                    {isLoading ? "Initializing device..." : 
                     isDeviceReady ? "Device ready for authentication" :
                     "Please wait while we verify your device"}
                  </h4>
                </div>
                {isLoading ? (
                  <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-login">
                      <button
                        type="submit"
                        className="btn btn-login"
                        disabled={isVerifying || !isDeviceReady}
                      >
                        {isVerifying ? "Verifying..." : "Continue"}
                      </button>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <Link className="forgot-link" to={route.registerTill}>
                        Register Till?
                      </Link>
                    </div>
                  </>
                )}
                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>Copyright © {new Date().getFullYear()} Codearson Delta_POS. All rights reserved</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceAuthentication; 