angular.module('jogo').factory('ResourceBancoMenu', function($resource) {
  return {
    fundo: $resource('/elementos/fundos', {}, {
      'query': {
        method: 'GET',
        isArray: true
      }
    }),
    personagens: $resource('/elementos/personagens', {}, {
      'query': {
        method: 'GET',
        isArray: true
      }
    }),
    personagensCompleto: $resource('/elementos/personagensCompleto', {}, {
      'query': {
        method: 'GET',
        isArray: true
      }
    })
  };
});
