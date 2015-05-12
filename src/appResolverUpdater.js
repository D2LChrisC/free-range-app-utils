'use strict';

var q = require('q');
var request = require('superagent');

function updateAppVersion(appId, version, minRequiredIlp, appUrl, securityToken, appResolverUrl) {
	if( undefined === appResolverUrl || '' === appResolverUrl ) {
		appResolverUrl = 'https://appresolver.brightspace.com/';
	}

	if( appResolverUrl.substr(appResolverUrl.length, 1) !== '/' ) {
		appResolverUrl = appResolverUrl + '/';
	}

	var deferred = q.defer();

	request
		.put( appResolverUrl + 'appids/' + appId + '/versions/' + version )
		.set( 'Authorization', 'Bearer ' + securityToken )
		.send( {
			'minRequiredIlp': minRequiredIlp,
			'path': appUrl
		} )
		.end( function( error, result ) {

			if( err ) {
				deferred.reject( res ? res.error || {} : err );
				return;
			}
			
			deferred.resolve( res ? res.body || {} : {} );

		} );

	return deferred.promise;
}

function makeDefaultVersionForAppKey(appKey, appId, version) {

}

module.exports = updateAppVersion;
