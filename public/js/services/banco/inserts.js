angular.module('jogo').factory('Inserts',
	function() {
    var retorno = {
      inserirHistoria: function(historia, callback){
        console.log("INSERIU NO BANCO HISTORIA: "+ JSON.stringify(historia));
        callback();
      }
    };

    return retorno;
  }
);
