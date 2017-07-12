var express = require('express'),
    bodyParser = require('body-parser');
    logger = require('morgan'),
    path = require('path'),
    http = require('http'),
    socketIo = require('socket.io'),
    wine = require('./routes/wines');

var app = express();
var server = http.createServer(app);
var io = socketIo(server);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(logger('tiny'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

io.use(function(socket, next) {
  var handshake = socket.request;

  if (handshake.xdomain) {
      next('Cross-domain connections are not allowed');
  } else {
      next(null, true);
  }
});

io.on('connection', function (socket) {

    socket.on('message', function (message) {
        console.log("Got message: " + message);
        ip = socket.handshake.address;
        url = message;
        io.sockets.emit('pageview', { 'connections': Object.keys(io.sockets.connected).length, 'ip': '***.***.***.' + ip.substring(ip.lastIndexOf('.') + 1), 'url': url, 'xdomain': socket.handshake.xdomain, 'timestamp': new Date()});
    });

    socket.on('disconnect', function () {
        console.log("Socket disconnected");
        io.sockets.emit('pageview', { 'connections': Object.keys(io.sockets.connected).length});
    });

});
