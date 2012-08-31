
var BlogPageChanger = Page.extend({
	
	beforeChange: function( pageId, resourceId ) {

		this.clean();

		this.resourceId   = resourceId;
		this.page 		  = pageId.replace( '/' + this.resourceId, '' ).replace( '/page', '' ).replace( '/', '' );
		this.element_name = 'page' + this.page;

		if( this.shouldAjax() ) 
			this.handleAjax();

		console.log('End of beforeChange');

	},

	shouldAjax: function() {

		if( $( 'div #' + this.element_name ).length != 0 )
			return false;

		return true;

	},

	handleAjax: function() {

		console.log('We should AJAX!');
		this.element = $('<div/>', { id: this.element_name, class: 'blog-page' }).hide();

		var that = this;
		$.ajax({

			url: 'http://tanaxiablog.tumblr.com/page/' + that.page,
			success: function( data, textStatus, jqXHR ) {

				// Add the new data 
				that.processData( data );

			}

		});

		// Do AJAX call here and insert into the element

		/*
		this.insertElement();*/

	},

	processData: function( data ) {

		var nData = $(data);
		var find = nData.find('#loadedContent');
		console.log(data);
		console.log( nData );
		console.log( find );
		console.log( find.html() );
		console.log( find.text() );

	},

	insertBefore: function( page ) {

		$(this.element).insertBefore( 'div #page' + page );
		this.found = true;

	},

	insertAfter: function( page ) {

		$(this.element).insertAfter( 'div #page' + page );
		this.found = true;

	},

	insertElement: function() {

		var that = this;
		var length = $('.blog-page').length;
		var inserted = false;

		$('.blog-page').each( function( index, div ) {

			var page = $(div).attr('id').replace( 'page', '' );

			if( page > that.page ) that.insertBefore( page );
			else if( ( index + 1 ) == length ) that.insertAfter( page );

			if( that.found )
			{
		
				var options = {

					options: { id: '/' + that.resourceId + '/' + that.page, index: ( that.page - 1 ) },
					view: {
						options: { el: that.element, container: $('#blog'), name: 'BlogPageView' }
					}
				};

				var page = SVCreator.prototype.createPage( options );
				var section = app.getSection( 'blog' );

				if( page && section ) section.pages.add( page );

				return inserted = true;

			}

		});

		if( !inserted ) $(this.element).appendTo('.blog-pages');

	},

	clean: function() {

		this.page 			= null,
		this.element_name 	= null,
		this.element 		= null;
		this.firstElement	= null;
		this.resourceId		= null;
		this.found			= false;

	}

});