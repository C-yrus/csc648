const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const nunjucks = require('nunjucks');

const app = express();

// database setup

// views directory & engine setup
// i setup nunjucks (https://mozilla.github.io/nunjucks/), LET ME KNOW IF U WANT THIS CHANGED FRONTEND
nunjucks.configure('views', {
    express: app,
    autoescape: true
});
app.set('view engine', 'html');

// logger for outputs to console
app.use(logger('dev'));

// middleware used populate body request property; (express.json())
// other middleware for encoding and cookies
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/image.jpg', function(req, res) {
    res.contentType('jpeg')
    res.end(data, 'binary');
});

// static file setup
app.use('/public', express.static(__dirname + "/public"));
app.get("/", express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('/public'));

// routes
app.get('/', (req, res) => res.render('index'));

// if it made it here then an error occurred, throw 500 error
app.use((req, res, next) => next(createError(500)));

app.listen(3000, () => console.log(`Express running at http://localhost:3000`));
