angular.module('jogo', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap','ui.grid', 'ui.grid.edit']).config(function($routeProvider, $httpProvider, $locationProvider) {

	$httpProvider.interceptors.push('meuInterceptor');

  $routeProvider.when('/principal', {
    templateUrl: 'partials/principal.html',
    controller: 'PrincipalController'
  });

  $routeProvider.when('/cadastro/editor', {
    templateUrl: 'partials/cadastro/historia/editor.html',
    controller: 'CadHistoriaEditor'
  });
	$routeProvider.when('/cadastro/editor/:id', {
    templateUrl: 'partials/cadastro/historia/editor.html',
    controller: 'CadHistoriaEditor'
  });

	$routeProvider.when('/cadastro/tarefa/', {
    templateUrl: 'partials/cadastro/tarefa/cad-tarefa-index.html',
    controller: 'CadTarefaController'
  });

	$routeProvider.when('/cadastro/tarefa/:id', {
		templateUrl: 'partials/cadastro/tarefa/cad-tarefa-index.html',
		controller: 'CadTarefaController'
	});
	$routeProvider.when('/minhasTarefas', {
		templateUrl: 'partials/cadastro/tarefa/lista/lista-tarefa-index.html',
		controller: 'ListaTarefaController'
	});

  $routeProvider.when('/auth', {
    templateUrl: 'partials/login/index.html'
  });

	$routeProvider.when('/edicaoUsuario/:tela', {
		templateUrl: 'partials/cadastro/usuario/usuario-index.html',
		controller: 'CadUsuarioController'
	});
	$routeProvider.when('/edicaoUsuario/', {
		templateUrl: 'partials/cadastro/usuario/usuario-index.html',
		controller: 'CadUsuarioController'
	});

	$routeProvider.when('/meusQuadrinhos/', {
		templateUrl: 'partials/cadastro/historia/lista/lista-historia-index.html',
		controller: 'MeusQuadrinhosController'
	});

  $routeProvider.otherwise({
    redirectTo: '/'
  });
	// $locationProvider.html5Mode(true);

}).factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                $location.path('/#/auth');
            }
            return $q.reject(rejection);
        }
    };
}])
.config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);
