// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: 'xxxxxxxx@gmail.com', // Replace with your own email
    pass: 'pzwddefdatuizwlt', // Replace with app password 
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'xxxxxxxx@gmail.com', // Replace with your email
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;