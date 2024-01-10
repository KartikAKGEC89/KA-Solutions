const path = require('path')
const express = require('express')
const multer = require('multer')

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)


    if (extname && mimetype) {
        cb(null, true)
    } else {
        cb('Image Only !')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})


router.post('/', upload.single('image'), (req, res) => {
    res.json(`/${req.file.path}`)
})

module.exports = router