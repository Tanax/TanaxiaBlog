
var SVCreator = Backbone.Model.extend({
	
	setup: function( setup ) {

		return this.createSections( setup );

	},

	createChanger: function( attributes ) {

		if( !attributes || attributes == undefined ) return {};
		return { changer: new window[attributes.options.name] };

	},

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

	createPage: function( attributes, id, viewGlobals ) {

		if( !attributes ) return;

		var activePage = null;
		var options = this.mergeOptions( attributes.options, { id: id } );

		if( options.setActive ) activePage = { activePage: options.id };
		delete options.setActive;

		var page = new Page( options );
		console.log('Created a page for: ' + page.id);

		if( attributes.view ) this.createView( attributes.view, page, viewGlobals );
		return { object: page, activePage: activePage };

	},

	createView: function( attributes, model, globals ) {

		if( !attributes ) return;

		attributes.options = this.mergeOptions( attributes.options, this.mergeOptions( { model: model }, globals ) );
		return this.getView( attributes );

	},


	getView: function( view ) {

		var name = view.options.name;
		delete view.options.name;

		console.log('Created a view: ' + name);
		return new window[name]( view.options );

	},

	mergeOptions: function( current, globals ) {

		if( !globals ) return current;
		return $.extend( {}, globals, current );

	}


});