angular.module('jogo').controller('CadFundoController',
    function($scope, $resource, $routeParams, $location, initPage, PaginacaoService, NovaHistoria, Inserts) {

        // Contrutor ------
        // ----------------
        $scope.historia = NovaHistoria.getHistoria();
        // ----------------

        var init = {
            titulo: 'Criar História',
            menu: 'criarQuadrinho'
        };

        initPage.pageCompleta($scope, init);

        $scope.salvarHistoria = function(){
          NovaHistoria.setHistoria($scope.historia);
          Inserts.inserirHistoria($scope.historia, function(){
            $location.url("/cadCena");
          });
        };

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
