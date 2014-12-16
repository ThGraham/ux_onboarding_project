var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

var port = 24149;
var file = 'data/users.json';

app.get('/users', function (request, response) {
	console.log('Sending users.');
	response.json(JSON.parse(getUsers()));
});

app.put(/^\/users\/\d+$/, function (request, response) {
	console.log('Updating user.');
	response.send();
});

app.post('/users', function (request, response) {
	var user = request.body;
	console.log('Adding new user.');
	response.send(user);
});

function startServer () {
	app.listen(port, function () {
		console.log('Server listening.');
	});
}

function getUsers () {
 	return fs.readFileSync(file, {encoding: 'utf8'});
}

startServer();