
var BlogPageNavigationView = PageView.extend({

	activate: function( oldPage, newPage, options ) {

		var oldNav = $('#bottom-nav-blog ul .activeNav');
		if( oldNav.html() ) oldNav.removeClass('activeNav').animate({opacity: 0}, 'slow', function() { oldNav.css({'display': 'none'}); });

		var navName = resourceId + '-' + type + '-' + cid;
		var loaded = app.getLoadedNav( navName );

		if( loaded ) $('#bottom-nav-blog ul .' + loaded).addClass('activeNav').attr('style', '').css({'opacity': 0}).animate({opacity: 1}, 'slow');
		else if( loadedNavigation.length > 0 && resourceId == 'blog' && type == 'page' )
		{

			var older = $('#loadedNavigation .older');
			var newer = $('#loadedNavigation .earlier');

			if( newer.html() ) newer.css({'opacity': 0}).appendTo('#bottom-nav-blog ul').addClass(navName).addClass('activeNav').animate({opacity: 1}, 'slow');
			if( older.html() ) older.css({'opacity': 0}).appendTo('#bottom-nav-blog ul').addClass(navName).addClass('activeNav').animate({opacity: 1}, 'slow');

			if( newer.html() || older.html() ) app.loadedNav.push(navName);

		}

	}

});