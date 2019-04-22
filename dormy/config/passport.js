const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../config/database');

passport.serializeUser((user, callback) => callback(null, user.id));

passport.deserializeUser((id, callback) => {
    db.one(`SELECT * FROM users WHERE id = ${id}`)
        .then(user => callback(null, user))
        .catch(err => callback(err));
});

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
    }, (email, password, callback) => {
        db.one(`SELECT * FROM users WHERE email = '${email}'`)
            .then(user => {
                if (!user) return callback(null, false, {message: `Incorrect email`});
                if (!bcrypt.compareSync(password, user.password)) {
                    return callback(null, false, {message: `Incorrect password`});
                }
                return callback(null, user);
            })
            .catch(err => callback(err));
    }
));

module.exports = passport;
