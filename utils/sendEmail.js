// utils/sendEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendEmail = ({ to, subject, html }) => {
  return transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    html
  });
};

module.exports = sendEmail;