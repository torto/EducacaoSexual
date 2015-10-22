var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    hashTarefa:{
      type: Number,
      unique: true,
      required: true
    },
    nomeTarefa: {
      type: String,
      required: true
    },
    historias: {
      type: Array,
      "default": []
    },
    criado: {
      type: Date,
      default: Date.now
    }
  });

  return mongoose.model('Tarefas', schema);
};
