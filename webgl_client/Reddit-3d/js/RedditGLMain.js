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
  	var fs = "shader-fs";
  	var vs = "shader-vs";
  	var attribs = ["aVertexPosition", "aTextureCoord"];
  	var uniforms = ["uViewMatrix", "uMVMatrix", "uPMatrix", "uSampler"];
  	this.shader = initShader(gl, vs, fs, attribs, uniforms);
  	
  	//TODO: Set up camera.js
  	var camera = {};
  	camera.viewMatrix = mat4.create();
  	camera.pMatrix = mat4.create();
  	camera.position = [0.0,0.0,-30.0]
  	
  	/*
  	 * TODO:Primitives support cubes, spheres, pyramids
  	 * TODO:Reddit Data types supported - 'post', 'comment', 'like' 'karma' 
  	 */
  	// Create Primitive[cube]
  	var cubeObject = initBufferObject(gl, "primitive", "cube", "root/texture/reddit-icon.png"); 
  	// Create an instance or many 2nd arg optional, 1 instance required to render
  	addObjectInstance(cubeObject, 200);	
  	for(var i = 0; i < cubeObject.instanceCount; i++) {
  		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  		setObjectInstancePosition(cubeObject.instances[i], [Math.random()*10.0 * plusOrMinus, Math.random()*50.0 * plusOrMinus, Math.random()*10.0 * plusOrMinus]);		
  	}
  	// Load data into scene
  	this.scene = {};
  	this.scene.camera = camera;
  	this.scene.sceneObjects = [cubeObject];
  	
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

RedditGL.prototype.runClient = function(timing) 
{
	if(this.ready == true) {
		this.render.update(this.scene, timing)
		this.render.drawScene(gl, this.shader, this.scene);
	}  
};