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
			buf[ offset++ ] = 1;

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
			buf[ offset++ ] = Math.round( x ),
			buf[ offset++ ] = y,
			buf[ offset++ ] = 1;

			x += m;
		}
	}

	return buf;
};