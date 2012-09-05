
var BlogPageChanger = Page.extend({

	beforeChange: function( pageId, resourceId, fromStarter ) {

		this.clean();
		this.ajax = { url: 'http://tanaxiablog.tumblr.com' + pageId.replace( '/' + resourceId, '' ) };
		this.excludeHash = ( !fromStarter ) ? null : '/blog/page/1';

		this.checkAjax();

	},

	checkAjax: function() {

		if( Utils.prototype.hashElement( this.excludeHash ) ) this.handleAjax();

	},

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

	handleData: function( data ) {

		var content = $(data).filter('#loadedContent').html();
		var navigation = $(data).filter('#loadedNavigation').html();
		var tumblrControls = $(data).filter('#tumblr_controls').html();

		$('#loadedContent').html( content );
		$('#loadedNavigation').html( navigation );
		$('#loadedTumblrControls').html( tumblrControls );

	},

	clean: function() {

		this.ajax 		 = null;
		this.excludeHash = null;

	}

});