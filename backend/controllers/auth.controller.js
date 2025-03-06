import bcryptjs from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../mailControllers/email.js";

// Signup Route
export const signup = async (req, res) => {
  try {
    // Destructure the request body
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    // Validation
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    // Validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hashing Password
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Generate verification code
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const TOKEN_EXPIRATION_TIME = 1 * 60 * 60 * 1000; // Token expires in 1 hours
    const user = new User({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + TOKEN_EXPIRATION_TIME,
    });

    // Save user in database
    await user.save();

    

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError.message);
    }

    //Send response
    res.json({
      user: { id: user.id, fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    // Handling Errors
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Verify Email Route
export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    // Validate code
    if (!code || typeof code !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code format" });
    }

    // Find user
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Verification failed",
      });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    // Generate token
    const token = generateTokenAndSetCookie(res, user._id);
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token found" });
    }

    res.json({
      token,
      user: { id: user.id, fullname: user.fullname, email: user.email, isVerified: user.isVerified },
    });
  } catch (error) {
    console.error("Error in verifyEmail controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login Route
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare passwords
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate and set token
    const token = generateTokenAndSetCookie(res, user._id);
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate authentication token.",
      });
    }

    // Send success response
    res.json({
      token,
      user: { id: user.id, fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    // Log detailed error information
    console.error("Error in login controller:", error.stack || error.message);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};

// Logout Route
export const logout = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("blinkit_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Enable secure flag only in production
      sameSite: "strict", // Prevent cross-site cookie access
    });

    // Send success response
    return res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    // Log detailed error information
    console.error("Error in logout controller:", error.stack || error.message);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Do not reveal if the user exists
      return res.status(200).json({
        success: true,
        message: "If the email exists, a password reset link will be sent.",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiry;

    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset_password/${resetToken}`;

    try {
      await sendPasswordResetEmail(email, resetURL);
    } catch (emailError) {
      console.error(
        "Failed to send password reset email:",
        emailError.stack || emailError.message
      );
      return res.status(500).json({
        success: false,
        message: "Failed to send password reset email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "If the email exists, a password reset link will be sent.",
    });
  } catch (error) {
    console.error(
      "Error in forgetPassword controller:",
      error.stack || error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "An internal server error occurred." });
  }
};

// Reset password or Change password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword || !token) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    user.password = await bcryptjs.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    try {
      await sendResetSuccessEmail(user.email);
    } catch (emailError) {
      console.error(
        "Failed to send password reset success email:",
        emailError.stack || emailError.message
      );
    }

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(
      "Error in resetPassword controller:",
      error.stack || error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "An internal server error occurred." });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(
      "Error in getCurrentUser controller:",
      error.stack || error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "An internal server error occurred." });
  }
};
