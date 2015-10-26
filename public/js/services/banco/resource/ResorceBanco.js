angular.module('jogo').factory('ResourceBanco', function($resource) {
  return {
    historia: $resource('/historia', {}, {
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
    }),
    tarefa: $resource('/tarefa', {}, {
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
    }),
    tarefaHash: $resource('/tarefaHash', {}, {
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
    }),
    tarefaHashOne: $resource('/tarefaHashOne', {}, {
      'get': {
        method: 'GET',
        isArray: false
      }
    })
  };
});
