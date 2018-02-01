/**
 * MyLandingSite
 * @constructor
 */
 
var deg2rad=Math.PI/180.0;

function MyLandingSite(scene, posX, posY, posZ)
 {
 	CGFobject.call(this,scene);

 	this.quad = new MyQuad(this.scene);
 	this.posX = posX;
 	this.posY = posY;
 	this.posZ = posZ;
 	
 	this.initBuffers();
 };

 MyLandingSite.prototype = Object.create(CGFobject.prototype);
 MyLandingSite.prototype.constructor = MyBox;

 MyLandingSite.prototype.getPositionX = function()
 {
	 return this.posX;
 };
 
 MyLandingSite.prototype.getPositionY = function()
 {
	 return this.posY + 0.325;
 };
 
 MyLandingSite.prototype.getPositionZ = function()
 {
	 return this.posZ;
 };
 
 MyLandingSite.prototype.display = function()
 {
	 this.scene.pushMatrix();
	 	this.scene.landingSiteAppearance.apply();
	 	this.scene.translate(this.posX, this.posY, this.posZ);
	 	this.scene.scale(2,0,2);
	 	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	 	this.quad.display();
	 this.scene.popMatrix();
 };
 

