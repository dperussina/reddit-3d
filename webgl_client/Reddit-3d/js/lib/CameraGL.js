/*
 * William Miller 2012
 */

var CameraWebGL = function(max) 
{
	this.moving = false;
    this.orbitX = 0;
    this.orbitY = 0;
    this.distance = 10;
    this.maxDistance = max;
    this.center = vec3.create();
    this.viewMatrix = mat4.create();
    this.pMatrix = mat4.create();
    this.dirty = true;
    

    
};

CameraWebGL.prototype.init = function (canvas) 
{
	var self = this,
    lastX, lastY;
    
	// Set up the appropriate event hooks
    canvas.addEventListener('mousedown', function (event) {
   		if (event.which === 1) {
         	self.moving = true;
        }
        lastX = event.pageX;
        lastY = event.pageY;
    }, false);

    canvas.addEventListener('mousemove', function (event) {
   		if (self.moving) {
       		var xDelta = event.pageX  - lastX,
            yDelta = event.pageY  - lastY;

         	lastX = event.pageX;
          	lastY = event.pageY;

        	self.orbitY += xDelta * 0.025;
            while (self.orbitY < 0) {
                    self.orbitY += Math.PI * 2;
            }
            while (self.orbitY >= Math.PI * 2) {
                    self.orbitY -= Math.PI * 2;
            }
            
            self.orbitX += yDelta * 0.025;
            while (self.orbitX < 0) {
                    self.orbitX += Math.PI * 2;
            }
            while (self.orbitX >= Math.PI * 2) {
                    self.orbitX -= Math.PI * 2;
            }

            self.dirty = true;
            }
        }, false);

  	canvas.addEventListener('mouseup', function () {
     	self.moving = false;
  	}, false);
  	
  	canvas.addEventListener('mousewheel', function (e) {
  		self.distance += -e.wheelDelta/10;
     	self.dirty = true;
  	}, false);
  	
  	canvas.addEventListener('DOMMouseScroll', function (e) {
  		self.distance += -(e.wheelDelta/10 || -e.detail);
     	self.dirty = true;
  	}, false);
};
CameraWebGL.prototype.getCenter = function () 
{
	return this.center;
};

CameraWebGL.prototype.setCenter = function (value) 
{
 	this.center = value;
   	this.dirty = true;
};

CameraWebGL.prototype.getDistance = function () 
{
    return this.distance;
};

CameraWebGL.prototype.setDistance = function (value) 
{
   	this.distance = value;
    this.dirty = true;
};

CameraWebGL.prototype.getViewMatrix = function () 
{
	if (this.dirty) {
     	var mv = this.viewMatrix;
        mat4.identity(mv);
        mat4.translate(mv, [0, 0, -this.distance]);
       	mat4.rotateX(mv, this.orbitX + (Math.PI / 2));
        mat4.translate(mv, this.center);
        mat4.rotateX(mv, -Math.PI / 2);
        mat4.rotateY(mv, this.orbitY);

        this.dirty = false;
  	}

   	return this.viewMatrix;
};

CameraWebGL.prototype.update = function () 
{
	if(this.distance < 0) {
		this.distance = 0;
	}
	if(this.distance > this.maxDistance) {
		this.distance = this.maxDistance;
	}
};

    