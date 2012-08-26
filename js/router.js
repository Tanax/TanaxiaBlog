Array.prototype.find = function( search ) {

	var found = false;

	$.each( this, function() {

		if( this === search )
		{

			found = true;
			return found;

		}

	});

	return found;

}

var AppRouter = Backbone.Router.extend({
	
	routes: {
		'*path': 'match'
	},

	redirects: {
		'': '/',
		'/blog': '/'
	},

	initialize: function( options ) {

		this.clean();
		this.loadedResources = [];

	},

	fixPageId: function() {

		var id = this.page_id.replace( "/" + Config.url_folder, '' );

		if( id.charAt(0) !== '/' ) id = '/' + id;
		if( id in this.redirects ) id = this.redirects[id];

		this.page_id = id;

	},

	getResourceId: function() {

		this.resource_id = this.page_id.replace( '/', '' );

		if( this.resource_id == '' ) this.resource_id = 'blog';

	},

	match: function( pageId ) {

		this.page_id = pageId;

		console.log("PageID: " + this.page_id);

		this.fixPageId();

		console.log("PageID after fix: " + this.page_id);

		this.getResourceId();

		console.log("ResourceID: " + this.resource_id);

		if( this.shouldAjax() ) this.handleAjax();
		else this.makeChange();

	},

	shouldAjax: function() {

		/*var id = this.resource_id;
		if( id == '' ) id = this.page_id;

		if( $.inArray( id, this.loadedResources ) != -1 )
			return false;

		return true;*/
		return false;

	},

	handleAjax: function() {

		console.log('We should handle AJAX!');
		// Handle this later

	},

	makeChange: function() {

		var attributes = {activePage: this.page_id};
		console.log('Setting active page to: ' + this.page_id);

		//this.handleResourceSpecific();

		var $this = this;

		app.sections.some( function( section ) {

			if( !section.validate( attributes ) )
			{

				section.set( attributes, {silent: true} );
				app.set( {activeSect: section.id}, {silent: true} );

				console.log('Setting active section to: ' + section.id);

				$this.clean();

				console.log('Calling change!');
				app.change();
				section.change();

				return true;

			}

		});

	},

	clean: function() {

		this.resource_id = null;
		this.page_id 	 = null;

	}

});