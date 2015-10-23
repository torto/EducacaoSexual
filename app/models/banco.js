var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    versaoLabel: {
      type: String
    },
    versao: {
      type: Number
    }
  });

  return mongoose.model('Banco', schema);
};
