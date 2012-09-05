
var TumblrControlsView = PageView.extend({

	activate: function() {

		var hash = nexus.getHash();

		var elementName = '#tumblrControls_' + hash.resource;
		if( hash.page != undefined ) elementName += '_' + hash.page;
		if( hash.cid != undefined ) elementName += '_' + hash.cid;

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

		if( iframe && iframe.html().length > 0 )
		{

			iframe.removeAttr('id');
			div.html( iframe.html() ).appendTo('#tumblrControls');
			console.log('Removing attr id');

		}

		else 
		{

			var original = $('#tumblr_controls');
			if( !original.hasClass('fixed') )
			{

				div.appendTo('#tumblrControls');
				original.appendTo(name).css('display', 'block');
				original.addClass('fixed');

			}

		}

	}

});