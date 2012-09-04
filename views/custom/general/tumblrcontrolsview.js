
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

		console.log('Trying to deactivate ID: ' + this.$el.attr('id'));
		if( this.el && this.$el.attr('id') != 'tumblrControls' )
			this.hide( true );

		else console.log('Did not deactivate it');

	},

	insert: function( name ) {

		console.log('We should insert new TumblrControls with name: ' + name);

		var iframe = $('#loadedTumblrControls').html();
		var div = $( '<div/>', { id: name, class: 'tumblr_controls' } ).hide();

		if( iframe && iframe.length > 0 ) 
		{

			div.html( iframe ).appendTo('#tumblrControls');
			if( $(name).length > 0 ) console.log('Element has been created! Setting el to new element');
			

		}

	}

});