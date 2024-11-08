import React,{useState,useEffect} from "react";
import { PlayArrow as PLayArrowIcon } from "@mui/icons-material";
import ScareCrow from "../assets/ScareCrow.png";
import {useNavigate} from "react-router-dom";
import socket from "../socket/socket";

const Home = () => {
  const navigate=useNavigate();
  const [UserName, setUserName] = useState("");
  const [IncorrectUserNameError, setIncorrectUserNameError] = useState(null);
  const handleUserNameChange=(e)=>{
    setIncorrectUserNameError(null);
    const newUserName = event.target.value;
    setUserName(newUserName.trim());
  }
  const isValidElement=(element)=>{
    if(element.length===0)return "Username should not be empty";
    if(element.length>8)return "Username should be maximun 8 characters long";
    if(element.includes(" "))return "Username should not contain spaces";
    if(/[^a-zA-Z0-9_]/.test(element))return "Username should not contain special characters";
    return null;
  }
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    const ErrorMessage=isValidElement(UserName);
    if(ErrorMessage){
      setIncorrectUserNameError(ErrorMessage);
    }
    else{
      navigate("/game");
      socket.emit("new-user",UserName);
    }
  }
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflowY:"hidden",
        cursor:"default"
      }}
    >
      <div style={{ position: "absolute", left: "0" }}>
        <img
          style={{ width: "min(40rem,60vw)", height: "min(40rem,60vw)" }}
          src={ScareCrow}
          alt=""
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span style={{fontSize:"min(4rem,12vw)",fontWeight:"bold",}}>TIC TAC TOE</span>
        <span style={{fontSize:"min(1.5rem,5vw)"}}>ONLINE</span>
      </div>
      <form
        style={{
          width: "30rem",
          height: "30rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "3rem",
          background: "rgba(255,255,255,0.2)",
          borderRadius: "1rem",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 10px 5px rgba(0,0,0,0.1)",
          zIndex: "10",
          margin: "4rem",
        }}
        onSubmit={handleFormSubmit}
      >
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your PlayerName..."
          value={UserName}
          style={{
            border: "2px solid grey",
            borderRadius: "1rem",
            width: "17rem",
            padding: "1rem",
            margin: "1rem",
            marginBottom: "0rem",
            background: "rgb(204, 204, 255)",
            fontWeight: "bolder",
            fontSize: "1.2rem",
            outline: "none",
            zIndex: "10",
          }}
          onChange={handleUserNameChange}
        />
        {
          IncorrectUserNameError && <div style={{color:"red",fontSize:"0.8rem",width:"min(100%,90vw)"}}>{IncorrectUserNameError}</div>
        }
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "rgb(93, 63, 211)",
            color: "white",
            borderRadius: "3rem",
            width: "15rem",
            outline: "none",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "0.5rem 0rem",
            cursor: "pointer",
            zIndex: "10",
          }}
        >
          <PLayArrowIcon sx={{ fontSize: 50, color: "rgb(173, 216, 230)" }} />
          <div style={{ color: "rgb(173, 216, 230)", fontSize: "1rem" }}>
            START GAME
          </div>
        </button>
      </form>
    </div>
  );
};

export default Home;
