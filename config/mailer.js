// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:process.env.MAIL_USER,
//         pass:process.env.MAIL_PASS
//     }
// })
// module.exports = transporter

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4, // force IPv4
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

module.exports = transporter;