/** ===========================================================================
 * 
 * Application
 *
 * Our main application that contains all sections with all their pages
 * and all the pages' assigned views. The main application also contains
 * application-wide views and some "getter" -methods.
 * 
 * 
 * @package 	Application - Core
 * @created 	Aug 30th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var Application = Backbone.Model.extend({

	/*
    |--------------------------------------------------------------------------
    | initialize
    |--------------------------------------------------------------------------
    |
    | Called when the application is being instantiated.
    |
    */
	initialize: function() {

		this.sections = new Sections();
		this.views = [];

	},

	/*
    |--------------------------------------------------------------------------
    | getSection
    |--------------------------------------------------------------------------
    |
    | Return a section by its name if it exists.
    |
    */
	getSection: function( name ) {

		var section = false;
		this.sections.some( function( current ) {

			if( current.get('name') == name )
			{

				section = current;
				return true;

			}

		});

		return section;

	},

	/*
    |--------------------------------------------------------------------------
    | getView
    |--------------------------------------------------------------------------
    |
    | Return an application-wide view by its name if it exists.
    |
    */
	getView: function( name ) {

		for( var i = 0; i < this.views.length; i++ )
			if( this.views[i].name.match( name ) )
				return this.views[i].object;

	}

}, 
{
	
	/*
    |--------------------------------------------------------------------------
    | title
    |--------------------------------------------------------------------------
    |
    | Initiate the application-title to the starting document title.
    |
    */
	title: document.title

});