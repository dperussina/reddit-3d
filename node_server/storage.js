var express = require('express');
var app = express();
var redis = require("redis"), client = redis.createClient()
app.post('/setStorage', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header('content-type', 'application/json');
	var _res = res, body;
	req.on('data', function(raw) {
		//Get POST body
		var i = 0;
		while (i < raw.length) {
			body += raw.toString('binary', i, raw.length);
			i = raw.length;
		}
	});
	req.on('end', function() {
		var json;
		body = body.replace("undefined", "");
		json = JSON.parse(body);
		client.set(json.key, json.value, function(err, replies) {
			if (err) {
				//handle the error
				console.log(err);
				_res.send(JSON.stringify({
					response : 'error',
					reason : err
				}));

				client.quit();
				return;
			}

			client.quit();
			_res.send(JSON.stringify({
				response : 'success',
				reason : 'Key Saved!'
			}));

		});
	});

});
app.post('/getStorage', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header('content-type', 'application/json');
	var _res = res, body;
	req.on('data', function(raw) {
		//Get POST body
		var i = 0;
		while (i < raw.length) {
			body += raw.toString('binary', i, raw.length);
			i = raw.length;
		}
	});
	req.on('end', function() {
		var json;
		body = body.replace("undefined", "");
		json = JSON.parse(body);
		client.get(json.key, function(err, reply) {
			if (err) {
				//handle the error
				console.log(err);
				_res.send(JSON.stringify({
					response : 'error',
					reason : err
				}));
				client.quit();
				return;
			}

			//self.returnData = reply;

			client.quit();
			_res.send(JSON.stringify({
				response : 'success',
				reason : reply
			}));
			return;
		});
	});

});
app.listen(3001);
