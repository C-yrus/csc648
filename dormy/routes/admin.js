const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', isAdmin, adminController.dashboard);
router.post('/accept', isAdmin, adminController.accept);
router.post('/reject', isAdmin, adminController.reject);
router.post('/delete-user', isAdmin, adminController.deleteUser);
router.post('/block', isAdmin, adminController.block);
router.post('/delete-listing',isAdmin, adminController.deleteListing);

function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.isadmin) {
            return next();
        }
    }
    res.redirect(`/account`);
}

module.exports = router;
