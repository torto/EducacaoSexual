function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
}

module.exports = function(app) {
  var controller = app.controllers.usuario;
  app.route('/usuario').get(verificaAutenticacao, controller.getUsuario).put(verificaAutenticacao, controller.setUsuario);

};
