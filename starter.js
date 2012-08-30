
var Starter = Backbone.Model.extend({
	
	init: function() {

		var topBlog = {

			type: 'Top',
			id: 'top-bar-blog',
			logo: true,
			navigation: true,
			nav: {
				id: 'top-nav-blog',
				class: 'top-nav',
				items: [
					{
						class: 'message navpage-blog',
						link: { url: '#/message', text: 'Message Me' }
					},

					{
						class: 'search navpage-blog',
						link: { url: '#/search', text: 'Search Tags' }
					}
				]
			}

		};

		var bottomBlog = {

			type: 'Bottom',
			id: 'bottom-bar-blog',
			navigation: true,
			nav: {
				id: 'bottom-nav-blog',
				class: 'bottom-nav',
				items: [
					{
						class: 'earlier navpage-blog',
						link: { url: '#/blog/page/1', text: 'Page 1' }
					},

					{
						class: 'about navpage-blog',
						link: { url: '#/about', text: 'About' }
					},

					{
						class: 'older navpage-blog',
						link: { url: '#/blog/page/2', text: 'Page 2' }
					}
				]
			}

		};

		var topMessage = {

			type: 'Top',
			id: 'top-bar-message',
			logo: true,
			navigation: false

		};

		var bottomMessage = {

			type: 'Bottom',
			id: 'bottom-bar-message',
			navigation: true,
			nav: {
				id: 'bottom-nav-message',
				class: 'bottom-nav',
				items: [
					{
						class: 'message-back navpage-message',
						link: { url: '#/blog/page/1', text: 'Back To Blog' }
					}
				]
			}

		};

		var topAbout = {

			type: 'Top',
			id: 'top-bar-about',
			logo: true,
			navigation: true,
			nav: {
				id: 'nav-bar-about',
				class: 'top-nav',
				items: [
					{
						class: 'about-back navpage-about',
						link: { url: '#/blog/page/1', text: 'Back To Blog' }
					}
				]
			}

		};

		var bottomAbout = {

			type: 'Bottom',
			id: 'bottom-bar-about'

		};

		var list = [ topBlog, bottomBlog, topMessage, bottomMessage, topAbout, bottomAbout ];
		var source = $('#barTemplate').html();
		var template = Handlebars.compile(source);

		for( var i = 0; i < list.length; i++ )
		{

			var options = list[i];
			var html = template(options);

			$(html).appendTo('#page-bars');

		}

	},

	setStartSection: function( sections ) {

		// Get URL hash
		var hash = window.location.hash.replace('#', '');
		hash = AppRouter.prototype.fixPageId( hash );
		var options = { activePage: hash };
		var resource = hash.split('/')[1];

		// Loop through all sections
		sections.some( function( section ) {

			if( section.get('name') == resource ) 
				section.beforeChange( hash, resource );

			// Check if current section has the current page
			if( !section.validate( options ) )
			{

				section.setFromStarter = true;
				$('#page').css('top', -section.id * 100 + "%");

				return;

			}

		});

	}

});