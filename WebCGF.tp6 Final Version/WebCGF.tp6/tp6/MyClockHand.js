 	/**
 * MyClockHand
 * @constructor
 */
 
var degToRad = Math.PI / 180.0;

function MyClockHand(scene, size)
 {
 	CGFobject.call(this,scene);
 	
 	this.angle = 0;
 	this.size = size || 1;
 	
 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;
 
 MyClockHand.prototype.initBuffers = function()
 {
	this.vertices =
	[
	0.02, 0, 0,
	-0.02, 0, 0,
	0.02, this.size, 0,       
	-0.02, this.size, 0,
	];

	this.indices =
	[
	 2, 1, 0,
	 2, 3, 1,     
	 ];
	
 	this.normals =
 	[
	0,0,1,
	0,0,1,
	0,0,1,
	0,0,1
	];
 	
 	this.texCoords = 
 	 [
 	 1, 0,
 	 1, 1,
 	 0, 0,
 	 0, 1
 	 ];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 
 MyClockHand.prototype.setAngle = function(angle)
 {
	 this.angle = angle;
 };
 
 MyClockHand.prototype.display = function()
 {
	 this.scene.pushMatrix();
	 	this.scene.rotate(-this.angle * degToRad,0,0,1);
	 	this.drawElements(this.primitiveType);
	 this.scene.popMatrix();
 };

 
