var subReddits = require('./subReddits');
var redis = require("redis"), client = redis.createClient();
var i = 0;
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function(err) {
	console.log("Error " + err);
});

function getRedditData(subReddit, cb) {
	var _cb = cb;
	var _sub = subReddit.toUpperCase();
	var http = require('http');
	var options = {
		host : 'www.reddit.com',
		port : 80,
		path : '/r/' + _sub + '/hot/.json?',
		method : 'GET'
	};
	var body;
	var req = http.request(options, function(res) {
		console.log('REDDIT: ' + _sub);
		//console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			body += chunk;

			//console.log('BODY: ' + chunk);
		});
		res.on('end', function() {
			body = body.replace("undefined", "");
			//console.log(body);			
			var json = JSON.parse(body);
			var passThis = JSON.stringify(json.data.children);
			_cb(_sub, passThis);
			console.log('End data')
			
			i++;
			if(i == subReddits.length){
			i = 0;
			}
			setTimeout(function() {
				getRedditData(subReddits[i], passToRedis);
			}, 500);

		})
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();
}

function passToRedis(key, val) {
	client.set(key, val, function (err, replies) {
		if(err){
		console.log(err);
		return;
		}
        console.log('Redis success');     
        });
}

getRedditData(subReddits[i], passToRedis); 



function getFrontPage(cb) {
	var _cb = cb;
	//var _sub = subReddit.toUpperCase();
	var http = require('http');
	var options = {
		host : 'www.reddit.com',
		port : 80,
		path : '/.json?',
		method : 'GET'
	};
	var body;
	var req = http.request(options, function(res) {
		console.log('REDDIT: FRONT PAGE');
		//console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			body += chunk;

			//console.log('BODY: ' + chunk);
		});
		res.on('end', function() {
			body = body.replace("undefined", "");
			//console.log(body);			
			var json = JSON.parse(body);
			var passThis = JSON.stringify(json.data.children);
			_cb('FRONTPAGE', passThis);
		
		})
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();
}
getFrontPage(passToRedis);
