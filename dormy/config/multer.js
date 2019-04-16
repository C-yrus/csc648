const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, `./public/thumbnails`),
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${extension}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        if (extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
            return callback(new Error(`Only PNG, JPG, JPEG images allowed`));
        }
        callback(null, true);
    },
    // limits: {
    //     fileSize: 1024 * 1024
    // }
});

module.exports = upload;