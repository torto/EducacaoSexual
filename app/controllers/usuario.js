var sanitize = require('mongo-sanitize'); // EVITAR SQL INJECT

module.exports = function(app) {
  var Usuario = app.models.usuario;
  var controller = {};

  controller.getUsuario = function(req, res) {
    res.json(req.user);
  };
  controller.setUsuario = function(req, res) {
    var novo = sanitize(req.body);
    var id = novo._id;
    console.log(req.body);
    delete novo._id;
    Usuario.findByIdAndUpdate(id, novo, {
        new: true,
        upsert: true
      },
      function(erro, usuario) {
        if (!erro) {
          console.log(usuario);
          res.json(usuario);
        } else {
          console.error(erro);
          res.status(500).json(erro);
        }
      }
    );

  };

  return controller;
};
