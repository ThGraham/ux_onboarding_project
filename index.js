var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var users = require('./routes/users');

var port = 24149;

app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', users);

function startServer () {
	app.listen(port, function () {
		console.log('Server listening.');
	});
}

startServer();