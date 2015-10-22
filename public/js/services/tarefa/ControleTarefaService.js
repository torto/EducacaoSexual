angular.module('jogo').factory('ControleTarefa', function(ResourceBanco, $filter) {

  var retorno = {
    adicionarTarefa: function(tarefa, callback) {
      var max = 9999,
        min = 1;
      tarefa.hashTarefa = Math.floor(Math.random() * (max - min + 1)) + min;
      ResourceBanco.tarefa.save(tarefa, function(res) {
        callback(res);
      });
    },
    buscarTarefaById: function(id, callback) {
      ResourceBanco.tarefa.get({
        "_id": id
      }, function(res) {
        callback(res);
      });
    },
    excluirTarefa: function(id, callback){
      ResourceBanco.tarefa.delete({"id": id}, function(res){
        callback(id);
      });
    },
    buscarTarefasByUser: function(callback) {
      ResourceBanco.tarefa.query(function(res) {
        res = formatDate(res);
        callback(res);
      });
    },
    addQuadroATarefaByHash: function(valor, callback) {
      //valor = {idHistoria, Hash}
      ResourceBanco.tarefaHash.save(valor, function(res) {
        callback(res);
      });
    },
    getTarefasAddPorUser: function(id, callback) {
      ResourceBanco.tarefaHash.query({
        "_id": id
      }, function(res) {
        callback(res);
      });
    }
  };

var formatDate = function(array){
  var tamanho = array.length;
  for (var i = 0; i < tamanho; i++) {
    array[i].criado = new Date(array[i].criado);
    array[i].criado = $filter('date')(array[i].criado,'dd/MM/yyyy');
  }


  return array;


};



  return retorno;
});
