/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks)
 {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function()
 {
 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];
 	
 	this.texCoords = [];
 	
 	// Horizontal Angles
 	var angHorizontal = 0;
 	var angHorizontalIncrement = (2*Math.PI)/this.slices;
 	
 	// Number of vertical divisions
 	var numberOfLevels = this.stacks + 1;
 	
 	// Height
 	var height = 0;
 	var heightIncrement = 1/(this.stacks);
 	
 	// Texture Coordinate S
 	var s = 1;
 	var sIncrement = - 1/(this.stacks);
 	
 	// Texture Coordinate T
 	var t = 0;
 	var tIncrement = 1/(this.slices);
 	
 	// Iterates through all the levels
 	for(var i = 0; i < numberOfLevels; i++)
 	{
 		// Iterates through all the slices of that level
 		for(var j = 0; j <= this.slices; j++)
 		{
 			// Adds the vertices
 			this.vertices.push(Math.cos(angHorizontal), Math.sin(angHorizontal), height);
 			
 			// Adds the normals
 			this.normals.push(Math.cos(angHorizontal), Math.sin(angHorizontal), 0);
 			
 			// Adds the texture coordinate
 			this.texCoords.push(t, s);
 			
 			// Increments the angle
 			angHorizontal = angHorizontal + angHorizontalIncrement;
 			
 			// Increments the t coordinate
 			t = t + tIncrement;
 		}
 		
 		// Increments the height
 		height = height + heightIncrement;
 		
 		// Resets the t coordinate
 		t = 0;
 		
 		// Increments the s texture
 		s = s + sIncrement;
 		
 		// Resets the angle
 		angHorizontal = 0;
 	}
 	
 	// Value where the triangle starts
 	var start;
 	
 	// Value it takes to go up a level
 	var lvlJump = this.slices + 1;
 	
 	// Iterates through all the levels
 	for(var i = 0; i < this.stacks; i++)
 	{	
 		// Iterates through all the slices of that level
 		for(var j = 0; j < this.slices; j++)
 	 	{
 			// Calculates where the the triangles should start
 			start = j + i * lvlJump;
 			
 			// Upper Triangle
 			this.indices.push(start + lvlJump, start, start + lvlJump + 1);
 				
 			// Lower Triangle
 			this.indices.push(start, start + 1, start + lvlJump + 1);
 	 	}
 	}
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

