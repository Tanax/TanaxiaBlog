/** ===========================================================================
 * 
 * ClassCreator
 *
 * Creates sections, pages, changers and views based on the input options.
 * 
 * 
 * @package 	Core
 * @created 	Aug 30th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var ClassCreator = Backbone.Model.extend({
	
	/*
    |--------------------------------------------------------------------------
    | setup
    |--------------------------------------------------------------------------
    |
    | Top method to call.
    |
    */
	setup: function( setup ) {

		return this.createSections( setup );

	},

	/*
    |--------------------------------------------------------------------------
    | createChanger
    |--------------------------------------------------------------------------
    |
    | Creates a changer for a section. This changer is called whenever a change
    | occurs to, or within, the currently active section.
    |
    */
	createChanger: function( attributes ) {

		if( !attributes || attributes == undefined ) return {};
		return { changer: new window[attributes.options.name] };

	},

	/*
    |--------------------------------------------------------------------------
    | createSections
    |--------------------------------------------------------------------------
    |
    | Top method to call to create several sections.
    |
    */
	createSections: function( attributes ) {

		if( !attributes ) return;

		var sections = new Array();

		for( var current in attributes )
		{

			var data = attributes[current];
			
			if( current == '__view__' )
			{

				this.createView( data );
				continue;

			}

			var section = this.createSection( data, current );
			if( section ) sections.push( section.object );

		}

		return sections;

	},

	/*
    |--------------------------------------------------------------------------
    | createSection
    |--------------------------------------------------------------------------
    |
    | Creates a single section from the options passed in.
    |
    */
	createSection: function( attributes, id ) {

		if( !attributes ) return;

		var pages = this.createPages( attributes.pages );
		var changer = this.createChanger( attributes.changer );

		var activePage = ( pages && pages.activePage ) ? pages.activePage : {};
		var options = this.mergeOptions( attributes.options, this.mergeOptions( { name: id }, this.mergeOptions( activePage, changer ) ) );
		var section = new Section( options );

		if( pages && pages.objects ) section.pages.add( pages.objects );
		if( attributes.view ) this.createView( attributes.view, section );

		return { object: section };

	},

	/*
    |--------------------------------------------------------------------------
    | createPages
    |--------------------------------------------------------------------------
    |
    | Top method to call to create several pages.
    |
    */
	createPages: function( attributes ) {

		if( !attributes ) return;

		var pages = new Array();
		var activePage = {};

		for( var current in attributes )
		{

			if( current == '__globals__' ) continue;

			var page = this.createPage( attributes[current], current, attributes.__globals__ );
			if( page )
			{

				pages.push( page.object );
				if( page.activePage ) activePage = page.activePage;

			}

		}

		return { objects: pages, activePage: activePage };

	},

	/*
    |--------------------------------------------------------------------------
    | createPage
    |--------------------------------------------------------------------------
    |
    | Creates a single page based on the options passed in.
    |
    */
	createPage: function( attributes, id, viewGlobals ) {

		if( !attributes ) return;

		var activePage = null;
		var options = this.mergeOptions( attributes.options, { id: id } );

		if( options.setActive ) activePage = { activePage: options.id };
		delete options.setActive;

		var page = new Page( options );

		if( attributes.view ) this.createView( attributes.view, page, viewGlobals );
		return { object: page, activePage: activePage };

	},

	/*
    |--------------------------------------------------------------------------
    | createView
    |--------------------------------------------------------------------------
    |
    | Top method to call to create a view-file for either a page, a section
    | or an application-wide view.
    |
    */
	createView: function( attributes, model, globals ) {

		if( !attributes ) return;

		attributes.options = this.mergeOptions( attributes.options, this.mergeOptions( { model: model }, globals ) );
		return this.getView( attributes );

	},

	/*
    |--------------------------------------------------------------------------
    | getView
    |--------------------------------------------------------------------------
    |
    | Creates a view based on the options passed in.
    |
    */
	getView: function( view ) {

		var name = view.options.name;
		delete view.options.name;

		return new window[name]( view.options );

	},

	/*
    |--------------------------------------------------------------------------
    | mergeOptions
    |--------------------------------------------------------------------------
    |
    | Merges two object-arrays where if the same key exists in both 
    | object-arrays, the one in the first object-array will take presidence 
    | over the second the key in the second object-array.
    |
    */
	mergeOptions: function( current, globals ) {

		if( !globals ) return current;
		return $.extend( {}, globals, current );

	}


});

// End of classcreator.js