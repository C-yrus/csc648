const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'thumbnails/'});
const listingsController = require('../controllers/listingsController');

const router = express.Router();

router.get('/', listingsController.list);
router.post('/', upload.single('thumbnail'), listingsController.addNew);
router.get('/add', listingsController.add);

module.exports = router;
