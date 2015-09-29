angular.module('jogo').directive('itensThumb', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/directive/view/itens-thumb/itens-thumb.html',
        replace: false,
        transclude: true,
        scope:{
          lista: '=',
          evento: '='
        },
        link: function(scope, elem, attrs) {

        }
    };
});
