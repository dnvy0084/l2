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
		this.children.splice( index, 0, child );

		child.parent = this;
		child.stage = this.stage;
	},

	removeChild: function( child )
	{
  		var index = this.children.indexOf( child );	

  		if( index == -1 ) return null;

  		return this.removeChildAt( index );
	},

	removeChildAt: function( index )
	{
		if( index < 0 || index > this.children.length ) return null;

 		return this.children.splice( index, 1 )[0];
	}
};