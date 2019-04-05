const express = require('express');
const multer = require('multer');
const listingsController = require('../controllers/listingsController');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, './public/thumbnails'),
    filename: (req, file, callback) => callback(null, `${file.fieldname}-${Date.now()}.png`)
});
const upload = multer({storage: storage});

router.get('/', listingsController.list);
router.post('/', upload.single('thumbnail'), listingsController.addNew);
router.get('/add', listingsController.add);

module.exports = router;
