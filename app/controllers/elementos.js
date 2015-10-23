var sanitize = require('mongo-sanitize'); // EVITAR SQL INJECT

module.exports = function(app) {
  var Fundos = app.models.fundos;
  var PersonagensThumb = app.models.personagensThumb;
  var PersonagensCompleto = app.models.personagensCompleto;
  var controller = {};

  controller.getFundos = function(req, res) {
    var query = Fundos.find().exec()
      .then(
        function(elementos) {
            res.json(elementos);
        },
        function(erro) {
          console.log(erro);
          res.status(500).json(erro);
        });
  };

  controller.getPersonagens = function(req, res) {
    var query = PersonagensThumb.find().exec()
      .then(
        function(elementos) {
            res.json(elementos);
        },
        function(erro) {
          console.log(erro);
          res.status(500).json(erro);
        });
  };

  controller.getElementoPersonagens = function (req, res) {
    var query = PersonagensCompleto.find().exec()
      .then(
        function(elementos) {
            res.json(elementos);
        },
        function(erro) {
          console.log(erro);
          res.status(500).json(erro);
        });
  };

  return controller;
};
