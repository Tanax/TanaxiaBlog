document.domain = 'tumblr.com';

// Setup the sections, pages and views
var setup = {

	message: {
		options: { id: 0 },
		view: { options: { name: 'MessageSectionView' } },
		changer: { options: { name: 'MessageChanger' } },
		pages: {
			'/message': {
				options: { setActive: true },
				view: { options: { name: 'MessageView', el: '#message' } }
			}
		}
	},

	blog: {
		options: { id: 1 },
		view: { options: { name: 'BlogSectionView' } },
		changer: { options: { name: 'BlogPageChanger' } }/*,
		pages: {
			__globals__: { name: 'BlogPageView', container: '#blog' },
			'/blog/page/1': {
				options: { index: 0, setActive: true },
				view: { options: { el: '#page1' } }
			},
			'/blog/page/2': {
				options: { index: 1 },
				view: { options: { el: '#page2' } }
			}
		}*/
	},

	about: {
		options: { id: 2 },
		view: { options: { name: 'AboutSectionView' } },
		pages: {
			'/about': {
				options: { setActive: true },
				view: { options: { name: 'AboutView', el: '#about' } }
			}
		}
	},

	__view__: { options: { name: 'BlogPageNavigationView', el: '#bottom-nav-blog' } }

};

// Create the actual section-/page-/view-classes from the setup and return the sections
var sections = SVCreator.prototype.setup( setup );

// Create application
var app = new Application({ activeSect: 1 });
// Add the sections
app.sections.add( sections );

// Initialize everything
Starter.prototype.init( sections );
// Set page-location to the currently requested section in the URL
Starter.prototype.setStartSection( app.sections );

// Create router and view
var router = new AppRouter();
// Call its force change to force a change-call in the router
router.prepareForceChange();

// Create the main application view
var view = new AppView();

// Launch website
Backbone.history.start();
// Set inited to true
app.inited = true;