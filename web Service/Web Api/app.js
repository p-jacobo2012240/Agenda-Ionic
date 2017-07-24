var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
var registrar = require("./routes/newUserApi")
var categoriaRoute = require('./routes/apiCategoria');
var contactoRoute = require('./routes/apiContacto');
var usuarioRoute = require('./routes/apiUsuario');
var citaRoute = require('./routes/apiCita');
var tareaRoute = require('./routes/apiTarea');
var upload = require('./routes/upload.images');
var auth = require("./routes/api/usuario.token")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, authorization, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
})

//app.use('/', index);

app.use('/',auth)
app.use('/', registrar);

app.use('/', categoriaRoute);
app.use('/', contactoRoute);
app.use('/', usuarioRoute);
app.use('/', citaRoute);
app.use('/', tareaRoute);
app.use('/', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  next();

});

module.exports = app;
