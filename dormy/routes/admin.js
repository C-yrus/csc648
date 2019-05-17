const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', adminController.dashboard);
router.get('/login', adminController.login);
router.get('/logout', adminController.logout);

router.put('/accept', adminController.accept);
router.delete('/reject', adminController.reject);
router.delete('/deleteListing', adminController.deleteListing);
router.delete('/deleteUser', adminController.deleteUser);
router.put('/block', adminController.block);


module.exports = router;
