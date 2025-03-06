import express from "express"

import {signup, verifyEmail, login, logout, forgotPassword, resetPassword, getCurrentUser} from "../controllers/auth.controller.js"
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/verify_email", verifyEmail);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot_password", forgotPassword);
router.post("/reset_password/:token", resetPassword);

router.get("/get_user",protectRoute, getCurrentUser);





export default router;