import React from "react";
import PropTypes from "prop-types"; // For type checking

const LetterModal = ({ showModal, handleClose, selectedLeave }) => {
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      tabIndex="-1"
      aria-hidden={!showModal}
      style={{ display: showModal ? "block" : "none" }} // Prevents the modal from disappearing completely
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Leave Letter</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p><strong>From:</strong> {selectedLeave?.from}</p>
            <p><strong>Subject:</strong> {selectedLeave?.subject}</p>
            <p><strong>Body:</strong> {selectedLeave?.body}</p>
            <p><strong>Salutation:</strong> {selectedLeave?.salutation}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Type-checking for props
LetterModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedLeave: PropTypes.object.isRequired,
};

export default LetterModal;
