const express = require('express');
const uploadController = require('../controllers/uploadController')
const multer = require('multer');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Роут для завантаження зображень
router.post('/upload/pic', verifyToken, upload.single('image'), uploadController.uploadPic);

module.exports = router;
