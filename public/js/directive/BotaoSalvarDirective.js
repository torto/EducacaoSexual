angular.module('jogo').directive('botaoSalvar', function(ControleQuadrinho) {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {

      $(elem).on('click', function(event) {
        var elemento = $(".edicao");
        var principal = $(this)[0].lastChild.data.trim();
        html2canvas(elemento, {
          onrendered: function(canvas) {
            if (scope.historia.fundo !== null || scope.historia.elementos.length > 0) {
              if (principal === 'Finalizar Edição') {
                scope.adicionarQuadroAHistoria();
              }
              // Canvas2Image.saveAsPNG(canvas);
              ControleQuadrinho.inserirCanvasUltimoElemento(Canvas2Image.convertToPNG(canvas).src);
              scope.$apply(function() {
                scope.mudarTelaDepoisQuadrinhoCarregado();
              });
            }
            if (principal === 'Finalizar Edição') {
              scope.salvarHistoriaInteira();
            }
          }
        });
      });

    }
  };
});
