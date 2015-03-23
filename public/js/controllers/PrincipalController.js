angular.module('jogo').controller('PrincipalController',
    function($scope, $resource, $routeParams, initPage) {

        var init = {
            titulo: 'Principal',
            menu: 'principal'
        }

        initPage.pageCompleta($scope, init);

    });