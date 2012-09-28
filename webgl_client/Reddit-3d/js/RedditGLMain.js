/*
 * William Miller 2012
 */
var gl;
var RedditGL = function() 
{	
	this.ready = false;
};

RedditGL.prototype.init = function() 
{
	var self = this;
	redditGL_LOG("Starting RedditGL...");
	this.render = new RedditGL_Render();
  	var canvas = document.getElementById("webglCanvas");
  	gl = initGL(canvas);
  	var fsColor = "shaderColor-fs";
  	var vsColor = "shaderColor-vs";
  	var fs = "shader-fs";
  	var vs = "shader-vs";
  	var attribs = ["aVertexPosition", "aTextureCoord"];
  	var uniforms = ["uViewMatrix", "uMVMatrix", "uPMatrix", "uSampler"];
  	var attribsC = ["aVertexPosition", "aColor"];
  	var uniformsC = ["uViewMatrix", "uMVMatrix", "uPMatrix"];
  	var shaders = {};
  	shaders.texture = initShader(gl, vs, fs, attribs, uniforms);
  	shaders.color = initShader(gl, vsColor, fsColor, attribsC, uniformsC);
  	
  	// Load data into scene
  	this.scene = {};
  	this.initScene(canvas);
  	this.scene.shaders = shaders;
  	
  	// Set canvas clear color
  	gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black
  	gl.enable(gl.DEPTH_TEST); //Enable debth testing
  	// Set rdy flag
   	this.ready = true;
  	// Start her up!
   	redditGL_LOG("Starting RedditGL renderloop");
   	startRenderLoop(canvas, function(timing) {
    	//fpsCounter.innerHTML = timing.framesPerSecond;
        self.runClient(timing);
    });
};

/*
 * Test scene
 */
RedditGL.prototype.initScene = function(canvas) 
{
  	var camera = new CameraWebGL(1000);
  	camera.init(canvas);
  	camera.setDistance(20.0);
  	this.scene.camera = camera;
  	this.scene.sceneObjects = new Array();
  	/*
  	 * BufferObject: low-level webgl wrapper
  	 * TextGL: High-level text wrapper
  	*/
  	// Init TextGL
  	initAlphabet()
  	// Create Primitive[skybox]
  	initBufferObject(gl, "environment", "skybox", "root/textures/space.jpg"); 		
  	// Create Primitive[cube]
  	initBufferObject(gl, "primitive", "cube", "root/textures/reddit-icon.png"); 
  	// Create Primitive[sphere]
  	initBufferObject(gl, "primitive", "sphere", "root/textures/grim-icon.png"); 
  	// Create a Model[!Text]
  	//initBufferObject(gl, "model", "root/models/Teapot.json", "root/textures/grim-icon.png", this.ModelCallback, this); 
};

RedditGL.prototype.addObject = function(model) 
{
	this.scene.sceneObjects.push(model);
};
RedditGL.prototype.runClient = function(timing) 
{
	if(this.ready == true) {
		this.render.update(this.scene, timing)
		this.render.drawScene(gl, this.scene);
	}  
};