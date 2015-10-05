var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var syncRoute = require('./routes/sync');
var http = require('http');
var unoconv = require('unoconv');

var mongoose = require('mongoose');
var Lyrics = require('./models/lyrics');
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/dev';
var db = mongoose.connect(dbUrl,{safe: true});

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//assign models object to req object
app.use(function (req, res, next) {
  req.lyricsModel = Lyrics;
  return next();
});
app.use('/sync', syncRoute.sync);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var server = http.createServer(app);
var boot = function () {
  server.listen(app.get('port'), function(){
    console.info('Express server listening on port ' + app.get('port'));
  });
}
var shutdown = function() {
  server.close();
}
if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}

module.exports = app;
