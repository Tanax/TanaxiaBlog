
var SectView = View.extend({
	
	activate: function( oldSect, newSect ) {

		this.init();

		var newPage = newSect.pages.get( newSect.get( 'activePage' ) );
		var newPageView = newPage.view;

		console.log('Activating section: ' + newSect.id);

		var options = {sectChanged: !!oldSect};

		if( !newSect.hasChanged( 'activePage' ) )
			newPageView.activate( null, newPage, options );

		else
		{

			var oldPage = newSect.pages.get( newSect.previous( 'activePage' ) );
			var oldPageView = oldPage.view;

			oldPageView.deactivate( oldpage, newPage, options );
			newPageView.activate( oldpage, newPage, options );

		}

		if( oldSect ) 
		{

			console.log('We have an old section, calling show()');
			this.show();

		}

	},

	deactivate: function( oldSect, newSect ) {

		var page = oldSect.pages.get( oldSect.get( 'activePage' ) );
		var pageView = page.view;

		this.hide();
		pageView.deactivate( page, null );

	},

	show: function( next ) {

		console.log('Showing the new section!');
		$('#page').animate( {top: -this.model.id * 100 + "%"}, next );

	}

});