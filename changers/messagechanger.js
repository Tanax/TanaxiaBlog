/** ===========================================================================
 * 
 * MessageChanger
 *
 * The changer for the message-section. Takes care of everything that should
 * happen before a change to or within the message-section.
 * 
 * 
 * @package 	Changers
 * @created 	Aug 30th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var MessageChanger = Page.extend({
	
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
		this.ajax = { url: 'http://tanaxiablog.tumblr.com/ask' };

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

		if( $('#message-ask').length <= 0 ) this.handleAjax();

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
		var div = $( '<div/>', { id: 'message-ask' } );
		var tumblrControls = $(data).filter('#tumblr_controls');

		div.html( content );
		$('#message').append( div );
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

		this.ajax = null;

	}

});

// End of messagechanger.js