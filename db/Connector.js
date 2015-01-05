var mongoose = require('mongoose');
var Q = require('Q');

//@todo move this to a config file. package.json?
var dbUri = 'mongodb://localhost/porifera';
var connection;

function onConnectError (error) {
	console.log('database connection error: ', error);
}

function onConnectOpen () {
	console.log('connected to db: ', dbUri);
}

function connect () {
	mongoose.connect(dbUri);
	connection = mongoose.connection;
	connection.on('error', onConnectError);
	connection.once('open', onConnectOpen);
}

function getDb () {
	var deferred = Q.defer();
	if (!connection){
		connect();
	}
	if (connection.readyState !== 1) {
		connection.once('open', function () {deferred.resolve(connection)});
		connection.once('error', deferred.reject);
	} else {
		deferred.resolve(connection);
	}
	return deferred.promise;
}

connect();

module.exports = {
	getDb: getDb
};