import "reflect-metadata";
import { NextFunction } from "express";
import cors from "cors";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import http from "http";
import createSocket from "./socket";
import container from "./inversify.config";
import { TYPES } from "./types/inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import cookieParser from "cookie-parser";

const inversifyServer = new InversifyExpressServer(container, null, {
  rootPath: "/api",
});

inversifyServer.setConfig((app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: container.get<string>(TYPES.ALLOWED_ORIGIN),
      credentials: true,
    })
  );
});

inversifyServer.setErrorConfig((app) => {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.message.includes("jwt")) {
      res.status(401).json({ message: "unauthorized" });
    }

    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    res.status(status).json({ message });
  });
});

const builtApp = inversifyServer.build();
const server = http.createServer(builtApp);
export const io = createSocket(server, container);

export default server;
