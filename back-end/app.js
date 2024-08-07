var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
var cors = require('cors');
const { connectDB } = require("./config/db"); 
var guestRoutes = require('./routes/guestRoutes'); // Adjust path if necessary

// var indexRouter = require('./routes/index');
var authRoutes = require('./routes/authRoutes');
var folderRoutes = require('./routes/folderRoutes');
var vendorRoutes = require('./routes/vendorRoutes');
var budgetRoutes = require('./routes/budgetRoute');


var app = express();

dotenv.config();

connectDB();

app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', authRoutes);
app.use('/api/events', folderRoutes);
app.use('/api/plans', vendorRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/guests', guestRoutes); 


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
  res.render('error');
});
const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}...`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying another port...`);
    // Increment the port and try again
    app.listen(++PORT, () => {
      console.log(`✅ Server running on port ${PORT}...`);
    });
  } else {
    console.error(err);
  }
});

module.exports = app;
