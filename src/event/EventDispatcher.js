
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