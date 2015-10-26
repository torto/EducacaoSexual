angular.module('jogo').directive('textoResize',  ['ControleQuadrinho','$timeout',function(ControleQuadrinho, $timeout) {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {

      $timeout(function() {
        var eleme = $(elem),
          parent = eleme.parent(),
          porcentagem = parent.height() / parent.parent().height() * 100;
        var valortext = 40;
        if (elem.text().length <= 36) {
          valortext = 60;
        }

        var valorFinal = (valortext * porcentagem) / 100;

        if (valorFinal > 40) {
          valorFinal = 40;
        }

        eleme.css("font-size", valorFinal + "px");
      }, 0);



      $(elem).on('elementResize', function(event) {
        var elem = $(this),
          parent = elem.parent(),
          porcentagem = parent.height() / parent.parent().height() * 100;

        var valortext = 40;
        if (elem.text().length <= 36) {
          valortext = 60;
        }

        var valorFinal = (valortext * porcentagem) / 100;

        if (valorFinal > 40) {
          valorFinal = 40;
        } else if(valorFinal < 10){
          valorFinal = 10;
        }


        elem.css("font-size", valorFinal + "px");


        console.log(porcentagem);
      });


    }
  };
}]);
