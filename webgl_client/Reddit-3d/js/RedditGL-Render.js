/*
 * William Miller 2012
 */

var RedditGL_Render = function() 
{
	redditGL_LOG("Renderer loaded");
};

RedditGL_Render.prototype.update = function(scene, timing) 
{
	var sceneObjects = scene.sceneObjects;
	for(var i in sceneObjects) {
		var object = sceneObjects[i];
		var instances = object.instances;
		for(var j in instances) {
			var objectInstance = instances[j];
			objectInstance.rotation[0] += (90 * timing.frameTime) / 1000.0;
    		objectInstance.rotation[1] += (90 * timing.frameTime) / 1000.0;
    		objectInstance.rotation[2] += (90 * timing.frameTime) / 1000.0;
    	}
	}
	
};
RedditGL_Render.prototype.drawScene = function(gl, shaderProgram, scene) 
{
 	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	var aCamera = scene.camera;
	var sceneObjects = scene.sceneObjects;
	
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, aCamera.pMatrix);
	
	if(scene.skyBox) {
		
	}
	
	for(var i in sceneObjects) {
		var object = sceneObjects[i];
		var instances = object.instances;
		
		mat4.identity(aCamera.viewMatrix);
		mat4.translate(aCamera.viewMatrix, aCamera.position);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, object.vertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.attribute.aVertexPosition, object.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
			
		gl.bindBuffer(gl.ARRAY_BUFFER, object.aUV);
		gl.vertexAttribPointer(shaderProgram.attribute.aTextureCoord, object.aUV.itemSize, gl.FLOAT, false, 0, 0);
			
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, object.texture);
		gl.uniform1i(shaderProgram.uniform.uSampler, 0);
			
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
	    gl.uniformMatrix4fv(shaderProgram.uniform.uPMatrix, false, aCamera.pMatrix);
	    gl.uniformMatrix4fv(shaderProgram.uniform.uViewMatrix, false, aCamera.viewMatrix);
	        
		for(var j in instances) {
			objectInstance = instances[j];
			
			mat4.identity(objectInstance.mvMatrix);		
			mat4.translate(objectInstance.mvMatrix, objectInstance.position);
				
			mat4.rotate(objectInstance.mvMatrix, degToRad(objectInstance.rotation[0]), [1, 0, 0]);
	    	mat4.rotate(objectInstance.mvMatrix, degToRad(objectInstance.rotation[1]), [0, 1, 0]);
	    	mat4.rotate(objectInstance.mvMatrix, degToRad(objectInstance.rotation[2]), [0, 0, 1]);			    
			
	        gl.uniformMatrix4fv(shaderProgram.uniform.uMVMatrix, false, objectInstance.mvMatrix);
		 	gl.drawElements(gl.TRIANGLES, object.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);	
		}
	}
};