angular.module('jogo').directive('excluirHistoria', function(ControleQuadrinho) {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {

      $(elem).on('click', function(e){
        swal({
            title: "Excluir Historia?",
            text: "Deseja realmente excluir essa historia?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
            closeOnConfirm: false
          },
          function() {
            ControleQuadrinho.excluirHistoria($(elem).data('id'), function(id){
                swal("Deletado!", "Sua historia foi deletada com sucesso!", "success");
                scope.atualizarHistorias();
            });

          });

          e.preventDefault();
      });


    }
  };
});
