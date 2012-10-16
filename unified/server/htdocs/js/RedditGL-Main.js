
/*
 * Author(s): Daniel Perussina, William Miller, Rob Weaver
 * 2012 - Reddit3d, bitch
 */

var RedditMain;

document.subreddit = 'frontpage';
$(document).ready(function() {
	RedditMain = new RedditGL();
	RedditMain.init();

});


// Global GL context
var gl;
/*
 * Main RedditGL class
 */
var RedditGL = function() 
{	
	this.ready = false; // Flag set to true when finished with init
	this.loaded = false; // Flag set to true when all async loading complete
	this.readyCount = 0;
};

RedditGL.prototype.init = function() 
{
	RedditGL_LOG("Starting RedditGL...");
	// Web service
	this.serviceManager = new RedditClientService();
	// UI
	this.UIManager = new DynamicUI();
	this.UIManager.init("infoDiv");
	/*
	 * Define some constants
	 */
	this.maxObjectCount=AlphabetGL.length+3; // Max value of objects to be loaded
	this.maxInstanceCount=1000;
	/*
	 * Init gl & texture manager
	 */
  	var canvas = document.getElementById("webglCanvas");
  	// If we don't set this here, the rendering will be skewed
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  	// Grab render
	this.render = new RedditGL_Render();
  	gl=initGL(canvas);
  	gl.textureManager = new GLTextureManger();
  	gl.textureManager.init(gl);
  	
  	var fsColor = "shaderColor-fs";
  	var vsColor = "shaderColor-vs";
  	var fs = "shader-fs";
  	var vs = "shader-vs";
  	var attribs = ["aVertexPosition", "aTextureCoord"];
  	var uniforms = ["uViewMatrix", "uMVMatrix", "uPMatrix", "uSampler"];
  	var attribsC = ["aVertexPosition", "aColor"];
  	var uniformsC = ["uViewMatrix", "uMVMatrix", "uPMatrix"];
  	var shaders =
  	{
  		texture: initShader(gl,vs,fs,attribs,uniforms),
  		color: initShader(gl,vsColor,fsColor,attribsC,uniformsC)
  	};
  	
  	// Load data into scene
  	this.initScene(canvas, shaders);
    
  	// Set canvas settings
	this.setUpFullScreen(gl, canvas);
  	this.render.resize(gl, this.scene, canvas);
  	gl.clearColor(0.0,0.0,0.0,1.0); // Black
  	gl.enable(gl.DEPTH_TEST); //Enable debth testing
  	// Set rdy flag
   	this.ready = true;  	
   	// Start her up!
   	RedditGL_LOG("Starting RedditGL renderloop");
   	var self = this;
   	var fpsCounter = document.getElementById("fps");
   	startRenderLoop(canvas,function(timing) 
   	{
    	fpsCounter.innerHTML = timing.framesPerSecond;
        self.runClient(timing);
    });
};

RedditGL.prototype.setUpFullScreen = function(gl, canvas)
{
	//
    // Wire up the Fullscreen button
    //
    var frame = document.getElementById("reddit-frame");
    var fullscreenBtn = document.getElementById("fullscreen");
    document.cancelFullScreen = document.webkitCancelFullScreen||document.mozCancelFullScreen;

    var canvasOriginalWidth = canvas.width;
    var canvasOriginalHeight = canvas.height;
    fullscreenBtn.addEventListener("click",function() 
    {
        if(frame.webkitRequestFullScreen) 
        {
            frame.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if(frame.mozRequestFullScreen) 
        {
            frame.mozRequestFullScreen();
        }
    }, false);
	var self = this;
    function fullscreenchange() 
    {
        if(document.webkitIsFullScreen||document.mozFullScreen) 
        {
            canvas.width = screen.width;
            canvas.height = screen.height;
        } else 
        {
            canvas.width = canvasOriginalWidth;
            canvas.height = canvasOriginalHeight;
        }
        self.render.resize(gl,self.scene,canvas);
    }
    frame.addEventListener("webkitfullscreenchange",fullscreenchange,false);
    frame.addEventListener("mozfullscreenchange",fullscreenchange,false);
};
/*
 * Test scene
 */
RedditGL.prototype.initScene = function(canvas, shaders) 
{
  	var camera = new CameraWebGLOrbit(1000);
  	camera.init(canvas);
  	camera.setDistance(20.0);
  	this.scene = 
  	{
  		camera: camera,
  		sceneObjects: new Array(),
  		shaders: shaders
  	};

  	/*
  	 * BufferObject: low-level webgl wrapper
  	 * TextGL: High-level text wrapper
  	*/
  	// Init TextGL
  	initAlphabet()
  	// initBufferObject(glRef, objType, obj, hasTexture)
  	// Create Primitive[skybox]
  	initBufferObject(gl,"environment","skybox","root/textures/space.jpg"); 		
  	// Create Primitive[cube]
  	initBufferObject(gl,"primitive","cube","root/textures/LichKing.jpg"); 
  	// Create Primitive[sphere]
  	initBufferObject(gl,"primitive","sphere","root/textures/grim-icon.png"); 
  	// Create a Model[!Text]
  	//initBufferObject(gl, "model", "root/models/Teapot.json", "root/textures/grim-icon.png"); 
};
/*
 * Called when all objects have been loaded
 */
RedditGL.prototype.loadComplete = function() 
{ 	
   	RedditGL_LOG("Load completed");
   	this.loaded = true;  	  	
   	this.serviceManager.connectToService();
   	this.serviceManager.addListener();
   	this.serviceManager.webSocket();
};
/*
 * Loads scene with object data, each object has instances attached to it
 */
//addWord("Reallylongstring", model.name, 0);
RedditGL.prototype.addObject = function(model) 
{
	this.scene.sceneObjects.push(model);
	this.readyCount++;
	
	if(this.readyCount == this.maxObjectCount) 
	{
		this.loadComplete();
	}
};

RedditGL.prototype.runClient = function(timing) 
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	if(this.ready == true) 
	{
		this.render.update(this.scene,timing);
		this.render.drawScene(gl,this.scene);
	}  
};