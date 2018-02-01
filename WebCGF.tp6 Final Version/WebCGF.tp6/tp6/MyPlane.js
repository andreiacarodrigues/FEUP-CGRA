/**
 * MyPlane
 * @constructor
 */
 
var deg2rad=Math.PI/180.0;

function MyPlane(scene, posX, posY, posZ)
 {
 	CGFobject.call(this,scene);
 	
 	this.triangle = new MyTriangle(this.scene);
 	this.hitTheWall = false;
 	this.hitTheGround = false;
 	
	this.posX = posX;
 	this.posY = posY;
 	this.posZ = posZ;
 	
 	this.flightSpeed = 1;
 	this.downSpeed = 1;
 	
 	this.lastTime = 0;
 	
 	this.initBuffers();
 };

 MyPlane.prototype = Object.create(CGFobject.prototype);
 MyPlane.prototype.constructor = MyPlane;

 MyPlane.prototype.getPositionX = function()
 {
	 return this.posX;
 };
 
 MyPlane.prototype.getPositionY = function()
 {
	 return this.posY;
 };
 
 MyPlane.prototype.getPositionZ = function()
 {
	 return this.posZ;
 };
 
 MyPlane.prototype.buildPlane = function()
 {
	 this.scene.pushMatrix();
	 
	 this.scene.rotate(degToRad * 180, 0, 1, 0);
	 this.scene.translate(-0.45, 0, 0);
	 
	 this.scene.pushMatrix();
	 	this.scene.rotate(180  * degToRad, 1, 0, 0);
		this.triangle.display();
	this.scene.popMatrix();

	 this.scene.pushMatrix();
	 	this.scene.rotate(90 * degToRad, 1, 0, 0);
	 	this.triangle.display();
	this.scene.popMatrix();
	
	 this.scene.pushMatrix();
	 	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	 	this.triangle.display();
	this.scene.popMatrix();
	
	this.scene.popMatrix();
 };

 MyPlane.prototype.update = function(currTime)
 {
	 if(this.lastTime == 0)
     {
		 this.lastTime = currTime;
		 return;
	}
		
	var deltaTime = currTime - this.lastTime;
	this.lastTime = currTime;
	
	this.flightSpeed = this.scene.planeSpeed;
 	this.downSpeed = this.scene.planeSpeed;
	
	if(!this.hitTheWall)
	{
		this.posX = this.posX - deltaTime/1000 * Math.cos(20 * degToRad) * this.flightSpeed;
		this.posY = this.posY + deltaTime/1000 * Math.sin(20 * degToRad) * this.flightSpeed;
		
		if(this.posX < 0.05)
		{
			this.hitTheWall = true;
			this.posX = 0.05;
		}
	}
	
	if(this.hitTheWall && !this.hitTheGround)
	{
		this.posY = this.posY - deltaTime/1000 * this.downSpeed;
		if(this.posY < 0.05)
		{
			this.hitTheGround = true;
			this.posY = 0.05;
		}
	}
 };
 
 MyPlane.prototype.display = function()
 {
	 this.scene.pushMatrix();
	
	 	this.scene.translate(this.posX, this.posY, this.posZ);
	 	if(this.hitTheWall)
	 	{
	 		this.scene.rotate(90 * deg2rad, 0, 0, 1);
	 	}
	 	else
	 	{
	 		this.scene.rotate(-20 * deg2rad, 0, 0, 1);
	 	}
	 	this.buildPlane();
	 this.scene.popMatrix();
 };
 

