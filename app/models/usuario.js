var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function() {
  var schema = mongoose.Schema({
    login: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    nome: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    tipoUsuario: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'user'
    },
    inclusao: {
      type: Date,
      default: Date.now
    }
  });

  schema.plugin(findOrCreate);
  return mongoose.model('Usuario', schema);
};
