var sanitize = require('mongo-sanitize'); // EVITAR SQL INJECT

module.exports = function(app) {
  var Historia = app.models.historia;
  var controller = {};

  controller.setHistoriaByUser = function(req, res) {
    var historia = sanitize(req.body);
    historia.idUser = req.user._id;
    if (!historia.nomeQuadrinho) {
      historia.nomeQuadrinho = 'Teste';
    }
    // console.log(historia);
    var _id = req.body._id;
    if (_id) {
      Historia.findByIdAndUpdate(_id, historia, {
          new: true
        }).exec()
        .then(
          function(historia) {
            res.json(historia);
          },
          function(erro) {
            console.error(erro);
            res.status(500).json(erro);
          }
        );
    } else {
      Historia.create(historia)
        .then(
          function(historia) {
            res.status(201).json(historia);
          },
          function(erro) {
            console.log(erro);
            res.status(500).json(erro);
          }
        );
    }
  };

  controller.getHistoriaByUser = function(req, res) {
    var query = Historia.find()
      .where("idUser").equals(req.user._id);
    if (req.query._id) {
      query.where("_id").equals(req.query._id);
    }
    query.exec()
      .then(
        function(elementos) {
          if (req.query._id) {
            res.json(elementos[0]);
          } else {
            res.json(elementos);
          }
        },
        function(erro) {
          console.log(erro);
          res.status(500).json(erro);
        });
  };

  controller.excluirHistoria = function(req, res) {
    Historia.find().where("idUser").equals(req.user._id)
    .where("_id").equals(req.query.id)
    .remove().exec()
      .then(
        function() {
          res.status(204).end();
        },
        function(erro) {
          return console.error(erro);
        });

  };

  controller.getUsuario = function(req, res) {
    res.json(req.user);
  };
  controller.setUsuario = function(req, res) {
    var novo = sanitize(req.body);
    var id = novo._id;
    // console.log(req.body);
    delete novo._id;
    Usuario.findByIdAndUpdate(id, novo, {
        new: true,
        upsert: true
      },
      function(erro, usuario) {
        if (!erro) {
          // console.log(usuario);
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
