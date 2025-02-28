import asyncHandler from "../utils/asyncHandler.util.js";
import apiResponse from "../utils/apiResponse.util.js";
import ApiError from "../utils/apiError.util.js";
import Gemini from "../config/gemini.js";
import Chat from "../models/Chat.model.js";

const getMessages = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  const chat = await Chat.find({ userId: user_id }).sort({ createdAt: 1 });

  res.json(new apiResponse(200, chat, "Messages retrieved successfully"));
});

const sendMessages = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const user_id = req.user._id;

  const geminiResponse = await Gemini(text);

  const chat = await Chat.create({
    userId: user_id,
    message: text,
    reply: geminiResponse,
  });

  res.json(new apiResponse(201, chat, "message sent!"));
});
export { getMessages, sendMessages };
