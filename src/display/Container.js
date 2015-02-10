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