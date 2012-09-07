/** ===========================================================================
 * 
 * Starter
 *
 * Takes care of startup things.
 * 
 * 
 * @package 	Helpers
 * @created 	Aug 30th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var Starter = Backbone.Model.extend({
	
	/*
    |--------------------------------------------------------------------------
    | init
    |--------------------------------------------------------------------------
    |
    | Appends all header and footer bars.
    |
    */
	init: function( sections ) {

		this.appendBars();

	},

	/*
    |--------------------------------------------------------------------------
    | setStartSection
    |--------------------------------------------------------------------------
    |
    | Sets the #page css-option based on the hash. This is what makes it
    | possible to refresh a page with a hash and still have it load with that
    | page as a starting page without having to first load the index-page and
    | then have it animate to the page we want to load.
    |
    */
	setStartSection: function( sections ) {

		var hash = hasher.getHash();
		var section = AppRouter.prototype.makeChange( hash, true, true );

		if( section )
		{

			section.fromStarter = true;
			$('#page').css('top', -section.id * 100 + '%');

		}

	},

	/*
    |--------------------------------------------------------------------------
    | appendBars
    |--------------------------------------------------------------------------
    |
    | Finds the barTemplate and appends all bars to the website.
    |
    */
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
								url: '', 
								text: '<del>About</del>',
								onclick: 'alert("Coming soon"); return false;'
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

	}

});

// End of starter.js