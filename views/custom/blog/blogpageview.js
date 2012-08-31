
var BlogPageView = PageView.extend({

	activate: function( oldPage, newPage, options ) {

		this.init();

		console.log('Woho');

		// If change from antoher page in the same sect
		if( oldPage ) 
		{

			console.log('OLDPAGE!');

			// Animate if sect has changed and app has inited
			var animate = !options.sectChanged && app.inited;

			// If change from portfolio page
			if( oldPage.view instanceof BlogPageView ) 
			{
				
				//projNavView.activate(oldPage, newPage, options);
				var side = this._side(oldPage, newPage);
				this.show( 'slideIn', side, animate );

			}

		}

		else 
		{

			var animate = options.starter + !options.sectChanged;
			this.show( 'fadeIn', animate );

		}

	},

	deactivate: function( oldPage, newPage, options ) {
		
		//projNavView.deactivate(oldPage, newPage, options);

		// If change to antoher page in the same sect
		if( newPage ) 
		{

			var animate = !options.sectChanged && app.inited;

			// If change to portfolio page
			if( newPage.view instanceof BlogPageView ) 
			{

				var side = this._side( oldPage, newPage );
				this.hide( 'slideOut', side, animate );

			}
		}

	},

	// Is the old project at left or right side of the new project
	_side: function( oldPage, newPage ) {

		return oldPage.get('index') < newPage.get('index') ? 'left' : 'right';

	},

	show: function( fx ) {

		var args = slice.call( arguments, 1 );
		this[fx].apply( this, args );

	},

	hide: function( fx ) {

		var args = slice.call( arguments, 1 );
		this[fx].apply( this, args );

	},

	slideIn: function( toSide, animate, next ) {

		//var $el = $(this.el);
		var $this = this;
		console.log('Sliding in to ' + toSide);

		if( animate ) 
		{

			var width = this.$el.width();

			var startProps = {

				position: 'absolute'
				//top: $(projNavView.el).outerHeight(true)

			};

			startProps['top'] = $('.page-header', this.container).outerHeight(true);
			startProps[toSide] = '50%';
			startProps['margin-' + toSide] = width * 0.5;

			var endProps = {

				opacity: 'show'

			};

			endProps['margin-' + toSide] = -width * 0.5;;

			var resetProps = {

				position: 'static',
				marginLeft: 'auto',
				marginRight: 'auto',
				top: 'auto'

			};

			resetProps[toSide] = 'auto';

			this.$el.css(startProps).animate( endProps, function() {

				$this.$el.css(resetProps);
				next();

			});

		} 

		else 
		{

			this.$el.show();
			next();

		}		
	},

	// Call next() immediately
	slideOut: function( toSide, animate, next ) {

		//var $el = $(this.el);

		var $this = this;

		if( animate ) 
		{

			var width = this.$el.width();
			var startProps = {

				position: 'relative'

			};

			startProps[toSide] = 0;

			var endProps = {

				opacity: 'hide'

			};

			endProps[toSide] = -width;

			var resetProps = {

				position: 'static'

			};

			resetProps[toSide] = 'auto';

			this.$el.css(startProps).animate( endProps, function() {

				$this.$el.css(resetProps);

			});

			next();

		} 

		else 
		{	

			this.$el.hide();
			next();

		}		

	}

});