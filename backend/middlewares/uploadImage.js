const multer = require('multer');

// Multer storage configuration
const storage = multer.memoryStorage();

// Middleware for uploading a single image with field name 'image'
const uploadImage = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
}).single('image');

module.exports = uploadImage;
