angular.module('jogo').controller('NovoQuadrinhoController',
    function($scope, $resource, $routeParams, initPage, PaginacaoService) {

        // Contrutor ------
        // ----------------
        
        var tituloPaginaPadrao = 'Insira aqui o nome de seu quadrinho!';
 
        var init = {
            titulo: 'Criando Quadrinho',
            menu: 'criarQuadrinho'
        }

        initPage.pageCompleta($scope, init);
        
        // ----------------

        $scope.tituloHistoria = tituloPaginaPadrao;

        $scope.teste = function(){
           $scope.tituloHistoria = '';
        }

        $scope.verificarTitulo = function(){
            if($scope.tituloHistoria.length == 0){
                $scope.tituloHistoria = tituloPaginaPadrao;
            }
        }


    });