const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ensure the 'uploads' directory exists, if not create it
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads directory created');
}

// Multer storage setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir); // Save files to the 'uploads' directory
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ); // Use a unique filename
  },
});

// Check the file type
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

// Multer upload middleware
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// POST route for uploading files
router.post('/', upload.single('image'), (req, res) => {
  if (req.file) {
    // Send the uploaded file path as the response
    res.send(filePath= `/uploads/${req.file.filename}`);
  } else {
    res.status(400).send({ message: 'No file uploaded' });
  }
});

module.exports = router;