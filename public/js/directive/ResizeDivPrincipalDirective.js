angular.module('jogo').directive('resizeImage', function() {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {
      elem.bind("load", function(e) {

        var tamanho = elem[0].clientWidth;
        elem[0].parentNode.style.width = tamanho + 'px';
      });
    }
  };
});
