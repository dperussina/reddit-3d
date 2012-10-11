var express = require('express');
var app = express();
var redis = require("redis"), client = redis.createClient()
app.get('/r/:reddit', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header('content-type','application/json');
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
		var myReply = JSON.parse(reply);
		var data = {something:myReply};
		var json = JSON.stringify(data); 
		_res.send(json);
		// reply is null when the key is missing
		console.log(reply);
	});
});

app.listen(3000);
