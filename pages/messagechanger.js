
var MessageChanger = Page.extend({
	
	beforeChange: function( pageId, resourceId, fromStarter ) {

		this.clean();
		this.ajax = { url: 'http://tanaxiablog.tumblr.com/ask' };

		this.checkAjax();

	},

	checkAjax: function() {

		if( $('#message-ask').length <= 0 ) this.handleAjax();

	},

	handleAjax: function() {

		$('#loadedContent').empty();
		$('#loadedNavigation').empty();

		var that = this;
		$.ajax({

			url: that.ajax.url,
			async: false,
			success: function( data ) { that.handleData( data ); }

		});

	},

	handleData: function( data ) {

		var content = $(data).filter('#loadedContent').html();
		var div = $( '<div/>', { id: 'message-ask' } );

		div.html( content );
		$('#message').append( div );

	},

	clean: function() {

		this.ajax = null;

	}

});