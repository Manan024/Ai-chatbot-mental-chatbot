import express from "express";
import { signup, login, logout ,authCheck,refreshToken } from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.middleware.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.route("/signup").post(upload.single("profilePicture"),signup);
authRouter.route("/login").post( login);
authRouter.get("/logout",logout);

authRouter.get("/check",isLoggedIn,authCheck)
authRouter.get("/refreshToken", refreshToken);

export default authRouter;
