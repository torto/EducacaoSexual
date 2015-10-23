var mongoose = require('mongoose');

/* FUNDOOO
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

/* ELEMENTO PERSONAGEM
{
  label: "Feições",
  tipo: 'feicao',
  categoria: 'personagem',
  subcategoria: "masculino",
  personagem: 'crianca',
  elementos: [{
    id: 10,
    label: 'Chorando',
    categoria: 'personagem',
    subcategoria: 'masculino',
    tipoPrincipal: 'feicao',
    tipo: 'feicao',
    personagem: 'crianca',
    image: {
      300: {
        href: '/img/300/personagens/homem/feicao/crianca/chorando.png'
      },
      thumb: {
        href: '/img/thumb/personagens/homem/feicao/crianca/chorando.png'
      }
    }
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
    personagem: {
      type: String
    },
    tipo: {
      type: String
    },
    tipoPrincipal: {
      type: String
    },
    image: {
      "300": {
        "href": String
    },
    "800": {
        "href": String
    },
    "thumb": {
        "href": String
    }
    }
  });

  return mongoose.model('Image', schema);
};
