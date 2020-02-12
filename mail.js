require('dotenv').config();
var nodemailer = require('nodemailer');
console.log(process.env.MAIL_USER,  process.env.MAIL_PASS);
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
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
