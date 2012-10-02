/*
 * William Miller 2012
 */

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
	this.serviceManager = new RedditClientService();
	this.maxObjectCount=AlphabetGL.length+2; // Max value of objects to be loaded
	this.maxInstanceCount=1000;
	this.render=new RedditGL_Render();
	/*
	 * Init gl & texture manager
	 */
  	var canvas=document.getElementById("webglCanvas");
  	gl=initGL(canvas);
  	gl.textureManager=new GLTextureManger();
  	gl.textureManager.init(gl);
  	
  	var fsColor="shaderColor-fs";
  	var vsColor="shaderColor-vs";
  	var fs="shader-fs";
  	var vs="shader-vs";
  	var attribs=["aVertexPosition", "aTextureCoord"];
  	var uniforms=["uViewMatrix", "uMVMatrix", "uPMatrix", "uSampler"];
  	var attribsC=["aVertexPosition", "aColor"];
  	var uniformsC=["uViewMatrix", "uMVMatrix", "uPMatrix"];
  	var shaders=
  	{
  		texture:initShader(gl,vs,fs,attribs,uniforms),
  		color:initShader(gl,vsColor,fsColor,attribsC,uniformsC)
  	};
  	
  	// Load data into scene
  	this.initScene(canvas, shaders);
  	
  	// Set canvas clear color
  	gl.clearColor(0.0,0.0,0.0,1.0); // Black
  	gl.enable(gl.DEPTH_TEST); //Enable debth testing
  	// Set rdy flag
   	this.ready=true;  	
   	// Start her up!
   	RedditGL_LOG("Starting RedditGL renderloop");
   	var self=this;
   	startRenderLoop(canvas,function(timing) 
   	{
    	//fpsCounter.innerHTML = timing.framesPerSecond;
        self.runClient(timing);
    });
};

/*
 * Test scene
 */
RedditGL.prototype.initScene = function(canvas, shaders) 
{
  	var camera=new CameraWebGLOrbit(1000);
  	camera.init(canvas);
  	camera.setDistance(20.0);
  	this.scene = 
  	{
  		camera:camera,
  		sceneObjects:new Array(),
  		shaders:shaders
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
   	this.loaded=true;  	  	
};
/*
 * Loads scene with object data, each object has instances attached to it
 */
//addWord("Reallylongstring", model.name, 0);
RedditGL.prototype.addObject = function(model) 
{
	this.scene.sceneObjects.push(model);
	this.readyCount++;
	
	if(this.readyCount==this.maxObjectCount) 
	{
		this.loadComplete();
	}
};

RedditGL.prototype.runClient = function(timing) 
{
	gl.viewport(0,0,gl.viewportWidth,gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	if(this.ready==true) 
	{
		this.render.update(this.scene,timing);
		this.render.drawScene(gl,this.scene);
	}  
};