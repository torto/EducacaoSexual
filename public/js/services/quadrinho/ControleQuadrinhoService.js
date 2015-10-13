angular.module('jogo').factory('ControleQuadrinho', function() {
  var historiaAtual = {nomeQuadrinho: '', quadros:[]};
  var retorno = {
    getHistoriaById: function(id) {
      historiaAtual = {nomeQuadrinho: '', quadros:[]};
      return historiaAtual;
    },
    getQuadroByPosicao: function(id){
      return historiaAtual.quadros[id];
    },
    getQuadroAtual: function(){
      return historiaAtual;
    },
    addQuadroHistoria: function(quadro){
      if(quadro.posicao >= 0){
        historiaAtual.quadros[quadro.posicao] = quadro;
      }else {
        quadro.posicao = historiaAtual.quadros.length;
        historiaAtual.quadros.push(quadro);
      }
      return historiaAtual;
    },
    getListQuadros: function(){
      return historiaAtual.quadros;
    }
  };

  return retorno;
});
