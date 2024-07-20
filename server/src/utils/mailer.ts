import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: String(process.env.EMAIL_HOST),
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: String(process.env.EMAIL_USER),
    pass: String(process.env.EMAIL_PASS),
  },
} as nodemailer.TransportOptions);

export const sendMail = async (email: string, token: string) => {
  const message = {
    from: String(process.env.EMAIL_USER),
    to: email,
    subject: "Активация аккаунта",
    html: `<p>Подтвердите почту <a>http://localhost:5173/auth/verification/${token}</a></p>`,
  };

  console.log(message);

  let info: any = await transporter.sendMail(message);

  if (info.response.substring(0, 3) == "250") {
    return true;
  }

  return false;
};
