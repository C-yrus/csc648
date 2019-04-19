const bcrypt = require('bcrypt');
const db = require('../config/database');

module.exports.dashboard = (req, res) => {
    res.render('account/dashboard');
};

module.exports.listings = (req, res) => {
    db.any(``)
    res.render('account/user-listings');
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
