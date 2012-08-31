
var BlogPageChanger = Page.extend({
	
	beforeChange: function( pageId, resourceId ) {

		this.clean();

		this.resourceId   = resourceId;
		this.page 		  = pageId.replace( '/' + this.resourceId, '' ).replace( '/page', '' ).replace( '/', '' );
		this.element_name = 'page' + this.page;

		if( this.shouldAjax() ) 
			this.handleAjax();

		else console.log('We should not AJAX since this element already exists');

		console.log('End of beforeChange');

	},

	shouldAjax: function() {

		console.log('Checking if element exists: div #' + this.element_name);
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

		this.insertElement();
		Application.prototype.fixLinks();

	},

	processData: function( data ) {

		var insert = $(data).filter('#loadedContent').html();
		this.element.html( insert );

	},

	insertBefore: function( page ) {

		$(this.element).insertBefore( 'div #page' + page );
		this.found = true;

	},

	insertAfter: function( page ) {

		$(this.element).insertAfter( 'div #page' + page );
		this.found = true;

	},

	insertInto: function() {

		$(this.element).appendTo('.blog-pages');

	},

	insertElement: function() {

		var that = this;
		var length = $('.blog-page').length;
		var inserted = false;

		$('.blog-page').each( function( index, div ) {

			var page = $(div).attr('id').replace( 'page', '' );

			if( page > that.page ) that.insertBefore( page );
			else if( ( index + 1 ) == length ) that.insertAfter( page );

			if( that.found ) return inserted = true;

		});

		if( !inserted ) this.insertInto();

		this.addPage();
		this.found = false;

	},

	addPage: function() {

		var options = {

			options: { id: '/' + this.resourceId + '/page/' + this.page, index: ( this.page - 1 ) },
			view: {
				options: { el: '#' + this.element.attr('id'), container: $('#blog'), name: 'BlogPageView' }
			}
		};

		var page = SVCreator.prototype.createPage( options );
		var section = app.getSection( 'blog' );

		if( page.object && section ) section.pages.add( page.object );

	},

	clean: function() {

		console.log('Cleaning up!');
		this.page 			= null,
		this.element_name 	= null,
		this.element 		= null;
		this.firstElement	= null;
		this.resourceId		= null;
		this.found			= false;
		$('#loadedContent').empty();

	}

});