angular.module('jogo').directive('excluirQuadro', function(ControleQuadrinho) {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {

      $(elem).on('click', function(e) {
        swal({
            title: "Excluir Quadro?",
            text: "Deseja realmente excluir esse quadro da historia?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
            closeOnConfirm: false
          },
          function() {
            ControleQuadrinho.removerQuadro(scope.historia.posicao, function(resp) {
              swal("Deletado!", "Seu quadro foi removido da historia com sucesso!", "success");
              scope.$apply(function() {
                scope.updateExistente(0);
              });

            });

          });

        e.preventDefault();
      });


    }
  };
});
