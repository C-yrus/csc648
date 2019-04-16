const express = require('express');
const listingsController = require('../controllers/listingsController');
const upload = require('../config/multer');

const router = express.Router();

router.get('/', listingsController.list);
router.post('/', upload.single('thumbnail'), listingsController.addNew);
router.get('/add', listingsController.add);
router.get('/:id', listingsController.detail);

module.exports = router;
