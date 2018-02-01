/**
 * MyHook
 * @constructor
 */
 
var deg2rad=Math.PI/180.0;

function MyHook(scene)
 {
 	CGFobject.call(this,scene);

 	this.cube = new MyUnitCubeQuad(this.scene);
 	this.cylinder = new MyCylinderWithTops(this.scene, 3 , 20);
 	this.sphere = new MySemiSphereWithGround(this.scene, 20, 20);
 	
 	/* Variável que vai controlar a posição do gancho de acordo com o tamanho do cabo */
 	this.topPartScale = 3;
 	
 	this.initBuffers();
 };

 MyHook.prototype = Object.create(CGFobject.prototype);
 MyHook.prototype.constructor = MyHook;

 MyHook.prototype.buildHook = function()
 {
	
	 this.scene.pushMatrix();
	 
	 	this.scene.translate(0,-this.topPartScale*0.5,0);
	 	
	 	 /* Cabo do gancho */
	 	 this.scene.pushMatrix();
		 this.scene.scale(1/6,this.topPartScale, 1/6);
		 this.scene.rotate(deg2rad * -90, 1, 0, 0);
		 this.scene.translate(0,0,0.5);
		 this.cylinder.display();
		 this.scene.popMatrix();
		 
		 /* Esfera que separa cabo do gancho */
		 this.scene.pushMatrix();
		 this.scene.translate(0,-1/2*this.topPartScale,0);
		 this.scene.scale(1/4,1/4, 1/4);
		 this.sphere.display();
		 this.scene.popMatrix();
	 	
		/* Gancho -> Parte da esquerda */
		this.scene.pushMatrix();
		this.scene.translate(0,-(0.5*this.topPartScale)-0.5,0);
		this.scene.scale(1/6,1, 1/6);
		this.cube.display();
		this.scene.popMatrix();
			 
		/* Gancho -> Parte de baixo */
		this.scene.pushMatrix();
		this.scene.translate((2/3)*0.5,(-0.5+(1/6)*0.5)-(0.5*this.topPartScale)-0.5,0);
		this.scene.scale(2/3, 1/6, 1/6);
		this.cube.display();
		this.scene.popMatrix();
			
		/* Gancho -> Parte da direita */
		this.scene.pushMatrix();
		this.scene.translate(0.5+(1/6)*0.5,(-0.5+(1/4))-(0.5*this.topPartScale)-0.5,0);
		this.scene.scale(1/6, 1/4, 1/6);
		this.cube.display();
		this.scene.popMatrix();
		
	 this.scene.popMatrix();
 };
 
 MyHook.prototype.display = function()
 {
	 this.scene.pushMatrix();
	 	this.buildHook();
	 this.scene.popMatrix();
 };
 

