angular.module('jogo').controller('MeusQuadrinhosController',['$scope', '$resource', '$location', '$modal', 'initPage', 'ControleQuadrinho',
  function($scope, $resource, $location, $modal, initPage, ControleQuadrinho) {

    ControleQuadrinho.getHistoriasByUser(function(res){
      $scope.list = res;
    });

    $scope.atualizarHistorias = function(){
      ControleQuadrinho.getListaHistorias(function(res){
        $scope.list = res;
      });
    };

  }]);
