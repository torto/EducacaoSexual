var mongoose = require('mongoose');

/*
label: "Feições",
tipo: 'feicao',
categoria: 'personagem',
subcategoria: "masculino",
personagem: 'crianca',
elementos: [
*/

module.exports = function() {
  var schema = mongoose.Schema({
    label: {
      type: String,
      required: true
    },
    categoria: {
      type: String
    },
    subcategoria: {
      type: String
    },
    personagem: {
      type: String
    },
    tipo: {
      type: String
    },
    elementos: {
      type: Array,
      default: []
    }
  });
// mongoose.set('debug', true);
  return mongoose.model('Personagens_completo', schema);
};
