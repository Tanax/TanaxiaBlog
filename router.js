/** ===========================================================================
 * 
 * AppRouter
 *
 * The application's router-class. This handles taking care of the URL and
 * routing to the correct sections as well as the correct page within those
 * sections and calling change - based on the URL.
 *
 * The router also takes care of neccessary pre-change calls, such as
 * AJAX-calls that might have to be done before a change is triggered.
 * 
 * 
 * @package 	Main
 * @created 	Aug 29th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var AppRouter = Backbone.Router.extend({
	
	/*
    |--------------------------------------------------------------------------
    | routes
    |--------------------------------------------------------------------------
    |
    | Match all routes ('*path') to the method 'match'.
    |
    */
	routes: {
		'*path': 'match'
	},

	/*
    |--------------------------------------------------------------------------
    | redirects
    |--------------------------------------------------------------------------
    |
    | Create a list of different redirects.
    |
    */
	redirects: {
		'': '/blog/page/1',
		'/': '/blog/page/1',
		'/blog': '/blog/page/1',
	},

	/*
    |--------------------------------------------------------------------------
    | routePage
    |--------------------------------------------------------------------------
    |
    | Gets the routed page by doing a bunch of checks.
    |
    */
	routePage: function( page ) {

		// Remove root-folder from page ID
		var id = page.replace( '/' + Config.url_folder, '' );

		// Add begin-slash if we don't have it
		if( id.charAt(0) !== '/' ) id = '/' + id;

		// Remove end-slash if we have it
		if( id.charAt( id.length - 1 ) == '/' ) 
			id = id.substr( 0, id.length - 1 ) + id.substr( id.length - 1 + 1 );

		// Check if ID exists in redirects
		if( id in this.redirects ) id = this.redirects[id];

		// Return it
		return id;

	},

	/*
    |--------------------------------------------------------------------------
    | match
    |--------------------------------------------------------------------------
    |
    | This function will be called on every URL/URI change. Gets the hash from
    | the Hasher and then makes the change.
    |
    */
	match: function( pageId ) {

		// Get the current hash by updating it
		var hash = hasher.getHash( true );

		// Call change
		this.makeChange( hash );

	},

	/*
    |--------------------------------------------------------------------------
    | makeChange
    |--------------------------------------------------------------------------
    |
    | Handles making and triggering the change, both in the app as well as
    | in the affected section.
    |
    */
	makeChange: function( hash, excludeChange, fromStarter ) {

		if( !hash ) return;

		var attributes = {activePage: hash.full};
		this.beforeChange( hash.resource, fromStarter );

		var $this = this;
		var foundSection = false;

		app.sections.some( function( section ) {

			if( !section.validate( attributes ) )
			{

				if( !excludeChange )
				{

					section.set( attributes, {silent: true} );
					app.set( {activeSect: section.id}, {silent: true} );

					$this.checkForceChange( section );
					
					app.change();
					section.change();

					section.beforeChangeAvailable = true;

				}

				foundSection = section;
				return true;

			}

		});

		return foundSection;

	},

	/*
    |--------------------------------------------------------------------------
    | beforeChange
    |--------------------------------------------------------------------------
    |
    | Calls beforeChange on the section to make neccessary AJAX-calls,
    | etc. before the change is triggered.
    |
    */
	beforeChange: function( resource, fromStarter ) {

		var section = app.getSection( resource );
		if( section ) section.beforeChange( fromStarter );

	},

	/*
    |--------------------------------------------------------------------------
    | checkForceChange
    |--------------------------------------------------------------------------
    |
    | Checks to see if we should force-trigger a change in the application.
    |
    */
	checkForceChange: function( section ) {

		if( !app.hasChanged( 'activeSect' ) && !section.hasChanged( 'activePage' ) && this.forceChange == true )
		{

			this.forceChange = false;
			view.forceChange();

		}

	}

});

// End router.js