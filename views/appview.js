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

        // Get the new section and its view from the app
		var newSect = app.sections.get( app.get('activeSect' ) );
		var newSectView = newSect.view;

        // Get the tumblr-controls view from the app
        var tumblrControls = app.getView('tumblrControls');

        // Deactivate possible previous tumblr-controls
        if( tumblrControls ) tumblrControls.deactivate();

        // If the section haven't changed, only activate the new section
		if( !app.hasChanged( 'activeSect' ) ) newSectView.activate( null, newSect );

        // If section have changed, deactivate old section also
		else
		{

            // Get the old section and its view from the app
			var oldSect = app.sections.get( app.previous( 'activeSect' ) );
			var oldSectView = oldSect.view;

            // Activate the new section
			newSectView.activate( oldSect, newSect );
            // Deactivate the old section
			oldSectView.deactivate( oldSect, newSect );

		}

        // Activate new tumblr-controls
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