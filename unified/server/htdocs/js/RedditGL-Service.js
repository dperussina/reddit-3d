/*
 * William Miller && Dan Perussina
 * Copyright (c) 2012
 */
var K_ConnectionStatus_NONE = 0;
var K_ConnectionStatus_ERROR = 1;
var K_ConnectionStatus_CONECTED = 2;

var RedditClientService = function() {
	RedditGL_LOG("Starting Reddit Service");
	this.connectionStatus = K_ConnectionStatus_NONE;
	this.host = {
		hostURL : 'http://svn.agentgrid.net:3000/r/',
		hostSocket: 'http://svn.agentgrid.net:3101',
		hostNameSpace : 'Dan',
		hostUserSpace : 'someUniqueID',
		hostPassword : ''
	};
	this.serviceData = {};
};

RedditClientService.prototype.connectToService = function() {
	// Connect to service
	RedditGL_LOG("Reddit Service: Attempting to connect...");
	// Get status
	var status;
	// = connect to server
	var self = this;
	var sub = 'frontpage';
	$.ajax({
		url : self.host.hostURL + sub,
		data : "",
		success : self.connectionEstablished,
		dataType : "json"
	});
};

RedditClientService.prototype.connectionEstablished = function(request) {
	
	if(request)
	{
		RedditGL_LOG("Reddit Service: Connection established!");	
		this.serviceData = request;
		
		// Clean current data
		removeObjectInstances("Cube");
		var n = AlphabetGL.length;
		var k = n;
		do
		{
			var i = k-n;
			removeObjectInstances(AlphabetGL[i]);
		}
		while(--n);
		// Add new data
		n = this.serviceData.something.length;
		k = n;
		var object = getObject("Cube");
		loadInstances(object,n);
		//setObjectInstanceTexture(gl,object.instances[0],"http://b.thumbs.redditmedia.com/X7hR6bh26wvHz0qs.jpg");
		do
		{
			var i = k-n;
			var data = this.serviceData.something[i].data;
			RedditGL_LOG("Data " + i, data);
			if(data.thumbnail != "") {setObjectInstanceTexture(gl,object.instances[i],data.thumbnail);}
			var aString = data.title;
			addWord(aString,"Cube",i);
		}
		while(--n);
	}
	else 
	{
		RedditGL_LOG("Reddit Service: Connection failed!");
	}
};
RedditClientService.prototype.addListener = function() {
	var self = this;
	$('button').click(function(e) {
		var sub = $(users_choice).val();
		e.preventDefault();
		console.log(e + ' Event clicked!');
		console.log($(users_choice).val() + ' input value');
		$.ajax({
			url : self.host.hostURL + sub,
			data : "",
			success : self.connectionEstablished,
			error : function(data) {
				console.log('error : ' + data);
				alert('Opps... Something bad happened! .. Very bad...');
			},
			dataType : "json"
		});
	});
};
RedditClientService.prototype.webSocket = function() {
	var self = this;
	var socket = io.connect(self.host.hostSocket);
	socket.on('hello', function(data) {
		//RedditGL_LOG.log("Socket Data: ",data);
		socket.emit('aloha', {
			my : 'data'
		});
	});

};
RedditClientService.prototype.getStatus = function() {
	return this.connectionStatus;
};

RedditClientService.prototype.getCurrentData = function() {
	return this.serviceData;
};
