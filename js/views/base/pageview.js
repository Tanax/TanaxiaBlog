
var PageView = View.extend({
	
	initialize: function( options ) {

		View.prototype.initialize.apply( this, arguments );

		this.container = options.container || this.el;
		this.queue( 'setTitle' );

	},

	events: {

		// Some events, example:
		// 'mouseover .tooltip': 'showToolTip'

	},

	scrollToTopHandler: function() {

		this.scrollToTop( true );

	},

	activate: function( oldPage, newPage, options ) {

		// this.setTitle();
		this.init();

		if( oldPage )
		{

			this.show( !options.sectChanged && app.inited );

		}

	},

	deactivate: function( oldPage, newPage, options ) {

		if( newPage )
			this.hide( !options.sectChanged && app.inited );

		//this.scrollToTop( false );

	},

	setTitle: function() {

		// Do something?

	},

	show: function( animate, next ) {

		console.log('SHOW');
		this.fadeIn( animate, next );

	},

	hide: function( animate, next ) {

		this.fadeOut( animate, next );

	},

	fadeIn: function( animate, next ) {

		$el = $(this.el);

		if( animate ) $el.fadeIn( _.after( $el.length, next ) );

		else
		{

			$el.show();
			next();

		}

	},

	fadeOut: function( animate, next ) {

		var $el = $(this.el);

		if( animate ) $el.fadeOut( 'fast', _.after( $el.length, next ) );

		else
		{

			$el.hide();
			next();

		}

	},

	scrollToTop: function( animate, next ) {

		var $container = $(this.container);

		if( animate ) $container.animate( {scrollTop: 0}, next );

		else
		{

			$container.scrollTop(0);
			next();

		}

	},

	showToolTip: function() {

		// Do something?

	},

	hideToolTip: function() {

		// Do something?

	}

});