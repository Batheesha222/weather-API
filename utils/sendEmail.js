const nodemailer = require("nodemailer");
const { senderEmail, emailPassword } = require("../config/keys");

const sendEmail = async ({ emailTo, subject ,text}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: emailPassword,
    },
  });
  const message = {
    to: emailTo,
    subject,
    text
  };
  await transporter.sendMail(message);
};

module.exports = sendEmail;
