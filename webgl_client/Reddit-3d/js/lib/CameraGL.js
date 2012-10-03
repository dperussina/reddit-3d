/*
 * William Miller 2012
 */

var CameraWebGLOrbit = function(max) 
{
	this.moving=false;
    this.orbitX=0;
    this.orbitY=0;
    this.distance=10;
    this.zoomSpeed=100;
    this.maxDistance=max;
    this.center=vec3.create();
    this.viewMatrix=mat4.create();
    this.pMatrix=mat4.create();
    this.dirty=true;
    

    
};

CameraWebGLOrbit.prototype.init = function(canvas) 
{
	var self=this,
    lastX,lastY;  
	// Set up the appropriate event hooks
    canvas.addEventListener('mousedown',function(event) 
    {
   		if(event.which===1) 
   		{
         	self.moving=true;
        }
        lastX=event.pageX;
        lastY=event.pageY;
    }, false);

    canvas.addEventListener('mousemove',function(event) 
    {
   		if(self.moving)
   		{
       		var xDelta=event.pageX-lastX,
            yDelta=event.pageY-lastY;

         	lastX=event.pageX;
          	lastY=event.pageY;
          	
          	var movement=Math.PI*2;

        	self.orbitY+=xDelta*0.015;
            while(self.orbitY<0) 
            {
            	self.orbitY += movement;
            }
            while(self.orbitY>=movement) 
            {
              	self.orbitY-=movement;
            }
            
            self.orbitX+=yDelta*0.015;
            while(self.orbitX<0) 
            {
             	self.orbitX+=movement;
            }
            while (self.orbitX>=movement) 
            {
             	self.orbitX-=movement;
            }

            self.dirty=true;
            }
        },false);

  	canvas.addEventListener('mouseup',function() 
  	{
     	self.moving=false;
  	},false);
  	
  	canvas.addEventListener('mousewheel',function(e) 
  	{
  		var speed=-e.wheelDelta;
  		self.distance+=speed/self.zoomSpeed;
     	self.dirty=true;
  	},false);
  	
  	canvas.addEventListener('DOMMouseScroll',function(e) 
  	{	
  		var speed=e.detail*30;
  		self.distance+=speed/self.zoomSpeed;
     	self.dirty=true;
  	},false);
};
CameraWebGLOrbit.prototype.getCenter = function() 
{
	return this.center;
};

CameraWebGLOrbit.prototype.setCenter = function(value) 
{
 	this.center=value;
   	this.dirty=true;
};

CameraWebGLOrbit.prototype.getDistance = function() 
{
    return this.distance;
};

CameraWebGLOrbit.prototype.setDistance = function(value) 
{
   	this.distance=value;
    this.dirty=true;
};

CameraWebGLOrbit.prototype.getViewMatrix = function() 
{
	if(this.dirty) 
	{
     	var mv=this.viewMatrix;
        mat4.identity(mv);
        mat4.translate(mv,[0, 0, -this.distance]);
       	mat4.rotateX(mv,this.orbitX+(Math.PI/2));
        mat4.translate(mv,this.center);
        mat4.rotateX(mv,-Math.PI/2);
        mat4.rotateY(mv,this.orbitY);
        this.dirty=false;
  	}

   	return this.viewMatrix;
};

CameraWebGLOrbit.prototype.update = function() 
{
	if(this.distance<0) 
	{
		this.distance=0;
	}
	if(this.distance>this.maxDistance) 
	{
		this.distance=this.maxDistance;
	}
};

    