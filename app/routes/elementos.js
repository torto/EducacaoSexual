function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
}

module.exports = function(app) {
  var controller = app.controllers.elementos;
  app.route('/elementos/fundos').get( controller.getFundos);
  app.route('/elementos/personagens').get( controller.getPersonagens);
  app.route('/elementos/personagensCompleto').get( controller.getElementoPersonagens);

};
