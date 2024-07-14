import { User } from "../src/models/userModel";
import dotenv from "dotenv";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS
  }
} as nodemailer.TransportOptions)

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, process.env.SALT_ROUNDS);
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
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30m" });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "15d",
  });

  return { accessToken, refreshToken };
};

export const generateVerificationToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_VERIFICATION_SECRET, { expiresIn: "1d" });
};

export const getIdByVerificationToken = (token: string): number => {
  const payload = jwt.decode(token);
  return Number(payload.id);
}

export const verifyAccessToken = (token: string): boolean => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const isMe = (token: string, id: string): boolean => {
  const payload = jwt.decode(token);
  return payload.id === id;
};

export const sendMail = async (email: string, token: string) => {
  const message = {
      from: "phamme@yandex.ru",
      to: email,
      subject: 'Подтверждение почты',
      html: `<p>Подтвердите почту <a>http://localhost:3000/verify/${token}</a></p>`
  }

  let info: any = await transporter.sendMail(message);

  if (info.response.substring(0, 3) == '250') {
      return true;
  }

  return false
}
