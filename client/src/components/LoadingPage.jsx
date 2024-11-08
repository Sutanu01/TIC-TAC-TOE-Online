import React from 'react'
import socket from '../socket/socket'
import { useNavigate } from 'react-router-dom'
const LoadingPage = () => {
  const navigate=useNavigate();
  const handleCancelMatchmaking=(e)=>{
    e.preventDefault();
    socket.emit("cancel-matchmaking");
    navigate("/");
  }
  return (
    <>
    <style>{`
      .spinner {
         width:7rem;
         height:7rem;
         border-radius: 50%;
         border: 1rem solid rgba(255,255,255,0.2);
         border-top: 1rem solid #0066b2;
         animation: spin 1s linear infinite;
    }
    .cancel-btn{
        background:rgba(255,255,255,0.4);
    }
    .cancel-btn:hover{
       background:rgba(255,255,255,0.7);
       transition:0.5s;
    }
    @keyframes spin {
    0% {
    transform: rotate(0deg);
    }
    100% {
    transform: rotate(360deg);
     }
} 
    `
      }
      
    </style>
    <div
      style={{
        height: "100vh",
        background: "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        overflowY:"hidden",
        cursor:"default",
        gap:"3rem"
      }}
    > 
      <div className='spinner'></div>
      <div style={{fontSize:"min(2rem,5vw)",textAlign:"center"}}>Searching for Players...</div>
      <button className="cancel-btn"style={{width:"7rem",height:"3rem",borderRadius:'4rem',border:"3px solid black",fontWeight:"bolder",fontSize:"1rem",color:"#034694",cursor:"pointer"}}onClick={handleCancelMatchmaking}>Cancel</button>
    </div></>
    

  )
}

export default LoadingPage