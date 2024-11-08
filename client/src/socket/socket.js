import { io } from "socket.io-client";

const socket = io(`http://localhost:${import.meta.env.VITE_SERVER_PORT}`, {
  autoConnect: true,
});

export default socket;
