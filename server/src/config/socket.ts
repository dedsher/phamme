import { Server } from "socket.io";

const configIo = (server: any) => new Server(server, {
  cors: {
    origin: "*",
  },
});

export default configIo;
