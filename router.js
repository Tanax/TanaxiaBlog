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
    | initialize
    |--------------------------------------------------------------------------
    |
    | Called when router is initialized. Clean internal variables.
    |
    */
	initialize: function( options ) {

		this.clean();

	},

	/*
    |--------------------------------------------------------------------------
    | fixPageId
    |--------------------------------------------------------------------------
    |
    | Fixes the page id to make it a valid page id and resource id.
    |
    */
	fixPageId: function( pageId ) {

		// Remove root-folder from page ID
		var id = pageId.replace( '/' + Config.url_folder, '' );

		// Add begin-slash if we don't have it
		if( id.charAt(0) !== '/' ) id = '/' + id;

		// Remove end-slash if we have it
		if( id.charAt( id.length - 1 ) == '/' ) id = id.substr( 0, id.length - 1 ) + id.substr( id.length - 1 + 1 );

		// Check if ID exists in redirects
		if( id in this.redirects ) id = this.redirects[id];

		// Save main version
		this.page_id = id;

		// Return it
		return this.page_id;

	},

	/*
    |--------------------------------------------------------------------------
    | getResourceId
    |--------------------------------------------------------------------------
    |
    | Gets the resource id from the page id.
    |
    */
	getResourceId: function() {

		// Replace all / with nothing
		this.resource_id = this.page_id.split('/')[1].replace('/', '');

		// If we end up with an empty string, set it to starting resource
		if( this.resource_id == '' ) this.resource_id = Config.start_resource;

	},

	/*
    |--------------------------------------------------------------------------
    | match
    |--------------------------------------------------------------------------
    |
    | This function will be called on every URL/URI change. Fixes the page id,
    | gets the resource id and then makes the change.
    |
    */
	match: function( pageId ) {

		// Fix page ID
		this.fixPageId( pageId );

		// Get resource ID from the page ID
		this.getResourceId();

		// Update the nexus
		nexus.getHash( true );

		// Call change
		this.makeChange();

	},

	/*
    |--------------------------------------------------------------------------
    | beforeChange
    |--------------------------------------------------------------------------
    |
    | Calls beforeCHange on the section to make neccessary AJAX-calls,
    | etc. before the change is triggered.
    |
    */
	beforeChange: function() {

		var section = app.getSection( this.resource_id );
		if( section ) section.beforeChange( this.page_id, this.resource_id );

	},

	prepareForceChange: function() {

		this.forceChange_prop = true;

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
	makeChange: function() {

		var attributes = {activePage: this.page_id};
		this.beforeChange();

		var $this = this;

		app.sections.some( function( section ) {

			if( !section.validate( attributes ) )
			{

				section.set( attributes, {silent: true} );
				app.set( {activeSect: section.id}, {silent: true} );

				$this.forceChange( app, section );
				
				app.change();
				section.change();

				section.beforeChangeAvailable = true;
				return true;

			}

		});

		this.clean();

	},

	forceChange: function( app, section ) {

		if( !app.hasChanged( 'activeSect' ) && !section.hasChanged( 'activePage' ) && this.forceChange_prop == true )
		{

			this.forceChange_prop = false;
			view.forceChange();

		}

	},

	/*
    |--------------------------------------------------------------------------
    | clean
    |--------------------------------------------------------------------------
    |
    | Cleans up internal variables, resetting them before the next route
    | match is triggered.
    |
    */
	clean: function() {

		this.resource_id = null;
		this.page_id 	 = null;

	}

});

// End router.js