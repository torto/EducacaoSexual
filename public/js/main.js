angular.module('jogo', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap']).config(function($routeProvider) {

	$routeProvider.when('/principal', {
		templateUrl: 'partials/principal.html',
		controller: 'PrincipalController'
	});

	$routeProvider.when('/cadastro/editor', {
		templateUrl: 'partials/cadastro/historia/editor.html',
		controller: 'CadHistoriaEditor'
	});

	$routeProvider.otherwise({redirectTo: '/principal'});

});
