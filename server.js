var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const http = require('http');
const port = 3000;
mongoose.connect('mongodb://localhost:27017/EAM3', { useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection;

app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', 'https://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization,X-AUTHENTICATION, X-IP, Content-Type, Accept');
  next();
});

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

// serve static files from template
app.use(express.static(__dirname + '/src'));

// include routes
var routes = require('./server/routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3000
http.createServer(app).listen(port, () => {
  console.log(`App listening on port ${port}!`);
});