/*************************************************
*
* Graphics library
*
*************************************************/

var L2 = { __version: "L2 Graphics lib v.1.0.0" };

/*************************************************
*
* Global function
*
*************************************************/

//version() --> console.log( L2.__version );
L2.version = function()
{
	console.log( L2.__version );
};

// zfill( "ff", 6, '0' ) --> "0000ff";
L2.zfill = function( str, nDigit, cPrefix )
{
	nDigit = nDigit || 2;
	cPrefix = cPrefix || "0";

	for( var i = str.length; i < nDigit; i++ )
	{
		str = cPrefix + str;
	}

	return str;
};

// frac( 1.045 ) --> 0.045: return fractional part
L2.frac = function( fValue )
{ 
	return fValue - parseInt( fValue );
};

// hexToDec( "#ff00ff" ) --> 0xff00ff;
L2.hexToDec = function( sHex )
{
	var match = sHex.match( /[\da-fA-F]+/g );

	if( match.length == 0 ) return NaN;

	return parseInt( match[0], 16 );
};

// decToHex( 255 ) --> "0000ff";
L2.decToHex = function( nDec, nDigit, cPrefix )
{
	return L2.zfill( nDec.toString( 16 ), nDigit || 6, cPrefix );
};

// mix( 1, 2, 0.5 ) --> 1.5;
L2.mix = function( a, b, t )
{
	return a + t * ( b - a );
};
L2.Vec2 = function( x, y )
{
	this.x = x || 0;
	this.y = y || 0;
};

L2.Vec2.prototype = {

	constructor: L2.Vec2,

	set: function( array )
	{
		this.x = array[0] || 0;
		this.y = array[1] || 0;
	},

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
	},

	clone: function()
	{
		return new L2.Vec2( this.x, this.y );
	},

	toString: function()
	{
		return "(" + this.x + ", " + this.y + ")";
	}
};
/*************************************************
*
* Core displayObject container
*
*************************************************/

L2.Container = function()
{
	this.children = [];
};

L2.Container.prototype = {

	constructor: L2.Container,

	addChild: function( child )
	{
		this.addChildAt( child, this.children.length );
	},

	addChildAt: function( child, index )
	{
		this.children[ index ] = child;
	},

	removeChild: function( child )
	{
  		
	},

	removeChildAt: function( child, index )
	{
 
	}
};
L2.Stage = function()
{
	
}