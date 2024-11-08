import React, { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import DissconnectionDialog from "../components/DissconnectionDialog";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
const Game = () => {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [sign, setSign] = useState("");
  const [turn, setTurn] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  const [winningComb, setWinningComb] = useState([]);
  const [winner, setWinner] = useState(null);
  const [ShowDialog, setShowDialog] = useState(false)
  useEffect(() => {
    const handleUserDetails = (userDetails) => {
      setUserName(userDetails[socket.id].UserName);
    };
    const handleGameStart = (opponentName, gameRoom) => {
      setWaiting(false);
      setOpponent(opponentName.UserName);
      setSign(gameRoom.sign);
      setTurn(gameRoom.turn);
    };
    const handleOpponentDisconnected = () => {
      resetGame();
      setWaiting(false);
      setShowDialog(true);
    };
    socket.on("user-details", handleUserDetails);
    socket.on("game-start", handleGameStart);
    socket.on("after-move-updations", (updatedgameBoard, gameRoom) => {
      setGameBoard(updatedgameBoard);
      setTurn(gameRoom.turn);
    });
    socket.on("game-over", (winningComb, winner,updatedgameBoard) => {
      setGameBoard(updatedgameBoard);
      setWinningComb(winningComb);
      setWinner(winner);
    });
    socket.on("opponent-disconnected", handleOpponentDisconnected);

    return () => {
      socket.off("user-details", handleUserDetails);
      socket.off("game-start", handleGameStart);
    };
  }, []);

  const handleDialogResponse=()=>{
    setShowDialog(false);
    resetGame();
  }
  const resetGame = () => {
    setOpponent("");
    setUserName("");
    setSign("");
    setWinner(null);
    setGameBoard(Array(9).fill(null))
  }
  const handleReturnHome = () => {
    resetGame();
    setWaiting(true);
    navigate("/");
  }
  const handleMove = (index) => {
    if(winner) return;
    if (!turn) return;
    if (gameBoard[index] !== null) return;
    const newGameBoard = [...gameBoard];
    newGameBoard[index] = sign;
    setGameBoard(newGameBoard);
    socket.emit("moveMade", newGameBoard);
  };

  return (
    <>
      {waiting ? (
        <LoadingPage />
      ) : (
        <>
          <style>
            {`
          .box {
            width: min(8rem,20vw);
            height: min(8rem,20vw);
            background: #0066b2;
            border: 2px solid black;
            border-radius: 1rem;
            margin: 0.3rem;
            text-align: center;
            font-size: min(6rem,14vw);
            font-family: cursive;
            font-weight: bolder;
            color: rgba(255, 255, 255, 0.6);
          }
          .diffcolor {
            background: #007FFF;
            color:rgba(255, 255, 255, 0.8);
          }
          .hffect:hover{
            background: #007FFF;
            cursor: pointer;
            }
            .player-box{
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-direction: column;
              background:rgba(255, 255, 255, 0.5);
              border-radius: 1rem;
              border: 2px solid #002D62;
              overflow:hidden;
            }
           .home-btn{
        background:rgba(255,255,255,0.4);
    }
    .home-btn:hover{
       background:rgba(255,255,255,0.7);
       transition:0.5s;
    }
          `}
          </style>
          <div
            style={{
              height: "100vh",
              background: "linear-gradient(135deg, #CE9FFC 10%, #7367F0 100%)",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              cursor: "default",
              position: "relative",
              overflowY: "auto",
            }}
          >
            {ShowDialog&&<DissconnectionDialog handleDialogResponse={handleDialogResponse}/>}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
              }}
            >
              <div className="player-box">
                <div
                  style={{
                    background: "#002D62",
                    color: "white",
                    padding: "0.3rem 1rem",
                    textAlign: "center",
                    width: "5rem",
                    minHeight: "1rem",
                  }}
                >
                  {UserName}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontFamily: "cursive",
                    padding: "0.5rem 0rem",
                    fontSize: "min(2rem,5vw)",
                  }}
                >
                  {sign}
                </div>
              </div>
              <div className="player-box">
                <div
                  style={{
                    background: "#002D62",
                    color: "white",
                    padding: "0.3rem 1rem",
                    textAlign: "center",
                    width: "5rem",
                    minHeight: "1rem",
                  }}
                >
                  {opponent}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontFamily: "cursive",
                    padding: "0.5rem 0rem",
                    fontSize: "min(2rem,5vw)",
                  }}
                >
                  {sign === "X" ? "O" : "X"}
                </div>
              </div>
            </div>
            {winner == null ? (
              <div
                style={{
                  margin: "1rem 0rem",
                  fontSize: "min(2rem,5vw)",
                  fontWeight: "bolder",
                  paddingBottom: "1rem",
                }}
              >
                {`${turn ? UserName : opponent}'s turn`}
              </div>
            ) : (
              <div
                style={{
                  margin: "1rem 0rem",
                  fontSize: "min(2rem,5vw)",
                  fontWeight: "bolder",
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "1rem",
                  padding: "0.3rem 0.5rem",
                  paddingBottom: "1rem",
                }}
              >
                {winner == "none" ? (
                  <div>The match ended in a DRAW</div>
                ) : (
                  <div>{`${winner} won the match`}</div>
                )}
              </div>
            )}
            <div
              style={{
                display: "grid",
                background: "#002D62",
                borderRadius: "1rem",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr 1fr",
                justifyItems: "center",
                width: "fit-content",
              }}
            >
              {gameBoard.map((cellValue, index) => (
                <div
                  key={`box-${index}`}
                  className={`box ${
                    turn && cellValue == null && winner == null ? "hffect" : ""
                  }  ${winningComb.includes(index) ? "diffcolor" : ""}`}
                  id={`box-${index + 1}`}
                  onClick={() => handleMove(index)} // Passing index here
                >
                  {cellValue}
                </div>
              ))}
            </div>
            {winner && <button
              className="home-btn"
              style={{
                marginTop:"1.5rem",
                width: "10rem",
                height: "3rem",
                borderRadius: "4rem",
                border: "3px solid black",
                fontWeight: "bolder",
                fontSize: "1.2rem",
                color: "#034694",
                cursor: "pointer",
              }}
              onClick={handleReturnHome}
            >
              RETURN HOME
            </button>}
          </div>
        </>
      )}
    </>
  );
};

export default Game;
