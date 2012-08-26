
$('#top-bar-blog')
	.clone().insertBefore('#top-bar-blog').attr('id', 'top-bar-message')
	.clone().insertBefore('#top-bar-message').attr('id', 'top-bar-about');

$('#bottom-bar-blog')
	.clone().insertBefore('#bottom-bar-blog').attr('id', 'bottom-bar-message')
	.clone().insertBefore('#bottom-bar-message').attr('id', 'bottom-bar-about');

$('#top-bar-message #top-nav-blog').attr('id', 'top-nav-message');
$('#bottom-bar-message #bottom-nav-blog').attr('id', 'bottom-nav-message');

$('#top-bar-about #top-nav-blog').attr('id', 'top-nav-about');
$('#bottom-bar-about #bottom-nav-blog').attr('id', 'bottom-nav-about');

console.log(window.location.hash);

// Add the pages
var message = new Page({id: '/message'});
var blog    = new Page({id: '/'});
var about   = new Page({id: '/about'});

// Add the sections
var mSect = new Section({id: 0, activePage: message.id});
var bSect = new Section({id: 1, activePage: blog.id});
var aSect = new Section({id: 2, activePage: about.id});

// Add pages to sections
mSect.pages.add( message );
bSect.pages.add( blog );
aSect.pages.add( about );

var allSects = [
	mSect, 
	bSect, 
	aSect
];

// Get URL hash
var hash = window.location.hash;
var options = { activePage: hash.replace( '#', '' ) };
var startsection = bSect;

/*
allSects.some( function( section ) {

	console.log('Checking section id: ' + section.id);

	if( !section.validate( options ) )
	{

		console.log('This section had a matching page! Setting section as starting section.');
		section.set( options );
		startsection = section;

	}

});*/

// Create application
var app = new Application({activeSect: startsection.id});
app.sections.add(allSects);

// Create router and view
var router = new AppRouter();
var view = new AppView();

var mSectView = new MessageSectionView({model: mSect});
var messageView = new MessageView({model: message, el: $('#message')});

var bSectView = new BlogSectionView({model: bSect});
var blogView = new BlogView({model: blog, el: $('#blog')});

var aSectView = new AboutSectionView({model: aSect});
var aboutView = new AboutView({model: about, el: $('#about')});

Backbone.history.start();
app.inited = true;

// {pushState: true, root: "/" + Config.url_folder + Config.file_name}