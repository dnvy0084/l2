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