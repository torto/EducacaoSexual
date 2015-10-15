angular.module('jogo').factory('Usuario', ['$resource', function($resource) {
  var usuario = $resource('/usuario', {}, {
    'query': {
      method: 'GET',
      isArray: false
    },
    'update': {
      method: 'PUT'
    }
  });

  var retorno = {

    getUsuarioLogado: function(callback) {
      if (!usuario._id) {
        usuario.query(function(elem) {
            setUsuario(elem);
          callback(usuario);
        }, function(err) {
          callback(err);
        });

      } else {
        callback(usuario);
      }
    },
    updateUsuario: function(usuarioNovo, callback) {
      usuarioNovo.$update(function(elem) {
        setUsuario(elem);
        callback(elem);
      });
    }
  };

  var setUsuario = function(usuarioLocal){
    usuario = usuarioLocal;
  };

  return retorno;
}]);
