
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');



var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'src')));

// development only
if ('development' == app.get('env')) {
  app.use(express.static(path.join(__dirname, 'src')));
  app.use(express.errorHandler());
}

if ('deployment' == app.get('env')) {
    app.use(express.static(path.join(__dirname, 'build')));
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
