var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var juiceRouter = require('./routes/juice'); //juice endpoint added
var gridRouter = require('./routes/grid'); //grid endpoint added
var pickRouter = require('./routes/pick');//pick endpoint added
var resourceRouter = require('./routes/resource');//resource endpoint added


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/juice', juiceRouter); //juice endpoint added
app.use('/grid', gridRouter); //grid endpoint added
app.use('/pick', pickRouter); //pick endpoint added
app.use('/resource', pickRouter); //resource endpoint added


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
 
module.exports = app;
 
async function recreateDB(){
  // Delete everything
  await juice.deleteMany();
 
  let instance1 = new juice({juice_flavor: 'Apple', juice_brand: 'AppyFizz', juice_price: 2.5 });
  instance1.save().then(doc=>{
  console.log("First object saved")}
  ).catch(err=>{
  console.error(err)
  });
 
 
  let instance2 = new juice({juice_flavor: 'Mango', juice_brand: 'Maaza', juice_price: 2.0});
  instance2.save().then(doc=>{
  console.log("Second object saved")}
  ).catch(err=>{
  console.error(err)
  });
 
 
  let instance3 = new juice({juice_flavor: 'Orange', juice_brand: 'Fanta', juice_price: 3.0});
  instance3.save().then(doc=>{
  console.log("Third object saved")}
  ).catch(err=>{
  console.error(err)
  });
  }
  let reseed = true;
  if (reseed) {recreateDB();}
 
 