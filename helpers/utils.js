/** ===========================================================================
 * 
 * Utilities
 *
 * This class contains various utility-methods to perform allround tasks
 * on the website.
 * 
 * 
 * @package 	Helpers
 * @created 	Aug 31st 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var Utils = Backbone.Model.extend({
	
	/*
    |--------------------------------------------------------------------------
    | hashElement
    |--------------------------------------------------------------------------
    |
    | Checks if an element exists on the website.
    |
    */
	hashElement: function( element, hashExclude ) {

		var result = false;
		var hash = hasher.getHash();
		var div = '#' + element;

		if( $(div).length <= 0 ) result = true;
		if( hashExclude && hash.full == hashExclude ) result = false;

		return result;

	},

	/*
    |--------------------------------------------------------------------------
    | fixLinks
    |--------------------------------------------------------------------------
    |
    | Fixes all current links on the website with the class "fix". What this
    | means is that the URLs will be changed from e.g.:
    |
    | 	http://url.com/post/id 	=> http://url.com/#/blog/post/id
    |
    | This will make it so that the page doesn't need to be reloaded when
    | a link is clicked which enables all of the animations to occur.
    |
    */
	fixLinks: function() {

		$('.fix').each( function( index ) {

			var link = $(this);
			if( link == undefined || link.attr('href') == undefined ) return;

			var start = link.attr('href').replace('http://tanaxiablog.tumblr.com', '');
			var type = start.split('/')[1];

			switch( type )
			{

				case 'page': 
					link.attr('href', '#/blog' + start).removeClass('fix').addClass('fixed'); 
				break;

				case 'post':
					var remove = '/' + start.split('/')[start.split('/').length - 1];
					link.attr('href', '#/blog' + start.replace(remove, '')).removeClass('fix').addClass('fixed');
				break;

			}

		});

	},

	/*
    |--------------------------------------------------------------------------
    | insertLoaded
    |--------------------------------------------------------------------------
    |
    | Inserts AJAX-loaded(or first-time loaded) content into the website,
    | creating the neccessary view-files and page-files and inserts them
    | into the correct section.
    |
    */
	insertLoaded: function() {

		var loadedContent = $('#loadedContent').html();
		var hash = hasher.getHash();

		if( loadedContent.length > 0 && this.hashElement( hash.names.page_cid ) )
		{

			this.fixLinks();

			var element = $( '<div/>', { id: hash.names.page_cid, class: hash.names.resource_dash_page } ).hide();
			element.html( loadedContent ).appendTo( '#' + this.getContainerName( hash.names.resource_dash_page ) );

			var options = {
				options: this.getPageOptions( hash ),
				view: { options: this.getViewOptions( hash ) }
			};

			var page = ClassCreator.prototype.createPage( options );
			var section = app.getSection( hash.resource );

			if( page.object && section ) section.pages.add( page.object );

		}

	},

	/*
    |--------------------------------------------------------------------------
    | getContainerName
    |--------------------------------------------------------------------------
    |
    | Gets the correct plural container-name for whatever type is passed in.
    |
    */
	getContainerName: function( type ) {

		switch( type )
		{

			case 'blog-post':
			case 'blog-page': 
				return type + 's';
			break;

		}

	},

	insertIntoPage: function( data ) {

		var length = $('.' + data.element.class).length;
		var inserted = false;
		var that = this;

		$( '.' + data.element.class ).each( function( index, div ) {

			// If the current div is undefined, jump to next div
			if( div == undefined ) return;

			// Get the ID from the current div
			var id = $(div).attr('id');
			// Get the CID from the div-id by removing the data-type from it
			var cid = id.replace( data.page.type, '' );

			// If the current div is the last div in the container, 
			// we should insert our new div after the current div
			if( ( index + 1 ) == length && cid < data.page.cid ) 
				return !(inserted = that.insertAfter( id, data ));

			// If the current div-id is higher than the ID we want to insert, 
			// we should insert our new div before the current div
			if( cid > data.page.cid ) 
				return !(inserted = that.insertBefore( id, data ));

		});

		return this.checkInserted( inserted, data );

	},

	insertAfter: function( id, data ) {

		$(data.element.object).insertAfter( '#' + id );

		// If our new div has been inserted, return true to exit loop
		if( $( '#' + data.element.name ).length > 0 ) return true;
		return false;

	},

	insertBefore: function( id, data ) {

		$(data.element.object).insertBefore( '#' + id );

		// If our new div has been inserted, return true to exit loop
		if( $( '#' + data.element.name ).length > 0 ) return true;
		return false;

	},

	checkInserted: function( inserted, data ) {

		if( inserted ) return inserted;
		$( data.element.object ).appendTo( '#' + data.page.container );

		return true;

	},

	/*
    |--------------------------------------------------------------------------
    | getPageOptions
    |--------------------------------------------------------------------------
    |
    | Gets the page-options for whatever page-class we're creating.
    |
    */
	getPageOptions: function( hash ) {

		var options = { id: hash.full };

		switch( hash.page )
		{

			case 'page': options.index = ( hash.cid - 1 ); break;
			case 'post': options.index = hash.cid; break;

		}

		return options;

	},

	/*
    |--------------------------------------------------------------------------
    | getViewOptions
    |--------------------------------------------------------------------------
    |
    | Gets the view-options for whatever view-class we're creating.
    |
    */
	getViewOptions: function( hash ) {

		var options = {
			el: '#' + hash.names.page_cid,
			container: $('#' + hash.resource),
			name: this.capitalize( hash.resource ) + this.capitalize( hash.page ) + 'View'
		};

		return options;

	},

	/*
    |--------------------------------------------------------------------------
    | capitalize
    |--------------------------------------------------------------------------
    |
    | Capitalizes the string that's passed in.
    |
    */
	capitalize: function( string ) {

		if( string == '' || !string ) return '';
		else return string.charAt(0).toUpperCase() + string.slice(1);

	}

});

// End of utils.js