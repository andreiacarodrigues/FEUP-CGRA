/**
 * MyCurve
 * @constructor
 */
 function MyCurve(scene)
 {
 	CGFobject.call(this,scene);

 	this.initBuffers();
 };

 MyCurve.prototype = Object.create(CGFobject.prototype);
 MyCurve.prototype.constructor = MyCurve;

 MyCurve.prototype.initBuffers = function()
 {
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];
 	
 	var a = 1;
 	var x = 0;
 	var y = a*x*x;
 	var step = 0.2;
 	
 	var t = 1;
 	
 	for(var i = 0; i <= 1; i+=step)
 	{
 		x = i/2;
 		y = a*x*x;
 		var h = Math.sqrt(y*y + x*x);
 		
 		this.vertices.push(0.5,x,y);
 		this.texCoords.push(t,0);
 		
 		this.vertices.push(-0.5,x,y);
 		this.texCoords.push(t,1);
 		
 		this.normals.push(0,(x/h),(y/h));
 		this.normals.push(0,(x/h),(y/h));
 		
 		t=1-i;
 	}
 	var start = 0;
 	for(var i = 0; i < 1; i+=step)
 	{
 		this.indices.push(start+0, start+1,start+2);
 		this.indices.push(start+1,start+3,start+2);
 		start+=2;
 	}
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 

