import React from "react";

const Modal = ({ isOpen, onClose, onSave, title, children }) => {
  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onSave}>
              Save changes
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Modal;
