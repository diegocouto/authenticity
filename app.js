var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var status = require('http-status');
var i18n = require('i18n');

var routes = require('./routes/index');
var files = require('./routes/api/v1/file');

var app = express();

i18n.configure({
    locales:['en', 'pt-BR'],
    directory: __dirname + '/locales',
    objectNotation: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));
app.set('models', require('./models'));

app.use(function(req, res, next){
  res.setLocale('en');
  next();
});

app.use('/', routes);
app.use('/api/v1/', files);

app.get('/partials/:name', function (req, res) {
    res.render('partials/' + req.params.name);
});

app.all('/files/*', function(req, res, next) {
  res.render('index', {'root': 'app/views/', title: 'Authenticity'});
});

app.get('/i18n/:locale', function (req, res) {
  var locale = req.params.locale;
  res.sendFile(path.join(__dirname, 'locales', locale + '.json'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
