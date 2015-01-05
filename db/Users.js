var Connector = require('./connector');
var User = require('./model/user');
var dbPromise = Connector.getDb();
var Q = require('Q');
var saveError = 'There was a problem saving the user.';

function reject (deferred, status, message) {
	return function () {
		return deferred.reject({status: status, message: message});
	}
}

function add (user) {
	var emailError = 'A user already exists with that email address.';
	var deferred = Q.defer();
	dbPromise.then(function (db) {
		var promise = User.find({email: user.email}).exec();
		promise.then(function (users) {
			if (users.length === 0) {
				Q.ninvoke(new User(user), 'save').spread(deferred.resolve, reject(deferred, 500, saveError));
			} else {
				reject(deferred, 500, emailError)();
			}
		}, reject(deferred, 500, saveError));
	}, reject(deferred, 500, saveError));
	return deferred.promise;
}

function edit (id, user) {
	var emailError = 'Email address cannot be changed.';
	var deferred = Q.defer();
	dbPromise.then(function (db) {
		Q.ninvoke(User, 'findById', id).then(function (doc) {
			if (doc.email !== user.email) {
				reject(deferred, 400, emailError)();
			} else {
				Q.ninvoke(User, 'update', {_id: doc._id}, user).spread(deferred.resolve, reject(deferred, 500, saveError));
			}
		}, reject(deferred, 500, saveError));
	}), reject(deferred, 500, saveError);
	return deferred.promise;
}

function remove (id) {
	var removeError = 'There was a problem removing the user.';
	var deferred = Q.defer();
	dbPromise.then(function (db) {
		Q.ninvoke(User, 'remove', {_id: id}).then(deferred.resolve, reject(deferred, 500, removeError));
	}), reject(deferred, 500, saveError);
	return deferred.promise;
}

function get () {
	var deferred = Q.defer();
	dbPromise.then(function (db) {
		Q.ninvoke(User, 'find').spread(deferred.resolve, reject(deferred, 500, saveError));
	}), reject(deferred, 500, saveError);
	return deferred.promise;
}

module.exports = {
	add: add,
	edit: edit,
	remove: remove,
	get: get
}