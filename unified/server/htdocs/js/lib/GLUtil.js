/*
 * William Miller 2012
 */

/*
 * Reddit INFO logger
 */
function RedditGL_LOG(msg, object) {
	if(!object) {console.log("RedditGL INFO: "+msg);}		
	else {console.log("RedditGL INFO: "+msg);console.log(object);}		
};

/*
 * Webgl windo request frame animation loop
 */
// Polyfill to ensure we can always call requestAnimaionFrame
if(!window.requestAnimationFrame) {
	window.requestAnimationFrame=(function(){
	    return  window.webkitRequestAnimationFrame || 
	          	window.mozRequestAnimationFrame    || 
	            window.oRequestAnimationFrame      || 
	            window.msRequestAnimationFrame     || 
	          	function(callback, element){
	            	window.setTimeout(function() {
	               		callback(new Date().getTime());
	              	}, 1000 / 60);
	         	};
	})();
}

/* 
 * Grab gl context
 */
function initGL(canvas) 
{
	var glRef;
	try {
    	glRef=canvas.getContext("experimental-webgl");
        glRef.viewportWidth=canvas.width;
        glRef.viewportHeight=canvas.height;
  	} 
  	catch (e) {
  	}
  	if (!glRef) {
  		alert("Could not initialise WebGL!");
  	}
  	return glRef;
};

/*
 * Start the render loop, cross-browser support
 */
function startRenderLoop(canvas, callback) 
{
	var startTime=window.webkitAnimationStartTime || 
     				window.mozAnimationStartTime ||
                	new Date().getTime();

   	var lastTimeStamp=startTime;
   	var lastFpsTimeStamp=startTime;
   	var framesPerSecond=0;
  	var frameCount=0;
        
   	function nextFrame(time)
   	{
	  	// Recommendation from Opera devs: calling the RAF shim at the beginning of your
	    // render loop improves framerate on browsers that fall back to setTimeout
	   	window.requestAnimationFrame(nextFrame, canvas);
	                
	   	// Update FPS if a second or more has passed since last FPS update
	  	if(time-lastFpsTimeStamp>=1000) 
	  	{
	   		framesPerSecond=frameCount;
	     	frameCount=0;
	    	lastFpsTimeStamp=time;
	   	} 
	
	  	callback({
	     	startTime:startTime,
	        timeStamp:time,
	        elapsed:time-startTime,
	        frameTime:time-lastTimeStamp,
	        framesPerSecond:framesPerSecond,
	  	});
	            
	   	++frameCount;
	    lastTimeStamp=time;
    };
  	window.requestAnimationFrame(nextFrame,canvas);
};

var GLTextureManger = function() 
{
	this.textureArray=new Array();
	this.srcArray=new Array();
	this.texCount=0;
};

GLTextureManger.prototype.init = function(gl) 
{
	// Load default texture
	var callback=this.addTexture;
	var defaultSrc="root/textures/reddit-icon.png";
	var defaultTex=gl.textureManager.preloadTexture(gl, defaultSrc, null, null);	
};

GLTextureManger.prototype.addTexture = function(gl, texture, src) 
{
	var promise=gl.textureManager.texCount;
	texture.index=promise;
	texture.src=src;
	
	gl.textureManager.textureArray[promise]=texture;
	gl.textureManager.srcArray[promise]=src;
	gl.textureManager.texCount++;
	
	RedditGL_LOG("Texture added: " + texture.src); 
	
	return promise;
	
};

GLTextureManger.prototype.getTexture = function(gl, promise) 
{
	var texture=gl.textureManager.textureArray[promise];
	if(!texture)
		return gl.textureManager.textureArray[0];
	else
		return texture;
};

GLTextureManger.prototype.getCurrentIndex = function(gl) 
{
	return gl.textureManager.texCount;
};

GLTextureManger.prototype.preloadTexture = function(gl, src, callback, object) 
{
	var c=gl.textureManager.texCount;
	for(var i=0;i<c;i++) 
	{
		if(gl.textureManager.srcArray[i]==src) 
		{
			RedditGL_LOG("Texture "+src+" already loaded");
			var promise=i;
			if(callback) {if(object) {object.texture=promise;object.hasTexture=true;callback(object);break;}}
			else {if(object) {object.texture=promise;object.hasTexture=true;break;}}
			
			return promise;
		}
	}
	
	if(callback) {if(object) {return gl.textureManager.loadTexture(gl,src,callback,object);}}
	else 
	{
		if(object) {return gl.textureManager.loadTexture(gl,src,null,object);}
		else {return gl.textureManager.loadTexture(gl,src,null,null);}
	}
};

GLTextureManger.prototype.loadTexture = function(gl, src, callback, object) 
{
	var texture=gl.createTexture();
    var image=new Image();
  	image.addEventListener("load", function() {
    	gl.bindTexture(gl.TEXTURE_2D, texture);
    	if (!gl.textureManager.isPowerOfTwo(image.width)||!gl.textureManager.isPowerOfTwo(image.height)) {
	        // Scale up the texture to the next highest power of two dimensions.
	        var canvas=document.createElement("canvas");
	        canvas.width=gl.textureManager.nextHighestPowerOfTwo(image.width);
	        canvas.height=gl.textureManager.nextHighestPowerOfTwo(image.height);
	        var ctx=canvas.getContext("2d");
	        //TODO: Center image in new power of two demnsion
	        ctx.drawImage(image,0,0,image.width,image.height);
	        image=canvas;
    	}
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
         
       	if(!texture) {RedditGL_LOG("Texture FAILED: "+src);return;}
   			
   		RedditGL_LOG("Texture loaded: "+src);  
   		
     	if(callback) {
     		if(object) {object.texture=gl.textureManager.addTexture(gl,texture,src);object.hasTexture=true;callback(object);}
     	}
     	else {
     		if(object) {object.texture=gl.textureManager.addTexture(gl,texture,src);object.hasTexture=true;}
     		else {var promise=gl.textureManager.addTexture(gl,texture,src);return promise;}
     	}
  	});
   	image.src=src;

};

/*
 * Look if texture x^2
 */

GLTextureManger.prototype.isPowerOfTwo = function(x) 
{
    return (x&(x-1))==0;
};

/*
 * If not find the nearest power of two
 */

GLTextureManger.prototype.nextHighestPowerOfTwo = function(x) 
{
    --x;
    for (var i=1;i<32;i<<=1) 
    {
        x=x|x>> i;
    }
    return x+1;
};

/*
 * Shader Utils
 */
function getShader(gl, id) 
{
	var shaderScript=document.getElementById(id);
    if (!shaderScript) 
    {
     	return null;
    }

    var str="";
    var k=shaderScript.firstChild;
    while (k) 
    {
    	if (k.nodeType==3) {
        	str+=k.textContent;
        }
    	k=k.nextSibling;
    }

    var shader;
    if (shaderScript.type=="x-shader/x-fragment") 
    {
      	shader=gl.createShader(gl.FRAGMENT_SHADER);
    } 
    else if (shaderScript.type=="x-shader/x-vertex") 
    {
        shader=gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) 
    {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
   	return shader;
};

function initShader(gl, shaderVS, shaderFS, attribs, uniforms) 
{
	var vertexShader=getShader(gl,shaderVS);
    var fragmentShader=getShader(gl,shaderFS);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram,vertexShader);
    gl.attachShader(shaderProgram,fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)) 
    {
    	alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);
        
    // Add any shader attributes and uniforms that we specified needing
    if(attribs) 
    {
    	shaderProgram.attribute={};
    	for(var i in attribs) {
        	var attrib=attribs[i];
           	shaderProgram.attribute[attrib]=gl.getAttribLocation(shaderProgram, attrib);
            gl.enableVertexAttribArray(shaderProgram.attribute[attrib]);
            RedditGL_LOG("Shader added attribute: "+attrib);
        }
  	}
    if(uniforms) 
    {
     	shaderProgram.uniform={};
      	for(var i in uniforms) 
      	{
       		var uniform=uniforms[i];
            shaderProgram.uniform[uniform]=gl.getUniformLocation(shaderProgram, uniform);
            RedditGL_LOG("Shader added uniform: "+uniform);
        }
  	}
  	if(shaderProgram)
		RedditGL_LOG("Shaders loaded");
		
  	return shaderProgram;
};