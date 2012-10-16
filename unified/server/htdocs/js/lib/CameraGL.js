/*
 * William Miller 2012
 */

var CameraWebGLOrbit = function(max) 
{
	this.moving = false;
    this.orbitX = 0;
    this.orbitY = 0;
    this.distance = 10;
    this.zoomSpeed = 100;
    
    this.maxDistance = max;
    this.center = vec3.create();
    
    this.rotMatrix = mat4.create(); 
    mat4.identity(this.rotMatrix);
     
    this.viewMatrix = mat4.create();
    this.pMatrix = mat4.create();
    
    this.keys = new Array(128);
    this.shift = false;
    this.dirty = true;
};

CameraWebGLOrbit.prototype.init = function(canvas) 
{
	var self = this,
    lastX,lastY;  
	// Set up the appropriate event hooks
	// Set up the appropriate event hooks
   	document.addEventListener("keydown", function (event) {
    	self.keys[event.keyCode] = true;
      	if(event.keyCode == 32) { // Prevent the page from scrolling
       		event.preventDefault();
      		return false;
       	}
       	if(event.shiftKey)
       	{
       		self.shift = true;
       	}
  	}, true);

 	document.addEventListener("keyup", function (event) {
    	self.keys[event.keyCode] = false;
    	if(self.shift) {self.shift = false;}
   	}, false);
   	
    canvas.addEventListener('mousedown',function(event) 
    {
   		if(event.which === 1) 
   		{
         	self.moving = true;
        }
        lastX = event.pageX;
        lastY = event.pageY;
    }, false);

    canvas.addEventListener('mousemove',function(event) 
    {
   		if(self.moving)
   		{
       		var xDelta = event.pageX-lastX,
            yDelta = event.pageY-lastY;
			
         	lastX = event.pageX;
          	lastY = event.pageY;
          	
          	if(self.shift)
          	{
          		var movement = Math.PI*2;           
	        	self.orbitY += xDelta*0.015;
	            while(self.orbitY < 0) 
	            {
	            	self.orbitY += movement;
	            }
	            while(self.orbitY >= movement) 
	            {
	              	self.orbitY -= movement;
	            }
	            
	            self.orbitX += yDelta*0.015;
	            while(self.orbitX < 0) 
	            {
	             	self.orbitX += movement;
	            }
	            while (self.orbitX >= movement) 
	            {
	             	self.orbitX -= movement;
	            }	
	            
	            // Update the directional matrix
				var rot = self.rotMatrix;
	            mat4.identity(rot);
	            mat4.rotateY(rot, -self.orbitY);
          	}
          	else 
          	{
          		var angle = Math.atan2(yDelta, xDelta);
				var movX = Math.cos(-angle);
				var movZ = Math.sin(angle);
				var mov = vec3.create([movX,0.0,movZ]);
				var rot = self.rotMatrix;
				mat4.multiplyVec3(rot, mov);
				vec3.add(self.center, mov);
          	}
            self.dirty = true;
      	}
  	},false);

  	canvas.addEventListener('mouseup',function() 
  	{
     	self.moving = false;
     	self.dirty = true;
  	},false);
  	
  	canvas.addEventListener('mousewheel',function(event) 
  	{
  		var speed = -event.wheelDelta;
  		self.distance += speed/self.zoomSpeed;
     	self.dirty = true;
  	},false);
  	
  	canvas.addEventListener('DOMMouseScroll',function(event) 
  	{	
  		var speed = event.detail*30;
  		self.distance += speed/self.zoomSpeed;
     	self.dirty = true;
  	},false);
};
CameraWebGLOrbit.prototype.getCenter = function() 
{
	return this.center;
};

CameraWebGLOrbit.prototype.setCenter = function(value) 
{
 	this.center = value;
   	this.dirty = true;
};

CameraWebGLOrbit.prototype.getDistance = function() 
{
    return this.distance;
};

CameraWebGLOrbit.prototype.setDistance = function(value) 
{
   	this.distance = value;
    this.dirty = true;
};

CameraWebGLOrbit.prototype.getViewMatrix = function() 
{
	if(this.dirty) 
	{
		
     	var view = this.viewMatrix;
     	mat4.identity(view);
     	mat4.translate(view,[0, 0, -this.distance]);
     	mat4.rotateX(view,this.orbitX);
     	mat4.rotateY(view,this.orbitY);
     	mat4.translate(view, this.center);
        this.dirty = false;
  	}

   	return this.viewMatrix;
};

CameraWebGLOrbit.prototype.update = function() 
{
	if(this.distance < 0) 
	{
		this.distance = 0;
	}
	if(this.distance > this.maxDistance) 
	{
		this.distance = this.maxDistance;
	}
};

    