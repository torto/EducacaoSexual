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
    $scope.salvarEdicaoHistoria($scope.elementoAtual, function(res) {
      if ($scope.elementoAtual.hashTarefa) {
        $scope.salvarHistoriaAHash($scope.elementoAtual, function(res) {
          $modalInstance.dismiss('cancel');
        });
      } else {
        $modalInstance.dismiss('cancel');
      }
    });

  };

  $scope.keyHashEvento = function() {
    if ($scope.elementoAtual.hashTarefa.length == 4) {
      ControleTarefa.getOneTarefa($scope.elementoAtual.hashTarefa, function(res){
        if(res.hashTarefa){
        swal({
          title: "Tarefa "+res.hashTarefa+" Encontrada!",
          text: '<div class="row"><div class="row"><div class="col-md-12"><p>Autor/a da Tarefa: '+res.idUser.nome+'</p></div></div>    <div class="row"><div class="col-md-12">     <p>Nome da Tarefa: '+res.nomeTarefa+'</p>    </div></div>       <div class="row"><div class="col-md-12">     <p><b>Deseja adicionar essa historia a essa tarefa?<b></p>              </div>            </div>',
          type: "success",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Adicionar",
          cancelButtonText:'Não',
          closeOnConfirm: true,
          html: true
        }, function(){
        }, function(){
          $scope.elementoAtual.hashTarefa = "";
        });
      } else {
        sweetAlert("Oops...", "Tarefa não encontrada!", "error");
      }
      });
    }
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
