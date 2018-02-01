/**
 * MyCircle
 * @constructor
 */
 function MyCircle(scene, slices)
 {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function()
 {
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];
 	
 	var ang = 0;
 	var angAux = (2*Math.PI)/this.slices;
 	
 	this.vertices.push(0, 0, 0);
 	this.normals.push(0, 0, 1);
 	this.texCoords.push(0.5,0.5);
 	
 	for(var i = 0; i < this.slices; i++)
 	{
 		this.vertices.push(Math.cos(ang), Math.sin(ang), 0);
 		this.normals.push(0, 0, 1);
 		this.texCoords.push(Math.cos(ang) * 0.5 + 0.5, -Math.sin(ang) * 0.5 + 0.5);
 		
 		ang = ang + angAux;
 	}
 	
 	for(var i = 0; i < this.slices; i++)
 	{
 		if(i != this.slices - 1)
 			this.indices.push(0, i + 1, i + 2);
 		else
 			this.indices.push(0, i + 1, 1);
 	}
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 

