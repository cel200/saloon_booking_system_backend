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
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  family: 4 // force IPv4 instead of IPv6
});

module.exports = transporter;