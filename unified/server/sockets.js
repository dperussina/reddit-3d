function sockets() {

	var domain = require('domain');
	var serverDomain = domain.create();

	serverDomain.run(function() {
		var io = require('socket.io').listen(3101);

		io.sockets.on('connection', function(socket) {
			socket.emit('hello', {
				hello : 'world'
			});
			socket.on('aloha', function(data) {
				console.log(data);
			});
		});

	});

	serverDomain.on('error', function(er) {
		console.error('Caught error!', er);
	});
}

module.exports = sockets;
