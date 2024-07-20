import dotenv from "dotenv";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";

dotenv.config();

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateJWT = (
  user: User
): { accessToken: string; refreshToken: string } => {
  const payload = { id: user.id, email: user.email };
  const accessToken = jwt.sign(payload, String(process.env.JWT_SECRET), {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(
    payload,
    String(process.env.JWT_REFRESH_SECRET),
    {
      expiresIn: "15d",
    }
  );

  return { accessToken, refreshToken };
};

export const generateVerificationToken = (id: string): string => {
  return jwt.sign({ id }, String(process.env.JWT_VERIFICATION_SECRET), {
    expiresIn: "1d",
  });
};

export const getIdByVerificationToken = (token: string): number => {
  try {
    const payload: { id: string } = jwtDecode(token);
    return Number(payload.id);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, String(process.env.JWT_SECRET));
};
