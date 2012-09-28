/*
 * William Miller
 */

function SkyboxCallback (model)
{
	// Create an instance or many 2nd arg optional, 1 instance required to render
  	addObjectInstance(model);	
  	setObjectInstancePosition(model.instances[0], vec3.create());  	
  	setObjectInstanceScale(model.instances[0], 1000);
  	setObjectInstanceSpeed(model.instances[0], 0.0);
  	model.loaded = true;
  	RedditMain.addObject(model);
};

function ModelCallback (model) 
{
	var scale = 1.0, count = 500, speed = 0.08, range = 200, isRandom = true;

	// Create an instance or many 2nd arg optional, 1 instance required to render
  	addObjectInstance(model, count);	  	
  	for(var i = 0; i < model.instanceCount; i++) {
  		var position = [0.0,0.0,0.0];
  		if(isRandom) {
  			var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  			position = [Math.random() * range * plusOrMinus, Math.random() * 2 * plusOrMinus, Math.random() * range * plusOrMinus];
  			scale = Math.random() * 2.0;
  			speed = Math.random() * 0.08;
  		}
  		setObjectInstancePosition(model.instances[i], position);
  		setObjectInstanceScale(model.instances[i], scale);
  		setObjectInstanceSpeed(model.instances[i], speed);
  	}
  	model.loaded = true;
	RedditMain.addObject(model);	
};

function initBufferObject(gl, typeClass, type, texture, callback) 
{
	if(typeClass == "environment") {
		if(type == "skybox") {
			if(!callback) {callback = SkyboxCallback;}
			initCubeBuffer(gl, texture, callback, true);
		}
	}
	else if(typeClass == "primitive") {
		if(!callback) {callback = ModelCallback;}
		if(type == "cube") {
			initCubeBuffer(gl, texture, callback);
		}
		else if(type == "sphere") {
			initSphereBuffer(gl, texture, callback);
		}
	}
	else if(typeClass == "model"){
		if(!callback) {callback = ModelCallback;}
		initJSONModel(gl, type, texture, callback);
	}		
};

function initCubeBuffer(gl, texture, callback, isSkybox) 
{
	
	var bufferObject = {};
   	var vertices = [];
	var textureCoords = [];
	var vertexIndices = [];
	
	bufferObject.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.vertexPositionBuffer);
    vertices = [
	    //x,y,z
	   	// Front face
	   -1.0, -1.0,  1.0,
	    1.0, -1.0,  1.0,
	    1.0,  1.0,  1.0,
	   -1.0,  1.0,  1.0,
		// Back face
	   -1.0, -1.0, -1.0,
	   -1.0,  1.0, -1.0,
	    1.0,  1.0, -1.0,
	    1.0, -1.0, -1.0,
		// Top face
	   -1.0,  1.0, -1.0,
	   -1.0,  1.0,  1.0,
	    1.0,  1.0,  1.0,
		1.0,  1.0, -1.0,
		// Bottom face
	   -1.0, -1.0, -1.0,
		1.0, -1.0, -1.0,
	    1.0, -1.0,  1.0,
	   -1.0, -1.0,  1.0,
		// Right face
	    1.0, -1.0, -1.0,
	    1.0,  1.0, -1.0,
	    1.0,  1.0,  1.0,
	    1.0, -1.0,  1.0,
		// Left face
	   -1.0, -1.0, -1.0,
	   -1.0, -1.0,  1.0,
	   -1.0,  1.0,  1.0,
	   -1.0,  1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    bufferObject.vertexPositionBuffer.itemSize = 3;
    bufferObject.vertexPositionBuffer.numItems = 24;

    textureCoords = [
    	// Front face
       	0.0,1.0,
       	1.0,1.0,
       	1.0,0.0,
       	0.0,0.0,
		// Back face
       	0.0,1.0,
       	0.0,0.0,
       	1.0,0.0,
       	1.0,1.0,
		// Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
		// Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
		// Right face
       	0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
		// Left face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
  	];
  	
  	if(texture != null) {
		bufferObject.aUV = gl.createBuffer();
    	gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.aUV);
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    	bufferObject.aUV.itemSize = 2;
    	bufferObject.aUV.numItems = textureCoords.length / 2;	
    	bufferObject.shaderType = K_ShaderTexture;
	}
	else {
		bufferObject.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.colorBuffer);
		var colors = [];
		for(var i = 0; i <  vertices.length/3; i++) {
			for(var j = 0; j < 4; j++) {
				colors.push(1.0);
			}
		}
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		bufferObject.colorBuffer.itemSize = 4;
		bufferObject.colorBuffer.numItems = colors.length;	
		bufferObject.shaderType = K_ShaderColor;
	}

    bufferObject.vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferObject.vertexIndexBuffer);
    vertexIndices = [
    	0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
   	];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
    bufferObject.vertexIndexBuffer.itemSize = 1;
    bufferObject.vertexIndexBuffer.numItems = 36;
    
    bufferObject.name = "Cube";
    bufferObject.instances = [];
   	bufferObject.instanceCount = 0;
   	
   	if(isSkybox) {
   		bufferObject.isSkybox = true;
   		bufferObject.name = "Skybox";	
   	}
   	
   	redditGL_LOG("Primitive: " + "'" + bufferObject.name + "' " + "Buffer Object created");
   	if(texture  != null)
    	loadTexture(gl, texture, callback, bufferObject);  
    else	
    	callback(bufferObject);
};

function initSphereBuffer(gl, texture, callback) 
{		
	var bufferObject = {};
   	var vertices = [];
	var textureCoords = [];
	var vertexIndices = [];
	
	var radius = 1.0;
	var latitudeBands = 45;
    var longitudeBands = 45;
   	for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
           	var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1 - (longNumber / longitudeBands);
            var v = 1 - (latNumber / latitudeBands);
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
			
			
			vertices.push(radius * x);
            vertices.push(radius * y);
            vertices.push(radius * z);
                
            textureCoords.push(v);
            textureCoords.push(u);
            if(latNumber < latitudeBands && longNumber < longitudeBands) {
            	vertexIndices.push(first);
            	vertexIndices.push(second);
            	vertexIndices.push(first + 1);

            	vertexIndices.push(second);
            	vertexIndices.push(second + 1);
            	vertexIndices.push(first + 1);	        
            }    
      	}
  	}
  	
	textureCoords = textureCoords.reverse();
	
    bufferObject.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    bufferObject.vertexPositionBuffer.itemSize = 3;
    bufferObject.vertexPositionBuffer.numItems = vertices.length / 3;
    
    if(texture != null) {
		bufferObject.aUV = gl.createBuffer();
    	gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.aUV);
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    	bufferObject.aUV.itemSize = 2;
    	bufferObject.aUV.numItems = textureCoords.length / 2;	
    	bufferObject.shaderType = K_ShaderTexture;
	}
	else {
		bufferObject.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.colorBuffer);
		var colors = [];
		for(var i = 0; i <  vertices.length/3; i++) {
			for(var j = 0; j < 4; j++) {
				colors.push(1.0);
			}
		}
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		bufferObject.colorBuffer.itemSize = 4;
		bufferObject.colorBuffer.numItems = colors.length;	
		bufferObject.shaderType = K_ShaderColor;
	}
 
    bufferObject.vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferObject.vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
    bufferObject.vertexIndexBuffer.itemSize = 1;
    bufferObject.vertexIndexBuffer.numItems = vertexIndices.length;
    
    bufferObject.name = "Sphere";
    bufferObject.instances = [];
   	bufferObject.instanceCount = 0;
   	   	
   	redditGL_LOG("Primitive: " + "'" + bufferObject.name + "' " + "Buffer Object created");
	if(texture != null)
    	loadTexture(gl, texture, callback, bufferObject);  
    else	
    	callback(bufferObject);
};

function initJSONModel(gl, path, texture, callback) 
{	
	var request = new XMLHttpRequest();
    request.open("GET", path);
    request.onreadystatechange = function () {
    	if (request.readyState == 4) {
        	loadJSONModel(gl, JSON.parse(request.responseText), texture, callback);	
        }
   	}
  	request.send();	
};

function loadJSONModel(gl, model, texture, callback) 
{
	var bufferObject = {};

    bufferObject.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.vertexPositionBuffer);
   	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);
    bufferObject.vertexPositionBuffer.itemSize = 3;
    bufferObject.vertexPositionBuffer.numItems = model.vertices.length / 3;
	
	if(model.textureCoords && texture != null) {
		bufferObject.aUV = gl.createBuffer();
    	gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.aUV);
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.textureCoords), gl.STATIC_DRAW);
    	bufferObject.aUV.itemSize = 2;
    	bufferObject.aUV.numItems = model.textureCoords.length / 2;
    	bufferObject.shaderType = K_ShaderTexture;	
	}
	else {
		bufferObject.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.colorBuffer);
		var colors = [];
		for(var i = 0; i <  model.vertices.length/3; i++) {
			for(var j = 0; j < 4; j++) {
				colors.push(1.0);
			}
		}
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		bufferObject.colorBuffer.itemSize = 4;
		bufferObject.colorBuffer.numItems = colors.length;	
		bufferObject.shaderType = K_ShaderColor;
	}
      
    bufferObject.vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.normals), gl.STATIC_DRAW);
    bufferObject.vertexNormalBuffer.itemSize = 3;
    bufferObject.vertexNormalBuffer.numItems = model.normals.length / 3;
    
    bufferObject.vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferObject.vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.models[0].indices), gl.STATIC_DRAW);
    bufferObject.vertexIndexBuffer.itemSize = 1;
    bufferObject.vertexIndexBuffer.numItems = model.models[0].indices.length;
    
    bufferObject.name = model.name;
    bufferObject.instances = [];
   	bufferObject.instanceCount = 0;  
   	
   	redditGL_LOG("Model: " + "'" + bufferObject.name + "' " + "Buffer Object created");
   	if(texture != null)
    	loadTexture(gl, texture, callback, bufferObject);  
    else	
    	callback(bufferObject);
};

function addObjectInstance(object, count) 
{
	var u = object.instanceCount;
	if(count) {
		for(var i = 0; i < count; i++) {
			object.instances[u + i] = new instance();
			object.instances[u + i].create();
    		object.instanceCount++;
		}	
	}
	else {
		object.instances[u] = new instance();	
		object.instances[u].create();	
    	object.instanceCount++;
	}
	
	redditGL_LOG("'" + object.name + "' " + " Instance(s) created - Count: " + object.instanceCount);
};

function setObjectInstanceRotation(objectInstance, rot) 
{
	objectInstance.rotation = vec3.create(rot);
};

function setObjectInstancePosition(objectInstance, pos) 
{
	objectInstance.position = vec3.create(pos);
};

function setObjectInstanceScale(objectInstance, value) 
{
	objectInstance.scale = value;
};

function setObjectInstanceSpeed(objectInstance, speed) 
{
	objectInstance.speed = speed;
};

/*
 * Object Instance
 */
var instance = function() 
{	
}; 

instance.prototype.create = function() 
{
	this.mvMatrix = mat4.create();
	this.rotation = vec3.create();
	this.position = vec3.create();
	this.scale = 1.0;
	this.speed = 1.0;
	this.hidden = false;
};