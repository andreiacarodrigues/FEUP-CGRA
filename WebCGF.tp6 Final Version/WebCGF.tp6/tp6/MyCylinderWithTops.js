/**
 * MyCylinderWithTops
 * @constructor
 */
 function MyCylinderWithTops(scene, slices, stacks)
 {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	
	 this.cylinder = new MyCylinder(this.scene, this.slices, this.stacks);
	 this.circle = new MyCircle(this.scene, this.slices);

 	this.initBuffers();
 };

 MyCylinderWithTops.prototype = Object.create(CGFobject.prototype);
 MyCylinderWithTops.prototype.constructor = MyCylinderWithTops;

 MyCylinderWithTops.prototype.display = function()
 {
	 
		this.scene.pushMatrix();
	 	this.scene.translate(0, 0, -1);
	 	this.cylinder.display();
	 	this.scene.popMatrix();
	 	
	 	this.scene.pushMatrix();
	 	this.scene.translate(0, 0, 0);
	 	this.circle.display();
	 	this.scene.popMatrix();
	 
	 	this.scene.pushMatrix();
	 	this.scene.translate(0, 0, -1);
	 	this.scene.rotate(Math.PI, 0, 1, 0);
	 	this.scene.rotate(Math.PI, 0, 0, 1);
	 	this.circle.display();
	 	this.scene.popMatrix();
 };
 

