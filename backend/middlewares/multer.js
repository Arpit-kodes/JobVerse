// middlewares/multer.js
import multer from "multer";
import path from "path";

// Memory storage for cloud-based uploads (Cloudinary, S3, etc.)
const storage = multer.memoryStorage();

// Accept images and documents (PDF, DOCX, etc.)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.doc', '.docx'];

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images and documents are allowed'), false);
  }
};

// ✅ Named export
export const singleUpload = multer({ storage, fileFilter }).single("file");
