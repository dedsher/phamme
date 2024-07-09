import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../../utils/auth";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  if (!verifyJWT(token)) {
    return res.status(403).send("Invalid token");
  }

  next();
};

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
}
