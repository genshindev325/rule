import multer from 'multer';
import path from 'path';

// Configure multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on timestamp and original file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create multer instance with the configured storage
const upload = multer({ storage });

export default upload;
