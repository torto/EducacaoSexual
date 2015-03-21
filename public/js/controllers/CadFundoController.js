angular.module('jogo').controller('CadFundoController',
    function($scope, $resource, $routeParams, initPage) {

        var init = {
            titulo: 'Escolha seu fundo',
            menu: 'criarQuadrinho'
        }

        initPage($scope, init);

    });