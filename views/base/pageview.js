
var PageView = View.extend({
	
	initialize: function( options ) {

		View.prototype.initialize.apply( this, arguments );

		this.container = options.container || this.el;
		this.queue( 'setTitle' );
		Utils.prototype.fixLinks();

	},

	events: {

		// Some events, example:
		// 'mouseover .tooltip': 'showToolTip'

	},

	scrollToTopHandler: function() { this.scrollToTop( true ); },

	activate: function( oldPage, newPage, options ) {

		// this.setTitle();
		this.init();

		if( oldPage )
			this.show( !options.sectChanged && app.inited );

	},

	deactivate: function( oldPage, newPage, options ) {

		if( newPage )
			this.hide( !options.sectChanged && app.inited );

		//this.scrollToTop( false );

	},

	setTitle: function() {

		// Do something?

	},

	show: function( animate, next ) { this.fadeIn( animate, next ); },

	hide: function( animate, next ) { this.fadeOut( animate, next ); },

	fadeIn: function( animate, next ) {

		if( animate ) this.$el.fadeIn( _.after( this.$el.length, next ) );
		else { this.$el.show(); next(); }

	},

	fadeOut: function( animate, next ) {

		if( animate ) this.$el.fadeOut( 'fast', _.after( this.$el.length, next ) );
		else { this.$el.hide(); next(); }

	},

	scrollToTop: function( animate, next ) {

		var $container = $(this.container);

		if( animate ) 
		{

			$container.animate( {scrollTop: 0}, function() {

				next();
				return true;

			});

		}

		else
		{

			$container.scrollTop(0);
			next();
			return true;

		}

	},

	showToolTip: function() {

		// Do something?

	},

	hideToolTip: function() {

		// Do something?

	}

});