/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();
app.use(express.compress());

app.configure(function() {
    app.set('port', process.env.PORT || 3000);


    var oneYear = 31557600000;
    app.use(express.static(path.join(__dirname, 'public'), { maxAge : oneYear }));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
