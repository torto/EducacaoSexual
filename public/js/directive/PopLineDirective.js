angular.module('jogo').directive('popline', function() {
    return {
        restrict: 'C', // The Directive is with Attribute 
        link: function(scope, elem, attrs) {
            angular.element(document).ready(function() {
                $(elem).popline();
            });
        }
    }
});