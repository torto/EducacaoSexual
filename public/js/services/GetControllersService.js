angular.module('jogo').factory('getController',function(){
        var CadHistoriaEditor;
        function setCadHistoria(value){
          CadHistoriaEditor = value;
        }

        function getCadHistoria(){
          return CadHistoriaEditor;
        }

        return {
            setCadHistoria: setCadHistoria,
            getCadHistoria: getCadHistoria
        };
    });
