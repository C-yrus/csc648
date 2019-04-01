const express = require('express');
const listingsController = require('../controllers/listingsController');

const router = express.Router();

router.get('/', listingsController.list);

module.exports = router;
