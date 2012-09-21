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
	redditGL_LOG("Starting RedditGL...");
	this.render = new RedditGL_Render();
  	var canvas = document.getElementById("webglCanvas");
  	gl = initGL(canvas);
  	var fs = "shader-fs";
  	var vs = "shader-vs";
  	var attribs = ["aVertexPosition", "aTextureCoord"];
  	var uniforms = ["uMVMatrix", "uPMatrix", "uSampler"];
  	this.shader = initShader(gl, vs, fs, attribs, uniforms);
  	
  	var camera = {};
  	camera.mvMatrix = mat4.create();
  	camera.pMatrix = mat4.create();
  	
  	var cubeObject = initBufferObject(gl, "primitive", "cube", "root/texture/reddit-icon.png"); 	
  	setObjectPosition(cubeObject, [0.0, 0.0, -15.0]);	
  	
  	this.scene = {};
  	this.scene.camera = camera;
  	this.scene.sceneObjects = [cubeObject];
  	
  	gl.clearColor(0.0, 0.0, 0.0, 1.0);
  	gl.enable(gl.DEPTH_TEST);
  	
   	this.ready = true;
   	redditGL_LOG("Starting RedditGL loaded");
   	var self = this;
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