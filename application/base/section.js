/** ===========================================================================
 * 
 * Section
 *
 * This is the class all sections extends from. A section is one part of the
 * website to which the viewer can "scroll" to. Within a section are different
 * pages that contains the actual things that are written on the website.
 * 
 * 
 * @package 	Application - Base
 * @created 	Aug 30th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
 var Section = Backbone.Model.extend({

 	/*
    |--------------------------------------------------------------------------
    | initialize
    |--------------------------------------------------------------------------
    |
    | Called when a section is instantiated.
    |
    */
	initialize: function() {

		this.pages = new Pages();
		this.beforeChangeAvailable = true;
		this.bind( 'change', _.bind( this.forceChange, this ) );

	},

	/*
    |--------------------------------------------------------------------------
    | validate
    |--------------------------------------------------------------------------
    |
    | Method to check if the section contains a certain page.
    |
    */
	validate: function( attributes ) {

		if( !this.pages.get( attributes.activePage ) )
			return "Can't find page " + attributes.activePage + " in section " + this.id;

	},

	/*
    |--------------------------------------------------------------------------
    | forceChange
    |--------------------------------------------------------------------------
    |
    | Forces a change in the main application-view.
    |
    */
	forceChange: function() { view.forceChange(); },

	/*
    |--------------------------------------------------------------------------
    | beforeChange
    |--------------------------------------------------------------------------
    |
    | Called before a change is triggered. Used to invoke the beforeChange
    | in the assigned changer if a changer is available. Also calls the
    | insertLoaded to insert all possible AJAX-/firsttime-loaded content
   	| into the main website. 
    |
    */
	beforeChange: function( fromStarter ) {

		if( this.beforeChangeAvailable )
		{

			var changer = this.get('changer');
			if( changer ) changer.beforeChange( fromStarter );

			Utils.prototype.insertLoaded();
			this.beforeChangeAvailable = false;

		}

	}

});

// End of section.js