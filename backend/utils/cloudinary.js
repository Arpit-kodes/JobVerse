// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer
 * @param {string} originalName - Original file name
 * @param {string} type - Cloudinary resource_type ('image' or 'raw')
 */
export const uploadToCloudinary = (buffer, originalName, type = 'auto') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: type, // critical: 'raw' for PDFs
        public_id: `${Date.now()}-${originalName}`,
        folder: type === 'raw' ? 'resumes' : 'uploads',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // End stream with buffer
    uploadStream.end(buffer);
  });
};

export default cloudinary;
