angular.module('jogo').factory('ControleQuadrinho', function(ResourceBanco) {
  var historiaAtual = {};
  historiaAtual.nomeQuadrinho = '';
  historiaAtual.quadros = [];

  var listHistorias = [];

  var retorno = {
    clone : function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  },
  getHistoriaById: function(id) {
      historiaAtual = {
        nomeQuadrinho: '',
        quadros: []
      };
      return historiaAtual;
    },
    getQuadroByPosicao: function(id) {
      return historiaAtual.quadros[id];
    },
    getQuadroAtual: function() {
      return historiaAtual;
    },
    addQuadroHistoria: function(quadro) {
      if (quadro.posicao >= 0) {
        historiaAtual.quadros[quadro.posicao] = quadro;
      } else {
        quadro.posicao = historiaAtual.quadros.length;
        historiaAtual.quadros.push(quadro);
      }
      return historiaAtual;
    },
    getListQuadros: function() {
      return historiaAtual.quadros;
    },
    salvarQuadrinho: function(historia, callback) {
      var historiaEnvio = historiaAtual;
      if(historia){
        historiaEnvio = historia;
      }

      historiaAtual.nomeQuadrinho = 'Teste Cliente';
      ResourceBanco.historia.save({},historiaEnvio, function(resp){
        // console.log(resp);
        historiaAtual = resp;
        callback(resp);
      });
    },
    buscarHistoriaById: function(id, callback) {
      ResourceBanco.historia.get({"_id": id},function(resp){
        // console.log(resp);
        historiaAtual = resp;
        callback(resp);
      });
    },
    inserirCanvasUltimoElemento : function(canvas){
      var posicaoUltimo = historiaAtual.quadros.length - 1;
      inserirCanvas(canvas, posicaoUltimo);
    },
  getHistoriasByUser: function(callback){
    ResourceBanco.historia.query(function(resp){
      listHistorias = resp;
      callback(resp);
    });
  }, excluirHistoria : function(id, callback){
    ResourceBanco.historia.delete({"id": id}, function(resp){
      listHistorias = listHistorias.filter(function(obj){
        if(obj._id == id){
          return false;
        } else {
          return true;
        }
      });
      callback(id);
    });
  }, getListaHistorias : function(callback){
    callback(listHistorias);
  },
  removerQuadro: function(id, callback){
    historiaAtual.quadros.splice(id, 1);
    callback();
  }
};

  var inserirCanvas = function(canvas, posicao){
    historiaAtual.quadros[posicao].imgThumb = canvas;
  };

  return retorno;
});
