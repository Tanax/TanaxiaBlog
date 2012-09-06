/*
|--------------------------------------------------------------------------
| hasher
|--------------------------------------------------------------------------
|
| Initiate the Hasher which will be responsible for fetching
| and maintaining an updated version of the current URL-hash.
|
*/
var hasher = new Hasher();

/*
|--------------------------------------------------------------------------
| setup
|--------------------------------------------------------------------------
|
| Sets up all the sections, changers, pages and views.
|
*/
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
		changer: { options: { name: 'BlogChanger' } }
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
	}

};

var sections = ClassCreator.prototype.setup( setup );

/*
|--------------------------------------------------------------------------
| application
|--------------------------------------------------------------------------
|
| Initiate the application and add the sections created above.
|
*/
var app = new Application({ activeSect: 1 });
app.sections.add( sections );

/*
|--------------------------------------------------------------------------
| Starter
|--------------------------------------------------------------------------
|
| Initiate the Starter to run start-up scripts.
|
*/
Starter.prototype.init( app.sections );
Starter.prototype.setStartSection( app.sections );

/*
|--------------------------------------------------------------------------
| app-views
|--------------------------------------------------------------------------
|
| Create the application-wide views.
|
*/
app.views.push({ 	
	name: 'tumblrControls', 
	object: ClassCreator.prototype.createView( { options: { name: 'TumblrControlsView', el: '#tumblrControls' } } ) 
});

app.views.push({
	name: 'bpnavigation',
	object: ClassCreator.prototype.createView( { options: { name: 'BlogPageNavigationView', el: '#bottom-nav-blog' } } )
});

/*
|--------------------------------------------------------------------------
| router
|--------------------------------------------------------------------------
|
| Initiate the router.
|
*/
var router = new AppRouter();
router.forceChange = true;

/*
|--------------------------------------------------------------------------
| view
|--------------------------------------------------------------------------
|
| Initiate the application-view that will be responsible for changing
| sections whenever there is an update in the URL-hash.
|
*/
var view = new AppView();

/*
|--------------------------------------------------------------------------
| launch
|--------------------------------------------------------------------------
|
| Launch the website!
|
*/
Backbone.history.start();
app.inited = true;

// End of bootstrap.js