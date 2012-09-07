/** ===========================================================================
 * 
 * BlogChanger
 *
 * The changer for the blog-section. Takes care of everything that should
 * happen before a change to or within the blog-section.
 * 
 * 
 * @package 	Changers
 * @created 	Aug 30th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var BlogChanger = Page.extend({

	/*
    |--------------------------------------------------------------------------
    | beforeChange
    |--------------------------------------------------------------------------
    |
    | Called from the section the changer is registered to.
    |
    */
	beforeChange: function( fromStarter ) {

		this.clean();

		var hash = hasher.getHash();
		
		this.ajax = { url: 'http://tanaxiablog.tumblr.com' + hash.min };
		this.excludeHash = ( !fromStarter ) ? null : '/blog/page/1';
		this.element = hash.names.page_cid;

		this.checkAjax();

	},

	/*
    |--------------------------------------------------------------------------
    | checkAjax
    |--------------------------------------------------------------------------
    |
    | Checks if we need to use AJAX to request the page the user want
    | to see as indicated by the URL-hash.
    |
    */
	checkAjax: function() {

		if( Utils.prototype.hashElement( this.element, this.excludeHash ) ) this.handleAjax();

	},

	/*
    |--------------------------------------------------------------------------
    | handleAjax
    |--------------------------------------------------------------------------
    |
    | Handles the AJAX-call if a call is necessary.
    |
    */
	handleAjax: function() {

		$('#loadedContent').empty();
		$('#loadedNavigation').empty();
		$('#loadedTumblrControls').empty();

		var that = this;
		$.ajax({

			url: that.ajax.url,
			async: false,
			success: function( data ) { that.handleData( data ); }

		});

	},

	/*
    |--------------------------------------------------------------------------
    | handleData
    |--------------------------------------------------------------------------
    |
    | Handles the data returned by the AJAX-call.
    |
    */
	handleData: function( data ) {

		var content = $(data).filter('#loadedContent').html();
		var navigation = $(data).filter('#loadedNavigation').html();
		var tumblrControls = $(data).filter('#tumblr_controls');

		$('#loadedContent').html( content );
		$('#loadedNavigation').html( navigation );
		tumblrControls.appendTo('#loadedTumblrControls');

	},

	/*
    |--------------------------------------------------------------------------
    | clean
    |--------------------------------------------------------------------------
    |
    | Cleans internal variables.
    |
    */
	clean: function() {

		this.ajax 		 = null;
		this.excludeHash = null;
		this.element 	 = null;

	}

});

// End of blogchanger.js