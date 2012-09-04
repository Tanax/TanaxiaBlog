/** ===========================================================================
 * 
 * AppView
 *
 * The main application's view-controller. Handles the switching between
 * different section's view-controllers. The section's view-controller in
 * turn is responsible for handling switching between and/or showing the
 * different pages in that current section.
 * 
 * 
 * @package 	Views
 * @created 	Aug 29th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var AppView = Backbone.View.extend({
	
	/*
    |--------------------------------------------------------------------------
    | initialize
    |--------------------------------------------------------------------------
    |
    | Binds the "change" -event for the app-model to this view-controller's
    | function called "changeSect".
    |
    */
	initialize: function( option ) {

		app.bind( 'change', _.bind( this.changeSection, this ) );

	},

	/*
    |--------------------------------------------------------------------------
    | changeSection
    |--------------------------------------------------------------------------
    |
    | Fetches the currently active section and activates that section's view.
    | If an old section is present, as is the case when we have switched 
    | between two different sections, we will also take care of deactivating
    | the old section's view.
    |
    */
	changeSection: function() {

		var newSect = app.sections.get( app.get('activeSect' ) );
		var newSectView = newSect.view;

        var tumblrControls = app.getView('tumblrControls');
        if( tumblrControls ) tumblrControls.deactivate();

		if( !app.hasChanged( 'activeSect' ) ) newSectView.activate( null, newSect );

		else
		{

			var oldSect = app.sections.get( app.previous( 'activeSect' ) );
			var oldSectView = oldSect.view;

			newSectView.activate( oldSect, newSect );
			oldSectView.deactivate( oldSect, newSect );

		}

        if( tumblrControls ) tumblrControls.activate();

	},

	/*
    |--------------------------------------------------------------------------
    | forceChange
    |--------------------------------------------------------------------------
    |
    | Will force a changeSection -call even if the app-model have not changed.
    | This occurs when the user is browsing between different pages in the same
    | section, the section will not change thus the app-model will not change
    | and nothing will happen. This will force a change to take care of that.
    |
    */
	forceChange: function() {

		this.changeSection();

	}

});

// End appview.js