
var TumblrControlsView = PageView.extend({

	activate: function() {

		var hash = nexus.getHash();

		var elementName = '#tumblrControls_' + hash.resource;
		if( hash.page != undefined ) elementName += '_' + hash.page;
		if( hash.cid != undefined ) elementName += '_' + hash.cid;

		if( $(elementName).length <= 0 ) 
			this.insert( elementName );

		this.show( true );

	},

	deactivate: function() {

		this.hide( true );

	},

	insert: function( name ) {

		console.log('We should insert new TumblrControls with name: ' + name);
		var iframe = $('#loadedTumblrControls').html();
		var div = $( '<div/>', { id: name, class: 'tumblr_controls' } ).hide();

		if( iframe && iframe.length > 0 ) 
		{

			div.html( iframe ).appendTo('#tumblrControls');
			this.setElement( name );

		}

	}

});