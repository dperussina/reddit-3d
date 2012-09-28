/*
 * William Miller 2012
 */
var K_ShaderColor = 0;
var K_ShaderTexture = 1;

var RedditGL_Render = function() 
{
	redditGL_LOG("Renderer loaded");
};

RedditGL_Render.prototype.update = function(scene, timing) 
{
	var aCamera = scene.camera;
	aCamera.update();
	var sceneObjects = scene.sceneObjects;
	for(var i in sceneObjects) {
		var object = sceneObjects[i];
		//if(object.isSkybox == true) {return;}
		var instances = object.instances;
		for(var j in instances) {
			var objectInstance = instances[j];
			objectInstance.rotation[0] += (90 * timing.frameTime) / 1000.0;
    		objectInstance.rotation[1] += (90 * timing.frameTime) / 1000.0;
    		objectInstance.rotation[2] += (90 * timing.frameTime) / 1000.0;
    	}
	}
	
};
RedditGL_Render.prototype.drawScene = function(gl, scene) 
{
 	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	var aCamera = scene.camera;
	var sceneObjects = scene.sceneObjects;
	if(!sceneObjects) {return;}
	
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 50000.0, aCamera.pMatrix);
	
	for(var i in sceneObjects) {
		var object = sceneObjects[i];
		if(object.loaded) {
			var shader;
			if(!object.vertexPositionBuffer || !object.vertexIndexBuffer) {return;}
			
			switch(object.shaderType) {
				case K_ShaderColor:
					gl.useProgram(scene.shaders.color);
					shader = scene.shaders.color;
				break;
				
				case K_ShaderTexture:
					gl.useProgram(scene.shaders.texture);
					shader = scene.shaders.texture;
				break;
			}
			
			var instances = object.instances;
			
			gl.bindBuffer(gl.ARRAY_BUFFER, object.vertexPositionBuffer);
			gl.vertexAttribPointer(shader.attribute.aVertexPosition, object.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
			
			if(object.hasTexture) {	
				if(!object.aUV || !object.texture) {return;}
				gl.bindBuffer(gl.ARRAY_BUFFER, object.aUV);
				gl.vertexAttribPointer(shader.attribute.aTextureCoord, object.aUV.itemSize, gl.FLOAT, false, 0, 0);
			
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, object.texture);
				gl.uniform1i(shader.uniform.uSampler, 0);	
			}
			else {	
				if(!object.colorBuffer) {return;}
				gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
				gl.vertexAttribPointer(shader.attribute.aColor, object.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
			
			}
				
		    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
		    gl.uniformMatrix4fv(shader.uniform.uPMatrix, false, aCamera.pMatrix);
		    gl.uniformMatrix4fv(shader.uniform.uViewMatrix, false, aCamera.getViewMatrix());
		        
			for(var j in instances) {
				objectInstance = instances[j];
				if(!objectInstance.hidden) {			
					var mv = objectInstance.mvMatrix;
					mat4.identity(mv);		
					
					var scale = [objectInstance.scale,objectInstance.scale,objectInstance.scale];
					mat4.scale(mv, scale);
					
					if(!object.isSkybox) {
						
						// Rotate about world axis
			    		mat4.rotate(mv, degToRad(objectInstance.rotation[1] * objectInstance.speed), [0, 1, 0]);
			    		
			    		// Translate about world rotation	    	
			    		mat4.translate(mv, objectInstance.position);	
			    		
			    		// Rotate about object axis
			    		mat4.rotate(mv, degToRad(objectInstance.rotation[0]), [1, 0, 0]);	    	
			    		mat4.rotate(mv, degToRad(-objectInstance.rotation[1]), [0, 1, 0]);	
			    		mat4.rotate(mv, degToRad(objectInstance.rotation[2]), [0, 0, 1]);
					}
					
			        gl.uniformMatrix4fv(shader.uniform.uMVMatrix, false, mv);
				 	gl.drawElements(gl.TRIANGLES, object.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);	
				}
			}	
		}
	}
};