var express = require('express'),
    path = require('path'),
    http = require('http'),
    item = require('./routes/items');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3002);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});
app.get('/owner/:owner/items', item.findByOwner);
app.get('/items', item.findAll);
app.get('/items/:id', item.findById);
app.post('/items', item.addItem);
app.put('/items/:id', item.updateItem);
app.delete('/items/:id', item.deleteItem);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
