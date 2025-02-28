import express from "express";
import { getMessages, sendMessages } from "../controllers/Chat.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.get("/message", isLoggedIn, getMessages);
chatRouter.post("/send", isLoggedIn, sendMessages);

export default chatRouter;
