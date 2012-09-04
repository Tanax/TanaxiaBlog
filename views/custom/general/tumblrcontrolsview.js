
var TumblrControlsView = PageView.extend({

	activate: function() {

		var hash = nexus.getHash();

		var elementName = '#tumblrControls_' + hash.resource;
		if( hash.page != undefined ) elementName += '_' + hash.page;
		if( hash.cid != undefined ) elementName += '_' + hash.cid;

		if( $(elementName).length <= 0 ) 
			this.insert( elementName );

		if( this.$el.attr('style') == 'display: none;' ) this.show( true );
		console.log('Style1: ' + this.$el.attr('style'));

	},

	deactivate: function() {

		console.log('ID: ' + this.$el.attr('id'));
		console.log('Style2: ' + this.$el.attr('style'));
		if( this.el && this.$el.attr('id') != 'tumblrControls' )
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
			console.log('Style3: ' + this.$el.attr('style'));
			if( this.$el.attr('style') == 'display: none;' ) this.show( true );

		}

	}

});