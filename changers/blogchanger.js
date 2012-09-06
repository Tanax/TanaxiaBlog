
var BlogChanger = Page.extend({

	beforeChange: function( fromStarter ) {

		this.clean();

		var hash = hasher.getHash();
		
		this.ajax = { url: 'http://tanaxiablog.tumblr.com' + hash.min };
		this.excludeHash = ( !fromStarter ) ? null : '/blog/page/1';
		this.element = hash.names.page_cid;

		this.checkAjax();

	},

	checkAjax: function() {

		if( Utils.prototype.hashElement( this.element, this.excludeHash ) ) this.handleAjax();

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
		var tumblrControls = $(data).filter('#tumblr_controls');

		$('#loadedContent').html( content );
		$('#loadedNavigation').html( navigation );
		tumblrControls.appendTo('#loadedTumblrControls');

	},

	clean: function() {

		this.ajax 		 = null;
		this.excludeHash = null;
		this.element 	 = null;

	}

});