import asyncHandler from "../utils/asyncHandler.util.js";
import ApiError from "../utils/apiError.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isLoggedIn = asyncHandler(async (req, _, next) => {
  try {
    const token = req.headers?.authorization || req.cookies.accessToken;

    if (!token) {
      throw new ApiError("Unauthorized! Please log in again.", 401);
    }

    let decoded;
    try {
      
      decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
      
    } catch (error) {
      
      if (error.name === "TokenExpiredError") {
        throw new ApiError("Token expired! Please refresh your session.", 401);
      }
      // Handle other verification errors (e.g., invalid token)
      throw new ApiError("Invalid token! Please log in again.", 401);
    }

    
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new ApiError("User not found or inactive! Please log in again.", 401);
    }

    req.user = user;

    next();
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

export default isLoggedIn;
