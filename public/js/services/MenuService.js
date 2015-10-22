angular.module('jogo').factory('MenuService',
  function() {

    function retorno(scope, name) {

      function zerar() {
        scope.principal = false;
        scope.criarQuadrinho = false;
        scope.seusQuadrinhos = false;
        scope.addAluno = false;
        scope.seusAluno = false;
        scope.configuracao = false;
      }

      zerar();

      if (name) {
        scope[name] = true;
      } else {
        zerar();
      }
    }

    return {
      menuPrincipal: retorno
    };
  });
