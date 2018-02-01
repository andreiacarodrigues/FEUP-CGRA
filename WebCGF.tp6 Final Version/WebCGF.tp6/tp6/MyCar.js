/**
 * MyCar
 * @constructor
 */
 
var deg2rad=Math.PI/180.0;

function MyCar(scene, posX, posY, posZ)
 {
 	CGFobject.call(this,scene);

 	this.cube = new MyUnitCubeQuad(this.scene);
 	this.CWT = new MyCylinderWithTops(this.scene,20,20);
 	this.quad = new MyQuad(this.scene);
 	
 	this.posX = posX;
 	this.posY = posY;
 	this.posZ = posZ;
 	
 	this.angle = 0;
 	this.carAngle = 90;
 	this.toRotate = 0;
 	this.movementSpeed = 2;
 	this.lastTime = 0;
 	
 	this.startRotating = false;
 	
 	this.initBuffers();
 };

 MyCar.prototype = Object.create(CGFobject.prototype);
 MyCar.prototype.constructor = MyCar;

 MyCar.prototype.getPositionX = function()
 {
	 return this.posX;
 };
 
 MyCar.prototype.getPositionY = function()
 {
	 return this.posY;
 };
 
 MyCar.prototype.getPositionZ = function()
 {
	 return this.posZ;
 };
 
 MyCar.prototype.update = function(currTime)
 {
	 if(this.lastTime == 0)
     {
		 this.lastTime = currTime;
		 return;
	}
		
	var deltaTime = currTime - this.lastTime;
	this.lastTime = currTime;
	
	// Prevents sudden moves when minimizing the window
	if(deltaTime > 100)
	{
		this.lastTime = currTime;
		return;
	}
	
	console.log(deltaTime);
	
	// Wheels
	this.angle += deltaTime/1000 * 90 * degToRad ;
	
	// Movement
	
	this.posX = this.posX + deltaTime/1000 * (this.movementSpeed * Math.sin(this.carAngle * degToRad));
	this.posZ = this.posZ + deltaTime/1000 * (this.movementSpeed * Math.cos(this.carAngle * degToRad));
	
	// Rotating
	if(this.startRotating)
	{
		this.carAngle -= deltaTime/1000 * 10;
	}
	
	// Trigger
	if(this.posX > 15)
	{
		this.startRotating = true;
	}
 };
 
 MyCar.prototype.buildCar = function()
 {
	 
	 //----------------------------------- Corpo do carro -----------------------------------------
	 
	 this.scene.carRedAppearance.apply();
	
    /* Parte de cima */
	 
	 this.scene.pushMatrix();
		 
		this.scene.translate(-0.2,0.4,0);
		this.scene.scale(1.4, 0.5, 0.8);
		 
		this.scene.carBackAppearance.apply();
		
		// front face
	 	this.scene.pushMatrix();
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	 	
	 	// back face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(180 * degToRad, 1, 0, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	 	this.scene.carRedAppearance.apply();
	 	
	 	// top face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	
	 	// back face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(90 * degToRad, 1, 0, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	 	
	 	this.scene.carRedAppearance.apply();

	 	// right face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(-90 * degToRad, 0, 1, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	 	
	 	this.scene.carFrontTopAppearance.apply();
	 	
	 	// left face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(90 * degToRad, 0, 1, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
 	
 	this.scene.popMatrix();
 	
	 
	 /* Parte de baixo */
 	
 	this.scene.pushMatrix();
 		this.scene.scale(2, 0.5, 1);
 	
	 	this.scene.carRedAppearance.apply();
	 	
	    // front face
	 	this.scene.pushMatrix();
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	
	 	// back face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(180 * degToRad, 1, 0, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	
	 	// top face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	
	 	// back face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(90 * degToRad, 1, 0, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	 	
		this.scene.carFrontAppearance.apply();
	 	
	 	// right face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(-90 * degToRad, 0, 1, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
	
	 	// left face
	 	this.scene.pushMatrix();
	 	this.scene.rotate(90 * degToRad, 0, 1, 0);
	 	this.scene.translate(0, 0, 0.5);
	 	this.quad.display();
	 	this.scene.popMatrix();
 	
	 this.scene.popMatrix();
	 
//----------------------------------------- Rodas ----------------------------------------------
 	
	 	/* Roda da Frente Esquerda */
	this.scene.blackAppearance.apply();
	 	
	 this.scene.pushMatrix();
	   
		this.scene.translate(0.4,-0.2,0.6);
		this.scene.scale(1/4, 1/4, 0.1);
		 this.scene.rotate(-this.angle,0,0,1);
				
		this.scene.pushMatrix();
			this.scene.translate(0, 0, -1);
			this.CWT.cylinder.display();
		this.scene.popMatrix();
			
		this.scene.carWheelsAppearance.apply();
			
		this.scene.pushMatrix();
			this.scene.translate(0, 0, 0);
			this.CWT.circle.display();
		this.scene.popMatrix();
		
		this.scene.blackAppearance.apply();
			
		this.scene.pushMatrix();
			this.scene.translate(0, 0, -1);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.CWT.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
		
		
	/* Roda de Trás Esquerda */
	this.scene.blackAppearance.apply();
	 	
	this.scene.pushMatrix();
	    this.scene.translate(-0.5,-0.2,0.6);
		this.scene.scale(1/4, 1/4, 0.1);
		 this.scene.rotate(-this.angle,0,0,1);
				
		this.scene.pushMatrix();
			this.scene.translate(0, 0, -1);
			this.CWT.cylinder.display();
		this.scene.popMatrix();
			
		this.scene.carWheelsAppearance.apply();
			
		this.scene.pushMatrix();
			this.scene.translate(0, 0, 0);
			this.CWT.circle.display();
		this.scene.popMatrix();
		
		this.scene.blackAppearance.apply();
			
		this.scene.pushMatrix();
			this.scene.translate(0, 0, -1);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.CWT.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
		
	/* Roda da Frente Direita */
	this.scene.blackAppearance.apply();
	 	
	this.scene.pushMatrix();
	 	this.scene.translate(0.4,-0.2,-0.5);
		this.scene.scale(1/4, 1/4, 0.1);
		this.scene.rotate(-this.angle,0,0,1);
			
	 	this.scene.pushMatrix();
			this.scene.translate(0, 0, -1);
			this.CWT.cylinder.display();
		this.scene.popMatrix();
			
		
		this.scene.blackAppearance.apply();
		this.scene.pushMatrix();
			this.scene.translate(0, 0, 0);
			this.CWT.circle.display();
		this.scene.popMatrix();
			
		this.scene.carWheelsAppearance.apply();
		this.scene.pushMatrix();
			this.scene.translate(0, 0, -1);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.CWT.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
		
	/* Roda de Trás Direita */
	 this.scene.blackAppearance.apply();
	 	
	this.scene.pushMatrix();
	 	this.scene.translate(-0.5,-0.2,-0.5);
		this.scene.scale(1/4, 1/4, 0.1);
		this.scene.rotate(-this.angle,0,0,1);
			
	 	this.scene.pushMatrix();
			this.scene.translate(0, 0, -1);
			this.CWT.cylinder.display();
		this.scene.popMatrix();
			
		this.scene.blackAppearance.apply();
			
		this.scene.pushMatrix();
			this.scene.translate(0, 0, 0);
			this.CWT.circle.display();
		this.scene.popMatrix();
		this.scene.carWheelsAppearance.apply();
	
			
		this.scene.pushMatrix();
			this.scene.translate(0, 0, -1);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.CWT.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
		
 };
 
 MyCar.prototype.display = function()
 {
	 this.scene.pushMatrix();
	    this.scene.translate(this.posX, this.posY, this.posZ);
	    this.scene.rotate((this.carAngle - 90) * degToRad, 0, 1, 0);
	 	this.buildCar();
	 this.scene.popMatrix();
 };
 

