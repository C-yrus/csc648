const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/database');

passport.serializeUser((user, callback) => done(null, user.id));

passport.deserializeUser((id, callback) => {
    db.one(`SELECT * FROM users WHERE id = ${id}`)
        .then(user => callback(null, user))
        .catch(err => callback(err, null));
});

passport.use('local', new LocalStrategy({usernameField: 'email'}, (email, password, callback) => {
        db.one(`SELECT * FROM users WHERE email = ${email}`)
            .then(user => {
                if (!user) return callback(null, false, {message: `Incorrect email`});
                // check passwords...
            })
    }
));

module.exports = passport;
