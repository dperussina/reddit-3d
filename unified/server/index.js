var domain = require('domain');
var mainServer = domain.create();
mainServer.on('error', function(er) {
  console.error('Caught error!', er);
});
mainServer.run(function() {
	var _build = require('./build')(), _http = require('./http')(), _socket = require('./sockets')();
});
