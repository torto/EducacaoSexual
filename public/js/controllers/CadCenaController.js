angular.module('jogo').controller('CadCenaController',
    function($scope, $resource, $routeParams, $location, initPage, PaginacaoService, NovaHistoria, Inserts) {

        // Contrutor ------
        // ----------------
        $scope.historia = NovaHistoria.getHistoria();
        // ----------------

        var init = {
            titulo: 'Editando Cena',
            menu: 'criarQuadrinho'
        };

        initPage.pageCompleta($scope, init);

        




    });
