/** ===========================================================================
 * 
 * AboutSectionView
 *
 * The view for the about-section. Handles things whenever this section is
 * activated or interacted with in any way.
 * 
 * 
 * @package 	Views - Custom - About
 * @created 	Aug 30th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var AboutSectionView = SectView.extend({
	
	/*
    |--------------------------------------------------------------------------
    | activate
    |--------------------------------------------------------------------------
    |
    | Called whenever this view is activated.
    |
    */
	activate: function() {

		SectView.prototype.activate.apply( this, arguments );

	},

	/*
    |--------------------------------------------------------------------------
    | hide
    |--------------------------------------------------------------------------
    |
    | Method used to hide a view.
    |
    */
	hide: function( next ) {

		var page = this.model.get( 'activePage' );
		var link = Config.url_full + page;

		// Change links if we have more pages in current section
		// Disable links: app.disableLinks();

		next();

	}

});

// End of sectionview.js