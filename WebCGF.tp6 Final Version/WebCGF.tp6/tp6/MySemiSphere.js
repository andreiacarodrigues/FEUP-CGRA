/**
 * MySemiSphere
 * @constructor
 */
 function MySemiSphere(scene, slices, stacks)
 {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySemiSphere.prototype = Object.create(CGFobject.prototype);
 MySemiSphere.prototype.constructor = MyCylinder;
 
 MySemiSphere.prototype.initBuffers = function()
 {
 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];
 	
 	this.texCoords = [];
 	
 	// Horizontal Angles
 	var angHorizontal = 0;
 	var angHorizontalIncrement = (2*Math.PI)/this.slices;
 	
 	// Vertical Angles
 	var angVertical = 0;
 	var angVerticalIncrement = (Math.PI / 2) / this.stacks;
 	
 	// Number of vertical divisions
 	var numberOfLevels = this.stacks + 1;
 	
 	// Height
 	var height = 0;
 	
 	// Radius
 	var radius = 1;
 	
 	// Texture Coordinate S
 	var s = 1;
 	
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
 			this.vertices.push(Math.cos(angHorizontal) * radius, Math.sin(angHorizontal) * radius, height);
 			
 			// Adds the normals
 			this.normals.push(Math.cos(angHorizontal) * radius, Math.sin(angHorizontal) * radius, height);
 			
 			// Adds the texture coordinate
 			this.texCoords.push(t, s);
 			
 			// Increments the horizontal angle
 			angHorizontal = angHorizontal + angHorizontalIncrement;
 			
 			// Increments the t coordinate
 			t = t + tIncrement;
 		}
 		
 		// Increments the vertical angle
 		angVertical = angVertical + angVerticalIncrement;
 		
 		// Recalculates the radius
 		radius = Math.cos(angVertical);
 		
 		// Resets the t coordinate
 		t = 0;
 		
 		// Resets the horizontal angle
 		angHorizontal = 0;
 		
 		// Recalculates the height
 		height = Math.sin(angVertical);
 		
 		// Recalculates the s texture
 		s = 1 - height;
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