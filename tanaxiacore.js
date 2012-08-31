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

	}

});

var Sections = Backbone.Collection.extend({model: Section});

var Application = Backbone.Model.extend({

	initialize: function() {

		this.sections = new Sections();
		//this.fixLinks();
		//this.disableLinks();

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

	fixLinks: function() {

		$('.fix').each( function( index ) {

			var link = $(this);
			console.log('Looping through link index: ' + index);
			var type = link.href.split('/')[1];

			switch( type )
			{

				case 'page':
				{

					console.log('Found page-link!');
					link.attr('href', '#/blog' + link.href).removeClass('fix').addClass('fixed');

				} break;

			}

		});

	}

}, 
{
	
	title: document.title,
	
	txt2name: function(text) {
		return $.trim(text).toLowerCase().replace(/\s+/g, '-');
	}

});