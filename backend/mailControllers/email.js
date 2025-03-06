import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
}  from "./emailTemplate.js";

import { transporter } from "./nodemailerConfig.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: `"BlinkitClone" <no-reply@blinkit.com>`, // Sender address
      to: email,
      subject: "Email Verification",
      text: "This message for OTP Verification please don't share it.",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });

    console.log("Verification Mail Send Successfully");
  } catch (error) {
    console.error(error);
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  try {
    const info = await transporter.sendMail({
      from: `"BlinkitClone" <no-reply@blinkit.com>`, // Sender address
      to: email,
      subject: "Welcome to Signpup",
      
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", userName),
    });

    console.log("Welcome Message Send  Successfully");
  } catch (error) {
    console.error(error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {

  try {
    const info = await transporter.sendMail({
      from: `"BlinkitClone" <no-reply@blinkit.com>`, // Sender address
      to: email,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });

    console.log("Reset Password Mail Send Successfully");
  } catch (error) {
    console.error(error);
  }

};

export const sendResetSuccessEmail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: `"BlinkitClone" <no-reply@blinkit.com>`, // Sender address
      to: email,
      subject: "Password Reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error(error);
  }
};
