const express = require('express');
const router = express.Router();
const multer = require('multer'); // Add multer import
const { Register, Login, getProfile, addProduct } = require('../controllers/UserController');
const authenticateToken = require('../middlewares/auth');
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Store in the correct directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Ensure unique filename using timestamp
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage });

// Routes
router.post('/register', Register);
router.post('/login', Login);
router.get('/profile', authenticateToken, getProfile);

// Route for adding products with image upload
router.post('/products', upload.single('image'), addProduct);

module.exports = router;
