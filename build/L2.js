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

/**
* bresenham line raster algorithm
*/
L2.rasterLine = function( ax, ay, bx, by, buf, offset )
{
	ax = parseInt( ax ), ay = parseInt( ay ),
	bx = parseInt( bx ), by = parseInt( by );

	var dx = Math.abs( bx - ax ),
		dy = Math.abs( by - ay ),
		e, x, y, di, dt, t;

	buf = buf || [];
	offset = offset || 0;

	if( dx > dy )
	{
		di = ax < bx ? +1 : -1;
		dt = ay < by ? +1 : -1;
		t = bx + di;
		e = 0;

		for( x = ax, y = ay; x != t; x += di )
		{
			buf[ offset++ ] = x;
			buf[ offset++ ] = y;

			e += dy;

			if( ( e << 1 ) > dx )
			{
				y = y + dt;
				e -= dx;
			}
		}
	}
	else
	{
		di = ay < by ? +1 : -1;
		dt = ax < bx ? +1 : -1;
		t = by + di;
		e = 0;

		for( x = ax, y = ay; y != t; y += di )
		{
			buf[ offset++ ] = x;
			buf[ offset++ ] = y;

			e += dx;

			if( ( e << 1 ) > dy )
			{
				x = x + dt;
				e -= dy;
			}
		}
	}

	return buf;
};

L2.rasterLineBetweenVec2 = function( a, b )
{
	return L2.rasterLine( a.x, a.y, b.x, b.y );
};

L2.rasterAntialiasingLine = function( ax, ay, bx, by, buf, offset )
{
	ax = parseInt( ax ), ay = parseInt( ay ),
	bx = parseInt( bx ), by = parseInt( by );

	buf = buf || [];
	offset = offset || 0;

	var dx = Math.abs( bx - ax ),
		dy = Math.abs( by - ay ),
		x = ax, y = ay, t, di;

	if( dx > dy )
	{
		m = by > ay ? dy / dx : -dy / dx;
		di = bx > ax ? +1 : -1;
		t = bx + di;
		
		for( ; x != t; x += di )
		{
			buf[ offset++ ] = x,
			buf[ offset++ ] = Math.round( y ),

			y += m;
		}
	}
	else
	{
		m = bx > ax ? dx / dy : -dx / dy;
		di = by > ay ? +1 : -1;
		t = by + di;

		for( ; y != t; y += di )
		{
			buf[ offset++ ] = Math.rount( x ),
			buf[ offset++ ] = x,

			x += m;
		}
	}
};

/*************************************************
*
* EventDispatcher
*
*************************************************/

L2.EventDispatcher = function() {}

L2.EventDispatcher.prototype = {

	constructor: L2.EventDispatcher,

	addEventListener: function( type, listener )
	{
		if( this._listeners === undefined ) 
			this._listeners = {};

		if( this._listeners[ type ] === undefined )
			this._listeners[ type ] = [];

		var listeners = this._listeners[ type ];

		if( listeners.indexOf( listener ) === -1 )
			listeners.push( listener );
	},

	removeEventListener: function( type, listener )
	{
		if( !this.hasEventListener( type ) ) return;

		var index = this._listeners[ type ].indexOf( listener );

		if( index !== -1 )
			this._listeners[ type ].splice( index, 1 );
	},

	hasEventListener: function( type )
	{
		if( this._listeners === undefined || 
			this._listeners[ type ] === undefined ||
			this._listeners[ type ].length === 0 ) 
			return false;

		return true;
	},

	dispatchEvent: function( e )
	{
		if( !this.hasEventListener( e.type ) ) return;

		var listeners = this._listeners[ e.type ];

		var cache = [],
		 	i,
		 	len;

		e.target = this;

		for( i = 0, len = listeners.length; i < len; i++ )
		{
			cache.push( listeners[i] );
		}

		for( i = 0, len = cache.length; i < len; i++ )
		{
			cache[i].apply( this, [e] );
		}
	},
};

/*************************************************
*
* DisplayObject container
*
*************************************************/

L2.Container = function()
{
	L2.EventDispatcher.call( this );

	this.children = [];
};

L2.Container.prototype = Object.create( L2.EventDispatcher.prototype );


L2.Container.prototype.addChild = function( child )
{
	this.addChildAt( child, this.children.length );
};

L2.Container.prototype.addChildAt = function( child, index )
{
	this.children.splice( index, 0, child );

	child.parent = this;
	child.stage = this.stage;
};

L2.Container.prototype.removeChild = function( child )
{
	var index = this.children.indexOf( child );	

	if( index == -1 ) return null;

	return this.removeChildAt( index );
};

L2.Container.prototype.removeChildAt = function( index )
{
	if( index < 0 || index > this.children.length ) return null;

	return this.children.splice( index, 1 )[0];
};

/*************************************************
*
* Stage
*
*************************************************/

L2.Stage = function()
{ 
	L2.Container.call( this );
};
 
L2.Stage.prototype = Object.create( L2.Container.prototype );

 

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