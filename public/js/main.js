angular.module('jogo', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap']).config(function($routeProvider, $httpProvider) {

	$httpProvider.interceptors.push('meuInterceptor');

  $routeProvider.when('/principal', {
    templateUrl: 'partials/principal.html',
    controller: 'PrincipalController'
  });

  $routeProvider.when('/cadastro/editor', {
    templateUrl: 'partials/cadastro/historia/editor.html',
    controller: 'CadHistoriaEditor'
  });

  $routeProvider.when('/auth', {
    templateUrl: 'partials/login/index.html'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });

});
