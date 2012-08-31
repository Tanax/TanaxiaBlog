
var Utils = Backbone.Model.extend({
	
	hashElement: function( hashExclude ) {

		var result = false;
		var hash = AppRouter.prototype.fixPageId( window.location.hash.replace('#', '') );
		var resource = hash.split('/')[1];

		var remove = '/' + resource + '/';
		var div = '#' + hash.replace( remove, '' ).replace( '/', '' );

		if( $(div).length <= 0 ) result = true;
		if( hashExclude && hash == hashExclude ) result = false;

		console.log('HashElement returning: ' + result);
		return result;

	},

	fixLinks: function() {

		$('.fix').each( function( index ) {

			var link = $(this);
			if( link == undefined || link.attr('href') == undefined ) return;

			var start = link.attr('href').replace('http://tanaxiablog.tumblr.com', '');
			var type = start.split('/')[1];

			switch( type )
			{

				case 'page': 
					link.attr('href', '#/blog' + start).removeClass('fix').addClass('fixed'); 
				break;

				case 'post':
					var remove = '/' + start.split('/')[start.split('/').length - 1];
					link.attr('href', '#/blog' + start.replace(remove, '')).removeClass('fix').addClass('fixed');
				break;

			}

		});

	},

	insertLoaded: function( pageId, resourceId ) {

		var loadedContent = $('#loadedContent').html();

		console.log('Checking if we should insert currently loaded data!');
		if( loadedContent.length > 0 && this.hashElement() )
		{

			this.fixLinks();

			console.log('Inserting data..');
			var data = {
				section: { name: resourceId },
				page: { 
					id_full: pageId, 
					id_min: pageId.replace( '/' + resourceId, '' )
				},
				element: {}
			};

			data.page.type = data.page.id_min.split( '/' )[1];
			data.page.cid = data.page.id_min.replace( '/' + data.page.type, '' ).replace( '/', '' );
			data.page.container = this.getContainerName( data );

			data.element.name = data.page.type + data.page.cid;
			data.element.class = data.section.name + '-' + data.page.type;

			data.element.object = $( '<div/>', { id: data.element.name, class: data.element.class } ).hide();
			data.element.object.html( loadedContent );

			console.log(data);

			if( this.insertIntoPage( data ) )
			{

				var options = {

					options: this.getPageOptions( data ),
					view: {
						options: this.getViewOptions( data )
					}
				};

				console.log('Page and view data:');
				console.log(options);

				var page = SVCreator.prototype.createPage( options );
				var section = app.getSection( data.section.name );

				if( page.object && section ) section.pages.add( page.object );

			}

		}

	},

	getContainerName: function( data ) {

		var type = data.section.name + '-' + data.page.type;
		switch( type )
		{

			case 'blog-post':
			case 'blog-page': 
				return type + 's';
			break;

		}

	},

	insertIntoPage: function( data ) {

		var length = $('.' + data.page.container).length;
		var inserted = false;
		var that = this;

		$( '.' + data.element.class ).each( function( index, div ) {

			// If the current div is undefined, jump to next div
			if( div == undefined ) return;

			// Get the ID from the current div
			var id = $(div).attr('id');
			// Get the CID from the div-id by removing the data-type from it
			var cid = id.replace( data.page.type, '' );

			// If the current div is the last div in the container, 
			// we should insert our new div after the current div
			if( ( index + 1 ) == length ) that.insertAfter( id, data );

			// If the current div-id is less than the ID we want to insert, jump to next div
			if( cid < data.page.cid ) return;

			// If the current div-id is higher than the ID we want to insert, 
			// we should insert our new div before the current div
			if( cid > data.page.cid ) that.insertBefore( id, data );

			// If our new div has been inserted, return true to exit loop
			if( $( '#' + data.element.name ).length > 0 ) return inserted = true;

		});

		return this.checkInserted( inserted, data );

	},

	insertAfter: function( id, data ) {

		$(data.element.object).insertAfter( '#' + id );

	},

	insertBefore: function( id, data ) {

		$(data.element.object).insertBefore( '#' + id );

	},

	checkInserted: function( inserted, data ) {

		console.log('Check inserted status: ' + inserted);
		if( inserted ) return inserted;
		$( data.element.object ).appendTo( '#' + data.page.container );

		return true;

	},

	getPageOptions: function( data ) {

		var options = {
			id: data.page.id_full
		};

		switch( data.page.type )
		{

			case 'page': options.index = ( data.page.cid - 1 ); break;

		}

		return options;

	},

	getViewOptions: function( data ) {

		var options = {
			el: '#' + data.element.name,
			container: $('#' + data.section.name),
			name: this.capitalize( data.section.name ) + this.capitalize( data.page.type ) + 'View'
		};

		return options;

	},

	capitalize: function( string ) {

		if( string == '' || !string ) return '';
		else return string.charAt(0).toUpperCase() + string.slice(1);

	}

});