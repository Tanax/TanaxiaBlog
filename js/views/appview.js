
var AppView = Backbone.View.extend({
	
	initialize: function( option ) {

		app.bind( 'change', _.bind( this.changeSect, this ) );

	},

	changeSect: function() {

		var newSect = app.sections.get( app.get('activeSect' ) );
		var newSectView = newSect.view;

		if( !app.hasChanged( 'activeSect' ) )
			newSectView.activate( null, newSect );

		else
		{

			var oldSect = app.sections.get( app.previous( 'activeSect' ) );
			var oldSectView = oldSect.view;

			newSectView.activate( oldSect, newSect );
			oldSectView.deactivate( oldSect, newSect );

		}

	}

});