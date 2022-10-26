import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudinaryConfig = cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploader = cloudinary.v2.uploader;

export { cloudinaryConfig, uploader };
