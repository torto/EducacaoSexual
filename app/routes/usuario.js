

module.exports = function(app) {
  var util = app.controllers.utils;
  var controller = app.controllers.usuario;
  app.route('/usuario').get(util.verificaAutenticacao, controller.getUsuario).put(util.verificaAutenticacao, controller.setUsuario);

};
