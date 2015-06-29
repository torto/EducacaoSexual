angular.module('jogo', ['ngRoute', 'ngResource']).config(function($routeProvider) {
	
	$routeProvider.when('/principal', {
		templateUrl: 'partials/principal.html',
		controller: 'PrincipalController'
	});

	$routeProvider.when('/novoQuadrinho', {
		templateUrl: 'partials/quadrinho/novoQuadrinho.html',
		controller: 'NovoQuadrinhoController'
	});

	$routeProvider.when('/cadFundo', {
		templateUrl: 'partials/cadFundo/cadFundo.html',
		controller: 'CadFundoController'
	});

	$routeProvider.otherwise({redirectTo: '/principal'});

});