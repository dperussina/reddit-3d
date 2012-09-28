/*
 * William Miller 2012
 */

// Polyfill to ensure we can always call requestAnimaionFrame
if(!window.requestAnimationFrame) {
	window.requestAnimationFrame = (function(){
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

function startRenderLoop(canvas, callback) {
	var startTime = window.webkitAnimationStartTime || 
     				window.mozAnimationStartTime ||
                	new Date().getTime();

   	var lastTimeStamp = startTime;
   	var lastFpsTimeStamp = startTime;
   	var framesPerSecond = 0;
  	var frameCount = 0;
        
   	function nextFrame(time){
	  	// Recommendation from Opera devs: calling the RAF shim at the beginning of your
	    // render loop improves framerate on browsers that fall back to setTimeout
	   	window.requestAnimationFrame(nextFrame, canvas);
	                
	   	// Update FPS if a second or more has passed since last FPS update
	  	if(time - lastFpsTimeStamp >= 1000) {
	   		framesPerSecond = frameCount;
	     	frameCount = 0;
	    	lastFpsTimeStamp = time;
	   	} 
	
	  	callback({
	     	startTime: startTime,
	        timeStamp: time,
	        elapsed: time - startTime,
	        frameTime: time - lastTimeStamp,
	        framesPerSecond: framesPerSecond,
	  	});
	            
	   	++frameCount;
	    lastTimeStamp = time;
    };

  	window.requestAnimationFrame(nextFrame, canvas);
};
       
function redditGL_LOG(msg) {
	console.log("RedditGL INFO: " + msg);
};
function initGL(canvas) 
{
	var glRef;
	try {
    	glRef = canvas.getContext("experimental-webgl");
        glRef.viewportWidth = canvas.width;
        glRef.viewportHeight = canvas.height;
  	} catch (e) {
  	}
  	if (!glRef) {
  		alert("Could not initialise WebGL!");
  	}
  	return glRef;
};

function loadTexture(gl, src, callback, object, ref) 
{
	var texture = gl.createTexture();
    var image = new Image();
  	image.addEventListener("load", function() {
    	gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
         
       	if(texture)
   			redditGL_LOG("Texture loaded: " + src);  
   		object.texture = texture;
   		object.hasTexture = true;
   		
     	callback(object, ref);
  	});
   	image.src = src;

};

function getShader(gl, id) 
{
	var shaderScript = document.getElementById(id);
    if (!shaderScript) {
     	return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
    	if (k.nodeType == 3) {
        	str += k.textContent;
        }
    	k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
      	shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
   	return shader;
};

function initShader(gl, shaderVS, shaderFS, attribs, uniforms) 
{
	var vertexShader = getShader(gl, shaderVS);
    var fragmentShader = getShader(gl, shaderFS);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    	alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);
        
    // Add any shader attributes and uniforms that we specified needing
    if(attribs) {
    	shaderProgram.attribute = {};
    	for(var i in attribs) {
        	var attrib = attribs[i];
           	shaderProgram.attribute[attrib] = gl.getAttribLocation(shaderProgram, attrib);
            gl.enableVertexAttribArray(shaderProgram.attribute[attrib]);
            redditGL_LOG("Shader added attribute: " + attrib);
        }
  	}
    if(uniforms) {
     	shaderProgram.uniform = {};
      	for(var i in uniforms) {
       		var uniform = uniforms[i];
            shaderProgram.uniform[uniform] = gl.getUniformLocation(shaderProgram, uniform);
            redditGL_LOG("Shader added uniform: " + uniform);
        }
  	}
  	if(shaderProgram)
		redditGL_LOG("Shaders loaded");
		
  	return shaderProgram;
};