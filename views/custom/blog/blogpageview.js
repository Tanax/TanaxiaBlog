/** ===========================================================================
 * 
 * BlogPageView
 *
 * The view for the blog-page view. Handles things whenever this page is
 * activated or interacted with in any way.
 * 
 * 
 * @package 	Views - Custom - Blog
 * @created 	Aug 30th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var BlogPageView = PageView.extend({

	/*
    |--------------------------------------------------------------------------
    | activate
    |--------------------------------------------------------------------------
    |
    | Called whenever this view is activated.
    |
    */
	activate: function( oldPage, newPage, options ) {

		this.init();

		// If change from another page in the same section
		if( oldPage ) 
		{

			// Animate if section has changed and app has inited
			var animate = !options.sectChanged && app.inited;

			// If change from a different blog-page
			if( oldPage.view instanceof BlogPageView ) 
				this.show( 'slideIn', this._side( oldPage, newPage ), animate );

			// If change from a blog-post
			else if( oldPage.view instanceof BlogPostView )
			{

				$('#blog .page-header span.back').fadeOut('fast');
				this.show( 'fadeIn', animate );

			}

		}

		// If change from another section
		else 
		{

			// Animate if section have not changed
			// or if it's a first-time load
			var animate = !options.sectChanged;
			if( options.starter ) animate = true;

			this.show( 'fadeIn', animate );

		}

		// Activate navigation
		var navigation = app.getView('bpnavigation');
		if( navigation ) navigation.activate( oldPage, newPage, options );

	},

	/*
    |--------------------------------------------------------------------------
    | deactivate
    |--------------------------------------------------------------------------
    |
    | Called whenever this view is deactivated.
    |
    */
	deactivate: function( oldPage, newPage, options ) {

		// If change to antoher page in the same section
		if( newPage ) 
		{

			var navigation = app.getView('bpnavigation');
			if( navigation ) navigation.deactivate( oldPage, newPage, options );

			var animate = !options.sectChanged && app.inited;

			// If change to a different blog-page
			if( newPage.view instanceof BlogPageView ) 
				this.hide( 'slideOut', this._side( oldPage, newPage ), animate );

			// If change to a blog-post
			else if( newPage.view instanceof BlogPostView )
			{

				$('#blog .page-header span.back').fadeIn('fast').find('a').attr('href', '#' + this.model.id);
				this.hide( 'fadeOut', animate );

			}
		}

	},

	/*
    |--------------------------------------------------------------------------
    | _side
    |--------------------------------------------------------------------------
    |
    | Determines from what side the new blog-page should slide in from.
    |
    */
	_side: function( oldPage, newPage ) {

		return oldPage.get('index') < newPage.get('index') ? 'left' : 'right';

	},

	/*
    |--------------------------------------------------------------------------
    | show
    |--------------------------------------------------------------------------
    |
    | Method to show the view.
    |
    */
	show: function( fx ) {

		var args = slice.call( arguments, 1 );
		this[fx].apply( this, args );

	},

	/*
    |--------------------------------------------------------------------------
    | hide
    |--------------------------------------------------------------------------
    |
    | Method to hide the view.
    |
    */
	hide: function( fx ) {

		var args = slice.call( arguments, 1 );
		this[fx].apply( this, args );

	},

	/*
    |--------------------------------------------------------------------------
    | slideIn
    |--------------------------------------------------------------------------
    |
    | Slides the view in from the side passed in.
    |
    */
	slideIn: function( toSide, animate, next ) {

		var $this = this;

		if( animate ) 
		{

			var width = this.$el.width();

			var startProps = { position: 'absolute' };

			startProps['top'] = $('.page-header', this.container).outerHeight(true);
			startProps[toSide] = '50%';
			startProps['margin-' + toSide] = width * 0.5;

			var endProps = { opacity: 'show' };

			endProps['margin-' + toSide] = -width * 0.5;;

			var resetProps = {

				position: 'static',
				marginLeft: 'auto',
				marginRight: 'auto',
				top: 'auto'

			};

			resetProps[toSide] = 'auto';

			this.$el.css(startProps).animate( endProps, function() {

				$this.$el.css(resetProps);
				next();

			});

		} 

		else 
		{

			this.$el.show();
			next();

		}		
	},

	/*
    |--------------------------------------------------------------------------
    | slideOut
    |--------------------------------------------------------------------------
    |
    | Exactly like the slideIn but instead slides out.
    |
    */
	slideOut: function( toSide, animate, next ) {

		var $this = this;

		if( animate ) 
		{

			var width = this.$el.width();
			var startProps = {

				position: 'relative'

			};

			startProps[toSide] = 0;

			var endProps = {

				opacity: 'hide'

			};

			endProps[toSide] = -width;

			var resetProps = {

				position: 'static'

			};

			resetProps[toSide] = 'auto';

			this.$el.css(startProps).animate( endProps, function() {

				$this.$el.css(resetProps);

			});

			next();

		} 

		else 
		{	

			this.$el.hide();
			next();

		}		

	}

});

// End of blogpageview.js