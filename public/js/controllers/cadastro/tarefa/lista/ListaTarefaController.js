angular.module('jogo').controller('ListaTarefaController',
  function($scope, $resource, $routeParams, $location, initPage, ControleTarefa, $modal) {

    $scope.buscarTarefas = function() {
      ControleTarefa.buscarTarefasByUser(function(res) {
        $scope.tarefas = res;
      });
    };

    $scope.init = function() {
      $scope.tarefas = [];

      $scope.buscarTarefas();

      var init = {
        menu: 'suasTarefas'
      };

      initPage.pageCompleta($scope, init);
    };
    $scope.init();

    $scope.openLista = function(posicao) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'partials/cadastro/tarefa/lista/modal/lista-modal.html',
        controller: 'ModalListaCtrl',
        size: 'lg',
        resolve: {
          elemento: function() {
            return $scope;
          },
          posicao: function() {
            return posicao;
          }
        }
      });

    };

    $scope.excluirTarefa = function(id, callback) {
      ControleTarefa.excluirTarefa(id, function(id) {
        $scope.tarefas = $scope.tarefas.filter(function(obj) {
          if (obj._id == id) {
            return false;
          } else {
            return true;
          }
        });
        callback();
      });
    };

  });
angular.module('jogo').controller('ModalListaCtrl', ['$scope', '$modalInstance', 'elemento', 'posicao', '$location', function($scope, $modalInstance, elemento, posicao, $location) {

  $scope.principal = elemento;

  if ($location.$$port) {
    $scope.url = 'http://' + $location.$$host + ':' + $location.$$port + '/final?id=';
  } else {
    $scope.url = 'http://' + $location.$$host + '/final?id=';

  }

  $scope.historiaSelecionada = elemento.tarefas[posicao];

  $scope.ok = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
