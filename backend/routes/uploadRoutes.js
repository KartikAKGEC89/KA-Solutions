const path = require('path');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();


const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created');
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Destination folder:', uploadsDir);
    cb(null, uploadsDir); 
  },
  filename(req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    console.log('Saving file as:', fileName);  // Log the filename being saved
    cb(null, fileName); // Name of the file
  }
});


function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    console.log('File type check:', extname, mimetype); 
    if (extname && mimetype) {
        cb(null, true);  
    } else {
        cb('Image Only!');
    }
}


const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});


router.post('/', upload.single('image'), (req, res) => {
    console.log('Received request to upload image');
    if (req.file) {
        console.log('File uploaded:', req.file);
        res.json(`/${req.file.path}`); 
    } else {
        res.status(400).send('No file uploaded');
    }
});

module.exports = router;
