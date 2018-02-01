/**
 * MyBox
 * @constructor
 */
 
var deg2rad=Math.PI/180.0;

function MyBox(scene, posX, posY, posZ)
 {
 	CGFobject.call(this,scene);

 	this.cube = new MyUnitCubeQuad(this.scene);
 	this.posX = posX;
 	this.posY = posY;
 	this.posZ = posZ;
 	
 	this.initBuffers();
 };

 MyBox.prototype = Object.create(CGFobject.prototype);
 MyBox.prototype.constructor = MyBox;

 MyBox.prototype.getPositionX = function()
 {
	 return this.posX;
 };
 
 MyBox.prototype.getPositionY = function()
 {
	 return this.posY + 0.5 * 0.6 + 0.5 * 0.05;
 };
 
 MyBox.prototype.getPositionZ = function()
 {
	 return this.posZ;
 };
 
 MyBox.prototype.buildBox = function()
 {
	 this.scene.pushMatrix();
	 this.scene.translate(this.posX, this.posY, this.posZ);
	 
	 if(this.scene.hooked)
		 this.scene.boxHookedAppearance.apply();
	 else
		 this.scene.boxAppearance.apply();
	 
	 /* Caixa */
	 this.scene.pushMatrix();
	 this.scene.scale(1,0.6,1);
	 this.cube.display();
	 this.scene.popMatrix();
	 this.scene.hookBoxAppearance.apply();
	 
	 /* Pega */
	 this.scene.pushMatrix();
	 this.scene.translate(0, 0.5 * 0.6 + 0.5 * 0.05, 0);
	 this.scene.scale(0.2,0.05,0.2);
	 this.cube.display();
	 this.scene.popMatrix();
	 
	 this.scene.popMatrix();
 };
 
 MyBox.prototype.display = function()
 {
	 this.scene.pushMatrix();
	 	this.buildBox();
	 this.scene.popMatrix();
 };
 

