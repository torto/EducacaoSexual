var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    nomeQuadrinho: {
      type: String,
      required: true
    },
    quadros: {
      type: Array,
      "default": []
    },
    criado: {
      type: Date,
      default: Date.now
    }
  });

  return mongoose.model('Historia', schema);
};
