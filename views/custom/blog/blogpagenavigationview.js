/** ===========================================================================
 * 
 * BlogPageNavigationView
 *
 * This view handles the blog-page navigation that includes the links
 * to older and newer entries.
 * 
 * 
 * @package 	Views - Blog
 * @created 	Sep 2nd 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var BlogPageNavigationView = PageView.extend({

	/*
    |--------------------------------------------------------------------------
    | initialize
    |--------------------------------------------------------------------------
    |
    | Called upon instantiation of this view. Initializes the view.
    |
    */
	initialize: function( options ) { 

		PageView.prototype.initialize.apply( this, arguments );
		this.loaded = [];

	},

	/*
    |--------------------------------------------------------------------------
    | activate
    |--------------------------------------------------------------------------
    |
    | Called when the view is being activated. Takes care of loading the
    | navigation into the page and animates it. If the navigation has
    | already been loaded, we use the already loaded navigation.
    |
    */
	activate: function( oldPage, newPage, options ) {

		var hash = hasher.getHash();
		var name = hash.names.resource_dash_page_dash_cid;
		var save = this.loaded[name];

		if( save ) this.loadNavigation( 'nav-' + save );
		else if( $('#loadedNavigation').html().length > 0 )
		{

			var older = $('#loadedNavigation .older');
			var newer = $('#loadedNavigation .earlier');

			if( newer.html() || older.html() ) 
			{

				$('<div/>', {id: 'nav-' + name}).appendTo('#bottom-nav-blog ul').hide();
				this.loaded.push( name );

			}

			if( newer.html() ) newer.appendTo('#nav-' + name);
			if( older.html() ) older.appendTo('#nav-' + name);
			
			this.loadNavigation( 'nav-' + name );

		}

	},

	/*
    |--------------------------------------------------------------------------
    | deactivate
    |--------------------------------------------------------------------------
    |
    | Deactivates the view by fading it out.
    |
    */
	deactivate: function( oldPage, newPage, options ) {

		if( this.el && this.$el.attr('id') != 'bottom-nav-blog' )
			this.hide( ( !!oldPage ) );

	},

	/*
    |--------------------------------------------------------------------------
    | loadNavigation
    |--------------------------------------------------------------------------
    |
    | Loads a navigation with the element name ID passed in.
    |
    */
	loadNavigation: function( name ) {

		var element = '#' + name;
		if( $(element).length <= 0 ) return;

		this.setElement( element );
		this.$el.css('opacity', 0).css('display', 'inline').animate({
			opacity: 1
		}, 'slow');

	}

});

// End of blogpagenavigationview.js