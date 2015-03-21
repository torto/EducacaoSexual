angular.module('jogo').factory('initPage',
    function(MenuService, TopoPaginaService) {
        function retorno(scope, json) {
           MenuService(scope, json.menu);
           TopoPaginaService(scope, json.titulo);
        };

        return retorno;
    });