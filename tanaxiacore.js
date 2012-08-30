var noop = function() {};
var $doc = $(document);
var slice = [].slice;

var Page = Backbone.Model.extend({

	beforeChange: function( pageId, resourceId ) {}

});

var Pages = Backbone.Collection.extend({model: Page});

var Section = Backbone.Model.extend({


	initialize: function() {

		this.pages = new Pages();
		this.beforeChangeAvailable = true;
		this.bind( 'change', _.bind( this.forceChange, this ) );

	},

	validate: function( attributes ) {

		if( !this.pages.get( attributes.activePage ) )
			return "Can't find page " + attributes.activePage + " in section " + this.id;

	},

	isResource: function( resourceId ) {

		return this.get('resourceName') == resourceId;

	},

	forceChange: function() {

		console.log('BINDCHANGE!');
		view.forceChange();

	},

	beforeChange: function( pageId, resourceId ) {

		if( this.beforeChangeAvailable )
		{

			console.log('Section: calling before change in section: ' + this.get('name'));

			var changer = this.get('changer');
			if( changer ) changer.beforeChange( pageId, resourceId );

			this.beforeChangeAvailable = false;

		}

		/*
		var changer = this.get('pageChanger');
		if( changer && this.prevPageId != pageId ) 
		{
			console.log('We have a changer! Calling its beforeChange()');
			changer.beforeChange( pageId, resourceId );
			this.prevPageId = pageId;

		}

		else if( this.prevPageId == pageId ) console.log('We have already called the general beforeChange on this page!');

		else console.log('We do not have a changer! Will not call general beforeChange()');

		console.log('Searching for page: ' + pageId);
		var page = this.pages.get( pageId )
		if( page ) 
		{

			console.log('We have a matching page! Calling its beforeChange()');
			page.beforeChange( pageId, resourceId );

		}*/

	}

});

var Sections = Backbone.Collection.extend({model: Section});

var Application = Backbone.Model.extend({

	initialize: function() {

		this.sections = new Sections();
		//this.fixLinks();
		//this.disableLinks();

	},

	disableLinks: function() {

		$('a.noClick').click( function( e ) {

			e.preventDefault();

		});

	},

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

	}

}, 
{
	
	title: document.title,
	
	txt2name: function(text) {
		return $.trim(text).toLowerCase().replace(/\s+/g, '-');
	}

});