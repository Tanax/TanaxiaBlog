
var Starter = Backbone.Model.extend({
	
	init: function( sections ) {

		this.appendBars();

		//if( $('.earlier').length > 0 ) $('.earlier').appendTo('#bottom-nav-blog ul');
		//if( $('.older')  .length > 0 ) $('.older')  .appendTo('#bottom-nav-blog ul');

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

	},

	appendBars: function() {

		var topBlog = {

			bar: {
				type: 'Top',
				id: 'top-bar-blog',
				logo: true,
				navigation: true,
				nav: {
					id: 'top-nav-blog',
					class: 'top-nav',
					items: [
						{
							item: {
								class: 'message navpage-blog',
								url: '#/message', 
								text: 'Message Me' 
							}
						},

						{
							item: {
								class: 'search navpage-blog',
								url: '#/search', 
								text: 'Search Tags' 
							}
						}
					]
				}

			}

		};

		var bottomBlog = {

			bar: {
				type: 'Bottom',
				id: 'bottom-bar-blog',
				navigation: true,
				nav: {
					id: 'bottom-nav-blog',
					class: 'bottom-nav',
					items: [

						{
							item: {
								class: 'about navpage-blog',
								url: '#/about', 
								text: 'About' 
							}
						}
					]
				}
			}

		};

		var topMessage = {

			bar: {
				type: 'Top',
				id: 'top-bar-message',
				logo: true,
				navigation: false
			}

		};

		var bottomMessage = {

			bar: {
				type: 'Bottom',
				id: 'bottom-bar-message',
				navigation: true,
				nav: {
					id: 'bottom-nav-message',
					class: 'bottom-nav',
					items: [
						{
							item: {
								class: 'message-back navpage-message',
								url: '#/blog/page/1', 
								text: 'Back To Blog' 
							}
						}
					]
				}
			}

		};

		var topAbout = {

			bar: {
				type: 'Top',
				id: 'top-bar-about',
				logo: true,
				navigation: true,
				nav: {
					id: 'nav-bar-about',
					class: 'top-nav',
					items: [
						{
							item: {
								class: 'about-back navpage-about',
								url: '#/blog/page/1', 
								text: 'Back To Blog' 
							}
						}
					]
				}
			}

		};

		var bottomAbout = {

			bar: {
				type: 'Bottom',
				id: 'bottom-bar-about'
			}

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

		console.log('Appended all bars!');

	}

});