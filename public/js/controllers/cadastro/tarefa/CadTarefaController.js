angular.module('jogo').controller('CadTarefaController',
  function($scope, $resource, $routeParams, $location, initPage, ControleTarefa) {

    $scope.buscarTarefaById = function(id){
      ControleTarefa.buscarTarefaById(id, function(res){
        $scope.tarefa = res;
      });
    };

    $scope.init = function() {
      $scope.tarefa = {};

      if($routeParams.id){
        $scope.buscarTarefaById($routeParams.id);
      }

      var init = {
        menu: 'criarTarefa'
      };

      initPage.pageCompleta($scope, init);
    };
    $scope.init();

    $scope.savarTarefa = function(){
      ControleTarefa.adicionarTarefa($scope.tarefa, function(res){
        $scope.tarefa = res;
      });
    };


  });
