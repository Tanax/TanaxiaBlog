/** ===========================================================================
 * 
 * BlogPostView
 *
 * The view for the blog-post view. Handles things whenever this page is
 * activated or interacted with in any way.
 * 
 * 
 * @package 	Views - Custom - Blog
 * @created 	Aug 30th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var BlogPostView = PageView.extend({

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

		// If change from antoher page in the same sect
		if( oldPage ) 
		{

			// Animate if sect has changed and app has inited
			var animate = !options.sectChanged && app.inited;

			// If change from portfolio page
			if( oldPage.view instanceof BlogPageView ) 
				this.show( 'fadeIn', animate );

		}

		else 
		{

			var animate = options.starter + !options.sectChanged;
			this.show( 'fadeIn', animate );

		}

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

		// If change to antoher page in the same sect
		if( newPage ) 
		{

			var animate = !options.sectChanged && app.inited;

			// If change to portfolio page
			if( newPage.view instanceof BlogPageView ) 
				this.show( 'fadeOut', animate );
			
		}

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

	}

});

// End of blogpostview.js