import uploadOnCloudinary from "../utils/cloudinary.util.js";
import apiResponse from "../utils/apiResponse.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import ApiError from "../utils/apiError.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError("User not found", 404);

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

const cookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: "Strict",
};
const signup = asyncHandler(async (req, res, next) => {
  const { email, fullName, password } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError("All fields are required", 400);
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError("User already exists", 409);
  }

  const user = await User.create({
    email,
    fullName,
    password,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError("Something went wrong while registering user", 500);
  }

  res
    .status(201) // Corrected status code
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new apiResponse(201, createdUser, "User registered successfully"));
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  const userExist = await User.findOne({ email });

  if (!userExist) {
    throw new ApiError("Please register first", 404);
  }

  const validateUser = await userExist.validatePasswords(password);

  if (!validateUser) {
    throw new ApiError("Password is invalid!", 400);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userExist._id
  );

  const loggedInUser = await User.findById(userExist._id).select(
    "-password -refreshToken"
  );

  res
    .status(200) // Changed from 201 to 200
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new apiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  const RefreshToken = req.cookies.refreshToken;

  if (!RefreshToken) {
    throw new ApiError("Unauthorized", 401);
  }

  try {
    // Verify refresh token
    const decodedToken = jwt.verify(
      RefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find user with this refresh token in DB
    const user = await User.findOne({
      _id: decodedToken._id,
      refreshToken: RefreshToken,
    });

    if (!user) {
      throw new ApiError("Invalid refresh token", 403);
    }

    // Remove refresh token from DB
    await User.findByIdAndUpdate(user._id, { $unset: { refreshToken: "" } });

    // Clear cookies
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json(new apiResponse(200, {}, "User logged out successfully"));
  } catch (error) {
    throw new ApiError("Invalid or expired refresh token", 403);
  }
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const RefreshToken = req.cookies?.refreshToken;

  if (!RefreshToken) {
    throw new ApiError("Unauthorized", 401);
  }
  console.log(RefreshToken);

  try {
    const decodedToken = jwt.verify(
      RefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user || user.refreshToken !== RefreshToken) {
      throw new ApiError("Invalid or expired refresh token", 403);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(
        new apiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access tokens refreshed"
        )
      );
  } catch (error) {
    next(error);
  }
});

const authCheck = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError("Unauthorized", 401);
  }
  res
    .status(200)
    .json(new apiResponse(200, { user: req.user }, "User is authenticated"));
});
export { signup, login, logout, authCheck, refreshToken };
