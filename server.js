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
