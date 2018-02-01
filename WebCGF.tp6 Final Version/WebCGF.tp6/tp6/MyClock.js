/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks)
 {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	
	this.CWT = new MyCylinderWithTops(this.scene, this.slices, this.stacks);
	this.Horas = new MyClockHand(this.scene, 0.8);
	this.Minutos = new MyClockHand(this.scene, 0.6);
	this.Segundos = new MyClockHand(this.scene, 0.5);

	this.Horas.setAngle(105.375);
	this.Minutos.setAngle(184.5);
	this.Segundos.setAngle(270);
	
	this.lastTime = 0;
	
 	this.initBuffers();
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyCylinderWithTops;

 MyClock.prototype.update = function(currTime, isPaused)
 {
	if((this.lastTime == 0) || isPaused)
	{
		 this.lastTime = currTime;
		 return;
	}
	
	var deltaTime = currTime - this.lastTime;
	this.lastTime = currTime;
	
	var newAngle;
	
	newAngle = this.Segundos.angle + deltaTime/1000 * (360/60);
	this.Segundos.setAngle(newAngle);
	
	newAngle = this.Minutos.angle + deltaTime/(1000*60) * (360/60);
	this.Minutos.setAngle(newAngle);
	
	newAngle = this.Horas.angle + deltaTime/(1000*60*60) * (360/12);
	this.Horas.setAngle(newAngle);
	
	if(this.Segundos.angle >= 360)
		this.Segundos.angle -= 360;
	
	if(this.Minutos.angle >= 360)
		this.Minutos.angle -= 360;
	
	if(this.Horas.angle >=360)
		this.Horas -= 360;
	
	return;
 };
 
 MyClock.prototype.display = function()
 {
	 this.scene.blackAppearance.apply();
	 
		this.scene.pushMatrix();
	 		this.scene.translate(0, 0, -1);
	 		this.CWT.cylinder.display();
	 	this.scene.popMatrix();
	 	
	 	this.scene.clockAppearance.apply();
	 	
	 	this.scene.pushMatrix();
	 		this.scene.translate(0, 0, 0);
	 		this.CWT.circle.display();
	 	this.scene.popMatrix();
	 
	 	this.scene.materialDefault.apply();
	 	
	 	this.scene.pushMatrix();
	 		this.scene.translate(0, 0, -1);
	 		this.scene.rotate(Math.PI, 0, 1, 0);
	 		this.CWT.circle.display();
	 	this.scene.popMatrix();
	 	
	 	this.scene.blackAppearance.apply();
	 	
	 	this.scene.pushMatrix();
	 		this.scene.translate(0,0,0.1);
	 		this.Horas.display();
	 	this.scene.popMatrix();
	 	
	 	this.scene.pushMatrix();
	 		this.scene.translate(0,0,0.1);
 			this.Minutos.display();
 		this.scene.popMatrix();
 	
 		this.scene.pushMatrix();
 			this.scene.translate(0,0,0.1);
 			this.Segundos.display();
		this.scene.popMatrix();
 };
 

