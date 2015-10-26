angular.module('jogo').directive('scrollHorizontal', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/directive/view/scroll/scroll.html',
        replace: false,
        transclude: true,
        scope:{
          valor: '='
        },
        link: function(scope, elem, attrs) {
            // angular.element(document).ready(function() {
            //     $(elem).horizontalScroll();
            // });
        }
    };
});
