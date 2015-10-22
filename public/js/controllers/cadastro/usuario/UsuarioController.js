angular.module('jogo').controller('CadUsuarioController',
  function($scope, $resource, $routeParams, $location, initPage, Usuario) {

    $scope.init = function() {

      var init = {
        menu: 'configuracao'
      };

      initPage.pageCompleta($scope, init);

      Usuario.getUsuarioLogado(function(res) {
        $scope.user = res;
        if($routeParams.tela && $routeParams.tela == 1 && $scope.user.email && $scope.user.tipoUsuario !== ''){
          $location.path('/');
        }
      });

    };
    $scope.init();

    $scope.updateUsuario = function(){
      Usuario.updateUsuario($scope.user, function(res){
        $scope.user = res;
      });
    };







  });
