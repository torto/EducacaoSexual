angular.module('jogo').directive('insercaoImagemPrincipal', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/directive/view/imagem/principal.html',
        replace: false,
        transclude: true,
        scope:{
          elemento: '=',
        },
        link: function(scope, elem, attrs) {
          
        }
    };
});
