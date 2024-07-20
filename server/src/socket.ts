import { Server } from "socket.io";
import http from "http";
import { ALLOWED_ORIGIN } from "./constants/utils";
import { Container } from "inversify";
import { TYPES } from "./types/inversify";
import { IChatService, IMessageService, IUserService } from "./types/core";

export default (http: http.Server, container: Container) => {
  const io = new Server(http, {
    cors: {
      origin: ALLOWED_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userService = container.get<IUserService>(TYPES.UserService);
  const messageService = container.get<IMessageService>(TYPES.MessageService);
  const chatService = container.get<IChatService>(TYPES.ChatService);

  const userSocketMap = new Map();
  const userContactsMap = new Map();
  const disconnectTimers = new Map();

  const getSocketIdByUserId = (userId: number) => {
    for (let [socketId, id] of userSocketMap.entries()) {
      if (id === userId) {
        return socketId;
      }
    }
    return null;
  };

  io.on("connection", function (socket) {
    console.log("a user connected", socket.id);

    socket.on("user connected", async (userId) => {
      userSocketMap.set(socket.id, userId);
      await userService.setStatus(userId, "online");

      if (disconnectTimers.has(userId)) {
        clearTimeout(disconnectTimers.get(userId));
        disconnectTimers.delete(userId);
      }

      const contacts = await userService.getContacts(userId);
      userContactsMap.set(userId, contacts);
      contacts.forEach((contactId) => {
        const contactSocketId = getSocketIdByUserId(contactId);
        if (contactSocketId) {
          io.to(contactSocketId).emit("user status updated", userId, "online");
        }
      });
    });

    socket.on("get room users count", (roomId, callback) => {
      const room = io.sockets.adapter.rooms.get(roomId);
      const userCount = room ? room.size : 0;
      callback(userCount);
    });

    socket.on("join room", (roomId) => {
      socket.join(String(roomId));
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("leave room", (roomId) => {
      socket.leave(String(roomId));
      console.log(`User ${socket.id} left room ${roomId}`);
    });

    socket.on("join active room", ({ roomId }) => {
      socket.join(`room-${roomId}`);
      console.log(`back: user ${socket.id} joined active room-${roomId}`);
    });

    socket.on("leave active room", ({ roomId }) => {
      socket.leave(`room-${roomId}`);
      console.log(`back: user ${socket.id} left active room-${roomId}`);
    });

    socket.on("message read", async (messageId: number) => {
      try {
        const message = await messageService.markMessageAsRead(messageId);
        const chatId = message.chat_id;
        console.log("message read", messageId);
        io.to(`room-${chatId}`).to(String(chatId)).emit("message read", message.chat_id);
      } catch (error) {
        console.log("Failed to mark message as read", error);
      }
    });

    socket.on("disconnect", () => {
      const userId = userSocketMap.get(socket.id);
      if (userId) {
        userSocketMap.delete(socket.id);

        const timer = setTimeout(async () => {
          await userService.setStatus(userId, "offline");

          const contacts = userContactsMap.get(userId);
          if (contacts) {
            contacts.forEach((contactId: number) => {
              const contactSocketId = getSocketIdByUserId(contactId);
              if (contactSocketId) {
                io.to(contactSocketId).emit(
                  "user status updated",
                  userId,
                  "offline"
                );
              }
            });
            userContactsMap.delete(userId);
          }
          disconnectTimers.delete(userId);
        }, 30 * 1000);

        disconnectTimers.set(userId, timer);
      }
      console.log("user disconnected", socket.id);
    });
  });

  return io;
};
