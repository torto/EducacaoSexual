angular.module('jogo').factory('TopoPaginaService',
    function() {
        function retorno(scope, name) {
            scope.tituloPaginaTopo = name;
        };

        return retorno;
    });