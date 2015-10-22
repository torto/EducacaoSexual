angular.module('jogo').directive('excluirTarefa', function(ControleQuadrinho) {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {

      $(elem).on('click', function(e) {
        swal({
            title: "Excluir Tarefa?",
            text: "Deseja realmente excluir essa tarefa?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
            closeOnConfirm: false
          },
          function() {
            scope.$apply(function() {
              scope.excluirTarefa($(elem).data("id"), function() {
                swal("Deletado!", "Sua tarefa foi removidada com sucesso!", "success");
              });
            });

          });

        e.preventDefault();
      });


    }
  };
});
