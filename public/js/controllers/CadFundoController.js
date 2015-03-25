angular.module('jogo').controller('CadFundoController',
    function($scope, $resource, $routeParams, initPage) {

        // Contrutor ------
        // ----------------

        var contadorPaginacao = 1;
        var contadorMax = 0;

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
        }];

        $scope.imagensExibicao = [];

        $scope.imgFundo = $scope.imagens[0];

        $scope.mudarImagem = function(image) {
            $scope.imgFundo = image;
        }

        $scope.avancarPaginacao = function() {
            if (contadorPaginacao != contadorMax) {
                contadorPaginacao++;
                carregarProximos();

            }
        }

        $scope.retrocederPaginacao = function() {
            if (contadorPaginacao > 1) {
                contadorPaginacao--;
                carregarProximos();
            }
        }

        var carregarProximos = function() {

            contadorMax = $scope.imagens.length / 4;

            if($scope.imagens.length % 4 != 0){
                contatorMax = parseInt(contadorMax);
                contadorMax = parseInt(contadorMax++);
            }

            var i = (contadorPaginacao * 4) - 4;
            var max = i + 4;

            $scope.imagensExibicao = [];

            for (i; i < max; i++) {
                $scope.imagensExibicao.push($scope.imagens[i]);
            };
        };


        carregarProximos();

    });