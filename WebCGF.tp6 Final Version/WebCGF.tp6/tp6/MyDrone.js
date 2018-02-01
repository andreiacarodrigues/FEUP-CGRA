 /**
 * MyDrone
 * @constructor
 */

var deg2rad=Math.PI/180.0;

 function MyDrone(scene, posX, posY, posZ)
 {
 	CGFobject.call(this,scene);
 	
 	/* Movement variables */
 	this.angle = 0;
 	this.xOffset = posX;
 	this.yOffset = posY;
 	this.zOffset = posZ;
 	
 	this.rotatingLeft = false;
 	this.rotatingRight = false;
 	
 	this.goingUp = false;
 	this.goingDown = false;
 	
 	this.movementSpeed = 5;
 	this.animationRotation = 0;
 	this.animationRotationSpeed = 10 * degToRad;
 	
 	// Time Control
 	this.lastTime = 0;
 	
 	// Helice Rotation
 	this.lento = 72;
 	this.normal = 360;
 	this.rapido = 3600;
 	
 	this.movingFront = false;
 	this.movingBack = false;
 	this.rotating = false;
 	
 	this.heliceOneRotation = deg2rad * 90;
 	this.heliceTwoRotation = deg2rad * 90;
 	this.heliceThreeRotation = 0;
 	this.heliceFourRotation = 0;
 	
 	// Hook Control
 	this.hookUp = false;
 	this.hookDown = false;
 	
 	/* Drone construction variables */
	this.cylinder = new MyCylinderWithTops(this.scene,20, 20);
	this.sphere = new MySemiSphereWithGround(this.scene, 20, 20);
	this.curve = new MyCurve(this.scene);
	this.cube = new MyUnitCubeQuad(this.scene);
	this.hook = new MyHook(this.scene);
	
	/* Appearances */
	this.appCilindrosMeio = new CGFappearance(this);
	this.appCilindrosHelices = new CGFappearance(this);
	this.appSemiesferaCentral = new CGFappearance(this);
	this.appHelices = new CGFappearance(this);
	this.appPernas = new CGFappearance(this);
	
 	this.initBuffers();
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;
 
 MyDrone.prototype.updateAppearance = function(appearanceNumber)
 {
	 this.appCilindrosMeio = this.scene.droneAppearanceList[appearanceNumber][0];
	 this.appCilindrosHelices = this.scene.droneAppearanceList[appearanceNumber][1];
	 this.appSemiesferaCentral = this.scene.droneAppearanceList[appearanceNumber][2];
	 this.appHelices = this.scene.droneAppearanceList[appearanceNumber][3];
	 this.appPernas = this.scene.droneAppearanceList[appearanceNumber][4];
 };
 
 MyDrone.prototype.getHookPositionX = function()
 {
	 return this.xOffset;
 };
 
 MyDrone.prototype.getHookPositionY = function()
 {
	 return this.yOffset - this.hook.topPartScale * 0.6 - 0.7;
 };
 
 MyDrone.prototype.getHookPositionZ = function()
 {
	 return this.zOffset;
 };
 
 MyDrone.prototype.update = function(currTime)
 {
		if(this.lastTime == 0)
		{
			 this.lastTime = currTime;
			 return;
		}
		
		var deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;
		
		// Helices Update
		
		if((this.movingFront) && (this.movingBack))
		{
			this.heliceOneRotation = this.heliceOneRotation + deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
			this.heliceTwoRotation = this.heliceTwoRotation + deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
		}	
		else if(this.movingFront)
		{
			this.heliceOneRotation = this.heliceOneRotation + deltaTime/1000 * deg2rad * this.rapido * this.scene.speedHelices;
			this.heliceTwoRotation = this.heliceTwoRotation + deltaTime/1000 * deg2rad * this.lento * this.scene.speedHelices;
		}
		else if(this.movingBack)
		{
			this.heliceOneRotation = this.heliceOneRotation + deltaTime/1000 * deg2rad * this.lento * this.scene.speedHelices;
			this.heliceTwoRotation = this.heliceTwoRotation + deltaTime/1000 * deg2rad * this.rapido * this.scene.speedHelices;
		}
		
		if((!this.movingFront) && (!this.movingBack) && (!this.rotatingLeft) && (!this.rotatingRight))
		{
			this.heliceOneRotation = this.heliceOneRotation + deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
			this.heliceTwoRotation = this.heliceTwoRotation + deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
		}
		
		if((this.rotatingLeft) && (this.rotatingRight))
		{
			this.heliceThreeRotation = this.heliceThreeRotation - deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
			this.heliceFourRotation = this.heliceFourRotation - deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
			
			if((!this.movingFront) && (!this.movingBack))
			{
				this.heliceOneRotation = this.heliceOneRotation + deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
				this.heliceTwoRotation = this.heliceTwoRotation + deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
			}
		}
		else if(this.rotatingLeft)
		{
			this.heliceThreeRotation = this.heliceThreeRotation - deltaTime/1000 * deg2rad * this.rapido * this.scene.speedHelices;
			this.heliceFourRotation = this.heliceFourRotation - deltaTime/1000 * deg2rad * this.rapido * this.scene.speedHelices;
			
			if((!this.movingFront) && (!this.movingBack))
			{
				this.heliceOneRotation = this.heliceOneRotation + deltaTime/1000 * deg2rad * this.lento * this.scene.speedHelices;
				this.heliceTwoRotation = this.heliceTwoRotation + deltaTime/1000 * deg2rad * this.lento * this.scene.speedHelices;
			}
		}
		else if(this.rotatingRight)
		{
			this.heliceThreeRotation = this.heliceThreeRotation - deltaTime/1000 * deg2rad * this.lento * this.scene.speedHelices;
			this.heliceFourRotation = this.heliceFourRotation - deltaTime/1000 * deg2rad * this.lento * this.scene.speedHelices;
			
			if((!this.movingFront) && (!this.movingBack))
			{
				this.heliceOneRotation = this.heliceOneRotation + deltaTime/1000 * deg2rad * this.rapido * this.scene.speedHelices;
				this.heliceTwoRotation = this.heliceTwoRotation + deltaTime/1000 * deg2rad * this.rapido * this.scene.speedHelices;
			}
		}
		else
		{	
			this.heliceThreeRotation = this.heliceThreeRotation - deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
			this.heliceFourRotation = this.heliceFourRotation - deltaTime/1000 * deg2rad * this.normal * this.scene.speedHelices;
		}
		
		// Movement Update
		
		if(this.movingFront)
		{
			this.xOffset = this.xOffset + deltaTime/1000 * (this.movementSpeed * Math.sin(this.angle));
			this.zOffset = this.zOffset + deltaTime/1000 * (this.movementSpeed * Math.cos(this.angle));
			
			if(this.animationRotation < (20 * degToRad))
			{
				this.animationRotation = this.animationRotation + deltaTime/1000 * this.animationRotationSpeed;
			}
		}
		
		if(!this.movingFront)
		{
			if(this.animationRotation > 0)
			{
				this.animationRotation = this.animationRotation - deltaTime/1000 * this.animationRotationSpeed;
				this.xOffset = this.xOffset + deltaTime/1000 * (this.movementSpeed / 5 * Math.sin(this.angle));
				this.zOffset = this.zOffset + deltaTime/1000 * (this.movementSpeed / 5 * Math.cos(this.angle));
			}
		}
		
		if(this.movingBack)
		{
			this.xOffset = this.xOffset - deltaTime/1000 * (this.movementSpeed * Math.sin(this.angle));
			this.zOffset = this.zOffset - deltaTime/1000 * (this.movementSpeed * Math.cos(this.angle));
			
			if(this.animationRotation > (-20 * degToRad))
			{
				this.animationRotation = this.animationRotation - deltaTime/1000 * this.animationRotationSpeed;
			}
		}
		
		if(!this.movingBack)
		{
			if(this.animationRotation < 0)
			{
				this.animationRotation = this.animationRotation + deltaTime/1000 * this.animationRotationSpeed;
				this.xOffset = this.xOffset - deltaTime/1000 * (this.movementSpeed / 5 * Math.sin(this.angle));
				this.zOffset = this.zOffset - deltaTime/1000 * (this.movementSpeed / 5 * Math.cos(this.angle));
			}
		}
		
		// Rotation
		if(this.rotatingRight)
		{
			this.angle -= deltaTime/1000 * 180 * degToRad ;
		}
		
		if(this.rotatingLeft)
		{
			this.angle += deltaTime/1000 * 180 * degToRad;
		}
		
		// Up and Down
		if(this.goingUp)
		{
			this.yOffset += deltaTime/1000 * 3;
		}
		
		if(this.goingDown)
		{
			this.yOffset -= deltaTime/1000 * 3;
		}
		
		// Hook
		
		if(this.hookUp)
		{
			if(this.hook.topPartScale > 0)
				this.hook.topPartScale -= deltaTime/1000 * 10;
			else
				this.hook.topPartScale = 0;
		}
		
		if(this.hookDown)
		{
			if(this.hook.topPartScale < 5)
				this.hook.topPartScale += deltaTime/1000 * 10;
			else
				this.hook.topPartScale = 5;
		}
 };
 
 MyDrone.prototype.buildDrone = function()
 { 	
	/* ----------------------------- Aplicação appearance nº1 --------------------------- */
	this.appCilindrosMeio.apply();
	
	// Cilindro 1 base - no eixo zz
	this.scene.pushMatrix();
	this.scene.translate(0,0,2.5);
	this.scene.scale(1/8, 1/8, 5);
	this.cylinder.display();
	this.scene.popMatrix();

	// Cilindro 2 base - no eixo xx
	this.scene.pushMatrix();
	this.scene.translate(2.5,0,0);
	this.scene.rotate(deg2rad * 90, 0, 1, 0);
	this.scene.scale(1/8, 1/8, 5);
	this.cylinder.display();
	this.scene.popMatrix();
	
	
	/* ----------------------------- Aplicação appearance nº2 --------------------------- */
	
	this.appCilindrosHelices.apply();
	
	// Cilindro 1 Helices - Sentido negativo eixo zz
	this.scene.pushMatrix();
	this.scene.translate(0,-1/6,-2.5);
	this.scene.rotate(deg2rad * 90, 1, 0, 0);
	this.scene.scale(1/4, 1/4, 1/3);
	this.cylinder.display();
	this.scene.popMatrix();
	 	
	// Esfera 1 Helices - Sentido negativo eixo zz
	this.scene.pushMatrix();
	this.scene.translate(0,1/5-0.1,-2.5);
	this.scene.scale(1/4,1/4,1/4);
	//this.scene.rotate(-deg2rad * 90, 1, 0, 0);
	this.sphere.display();
	this.scene.popMatrix();
	
	// Cilindro 2 Helices - Sentido positivo eixo zz
	this.scene.pushMatrix();
	this.scene.translate(0,-1/6,2.5);
	this.scene.rotate(deg2rad * 90, 1, 0, 0);
	this.scene.scale(1/4, 1/4, 1/3);
	this.cylinder.display();
	this.scene.popMatrix();
	
	// Esfera 2 Helices - Sentido positivo eixo zz
	this.scene.pushMatrix();
	this.scene.translate(0,1/5-0.1,2.5);
	this.scene.scale(1/4,1/4,1/4);
	this.sphere.display();
	this.scene.popMatrix();
	
	// Cilindro 3 Helices - Sentido positivo eixo xx
	this.scene.pushMatrix();
	this.scene.translate(2.5,-1/6,0);
	this.scene.rotate(deg2rad * 90, 1, 0, 0);
	this.scene.scale(1/4, 1/4, 1/3);
	this.cylinder.display();
	this.scene.popMatrix();
	
	// Esfera 3 Helices - Sentido positivo eixo xx
	this.scene.pushMatrix();
	this.scene.translate(2.5,1/5-0.1,0);
	this.scene.scale(1/4,1/4,1/4);
	this.sphere.display();
	this.scene.popMatrix();
	
	 // Cilindro 4 Helices - Sentido negativo eixo xx
	this.scene.pushMatrix();
	this.scene.translate(-2.5,-1/6,0);
	this.scene.rotate(deg2rad * 90, 1, 0, 0);
	this.scene.scale(1/4, 1/4, 1/3);
	this.cylinder.display();
	this.scene.popMatrix();
	
	// Esfera  4 Helices - Sentido negativo eixo xx
	this.scene.pushMatrix();
	this.scene.translate(-2.5,1/5-0.1,0);
	this.scene.scale(1/4,1/4,1/4);
	this.sphere.display();
	this.scene.popMatrix();
	
	
	/* ----------------------------- Aplicação appearance nº3 --------------------------- */
	
	this.appHelices.apply();
	
	// Helices 1 - Sentido negativo eixo zz
	this.scene.pushMatrix();
	this.scene.translate(0 ,0,-2.5);
	this.scene.rotate(this.heliceOneRotation, 0, 1, 0);
	this.scene.scale(1/6, 1/22, 2.2);
	this.scene.translate(0,0,0.5);
	this.cylinder.display();
	this.scene.popMatrix();
	
	// Helices 2 - Sentido positivo eixo zz
	this.scene.pushMatrix();
	this.scene.translate(0,0,2.5);
	this.scene.rotate(this.heliceTwoRotation, 0, 1, 0);
	this.scene.scale(1/6, 1/22, 2.2);
	this.scene.translate(0,0,0.5);
	this.cylinder.display();
	this.scene.popMatrix();
	 	
	// Helices 3 - Sentido positivo eixo xx
	this.scene.pushMatrix();
	this.scene.translate(2.5,0,0);
	this.scene.rotate(this.heliceThreeRotation, 0, 1, 0);
	this.scene.scale(1/6, 1/22, 2.2);
	this.scene.translate(0,0,0.5);
	this.cylinder.display();
	this.scene.popMatrix();
	 	
	// Helices 4 - Sentido negativo eixo xx
	this.scene.pushMatrix();
	this.scene.translate(-2.5,0,0);
	this.scene.rotate(this.heliceFourRotation, 0, 1, 0);
	this.scene.scale(1/6, 1/22, 2.2);
	this.scene.translate(0,0,0.5);
	this.cylinder.display();
	this.scene.popMatrix();
	 	
	
	/* ----------------------------- Aplicação appearance nº4 --------------------------- */
	
	this.appSemiesferaCentral.apply();
	
	// Esfera Central
	this.scene.pushMatrix();
	this.scene.translate(0,-0.15,0);
	this.scene.rotate(deg2rad * 90, 0, 1, 0); // para a appearance ficar no sitio certo
	this.sphere.display();
	this.scene.popMatrix();
	 
	
	/* ----------------------------- Aplicação appearance nº5 --------------------------- */
	
	this.appPernas.apply();
	
	// Parabólica lado frente esquerda
	this.scene.pushMatrix();
	this.scene.translate(1.55,-1.65,0.5);
	this.scene.rotate(-deg2rad * 90, 0, 1, 0);
	this.scene.scale(0.13, 3, 3);
	this.curve.display();
	this.scene.popMatrix();
	 	
	// Parabólica lado trás direita
	this.scene.pushMatrix();
	this.scene.translate(1.55,-1.65,-0.5);
	this.scene.rotate(-deg2rad * 90, 0, 1, 0);
	this.scene.scale(0.13, 3, 3);
	this.curve.display();
	this.scene.popMatrix();
	 	
	// Base lado frente 
	this.scene.pushMatrix();
	this.scene.translate(1.55,-1.65,0);
	this.scene.scale(0.1, 0.1, 3);
	this.cube.display();
	this.scene.popMatrix();
	
	// Parabólica lado frente esquerda
	this.scene.pushMatrix();
	this.scene.translate(-1.55,-1.65,0.5);
	this.scene.rotate(deg2rad * 90, 0, 1, 0);
	this.scene.scale(0.13, 3, 3);
	this.curve.display();
	this.scene.popMatrix();
	 	
	// Parabólica lado trás esquerda
	this.scene.pushMatrix();
	this.scene.translate(-1.55,-1.65,-0.5);
	this.scene.rotate(deg2rad * 90, 0, 1, 0);
	this.scene.scale(0.13, 3, 3);
	this.curve.display();
	this.scene.popMatrix();
	 	
	// Base lado trás 
	this.scene.pushMatrix();
	this.scene.translate(-1.55,-1.65,0);
	this.scene.scale(0.1, 0.1, 3);
	this.cube.display();
	this.scene.popMatrix();
	
	// Gancho
	this.scene.pushMatrix();
	this.scene.translate(0,-0.5+(0.6*0.5),0);
	this.scene.scale(0.6, 0.6, 0.6);
	this.scene.rotate(-this.animationRotation,1,0,0);
	this.hook.display();
	this.scene.popMatrix();
 };
 
 MyDrone.prototype.display = function()
 {
	 this.scene.pushMatrix();
		this.scene.translate(this.xOffset, this.yOffset, this.zOffset);
	 	this.scene.rotate(this.angle,0,1,0);
	 	this.scene.rotate(this.animationRotation,1,0,0);
	 	this.buildDrone();
	 this.scene.popMatrix();
 };
