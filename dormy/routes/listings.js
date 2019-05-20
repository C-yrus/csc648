const express = require('express');
const listingsController = require('../controllers/listingsController');
const upload = require('../config/multer');

const router = express.Router();

router.get('/', listingsController.list);
router.get('/:id/distance', listingsController.distance);
router.post('/', upload.single('thumbnail'), listingsController.addNew);
router.get('/add', isLoggedIn, listingsController.add);
router.get('/:id', listingsController.detail);
router.post('/:id/new-message', listingsController.addMessage);

function isLoggedIn(req, res, next) {
    return req.isAuthenticated() ? next() : res.redirect('/account/login');
}

module.exports = router;
