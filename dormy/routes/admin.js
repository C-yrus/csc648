const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', adminController.dashboard);
router.get('/login', adminController.login);
router.get('/logout', adminController.logout);

module.exports = router;
