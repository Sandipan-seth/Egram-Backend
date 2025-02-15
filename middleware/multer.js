import multer from "multer";
import path from "path";

// Storage setup (no filename needed if using Cloudinary)
const storage = multer.memoryStorage(); // Store file in memory for Cloudinary upload

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (JPEG, JPG, PNG) are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
