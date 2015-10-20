function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
}

module.exports = function(app) {
  var controller = app.controllers.historia;
  app.route('/historia').get(verificaAutenticacao, controller.getHistoriaByUser).
  post(verificaAutenticacao, controller.setHistoriaByUser).delete(verificaAutenticacao, controller.excluirHistoria);

};
