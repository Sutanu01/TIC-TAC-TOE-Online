const socketIO = require("socket.io");

const userDetails = {};
const waitingQueue = [];
const gameRooms = {};

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_PORT,
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {



    socket.on("new-user", (UserName) => {
      userDetails[socket.id] = { UserName: UserName };
      socket.emit("user-details", userDetails);

      //WAITING QUEUE LOGIC
      waitingQueue.push(socket.id);
      if (waitingQueue.length >= 2) {
        const player1 = waitingQueue.shift();
        const player2 = waitingQueue.shift();
        gameRooms[player1] = {opponent:player2,sign:"X",turn:true};
        gameRooms[player2] = {opponent:player1,sign:"O",turn:false};
        io.to(player1).emit("game-start", userDetails[player2],gameRooms[player1]);
        io.to(player2).emit("game-start", userDetails[player1],gameRooms[player2]);
      }
    });
    

    const isGameOver=(gameBoard)=>{
        const combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let comb of combs) {
            const [a, b, c] = comb;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
              return { winner: userDetails[socket.id].UserName, winningComb: comb };
            }
        }
        if (gameBoard.every(cell => cell !== null)) {
            return { winner: "none", winningComb: [] };
          }
        
          return { winner: null, winningComb: [] };


    }





    socket.on("moveMade", (gameBoard) => {
      const gameRoom = gameRooms[socket.id];
      gameRoom.turn = false;
      gameRooms[gameRoom.opponent].turn = true;

      const {winner,winningComb} = isGameOver(gameBoard);
      if(winner){
        io.to(gameRoom.opponent).emit("game-over",winningComb,winner,gameBoard);
        io.to(socket.id).emit("game-over",winningComb,winner,gameBoard);
        delete gameRooms[gameRooms[socket.id].opponent];
        delete gameRooms[socket.id];
      }
      else{
        io.to(gameRoom.opponent).emit("after-move-updations", gameBoard,gameRooms[gameRoom.opponent]);
        io.to(socket.id).emit("after-move-updations", gameBoard,gameRoom);
      }
    });










    const handleDisconnection=()=>{
        delete userDetails[socket.id];
          const index = waitingQueue.indexOf(socket.id);
          if (index > -1) {
            waitingQueue.splice(index, 1);
          }
          const gameRoom = gameRooms[socket.id];
          if (gameRoom) {
            io.to(gameRoom.opponent).emit("opponent-disconnected");
            delete gameRooms[gameRoom.opponent];
            delete gameRooms[socket.id];
          }
      }


    socket.on("cancel-matchmaking",handleDisconnection);
    socket.on("disconnect",handleDisconnection);
  });
};
