/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks)
 {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];
 	
 	var ang = 0;
 	var angAux = (2*Math.PI)/this.slices;
 	
 	var x = 0;
 	
 	for(var j = 0; j < this.stacks; j++)
 	{
	 	for(var i = 0; i < this.slices; i++)
	 	{
	 		this.vertices.push(Math.cos(ang), Math.sin(ang), x);
	 		this.vertices.push(Math.cos(ang), Math.sin(ang), x+(1/(this.stacks)));
	 			
	 		this.normals.push(Math.cos(ang+(angAux/2)), Math.sin(ang+(angAux/2)), 0);
	 		this.normals.push(Math.cos(ang+(angAux/2)), Math.sin(ang+(angAux/2)), 0);
	 		
	 		ang = ang + angAux;
	 		
	 		this.vertices.push(Math.cos(ang), Math.sin(ang), x);
	 		this.vertices.push(Math.cos(ang), Math.sin(ang), x+(1/(this.stacks)));
	 			
	 		this.normals.push(Math.cos(ang-(angAux/2)), Math.sin(ang-(angAux/2)), 0);
	 		this.normals.push(Math.cos(ang-(angAux/2)), Math.sin(ang-(angAux/2)), 0);
	 		
	 		var start = 4 * i + j * 4 * this.slices;
	 		
	 		this.indices.push(start+2, start+1, start);
	 		this.indices.push(start+3, start+1, start+2);	
	 			
	 	}
	 	
	 	ang = 0;
	 	x = x+(1/(this.stacks));
 	}
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
