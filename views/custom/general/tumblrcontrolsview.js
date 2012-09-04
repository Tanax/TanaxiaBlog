
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

		var iframe = $('#loadedTumblrControls').html();
		var div = $( '<div/>', { id: name.replace('#', ''), class: 'tumblr_controls' } ).hide();

		if( iframe && iframe.length > 0 ) div.html( iframe ).appendTo('#tumblrControls');

	}

});