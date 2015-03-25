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
        })

        // $scope.mudarImagem = function(image) {
        //     $scope.imgFundo = image;
        // }

        // $scope.avancarPaginacao = function() {
        //     var maxIf = contadorMax | 0
        //     if (contadorPaginacao !== maxIf) {
        //         contadorPaginacao++;
        //         carregarProximos();
        //     } else {
        //         console.log('não entrou diabeira!');
        //     }
        // }

        // $scope.retrocederPaginacao = function() {
        //     if (contadorPaginacao > 1) {
        //         contadorPaginacao--;
        //         carregarProximos();
        //     }
        // }

        // var carregarProximos = function() {
        //     var tamanhoImagens = $scope.imagens.length;

        //     contadorMax = tamanhoImagens / 4;

        //     if(tamanhoImagens % 4 != 0){
        //         contadorMax++;
        //     }

        //     var i = (contadorPaginacao * 4) - 4;
        //     var max = i + 4;

        //     if(max >= tamanhoImagens){
        //         max = tamanhoImagens;
        //     }

        //     $scope.imagensExibicao = [];

        //     for (i; i < max; i++) {
        //         $scope.imagensExibicao.push($scope.imagens[i]);
        //     };
        // };


        // carregarProximos();

    });