import cloudinary from "cloudinary";
import fs from "fs";
import ApiError from "./apiError.util.js";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error);

    throw new ApiError(error.message || "File uploading failed!", 400);
  }
};

export default uploadOnCloudinary;
