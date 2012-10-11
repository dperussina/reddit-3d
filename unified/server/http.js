function http() {

	var domain = require('domain');
	var serverDomain = domain.create();
	serverDomain.on('error', function(er) {
		console.error('Caught error!', er);
	});
	serverDomain.run(function() {
		var express = require('express');
		var fs = require('fs');
		var app = express();

		app.get('/', function(req, res) {
			fs.readFile(__dirname + '/htdocs/index.html', 'utf8', function(err, text) {
				res.send(text);
			});
		});
		app.get('/subs', function(req, res) {
			var subs = require('./lib/subReddits');
			res.send(JSON.stringify(subs));
		});
		app.use(express.directory(__dirname + '/htdocs'));
		app.use(express.static(__dirname + '/htdocs'));

		app.listen(3100);
	});

	

}

module.exports = http; 