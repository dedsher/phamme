import { User } from "../src/models/userModel";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "skibidi-dop-yes-yes";
const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateJWT = (user: User): string => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "3h" });
};

export const verifyJWT = (token: string): boolean => {
  return jwt.verify(token, JWT_SECRET);
};

export const isMe = (token: string, id: string): boolean => {
  const payload = jwt.decode(token);
  return payload.id === id;
};
