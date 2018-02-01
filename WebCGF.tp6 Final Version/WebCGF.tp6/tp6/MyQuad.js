 	/**
 * MyQuad
 * @constructor
 */
 function MyQuad(scene, minS, maxS, minT, maxT)
 {
 	CGFobject.call(this,scene);
 	
 	// Texture Values
 	this.minS = minS || 0;
 	this.maxS = maxS || 1;
 	this.minT = minT || 0;
 	this.maxT = maxT || 1;
 	
 	this.initBuffers();
 };

 MyQuad.prototype = Object.create(CGFobject.prototype);
 MyQuad.prototype.constructor = MyQuad;

 MyQuad.prototype.initBuffers = function()
 {
	this.vertices =
	[
	0.5, 0.5, 0,
	0.5, -0.5, 0,
	-0.5, 0.5, 0,       
	-0.5, -0.5, 0,
	];

	this.indices =
	[
	 2, 1, 0,
	 2, 3, 1,     
	 ];
	
 	this.normals =
 	[
	0,0,1,
	0,0,1,
	0,0,1,
	0,0,1
	];
 	
 	this.texCoords = 
 	[
 	this.maxS, this.minT,
 	this.maxS, this.maxT,
 	this.minS, this.minT,
 	this.minS, this.maxT
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
