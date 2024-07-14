import { Request, Response, NextFunction } from "express";
import { Server } from "socket.io";

export function socketMiddleware(io: Server) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.io = io;
    next();
  };
}
