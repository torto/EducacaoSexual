angular.module('jogo').factory('ResourceHistoria', function($resource) {
    return {
        historia : $resource('/historia', {}, {
          'query': {
            method: 'GET',
            isArray: true
          },
          'get': {
            method: 'GET',
            isArray: false
          },
          'save': {
            method: 'POST'
          }
        })
    };
});
