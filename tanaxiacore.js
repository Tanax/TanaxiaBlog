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

	beforeChange: function( pageId, resourceId ) {

		if( this.beforeChangeAvailable )
		{

			var changer = this.get('changer');
			if( changer ) changer.beforeChange( pageId, resourceId );

			Utils.prototype.insertLoaded( pageId, resourceId );
			this.beforeChangeAvailable = false;

		}

	}

});

var Sections = Backbone.Collection.extend({model: Section});

var Application = Backbone.Model.extend({

	initialize: function() {

		this.sections = new Sections();

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
	
	title: document.title

});