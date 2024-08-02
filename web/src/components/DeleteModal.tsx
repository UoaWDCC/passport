import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark semi-transparent background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000, // Make sure it's on top of other content
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Slight shadow for better contrast
    minWidth: "300px", // Ensure the modal has a minimum width
  };

  const closeStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "20px", // Larger close button for better visibility
  };

  const buttonStyle: React.CSSProperties = {
    margin: "5px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const confirmButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#dc3545", // Red for confirm
    color: "white",
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#6c757d", // Gray for cancel
    color: "white",
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <span style={closeStyle} onClick={onClose}>
          &times;
        </span>
        <p>Are you sure you want to delete this item?</p>
        <button style={confirmButtonStyle} onClick={onConfirm}>
          Yes
        </button>
        <button style={cancelButtonStyle} onClick={onClose}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
