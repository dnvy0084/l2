L2.Vec2 = function( x, y )
{
	this.x = x || 0;
	this.y = y || 0;
};

L2.Vec2.prototype = {

	constructor: L2.Vec2,

	add: function( v )
	{
		this.x += v.x;
		this.y += v.y;

		return this;
	},

	sub: function( v )
	{
		this.x -= v.x;
		this.y -= v.y;

		return this;
	},

	mul: function( v )
	{
		this.x *= v.x;
		this.y *= v.y;	

		return this;
	},

	div: function( v )
	{
		this.x /= v.x;
		this.y /= v.y;	
	},

	scale: function( scalar )
	{
		this.x *= scalar;
		this.y *= scalar;

		return this;
	},

	dot: function( v )
	{
		return this.x * v.x + this.y * v.y;
	},

	normal: function( ccw )
	{
		var x = this.x,
			y = this.y;

		if( ccw )
		{
			this.x = y;
			this.y = -x;
		}
		else
		{
			this.x = -y;
			this.y = x;
		}
			
		return this;
	},

	normalize: function()
	{
		var len = this.length();

		this.x /= len;
		this.y /= len;

		return this;	
	},

	length: function()
	{	
		var x = this.x,
			y = this.y;

		return Math.sqrt( x * x + y * y );
	},

	lengthNonSqrt: function()
	{
		var x = this.x,
			y = this.y;

		return x * x + y * y;
	},

	rotate: function( t )
	{
		var x = this.x,
			y = this.y,
			cos = Math.cos( t ),
			sin = Math.sin( t );

		this.x = cos * x - sin * y;
		this.y = sin * x + cos * y;

		return this;
	}
};