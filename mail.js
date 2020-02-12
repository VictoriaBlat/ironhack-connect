require('dotenv').config();
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

console.log(process.env.MAIL_USER, process.env.MAIL_PASS);
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: process.env.MAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: 'X/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    }),
  },
});
var mailOptions = {
  from: process.env.MAIL_USER,
  to: process.env.MAIL_USER,
  subject: 'test',
  text: 'That was easy!',
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
