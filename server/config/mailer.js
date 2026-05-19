import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

export const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });