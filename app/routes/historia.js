

module.exports = function(app) {
  var util = app.controllers.utils;
  var controller = app.controllers.historia;
  app.route('/historia').get(util.verificaAutenticacao, controller.getHistoriaByUser).
  post(util.verificaAutenticacao, controller.setHistoriaByUser).delete(util.verificaAutenticacao, controller.excluirHistoria);

};
