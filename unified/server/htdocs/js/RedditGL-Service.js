/*
 * William Miller && Dan Perussina 
 * Copyright (c) 2012
 */
var K_ConnectionStatus_NONE=0;
var K_ConnectionStatus_ERROR=1;
var K_ConnectionStatus_CONECTED=2;

var RedditClientService = function() 
{
	RedditGL_LOG("Starting Reddit Service");
	this.connectionStatus=K_ConnectionStatus_NONE;
	this.host=
	{
		hostIP:"",
		hostNameSpace:"",
		hostUserSpace:"",
		hostPassword:""
	};
	this.serviceData=
	{
		// Fill Data	
	};
	// TODO: Connect to service
	//var callback = this.connectionEstablished;
	//this.connectToService(callback);
};

RedditClientService.prototype.connectToService = function()
{
	// Connect to service
	RedditGL_LOG("Reddit Service: Attempting to connect...");
	// Get status
	var status; // = connect to server
	var self = this;
	$.ajax({
		url: "http://svn.agentgrid.net:3000/r/3ds",
		data: "",
		success: self.connectionEstablished,
		dataType: "json"
	});
};

RedditClientService.prototype.connectionEstablished = function(request)
{
	console.log(request.something.length);
	for(var i = 0; i < request.something.length; i++)
	{
		var aString = request.something[i].data.title;
		//var data = request;
		// Finish loading
		/*
		this.connectionStatus =;
		if(this.connectionStatus==K_ConnectionStatus_CONECTED)
			RedditGL_LOG("Reddit Service: Connection established!");
		else
			RedditGL_LOG("Reddit Service: Connection failed!");
		*/
		console.log(aString);
		addWord(aString, "Cube", i);	
	}
};

RedditClientService.prototype.getStatus = function()
{
	return this.connectionStatus;
};

RedditClientService.prototype.getCurrentData = function()
{
	return this.serviceData;
};