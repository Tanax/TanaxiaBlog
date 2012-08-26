var noop = function() {};
var $doc = $(document);
var slice = [].slice;

var Page = Backbone.Model.extend();
var Pages = Backbone.Collection.extend({model: Page});

var Section = Backbone.Model.extend({

	initialize: function() {

		this.pages = new Pages();

	},

	validate: function( attributes ) {

		if( !this.pages.get( attributes.activePage ) )
			return "Can't find page " + attributes.activePage + " in section " + this.id;

	}

});

var Sections = Backbone.Collection.extend({model: Section});

var Application = Backbone.Model.extend({

	initialize: function() {

		this.sections = new Sections();
		this.fixLinks();

	},

	disableLinks: function() {

		$('a.noClick').click( function( e ) {

			e.preventDefault();

		});

	},

	fixLinks: function() {

		var $this = this;

		$('a.js').each( function( index ) {

			var link = $(this);
			if( link !== undefined )
			{

				var href = $(this).attr('href');
				if( href !== undefined )
				{

					var replaced = href.replace( Config.url_full, '' );
					var onclick = "router.navigate( '/" + replaced + "', true )";
					link.attr( 'onclick', onclick );

				}

			}

		});

		this.disableLinks();

	}

}, 
{
	
	title: document.title,
	
	txt2name: function(text) {
		return $.trim(text).toLowerCase().replace(/\s+/g, '-');
	}

});