module.exports = function(app) {
  var Historia = app.models.historia;
  app.get('/final', function(req, res) {
    if (req.query.id) {
      var query = Historia.find().where("_id").equals(req.query.id).exec()
        .then(
          function(elementos) {
            if (req.query.id) {
              res.render('historia', {
                "historia": elementos[0],
              });
            } else {}
          },
          function(erro) {
            console.log(erro);
            res.status(500).json(erro);
          });
    }
  });
};
