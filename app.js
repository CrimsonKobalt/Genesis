var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv');

var indexRouter = require('./routes/index');

//user schema usage
const userModel = require('./models/user');

//start app
var app = express();
app.use(bodyparser.json());

const dev_db_url = "mongodb+srv://Chris:database@netwerkappli-di5tk.gcp.mongodb.net/Genesis?retryWrites=true&w=majority";
const mongoConnect = process.env.DB_STRING || dev_db_url;
//connect to db
mongoose.connect(
  mongoConnect,
  { useNewUrlParser: true},
  () => console.log('connected to DB!')
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//loggers and server setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing protocols
    //routing for client
app.use('/', indexRouter);
    //route that links to 'gebruikersvoorwaarden.pdf
app.use('/gebruiksvoorwaarden', indexRouter);
    //user service
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //no longer in development!

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;