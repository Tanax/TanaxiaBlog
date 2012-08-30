
var MessageSectionView = SectView.extend({
	
	activate: function() {

		SectView.prototype.activate.apply( this, arguments );

	},

	hide: function( next ) {

		var page = this.model.get( 'activePage' );
		var link = Config.url_full + page;

		// Change links if we have more pages in current section
		// Disable links: app.disableLinks();

		next();

	}

});