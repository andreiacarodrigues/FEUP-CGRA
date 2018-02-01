/**
 * MyLamp
 * @constructor
 */
 
var deg2rad=Math.PI/180.0;

function MyLamp(scene)
 {
 	CGFobject.call(this,scene);

 	this.sphere = new MySemiSphere(this.scene,20,20);
 	
 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;
 
 MyLamp.prototype.display = function()
 {
	 this.scene.lampAppearance.apply();
	 this.scene.pushMatrix();
	 this.scene.scale(1/2,1/2,1/2);
	 this.scene.rotate(deg2rad * 90, 1, 0, 0);
	 this.sphere.display();
	 this.scene.popMatrix();
 };
 

