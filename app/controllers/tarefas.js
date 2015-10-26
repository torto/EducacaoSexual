var mongoose = require('mongoose');
var sanitize = require('mongo-sanitize'); // EVITAR SQL INJECT

module.exports = function(app) {
  var Tarefa = app.models.tarefas;
  var controller = {};

  controller.setTarefaByUser = function(req, res) {
    var tarefa = sanitize(req.body);
    tarefa.idUser = req.user._id;
    // console.log(historia);
    var _id = req.body._id;
    if (_id) {
      Tarefa.findByIdAndUpdate(_id, tarefa, {
          new: true,
          upsert: true
        }).exec()
        .then(
          function(tarefa) {
            res.json(tarefa);
          },
          function(erro) {
            console.error(erro);
            res.status(500).json(erro);
          }
        );
    } else {
      Tarefa.create(tarefa)
        .then(
          function(tarefa) {
            res.status(201).json(tarefa);
          },
          function(erro) {
            console.log(erro);
            res.status(500).json(erro);
          }
        );
    }
  };

  controller.getTarefaByUser = function(req, res) {
    var query = Tarefa.find()
      .where("idUser").equals(req.user._id).populate('historias.idUser');
    if (req.query._id) {
      query.where("_id").equals(req.query._id);
    }
    query.exec()
      .then(
        function(elementos) {
          if (req.query._id) {

            Tarefa.findByIdAndUpdate(_id, tarefa, {
                new: true
              }).exec()
              .then(
                function(tarefa) {
                  res.json(tarefa);
                },
                function(erro) {
                  console.error(erro);
                  res.status(500).json(erro);
                }
              );

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

  controller.getTarefaByHash = function(req, res) {
    var query = Tarefa.find()
      .where("hashTarefa").equals(req.body.hashTarefa);
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

  controller.getOneTarefaByHash = function(req, res) {
    var query = Tarefa.find().populate('idUser', 'nome').select('nomeTarefa hashTarefa idUser')
      .where("hashTarefa").equals(req.query.hashTarefa).exec()
      .then(
        function(elementos) {
            res.json(elementos[0]);
        },
        function(erro) {
          console.log(erro);
          res.status(500).json(erro);
        });
  };

  controller.excluirTarefa = function(req, res) {
    Tarefa.find().where("idUser").equals(req.user._id)
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

  controller.salvarHistoriaNaTarefa = function(req, res) {
    req.body.idUser = req.user._id;
    var query = Tarefa.find()
      .where("hashTarefa").equals(sanitize(req.body.hashTarefa))
      .ne("historias.idHistoria", req.body.idHistoria)
      .exec()
      .then(
        function(elementos) {
          if(elementos.length){
          Tarefa.findByIdAndUpdate(elementos[0]._doc._id,{
              $push: {
                "historias": req.body
              }
            }, {
                new: true,
                upsert: true
              })
            .exec()
            .then(
              function(elementos) {
                res.json({return: 'OK'});
              },
              function(erro) {
                console.log(erro);
                res.status(500).json(erro);
              });
            } else {
              res.json({return: 'OK'});
            }
        },
        function(erro) {
          console.log(erro);
          res.status(500).json(erro);
        });


  };

  return controller;
};
