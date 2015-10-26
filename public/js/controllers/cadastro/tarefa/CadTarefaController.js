angular.module('jogo').controller('CadTarefaController',
  function($scope, $resource, $routeParams, $location, initPage, ControleTarefa) {

    $scope.buscarTarefaById = function(id) {
      ControleTarefa.buscarTarefaById(id, function(res) {
        $scope.tarefa = res;
      });
    };

    $scope.init = function() {
      $scope.tarefa = {};

      if ($routeParams.id) {
        $scope.buscarTarefaById($routeParams.id);
      }

      var init = {
        menu: 'criarTarefa'
      };

      initPage.pageCompleta($scope, init);
    };
    $scope.init();

    $scope.savarTarefa = function() {
      ControleTarefa.adicionarTarefa($scope.tarefa, function(res) {
        $scope.tarefa = res;
      });
    };




    // <input type="text" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="tarefa.dataFinal"
    //  is-open="status.opened" min-date="minDate"
    //  datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />

    $scope.status = {
      opened: false
    };
    $scope.tarefa.dataFinal = new Date();
    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.minDate = new Date();

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.disabled = function(date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };


  });
