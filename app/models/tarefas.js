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
    historias: [{
      idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
      hashTarefa: String,
      idHistoria: mongoose.Schema.Types.ObjectId
    }],
    criado: {
      type: Date,
      default: Date.now
    }
  });

  return mongoose.model('Tarefas', schema);
};
