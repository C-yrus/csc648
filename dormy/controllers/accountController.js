const bcrypt = require('bcrypt');
const db = require('../config/database');

// basic account controllers
module.exports.dashboard = (req, res) => {
    res.render('account/dashboard');
};

module.exports.listings = (req, res) => {
    res.render('account/user-listings');
};

module.exports.listingDetail = (req, res) => {
    res.render('account/user-listing-detail');
};

module.exports.booked = (req, res) => {
    res.render('account/booked.html');
};

module.exports.inbox = (req, res) => {
    res.render('account/inbox.html')
}

module.exports.inboxMessage = (req, res) => {
    res.render('account/message-detail.html');
};


// login, register, logout controllers
module.exports.login = (req, res) => {
    res.render('account/login');
};

module.exports.register = (req, res) => {
    res.render('account/register');
};

module.exports.newUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hashed => {
            db.one(`INSERT INTO users(first_name, last_name, email, password, phone, created) 
            VALUES($1, $2, $3, $4, $5, now()) RETURNING id`,
                [req.body.first_name, req.body.last_name, req.body.email, hashed,
                    req.body.phone])
                .then(id => {
                    res.render('account/register', {
                        message: 'User created. You may now login.'
                    });
                })
                .catch(err => {
                    res.render('account/register', {
                        message: 'Error creating new user.'
                    });
                });
        })
        .catch(err => {

        });
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/account/login');
};
