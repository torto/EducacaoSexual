angular.module('jogo').factory('initPage',
    function(MenuService, TopoPaginaService) {
        function retorno(scope, json) {
            MenuService.menuPrincipal(scope, json.menu);
            TopoPaginaService(scope, json.titulo);
        };

        return {
            pageCompleta: retorno
        };
    });