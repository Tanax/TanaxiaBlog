
var TumblrControlsView = PageView.extend({

	activate: function() {

		var hash = hasher.getHash();

		var elementName = '#tumblrControls_' + hash.names.resource_us_page_us_cid;
		if( $(elementName).length <= 0 ) this.insert( elementName );

		this.setElement( elementName );
		this.show( true );

	},

	deactivate: function() {

		if( this.el && this.$el.attr('id') != 'tumblrControls' )
			this.hide( true );

	},

	insert: function( name ) {

		var iframe = $('#loadedTumblrControls');
		var div = $( '<div/>', { id: name.replace('#', ''), class: 'tumblr_controls' } ).hide();

		if( iframe && iframe.html().length > 0 && iframe.find('iframe') )
			div.html( iframe.find('iframe').removeAttr('id').removeAttr('style')
			.parent().html() ).appendTo('#tumblrControls');

		else 
		{

			console.log('fetching original');
			var original = $('#tumblr_controls');
			console.log(original);
			if( !original.hasClass('fixed') )
			{

				console.log('appending to page!');
				div.appendTo('#tumblrControls');
				original.appendTo(name).css('display', 'block');
				original.addClass('fixed');

			}

		}

	}

});