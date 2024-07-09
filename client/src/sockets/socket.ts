import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

const socket: Socket = io(SOCKET_URL);

socket.on("connect", () => {
  console.log("Connected to the server", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });
});

export default socket;
