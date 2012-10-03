var express = require('express');
var app = express();
var redis = require("redis"), client = redis.createClient()
app.get('/sub/:reddit', function(req, res) {
	var _res = res;
	console.log(req.params.reddit);
	//res.send('hello world '+ req.params.reddit);
	var sub = req.params.reddit.toUpperCase();
	client.get(sub, function(err, reply) {
		if (err) {
			console.log(err);
			_res.send(500);
			return;
		}
		_res.send(reply);
		// reply is null when the key is missing
		console.log(reply);
	});
});

app.listen(3000);
