/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
 
function Plane(scene, nrDivs, k, scaling)
{  
    CGFobject.call(this,scene);
 
    nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
 
    this.nrDivs = nrDivs;
    this.patchLength = 1.0 / nrDivs;
    this.k = k || 1;
    this.kReverted = 1/k;
   
    this.scaling = scaling;
 
    this.initBuffers();
};
 
Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;
 
Plane.prototype.initBuffers = function()
{
    this.vertices = [];
   
    this.normals = [];
   
    this.texCoords = [];
   
    this.indices = [];
   
    // Vertex and Normal
   
    var yCoord = 0.5;
 
    for (var j = 0; j <= this.nrDivs; j++)
    {
        var xCoord = -0.5;
        for (var i = 0; i <= this.nrDivs; i++)
        {
            this.vertices.push(xCoord, yCoord, 0);
            this.normals.push(0,0,1);
            xCoord += this.patchLength;
        }
        yCoord -= this.patchLength;
    }
   
    // Texture
   
    if(this.scaling)
    {
        t = 0;
        for (var i = 0; i <= this.nrDivs; i++)
        {
            s = 0;
            for (var j = 0; j <= this.nrDivs; j++)
            {
                this.texCoords.push(s, t);
                s += this.patchLength;
            }
            t += this.patchLength;
        }
    }
    else if(this.k >= 1)
    {
        t = 0;
        for (var i = 0; i <= this.nrDivs; i++)
        {
            s = -(this.k - 1) / 2;
            for(j = 0; j <= this.nrDivs; j++)
            {
                this.texCoords.push(s, t);
                s += this.k/this.nrDivs;
            }
            t += this.patchLength;
        }
    }
    else
    {
         t = -(this.kReverted-1)/2;;
         for (i = 0; i <= this.nrDivs; i++)
         {
             s = 0;
             for(j = 0; j <= this.nrDivs; j++)
             {
                 this.texCoords.push(s, t);
                 s += 1.0/this.nrDivs;
             }
             t += this.kReverted/this.nrDivs;
         }
    }
   
    // Index
   
    var ind=0;
 
    for (var j = 0; j < this.nrDivs; j++)
    {
        for (var i = 0; i <= this.nrDivs; i++)
        {
            this.indices.push(ind);
            this.indices.push(ind+this.nrDivs+1);
            ind++;
        }
        if (j+1 < this.nrDivs)
        {
            this.indices.push(ind+this.nrDivs);
            this.indices.push(ind);
        }
    }
   
    this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
    this.initGLBuffers();
};