/**
 * MyGlobe
 * @constructor
 */
 
var deg2rad=Math.PI/180.0;

function MyGlobe(scene, posX, posY, posZ)
 {
 	CGFobject.call(this,scene);

 	this.sphere = new MySemiSphere(this.scene,20,20);
 	this.cylinder = new MyCylinderWithTops(this.scene,20,20);
 	
 	this.angle = 0;
 	this.lastTime = 0;
 	
 	this.initBuffers();
 };

 MyGlobe.prototype = Object.create(CGFobject.prototype);
 MyGlobe.prototype.constructor = MyGlobe;

 MyGlobe.prototype.buildGlobe = function()
 {
	 this.scene.pushMatrix();
		 
	 	 this.scene.rotate(this.angle,0,1,0);
	 	 
	 	 this.scene.worldMapAppearance2.apply();
		 this.scene.pushMatrix();
		 this.scene.rotate(deg2rad * 90, 1, 0 ,0);
		 this.sphere.display();
		 this.scene.popMatrix();
		 
		 this.scene.worldMapAppearance1.apply();
		 this.scene.pushMatrix();
		 this.scene.rotate(deg2rad * -90, 1, 0 ,0);
		 this.sphere.display();
		 this.scene.popMatrix();
		
	 this.scene.popMatrix();
	 
	 this.scene.woodAppearance.apply();
	 
	 this.scene.pushMatrix(); 
	 this.scene.translate(0,-2,0);
	 this.scene.scale(1/6, 2, 1/6);
	 this.scene.rotate(deg2rad * 90, 1, 0 ,0);
	 this.cylinder.display();
	 this.scene.popMatrix();

	 this.scene.pushMatrix(); 
	 this.scene.translate(0,-2,0);
	 this.scene.scale(1, 1/6, 1);
	 this.scene.rotate(deg2rad * 90, 1, 0 ,0);
	 this.cylinder.display();
	 this.scene.popMatrix();
	 
 };

 MyGlobe.prototype.update = function(currTime)
 {
	 if(this.lastTime == 0)
     {
		 this.lastTime = currTime;
		 return;
	}
		
	var deltaTime = currTime - this.lastTime;
	this.lastTime = currTime;
	
	this.angle += deltaTime/1000 * 90 * degToRad ;
		
 };
 
 MyGlobe.prototype.display = function()
 {
	 this.scene.pushMatrix();
	 	this.buildGlobe();
	 this.scene.popMatrix();
 };
 

