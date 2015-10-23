var mongoose = require('mongoose');

/*
label: 'Quarto',
categoria: 'fundo',
image: {
  "300": {
    href: '/img/300/fundos/quarto.jpg'
  },
  "800": {
    href: '/img/800/fundos/quarto.jpg'
  }
}
*/

module.exports = function() {

  var schema = mongoose.Schema({
    label: {
      type: String
    },
    categoria: {
      type: String
    },
    image: {
      "300":{
        "href":String
      },
      "800":{
        "href": String
      }
    }
  });

  return mongoose.model('Fundos', schema);
};
