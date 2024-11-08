import React from "react";
import { useNavigate } from "react-router-dom";
const DissconnectionDialog = ({handleDialogResponse}) => {
    const navigate = useNavigate();
    const handleReturnHome = () => {
      handleDialogResponse();
        navigate("/");
    }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>
      <div
        style={{
          width: "20rem",
          height: "12rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2rem", 
          alignItems: "center",
          background: "white",
          borderRadius: "1rem",
          fontSize: "1.4rem",
          fontWeight: "bolder",
          border: "4px solid #002D62",
          boxShadow: "0px 4px 10px rgba(0, 0, 0,0)",
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: "1rem" }}>Opponent Disconnected</div>
        <button
          style={{
            padding: "0.5rem 2rem",
            fontSize: "1.2rem",
            backgroundColor: "#002D62",
            color: "white",
            border: "none",
            borderRadius: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onClick={handleReturnHome}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default DissconnectionDialog;
