const nodemailer = require("nodemailer");

console.log("EMAIL:", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  console.log("📧 sendEmail() called");
  console.log("To:", to);

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("✅ Email Sent Successfully");
    console.log(info);
  } catch (error) {
    console.log("❌ Email Error");
    console.log(error);
  }
};

module.exports = sendEmail;