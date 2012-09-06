/** ===========================================================================
 * 
 * Hasher
 *
 * Takes care of fetching the hash and returns an object with all possible
 * information related to the hash.
 * 
 * 
 * @package 	Core
 * @created 	Sep 4th 2012
 * @version 	1.0
 *
 ** =========================================================================== */
var Hasher = Backbone.Model.extend({

	/*
    |--------------------------------------------------------------------------
    | initialize
    |--------------------------------------------------------------------------
    |
    | Initializes the hash-object as well as fetches the current hash.
    |
    */
	initialize: function() {

		this.hash = {};
		this.getHash( true );

	},
	
	/*
    |--------------------------------------------------------------------------
    | getHash
    |--------------------------------------------------------------------------
    |
    | Deciphers the current hash or a hash sent in the arguments as well as
    | forces an update even if current hash is same as previous hash.
    |
    */
	getHash: function( renew, decipher, force ) {

		if( renew ) this.hash = this._getHash( null, force );
		if( decipher ) return this._getHash( decipher );

		return this.hash;	

	},

	/*
    |--------------------------------------------------------------------------
    | _getHash
    |--------------------------------------------------------------------------
    |
    | Internal method that takes care of deciphering the hash sent in.
    |
    */
	_getHash: function( decipher, force ) {

		var hash = {};
		var full;

		if( decipher ) full = decipher;
		else
		{

			full = AppRouter.prototype.routePage( window.location.hash.replace('#', '') );
			if( full == this.hash.full && !force ) return this.hash;

		}

		hash.full = full;
		hash.resource = this._getResource( hash.full );
		hash.min = full.replace( '/' + hash.resource, '' );
		hash.page = this._getPage( hash.min );
		hash.cid = this._getCid( hash );

		hash.names = {
			resource_dash_page: hash.resource + '-' + hash.page,
			page_cid: hash.page + hash.cid,
			resource_dash_page_dash_cid: hash.resource + '-' + hash.page + '-' + hash.cid,
			resource_us_page_us_cid: hash.resource + '_' + hash.page + '_' + hash.cid
		};

		return hash;

	},

	_getResource: function( page ) {

		var resource = page.split('/')[1].replace('/', '');
		if( resource == '' ) resource = Config.start_resource;

		return resource;

	},

	_getPage: function( hashMin ) {

		var page = hashMin.split('/')[1];
		if( !page ) page = '';

		return page;

	},

	_getCid: function( hash ) {

		if( hash.page == '' ) return '';

		var cid = hash.full.replace('/' + hash.resource + '/' + hash.page, '').split('/')[1];
		if( !cid ) cid = '';

		return cid;

	}

});

// End of hasher.js