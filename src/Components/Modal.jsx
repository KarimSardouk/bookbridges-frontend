import React from "react";
import "../Styles/Modal.css"; // Add your own styling

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal1-overlay">
      <div className="modal1">
        <div className="modal1-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal1-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
