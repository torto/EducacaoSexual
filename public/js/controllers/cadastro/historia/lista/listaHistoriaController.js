angular.module('jogo').controller('MeusQuadrinhosController', ['$scope', '$resource', '$location', '$modal', 'initPage', 'ControleQuadrinho',
  function($scope, $resource, $location, $modal, initPage, ControleQuadrinho) {

    var init = {
      menu: 'seusQuadrinhos'
    };

    initPage.pageCompleta($scope, init);


    ControleQuadrinho.getHistoriasByUser(function(res) {
      $scope.list = res;
    });

    $scope.atualizarHistorias = function() {
      ControleQuadrinho.getListaHistorias(function(res) {
        $scope.list = res;
      });
    };

    $scope.openLista = function(posicao) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'partials/cadastro/historia/lista/modal/edicao-modal.html',
        controller: 'ModalListaEdicaoHistoriaCtrl',
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

  }
]);
angular.module('jogo').controller('ModalListaEdicaoHistoriaCtrl', ['$scope', '$modalInstance', 'elemento', 'posicao', 'ControleQuadrinho', 'ControleTarefa', '$q', function($scope, $modalInstance, elemento, posicao, ControleQuadrinho, ControleTarefa, $q) {

  $scope.principal = elemento;

  $scope.elementoAtual = elemento.list[posicao];
  if (!$scope.elementoAtual.hashTarefa) {
    $scope.elementoAtual.hashTarefa = '';
  }

  $scope.ok = function() {
    var hashElemento = {};
    $scope.salvarEdicaoHistoria($scope.elementoAtual, function(res){
      if ($scope.elementoAtual.hashTarefa) {
        $scope.salvarHistoriaAHash($scope.elementoAtual, function(res) {
          $modalInstance.dismiss('cancel');
        });
      } else {
        $modalInstance.dismiss('cancel');
      }
    });

  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };



  $scope.salvarEdicaoHistoria = function(historia, callback) {

    ControleQuadrinho.salvarQuadrinho(historia, function(res) {
      if (res.error) {} else {
        callback(res);
      }

    });
  };

  $scope.salvarHistoriaAHash = function(historia, callback) {
    var injecao = {
      idHistoria: historia._id,
      hashTarefa: historia.hashTarefa
    };

    ControleTarefa.addQuadroATarefaByHash(injecao, function(res) {
      if (res.error) {} else {
        callback(res);
      }

    });
  };

}]);
