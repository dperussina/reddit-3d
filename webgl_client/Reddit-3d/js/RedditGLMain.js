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
  	this.scene.sceneObjects = [];
  	this.scene.textObjects = new TextGL();
  	this.scene.textObjects.initAlphabet()
  	/*
  	 * BufferObject: low-level webgl wrapper
  	 * TODO: Build TextGL
  	 * TextGL: High-level text wrapper
  	 */
  	// Create Primitive[cube]
  	initBufferObject(gl, "environment", "skybox", "root/textures/space.jpg", this.ModelCallback, this); 		
  	// Create Primitive[cube]
  	initBufferObject(gl, "primitive", "cube", "root/textures/reddit-icon.png", this.ModelCallback, this); 
  	// Create Primitive[sphere]
  	initBufferObject(gl, "primitive", "sphere", "root/textures/grim-icon.png", this.ModelCallback, this); 
  	// Create a Model[!Text]
  	//initBufferObject(gl, "model", "root/models/FontHappyMonkey/FontHappyMonkey_072.json", null, this.ModelCallback, this);
  	//initBufferObject(gl, "model", "root/models/FontHappyMonkey/FontHappyMonkey_076.json", null, this.ModelCallback, this);
  	//initBufferObject(gl, "model", "root/models/Teapot.json", "root/textures/grim-icon.png", this.ModelCallback, this); 
};

RedditGL.prototype.ModelCallback = function(model, self) 
{
	var scale = 1.0, count = 300, speed = 1, isRandom = true;
	switch(model.name) {
		case "Skybox":
			scale = 1000.0, count = 1, isRandom = false;
		break;
		
		default:
		break;
	}
	// Create an instance or many 2nd arg optional, 1 instance required to render
  	addObjectInstance(model, count);	  	
  	for(var i = 0; i < model.instanceCount; i++) {
  		var position = [0.0,0.0,0.0];
  		if(isRandom) {
  			var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  			position = [Math.random() * 100 * plusOrMinus, Math.random() * 2 * plusOrMinus, Math.random() * 100 * plusOrMinus];
  			scale = Math.random() * 5;
  			speed = Math.random() * 0.1;
  		}
  		setObjectInstanceScale(model.instances[i], scale);
  		setObjectInstancePosition(model.instances[i], position);
  		setObjectInstanceSpeed(model.instances[i], speed);
  	}
  	model.loaded = true;
	self.scene.sceneObjects.push(model);	
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