angular.module('jogo', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap']).config(function($routeProvider) {

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
	$routeProvider.when('/cadCena', {
		templateUrl: 'partials/cadCena/cadCena.html',
		controller: 'CadCenaController'
	});
	$routeProvider.when('/cadastro/editor', {
		templateUrl: 'partials/cadastro/historia/editor.html',
		controller: 'CadHistoriaEditor'
	});

	$routeProvider.otherwise({redirectTo: '/principal'});

});
