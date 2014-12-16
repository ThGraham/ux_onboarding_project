var express = require('express');
var router = express.Router();
var fs = require('fs');

var file = 'data/users.json';

router.get('/', function(request, response) {
	console.log('Sending users.');
	response.json(JSON.parse(getUsers()));
});

router.post('/', function (request, response) {
	var user = request.body;
	console.log('Adding new user.');
	response.send(user);
});

router.put('/users/:id', function (request, response) {
	console.log('Updating user.');
	response.send();
});

function getUsers () {
	return fs.readFileSync(file, {encoding: 'utf8'});
}

module.exports = router;