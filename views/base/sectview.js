
var SectView = View.extend({
	
	activate: function( oldSect, newSect ) {

		this.init();

		var newPage = newSect.pages.get( newSect.get( 'activePage' ) );
		var newPageView = newPage.view;

		var options = {sectChanged: !!oldSect, starter: ( app.sections.get( newSect.id ).fromStarter == true )};

		if( !newSect.hasChanged( 'activePage' ) || options.starter == true )
			newPageView.activate( null, newPage, options );

		else
		{

			var oldPage = newSect.pages.get( newSect.previous('activePage') );
			var oldPageView = oldPage.view;

			oldPageView.deactivate( oldPage, newPage, options );
			newPageView.activate( oldPage, newPage, options );

		}

		if( oldSect ) this.show();
		if( options.starter ) app.sections.get( newSect.id ).fromStarter = false;

	},

	deactivate: function( oldSect, newSect ) {

		var page = oldSect.pages.get( oldSect.get( 'activePage' ) );
		var pageView = page.view;

		this.hide();
		pageView.deactivate( page, null );

	},

	show: function( next ) {

		$('#page').animate( {top: -this.model.id * 100 + "%"}, next );

	}

});