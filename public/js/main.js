angular.module('jogo', ['ngRoute', 'ngResource']).config(function($routeProvider) {
	
	$routeProvider.when('/principal', {
		templateUrl: 'partials/principal.html',
		controller: 'PrincipalController'
	});

	$routeProvider.otherwise({redirectTo: '/principal'});

});