
var Nexus = Backbone.Model.extend({

	initialize: function() {

		this.hash = {};
		this.getHash( true );

	},
	
	getHash: function( renew, decipher, force ) {

		if( renew ) this.hash = this._getHash( null, force );
		if( decipher ) return this._getHash( decipher );

		return this.hash;	

	},

	_getHash: function( decipher, force ) {

		var hash = {};
		var full;

		if( decipher ) full = decipher;
		else
		{

			full = AppRouter.prototype.fixPageId( window.location.hash.replace('#', '') );
			if( full == this.hash.full && !force ) return this.hash;

		}

		hash.full = full;
		hash.resource = hash.full.split('/')[1];
		hash.page = hash.full.replace( '/' + hash.resource, '' ).split('/')[1];
		if( hash.page ) hash.cid = hash.full.replace('/' + hash.resource + '/' + hash.page, '').split('/')[1];

		return hash;

	}

});