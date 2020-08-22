const sgMail = require('@sendgrid/mail');
const pug = require('pug');
const htmlToText = require('html-to-text');

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sendEmail = async (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const html = pug.renderFile(`${__dirname}/../views/passwordReset.pug`, {
    url: options.resetUrl,
  });
  const msg = {
    to: options.email,
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    subject: options.subject,
    text: htmlToText.fromString(html),
    html,
  };
  sgMail.send(msg);
};

module.exports = sendEmail;

// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   if (process.env.NODE_ENV === 'production') {
//     // sendgrid
//     return nodemailer.createTransport({
//       service: 'SendGrid',
//       port: process.env.SENDGRID_PORT,
//       auth: {
//         user: process.env.SENDGRID_USERNAME,
//         pass: process.env.SENDGRID_PASSWORD,
//       },
//     });
//   }
//   let transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   });

//   console.log('Message sent: %s', info.messageId);
// };

// module.exports = sendEmail;
