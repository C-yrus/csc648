const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.get('/', accountController.dashboard);
router.get('/login', accountController.login);
router.get('/register', accountController.register);
router.get('/logout', accountController.logout);
router.get('/listings', accountController.listings);

module.exports = router;
