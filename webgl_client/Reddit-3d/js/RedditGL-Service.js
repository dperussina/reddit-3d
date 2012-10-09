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
	var callback = this.connectionEstablished;
	this.connectToService(callback);
};

RedditClientService.prototype.connectToService = function(callback)
{
	// Connect to service
	RedditGL_LOG("Reddit Service: Attempting to connect...");
	// Get status
	var status; // = connect to server
	callback(status);
};

RedditClientService.prototype.connectionEstablished = function(status)
{
	// Finish loading
	this.connectionStatus = status;
	if(this.connectionStatus==K_ConnectionStatus_CONECTED)
		RedditGL_LOG("Reddit Service: Connection established!");
	else
		RedditGL_LOG("Reddit Service: Connection failed!");
};

RedditClientService.prototype.getStatus = function()
{
	return this.connectionStatus;
};

RedditClientService.prototype.getCurrentData = function()
{
	return this.serviceData;
};
