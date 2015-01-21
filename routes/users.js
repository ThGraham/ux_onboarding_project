var express = require('express');
var router = express.Router();
var Users = require('./../db/Users.js');

router.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.get('/', function(request, response) {
	var promise = Users.get();
	promise.then(function (users) {
		console.log('Sending users.');
		response.send(users);
	}, function (error) {
		response.status(error.status).send(error.message);
	});
});

router.post('/', function (request, response) {
	var user = request.body;
	var promise = Users.add(request.body);
	promise.then(function (user) {
		console.log('User added: ', user.email);
		response.send(user);
	}, function (error) {
		console.log(error);
		response.status(error.status).send(error.message);
	});
});

router.put('/:id', function (request, response) {
	var user = request.body;
	delete user._id; //ignore the model id, use the route id
	var promise = Users.edit(request.params.id, user);
	promise.then(function () {
		console.log('User modified: ', user);
		user._id = request.params.id;
		response.send(user);
	}, function (error) {
		console.log(error);
		response.status(error.status).send(error.message);
	});
});

router.delete('/:id', function (request, response) {
	var promise = Users.remove(request.params.id);
	promise.then(function () {
		console.log('User removed: ', request.params.id);
		response.send();
	}, function (error) {
		console.log(error);
		response.status(error.status).send(error.message);
	});
});

module.exports = router;
