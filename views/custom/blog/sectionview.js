
var BlogSectionView = SectView.extend({
	
	activate: function() {

		SectView.prototype.activate.apply( this, arguments );

	},

	hide: function( next ) {

		var page = this.model.get( 'activePage' );
		var link = '#' + page;

		$('.contact-back a, .message-back a').attr('href', link);
		// Change links if we have more pages in current section
		// Disable links: app.disableLinks();

		next();

	}

});