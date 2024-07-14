import { Server } from "socket.io";
import http from "http";
import { ALLOWED_ORIGIN } from "./config/config";
import { Container } from "inversify";
import { TYPES } from "./types/inversify";
import { IChatService, IMessageService, IUserService } from "./types/core";
import { Message } from "models/messageModel";

export default (http: http.Server, container: Container) => {
  const io = new Server(http, {
    cors: {
      origin: ALLOWED_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  const userService = container.get<IUserService>(TYPES.UserService);
  const messageService = container.get<IMessageService>(TYPES.MessageService);
  const chatService = container.get<IChatService>(TYPES.ChatService);

  const userSocketMap = new Map();

  io.on("connection", function (socket: any) {
    console.log("a user connected", socket.id);

    socket.on("join room", (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("user connected", async (userId: number) => {
      userSocketMap.set(socket.id, userId);
      await userService.setStatus(userId, "online");
      socket.emit("user status updated", userId, "online");
    });

    socket.on("user disconnected", async () => {
      const userId = userSocketMap.get(socket.id);
      if (userId) {
        await userService.setStatus(userId, "offline");
        userSocketMap.delete(socket.id);
      }
      console.log("user disconnected", userId);
    });

    socket.on("leave room", (roomId: string) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
    });

    socket.on("disconnect", async () => {
      const userId = userSocketMap.get(socket.id);
      if (userId) {
        await userService.setStatus(userId, "offline");
        userSocketMap.delete(socket.id);
      }
      console.log("user disconnected", socket.id);
    });
  });

  return io;
};
