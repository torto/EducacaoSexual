angular.module('jogo').controller('PrincipalController',
    function($scope, $resource, $routeParams, MenuService) {
    	MenuService($scope, 'principal');

    });