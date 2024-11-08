# Online Tic-Tac-Toe Game

This is a real-time, multiplayer Tic-Tac-Toe game built with **React.js**, **Socket.IO**, **Node.js**, and **Express**. Players can join the game, play against each other in real-time, and receive instant notifications when a player wins or the game is a draw.

## Features

- Real-time gameplay using Socket.IO
- Enter player usernames before starting the game
- Visual indication of the winner
- Responsive and interactive UI

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Real-Time Communication**: Socket.IO
- **Styling**: CSS

## How to Play

1. Visit the app [here](https://your-app-url.com).
2. Enter your username on the home screen.
3. Wait for another player to join or invite a friend to play.
4. Once both players are ready, the game will start automatically.
5. Click on a cell to make your move.
6. The game will notify both players when there’s a winner or if it’s a draw.

## WebSocket Implementation

The game uses Socket.IO to manage real-time communication between players. The backend handles WebSocket events like:

- Connecting players
- Handling moves
- Broadcasting win/draw events


## Folder Structure

```plaintext
online-tic-tac-toe/
├── client/                # React frontend
│   ├── public/
│   └── src/
├── server/                # Node.js and Express backend
│   ├── socket.js          # Socket.IO server code
│   └── server.js
└── README.md
