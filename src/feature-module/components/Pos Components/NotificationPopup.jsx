import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../../../style/scss/components/Pos Components/NotificationPopup.scss";

const NotificationPopup = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, onClose]);

  return (
    <div className={`notification-popup ${type}`}>
      <div className="notification-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
  onClose: PropTypes.func.isRequired,
};

export default NotificationPopup;