/*
 * William Miller 2012
 */

var RedditGL_Render = function() 
{
	redditGL_LOG("Render loaded");
};

RedditGL_Render.prototype.update = function(scene, timing) 
{
	var sceneObjects = scene.sceneObjects;
	for(var i in sceneObjects) {
		var object = sceneObjects[i];
		
		object.rotation[0] += (90 * timing.frameTime) / 1000.0;
    	object.rotation[1] += (90 * timing.frameTime) / 1000.0;
    	object.rotation[2] += (90 * timing.frameTime) / 1000.0;
	}
	
};
RedditGL_Render.prototype.drawScene = function(gl, shaderProgram, scene) 
{
	var aCamera = scene.camera;
	var sceneObjects = scene.sceneObjects;
 	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, aCamera.pMatrix);
	mat4.identity(aCamera.mvMatrix);
	
	for(var i in sceneObjects) {
		var object = sceneObjects[i];
		mat4.translate(aCamera.mvMatrix, object.position);
		mat4.rotate(aCamera.mvMatrix, degToRad(object.rotation[0]), [1, 0, 0]);
    	mat4.rotate(aCamera.mvMatrix, degToRad(object.rotation[1]), [0, 1, 0]);
    	mat4.rotate(aCamera.mvMatrix, degToRad(object.rotation[2]), [0, 0, 1]);
    
		gl.bindBuffer(gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	    gl.vertexAttribPointer(shaderProgram.attribute.aVertexPosition, object.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
	    gl.bindBuffer(gl.ARRAY_BUFFER, object.aUV);
	    gl.vertexAttribPointer(shaderProgram.attribute.aTextureCoord, object.aUV.itemSize, gl.FLOAT, false, 0, 0);
		
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, object.texture);
	    gl.uniform1i(shaderProgram.uniform.uSampler, 0);
		
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
	    gl.uniformMatrix4fv(shaderProgram.uniform.uPMatrix, false, aCamera.pMatrix);
        gl.uniformMatrix4fv(shaderProgram.uniform.uMVMatrix, false, aCamera.mvMatrix);
	 	gl.drawElements(gl.TRIANGLES, object.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);	
	}
};