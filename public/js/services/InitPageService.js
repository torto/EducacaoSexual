angular.module('jogo').factory('initPage',
    function(MenuService, TopoPaginaService) {
        function retorno(scope, json) {
            MenuService.menuPrincipal(scope, json.menu);
            if(json.titulo){
            TopoPaginaService(scope, json.titulo);
            }
        }

        return {
            pageCompleta: retorno
        };
    });
