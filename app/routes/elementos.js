

module.exports = function(app) {
  var util = app.controllers.utils;
  var controller = app.controllers.elementos;
  app.route('/elementos/fundos').get( controller.getFundos);
  app.route('/elementos/personagens').get( controller.getPersonagens);
  app.route('/elementos/personagensCompleto').get( controller.getElementoPersonagens);

};
