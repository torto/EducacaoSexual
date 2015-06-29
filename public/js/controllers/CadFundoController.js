angular.module('jogo').controller('CadFundoController',
    function($scope, $resource, $routeParams, initPage, PaginacaoService) {

        // Contrutor ------
        // ----------------

        

        // ----------------

        var init = {
            titulo: 'Escolha seu fundo',
            menu: 'criarQuadrinho'
        }

        initPage.pageCompleta($scope, init);


        $scope.imagens = [{
            name: "Sala",
            img: "../img/sala.jpg"
        }, {
            name: "Cozinha",
            img: "../img/cozinha.jpg"
        }, {
            name: "Quadro Negro",
            img: "../img/quadro.jpg"
        }, {
            name: "Sala",
            img: "../img/sala.jpg"
        }, {
            name: "Cozinha",
            img: "../img/cozinha.jpg"
        }, {
            name: "Quadro Negro",
            img: "../img/quadro.jpg"
        }, {
            name: "Sala",
            img: "../img/sala.jpg"
        }, {
            name: "Cozinha",
            img: "../img/cozinha.jpg"
        }, {
            name: "Quadro Negro",
            img: "../img/quadro.jpg"
        }, {
            name: "Quadro Negro",
            img: "../img/quadro.jpg"
        }];

        $scope.imagensExibicao = [];

        $scope.imgFundo = $scope.imagens[0];

        PaginacaoService.quadroSelecaoPadrao($scope,{
            array: 'imagens',
            imageTrocar:'imgFundo',
            arrayQuadros: 'imagensExibicao'
        });

    });