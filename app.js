const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./db');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const helmet = require('helmet');

//load env variables
dotenv.config();

// Connect to Database
connectDB();

const indexRouter = require('./routes/index');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use(errorHandler);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
