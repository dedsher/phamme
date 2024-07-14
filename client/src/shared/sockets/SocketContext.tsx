import { useUserId } from "@entities/user/hooks/useUserId";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

const socket: Socket = io(SOCKET_URL);
const userId = useUserId();

socket.on("connect", () => {
  console.log("Connected to the server", socket.id);

  socket.emit("user connected", userId);

  socket.on("user status updated", (userId, status) => {
    console.log("User status updated", userId, status);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });
});

export default socket;