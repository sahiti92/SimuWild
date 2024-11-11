import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import "./styles.css"

const AlertMessage = ({ type, message }) => {
  let icon;
  let bgColor;
  let textColor;
  let borderLeftColor;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="alert-icon error-icon" />;
      bgColor = "alert-error-bg";
      textColor = "alert-error-text";
      borderLeftColor = "alert-error-border";
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="alert-icon success-icon" />;
      bgColor = "alert-success-bg";
      textColor = "alert-success-text";
      borderLeftColor = "alert-success-border";
      break;
    case "loading":
      icon = (
        <AiOutlineLoading3Quarters className="alert-icon loading-icon" />
      );
      bgColor = "alert-loading-bg";
      textColor = "alert-loading-text";
      borderLeftColor = "alert-loading-border";
      break;
    default:
      icon = null;
      bgColor = "";
      textColor = "";
      borderLeftColor = "";
  }

  return (
    <div className={`alert-container ${bgColor} ${textColor} ${borderLeftColor}`}>
      {icon}
      <span className="alert-message">{message}</span>
    </div>
  );
};

export default AlertMessage;
