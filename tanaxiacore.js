var noop = function() {};
var $doc = $(document);
var slice = [].slice;

var Page = Backbone.Model.extend({ready: true});
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

	forceChange: function() { view.forceChange(); },

	beforeChange: function( pageId, resourceId, fromStarter ) {

		if( this.beforeChangeAvailable )
		{

			var changer = this.get('changer');
			if( changer ) changer.beforeChange( pageId, resourceId, fromStarter );

			Utils.prototype.insertLoaded( pageId, resourceId );
			this.beforeChangeAvailable = false;

		}

	}

});

var Sections = Backbone.Collection.extend({model: Section});

var Application = Backbone.Model.extend({

	initialize: function() {

		this.sections = new Sections();
		this.loadedNav = [];
		this.views = [];

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

	},

	getLoadedNav: function( search ) {

		for( var i = 0; i < this.loadedNav.length; i++ )
			if( this.loadedNav[i].match( search ) )
				return this.loadedNav[i];

		return null;

	},

	getView: function( name ) {

		for( var i = 0; i < this.views.length; i++ )
			if( this.views[i].name.match( name ) )
				return this.views[i].object;

	}

}, 
{
	
	title: document.title

});