
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