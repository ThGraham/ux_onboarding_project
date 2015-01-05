module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	var Q = require('Q');

	var debug = grunt.option('debug') || grunt.option('d');
	var nodeChild;

	var stopNode = function (callback) {
		if (nodeChild) {
			nodeChild.on('exit', function () {
				console.log('child killed');
				setTimeout(callback, 0);
			})
			nodeChild.exit(0);
		} else {
			callback();
		}
	};

	var startNode = function () {
		stopNode(function () {
			nodeChild = grunt.util.spawn({
				cmd: debug ? 'node-debug' : 'node',
				args: ['index.js'],
				opts: {stdio: 'inherit'},
			});
		});
		return 'echo "starting node spawn."';
	};

	var files = {
		js: ['*.js', '!Gruntfile.js', 'db/**/*.js', 'routes/**/*.js']
	};

	grunt.initConfig({
		exec: {
			startNode: {command: startNode}
		},
		watch: {
			files: files.js,
			tasks: ['exec']
		}
	});

	grunt.registerTask('default', ['exec', 'watch']);
};