
var BlogPostView = PageView.extend({

	activate: function( oldPage, newPage, options ) {

		this.init();

		// If change from antoher page in the same sect
		if( oldPage ) 
		{

			// Animate if sect has changed and app has inited
			var animate = !options.sectChanged && app.inited;

			// If change from portfolio page
			if( oldPage.view instanceof BlogPageView ) 
				this.show( 'fadeIn', animate );

		}

		else 
		{

			var animate = options.starter + !options.sectChanged;
			this.show( 'fadeIn', animate );

		}

	},

	deactivate: function( oldPage, newPage, options ) {

		// If change to antoher page in the same sect
		if( newPage ) 
		{

			var animate = !options.sectChanged && app.inited;

			// If change to portfolio page
			if( newPage.view instanceof BlogPageView ) 
				this.show( 'fadeOut', animate );
			
		}

	},

	show: function( fx ) {

		var args = slice.call( arguments, 1 );
		this[fx].apply( this, args );

	},

	hide: function( fx ) {

		var args = slice.call( arguments, 1 );
		this[fx].apply( this, args );

	}

});