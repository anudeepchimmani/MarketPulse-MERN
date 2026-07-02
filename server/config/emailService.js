const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"MarketPulse Support" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: "MarketPulse Password Reset OTP",

    html: `
      <div style="font-family: Arial, sans-serif; padding:20px;">
      
        <h2>Password Reset Request</h2>

        <p>Hello,</p>

        <p>You requested to reset your password.</p>

        <p>Your OTP is:</p>

        <h1 style="color:#198754; letter-spacing:5px;">
          ${otp}
        </h1>

        <p>
          This OTP is valid for
          <strong>5 minutes</strong>.
        </p>

        <p>
          If you did not request this,
          please ignore this email.
        </p>

        <br>

        <p>
          Regards,
          <br>
          <strong>MarketPulse Team</strong>
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendOTPEmail,
};