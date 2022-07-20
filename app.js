var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var passport = require("passport")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require("nunjucks");

var indexRouter = require('./BackEnd/web/routes/index');
var usersRouter = require('./BackEnd/web/routes/users');
var apiRouter = require('./BackEnd/web/routes/api');

var dotenv = require('dotenv');
var sequelize = require('./DB/sequelize/models').sequelize;
var passportConfig = require("./BackEnd/passport")


dotenv.config();
sequelize.sync();
passportConfig()

var app = express();
app.set('port', process.env.PORT || 3000);


// view engine setup
// if(process.env.NODE_ENV === "production") {
  app.set('view engine', 'html');
  nunjucks.configure(path.join(__dirname, '/FrontEnd/html'), {
  express: app,
  watch: true
  });
  app.use(express.static(path.join(__dirname, '/FrontEnd/public')));
// }

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  // store:  new RedisStore({ client: redisClient }),
};
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

// app.set('views', path.join(__dirname, '/BackEnd/views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '/BackEnd/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

module.exports = app;
