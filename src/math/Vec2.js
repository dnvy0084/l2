
/*************************************************
*
* Vector2D instance;
*
*************************************************/


L2.Vec2 = function( x, y )
{
	this.raw = new L2.Vec2.ARRAY_TYPE( 2 );

	this.raw[0] = x || 0;
	this.raw[1] = y || 0;
};

L2.Vec2.ARRAY_TYPE = Float32Array;

L2.Vec2.prototype = {

	constructor: L2.Vec2,

	get x(){ return this.raw[0]; },
	set x( value ){ this.raw[0] = value; },

	get y(){ return this.raw[1]; },
	set y( value ){ this.raw[1] = value; },

	set: function( raw )
	{
		this.raw[0] = raw[0] || 0;
		this.raw[1] = raw[1] || 0;

		return this;
	},

	add: function( v )
	{
		this.raw[0] += v.raw[0];
		this.raw[1] += v.raw[1];

		return this;
	},

	sub: function( v )
	{
		this.raw[0] -= v.raw[0];
		this.raw[1] -= v.raw[1];

		return this;
	},

	mul: function( v )
	{
		this.raw[0] *= v.raw[0];
		this.raw[1] *= v.raw[1];	

		return this;
	},

	div: function( v )
	{
		this.raw[0] /= v.raw[0];
		this.raw[1] /= v.raw[1];	
	},

	scale: function( scalar )
	{
		this.raw[0] *= scalar;
		this.raw[1] *= scalar;

		return this;
	},

	dot: function( v )
	{
		return this.raw[0] * v.raw[0] + this.raw[1] * v.raw[1];
	},

	normal: function( ccw )
	{
		var x = this.raw[0],
			y = this.raw[1];

		if( ccw )
		{
			this.raw[0] = y;
			this.raw[1] = -x;
		}
		else
		{
			this.raw[0] = -y;
			this.raw[1] = x;
		}
			
		return this;
	},

	normalize: function() 
	{
		var len = this.length();

		this.raw[0] /= len;
		this.raw[1] /= len;

		return this;	
	},

	length: function()
	{	
		var x = this.raw[0],
			y = this.raw[1];

		return Math.sqrt( x * x + y * y );
	},

	squareLength: function()
	{
		var x = this.raw[0],
			y = this.raw[1];

		return x * x + y * y;
	},

	rotate: function( t )
	{
		var x = this.raw[0],
			y = this.raw[1],
			cos = Math.cos( t ),
			sin = Math.sin( t );

		this.raw[0] = cos * x - sin * y;
		this.raw[1] = sin * x + cos * y;

		return this;
	},

	clone: function()
	{
		return new L2.Vec2().set( this.raw );
	},

	toString: function()
	{
		return "(" + this.raw[0] + ", " + this.raw[1] + ")";
	}
};