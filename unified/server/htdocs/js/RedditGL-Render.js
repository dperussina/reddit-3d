/*
 * William Miller 2012
 */
var K_ShaderColor=0;
var K_ShaderTexture=1;

var frustum = mat6x4.create();

var RedditGL_Render = function() 
{
	RedditGL_LOG("Renderer loaded");
};

RedditGL_Render.prototype.resize = function(gl, scene, canvas)
{
	var aCamera = scene.camera;
   	gl.viewport(0, 0, canvas.width, canvas.height);
  	var aspectRatio = canvas.width/canvas.height;
  	mat4.perspective(45, aspectRatio, 0.1, 10000, aCamera.pMatrix);
};
RedditGL_Render.prototype.update = function(scene, timing) 
{
	var aCamera=scene.camera;
	aCamera.update();
	frustum = mat6x4.frustum(aCamera.pMatrix,aCamera.getViewMatrix(), frustum);
	
	var sceneObjects=scene.sceneObjects;
	if(!sceneObjects) {return;}
	var n=sceneObjects.length;
	var k=n;
	do
	{
		var i=k-n;
		var object=sceneObjects[i];	
		if(!object){break;}
		var instances=object.instances;
		var nn=instances.length;
		var kk=nn;
		do
		{
			var ii=kk-nn;
			var objectInstance=instances[ii]; 
			if(!objectInstance){break;}
			var dt = timing.frameTime;
			objectInstance.rotation[0]+=(90*dt)/1000.0;
    		objectInstance.rotation[1]+=(90*dt)/1000.0;
    		objectInstance.rotation[2]+=(90*dt)/1000.0;
		}
		while(--nn);
	}
	while(--n);
};
RedditGL_Render.prototype.drawScene = function(gl, scene) 
{	
	var aCamera=scene.camera;
	var sceneObjects=scene.sceneObjects;
	if(!sceneObjects) {return;}
		
	var n=sceneObjects.length;
	var k=n;
	do
	{
		var i=k-n;
		var object=sceneObjects[i];	
		if(!object){break;}
		if(object.loaded) 
		{
			var shader;
			if(!object.vertexPositionBuffer||!object.vertexIndexBuffer) {break;}
			
			switch(object.shaderType) 
			{
				case K_ShaderColor:
					gl.useProgram(scene.shaders.color);
					shader=scene.shaders.color;
				break;
				
				case K_ShaderTexture:
					gl.useProgram(scene.shaders.texture);
					shader=scene.shaders.texture;
				break;
				
				default:
				break;
			}
			
			gl.bindBuffer(gl.ARRAY_BUFFER,object.vertexPositionBuffer);
			gl.vertexAttribPointer(shader.attribute.aVertexPosition,object.vertexPositionBuffer.itemSize,gl.FLOAT,false,0,0);
			
			if(object.hasTexture) 
			{	
				var texture, objTexture;
				if(!object.vertexTextureBuffer) {break;}
				if(!object.texture) 
				{
					if(!gl.textureManager.textureArray[0]) {break;}
					else {objTexture=gl.textureManager.textureArray[0]}
					
				}
				else 
				{
					objTexture=object.texture;
				}
				
				gl.bindBuffer(gl.ARRAY_BUFFER,object.vertexTextureBuffer);
				gl.vertexAttribPointer(shader.attribute.aTextureCoord,object.vertexTextureBuffer.itemSize,gl.FLOAT,false,0,0);
				
				texture=gl.textureManager.getTexture(gl,objTexture);
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D,texture);
				gl.uniform1i(shader.uniform.uSampler,0);	
			}
			else 
			{	
				if(!object.vertexColorBuffer) {break;}
				gl.bindBuffer(gl.ARRAY_BUFFER,object.vertexColorBuffer);
				gl.vertexAttribPointer(shader.attribute.aColor,object.vertexColorBuffer.itemSize,gl.FLOAT,false,0,0);
			
			}
				
		    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,object.vertexIndexBuffer);
		    gl.uniformMatrix4fv(shader.uniform.uPMatrix,false,aCamera.pMatrix);
		    gl.uniformMatrix4fv(shader.uniform.uViewMatrix,false,aCamera.getViewMatrix());
		 	
		 	var instances=object.instances;
		 	if(!instances) {break;}
			var nn=instances.length;
			var kk=nn;
			do
			{
				var ii=kk-nn;
				var objectInstance=instances[ii]; 
				if(!objectInstance){break;}
				if(!objectInstance.hidden) 
				{	
					
					if(objectInstance.hasTexture) 
					{	
						if(!object.vertexTextureBuffer||!object.texture) {return;}
						gl.bindBuffer(gl.ARRAY_BUFFER,object.vertexTextureBuffer);
						gl.vertexAttribPointer(shader.attribute.aTextureCoord,object.vertexTextureBuffer.itemSize,gl.FLOAT,false,0,0);
						
						var texture=gl.textureManager.getTexture(gl,objectInstance.texture);
						gl.activeTexture(gl.TEXTURE0);
						gl.bindTexture(gl.TEXTURE_2D,texture);
						gl.uniform1i(shader.uniform.uSampler,0);	
					}
					
					var mv=objectInstance.mvMatrix;
					mat4.identity(mv);		
					
					var scale=[objectInstance.scale,objectInstance.scale,objectInstance.scale];
					mat4.scale(mv,scale);
					
					var isVisible = true;
					var instanceDistance = 0;
					
					if(!object.isSkybox) 
					{
						
						gl.enable(gl.CULL_FACE);
						gl.cullFace(gl.BACK); //FRONT BACK FRONT_AND_BACK
						
						// Rotate about world axis
			    		mat4.rotate(mv,degToRad(objectInstance.rotation[1]*objectInstance.speed),[0,1,0]);
			    		
			    		// Translate about world rotation	    	
			    		mat4.translate(mv,objectInstance.position);	
						
			    		// Rotate about object axis
			    		if(object.name=='Sphere'||object.name=='Cube') 
			    		{
			    			//mat4.rotate(mv,degToRad(objectInstance.rotation[0]),[1,0,0]);	    	
			    			mat4.rotate(mv,degToRad(-objectInstance.rotation[1]),[0,1,0]);	
			    			//mat4.rotate(mv,degToRad(objectInstance.rotation[2]),[0,0,1]);	
			    		}
			    		
			    		var pos = vec4.create();
			    		mat4.multiplyVec4(mv,pos);
			    		pos = vec3.fromVec4(pos);
			    		
			    		isVisible = mat6x4.sphereInFrustum(frustum, pos, objectInstance.BBox);
						if(isVisible <= 0) {
							isVisible = false;
						}
						else {
							instanceDistance = isVisible;
						}
						
					}
					
			        gl.uniformMatrix4fv(shader.uniform.uMVMatrix,false,mv);
				 	if(isVisible) {gl.drawElements(gl.TRIANGLES,object.vertexIndexBuffer.numItems,gl.UNSIGNED_SHORT,0);}	
				}
			}
			while(--nn);   
			gl.disable(gl.CULL_FACE);
		}
	}
	while(--n);
};