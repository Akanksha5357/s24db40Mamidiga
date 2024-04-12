var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport'); // Move this import statement up
var LocalStrategy = require('passport-local').Strategy; // Move this import statement up
var juice = require("./models/juice");
var Account = require('./models/account');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var juiceRouter = require('./routes/juice');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/juice', juiceRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

var juice = require("./models/juice");
require('dotenv').config();
var mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded");
});

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



async function recreateDB(){
  // Delete everything
  await juice.deleteMany();

  let instance1 = new juice({juice_flavor: 'Apple', juice_brand: 'AppyFizz', juice_price: 2.5 });
  instance1.save().then(doc=>{
    console.log("First object saved")
  }).catch(err=>{
    console.error(err)
  });

  let instance2 = new juice({juice_flavor: 'Mango', juice_brand: 'Maaza', juice_price: 2.0});
  instance2.save().then(doc=>{
    console.log("Second object saved")
  }).catch(err=>{
    console.error(err)
  });

  let instance3 = new juice({juice_flavor: 'Orange', juice_brand: 'Fanta', juice_price: 3.0});
  instance3.save().then(doc=>{
    console.log("Third object saved")
  }).catch(err=>{
    console.error(err)
  });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

//lab-13
passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

  app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());


module.exports = app;