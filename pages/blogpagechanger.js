
var BlogPageChanger = Page.extend({

	beforeChange: function( pageId, resourceId ) {

		this.clean();
		this.ajax = { url: 'http://tanaxiablog.tumblr.com' + pageId.replace( '/' + resourceId, '' ) };

		this.checkAjax();

	},

	checkAjax: function() {

		console.log('Checking if we should AJAX current page!');
		if( Utils.prototype.hashElement( '/blog/page/1' ) ) this.handleAjax();

	},

	handleAjax: function() {

		$('#loadedContent').empty();
		$('#loadedNavigation').empty();

		var that = this;
		this.ready = false;
		$.ajax({

			url: that.ajax.url,
			async: false,
			success: function( data ) { that.handleData( data ); }

		});

	},

	handleData: function( data ) {

		console.log('Handling data');
		var content = $(data).filter('#loadedContent').html();
		var navigation = $(data).filter('#loadedNavigation').html();

		$('#loadedContent').html( content );
		$('#loadedNavigation').html( navigation );

		Utils.prototype.fixLinks();
		this.ready = true;

	},

	clean: function() {

		this.ajax = null;

	}

});