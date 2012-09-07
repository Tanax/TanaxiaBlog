/** ===========================================================================
 * 
 * TumblrControlsView
 *
 * The view for the Tumblr Controls. Handles things regarding these controls.
 * 
 * 
 * @package 	Views - Custom - General
 * @created 	Sep 4th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var TumblrControlsView = PageView.extend({

	/*
    |--------------------------------------------------------------------------
    | activate
    |--------------------------------------------------------------------------
    |
    | Called whenever this view is activated.
    |
    */
	activate: function() {

		var hash = hasher.getHash();

		var elementName = '#tumblrControls_' + hash.names.resource_us_page_us_cid;
		if( $(elementName).length <= 0 ) this.insert( elementName );

		this.setElement( elementName );
		this.show( true );

	},

	/*
    |--------------------------------------------------------------------------
    | deactivate
    |--------------------------------------------------------------------------
    |
    | Called whenever this view is deactivated.
    |
    */
	deactivate: function() {

		if( this.el && this.$el.attr('id') != 'tumblrControls' )
			this.hide( true );

	},

	/*
    |--------------------------------------------------------------------------
    | insert
    |--------------------------------------------------------------------------
    |
    | Inserts loaded Tumblr Controls into the website.
    |
    */
	insert: function( name ) {

		var iframe = $('#loadedTumblrControls');
		var div = $( '<div/>', { id: name.replace('#', ''), class: 'tumblr_controls' } ).hide();

		if( iframe && iframe.html().length > 0 && iframe.find('iframe').attr('id') != undefined )
			div.html( iframe.find('iframe').removeAttr('id').removeAttr('style').parent().html() )
			.appendTo('#tumblrControls');

		else 
		{

			var original = $('#tumblr_controls');
			if( !original.hasClass('fixed') )
			{

				div.appendTo('#tumblrControls');
				original.appendTo(name).css('display', 'block');
				original.addClass('fixed');

			}

		}

	}

});

// End of tumblrcontrolsview.js