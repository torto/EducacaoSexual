angular.module('jogo').controller('CadFundoController',
    function($scope, $resource, $routeParams, initPage) {
    	
    	$scope.imgFundo = {img: 'img/cozinha.jpg', name: 'cozinha'};

        var init = {
            titulo: 'Escolha seu fundo',
            menu: 'criarQuadrinho'
        }

        initPage.pageCompleta($scope, init);

    });