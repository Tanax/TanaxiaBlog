
var View = Backbone.View.extend({
	
	initialize: function( options ) {

		if( this.model ) this.model.view = this;

		if( this.init !== noop ) 
		{

			var _init = this.init;

			this.init = function() {

				var args = _.toArray(arguments);
				var next = args.pop();

				if( !$.isFunction( next ) ) next = args.pop();

				_init.apply(this, args);

				this.init = noop;
				next();

			};

		}

		this.queue( 'init', 'show', 'hide' );

	},

	queue: function() {

		_.each( arguments, function( method ) {

			var _method = this[method];
			if( _method === noop ) return;
			this[method] = function() {

				var args = [_method, this].concat( _.toArray( arguments ) );
				$doc.queue( _.bind.apply( _, args ) );

			};

		}, this );

	},

	init: noop,
	show: noop,
	hide: noop

});