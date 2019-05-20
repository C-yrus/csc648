const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const nunjucks = require('nunjucks');
const passport = require('./config/passport');
const session = require('express-session');
const db = require('./config/database');

const accountRouter = require('./routes/account');
const listingRouter = require('./routes/listings');
const adminRouter = require('./routes/admin');

const app = express();

// views directory & engine setup
// i setup nunjucks (https://mozilla.github.io/nunjucks/)
// LET ME KNOW IF U WANT THIS CHANGED FRONTEND
nunjucks.configure('views', {
    express: app,
    autoescape: true
});
app.set('view engine', 'html');

// logger for outputs to console
app.use(logger('dev'));

// middleware used to populate body request property; (req.body)
// other middleware for encoding and cookies
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// static file setup (images, css, frontend javascript)
app.use(express.static(path.join(__dirname, 'public')));

// sessions & passport config
app.use(session({
    secret: 'SUPERSECRETKEYUSED4SESSIONTOKENGENERATION',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get('/', (req, res) => {
    db.any(`SELECT * FROM listings WHERE approved = 'true' ORDER BY id DESC`)
    .then(data => res.render('index', {
        listings: data
    }))
    .catch(() => createError(500));
});
app.use('/account', accountRouter);
app.use('/listings', listingRouter);
app.use('/admin', adminRouter);

// if it made it here then an error occurred, throw 500 error
app.use((req, res, next) => next(createError(500)));

app.listen(3000, () => console.log(`Express running at http://localhost:3000`));
