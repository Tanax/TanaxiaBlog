
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
		var request = $.ajax({

			url: that.ajax.url,
			success: function( data ) { that.handleData( data ); }

		});

		console.log('Beginning When');
		$.when( request() ).done( function() {

			console.log('AJAX-Request done!');

		});
		console.log('Ending When');

	},

	handleData: function( data ) {

		console.log('Handling data');
		var content = $(data).filter('#loadedContent').html();
		var earlier = $(data).filter('.earlier').html();
		var older   = $(data).filter('.older').html();

		$('#loadedContent').html( content );
		$('#loadedNavigation').html( earlier + older );

		Utils.prototype.fixLinks();
		this.ready = true;

	},

	clean: function() {

		this.ajax = null;

	}

});