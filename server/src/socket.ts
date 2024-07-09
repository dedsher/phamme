import { Server } from "socket.io";
import http from "http";
import { ALLOWED_ORIGIN } from "./config/config";

export default (http: http.Server) => {
  const io = new Server(http, {
    cors: {
      origin: ALLOWED_ORIGIN,
      methods: ["GET", "POST"],
    }
  });

  io.on("connection", function (socket: any) {
    console.log("a user connected", socket.id);

    socket.on('join room', (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });
  
    socket.on('leave room', (roomId: string) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
    });
  });

  return io;
};
