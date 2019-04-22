const express = require('express');
const accountController = require('../controllers/accountController');
const passport = require('../config/passport');

const router = express.Router();

// account routes
router.get('/', isLoggedIn, accountController.dashboard);
router.get('/listings', isLoggedIn, accountController.listings);
router.get('/listings/:id', isLoggedIn, accountController.listingDetail);
router.get('/booked', isLoggedIn, accountController.booked);
router.get('/inbox', isLoggedIn, accountController.inbox);
router.get('/inbox/:id', isLoggedIn, accountController.inboxMessage);

// login, register, logout routes
router.get('/login', accountController.login);
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/account',
    failureRedirect: '/account/login'
}));
router.get('/register', accountController.register);
router.post('/register', accountController.newUser);
router.get('/logout', accountController.logout);

function isLoggedIn(req, res, next) {
    return req.isAuthenticated() ? next() : res.redirect('/account/login');
}

module.exports = router;
