/**
 * MySemiSphereWithGround
 * @constructor
 */
 function MySemiSphereWithGround(scene, slices, stacks)
 {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	
	this.semiSphere = new MySemiSphere(this.scene, this.slices, this.stacks);
	this.circle = new MyCircle(this.scene, this.slices);

 	this.initBuffers();
 };

 MySemiSphereWithGround.prototype = Object.create(CGFobject.prototype);
 MySemiSphereWithGround.prototype.constructor = MyCylinderWithTops;

 MySemiSphereWithGround.prototype.display = function() {
	 
	 MySemiSphereWithGround.prototype.display = function()
	 {
	    var degToRad = Math.PI / 180.0;
	     
	    this.scene.pushMatrix();
	    this.scene.rotate(90 * degToRad, -1, 0, 0);
	    this.semiSphere.display();
	    this.scene.popMatrix();
	   
	    this.scene.pushMatrix();
	    this.scene.rotate(90 * degToRad, 1, 0, 0);
	    this.circle.display();
	    this.scene.popMatrix();
	 };
 };
 

