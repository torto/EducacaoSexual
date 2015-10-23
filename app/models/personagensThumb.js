var mongoose = require('mongoose');

/*
id: 1,
label: 'Adolescente',
categoria: 'personagem',
subcategoria: 'masculino',
tipo:'adolescente',
image: {
  "300": {
    href: '/img/300/personagens/homem/corpo/adolescente.png'
  }
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
    tipo: {
      type: String
    },
    image: {
      "300":{
        "href":String
      }
    }

  });

  return mongoose.model('personagens_thumb', schema);
};
