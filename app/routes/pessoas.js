function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
}

module.exports = function(app) {
    var controller = app.controllers.pessoas;
    app.route('/pessoas').get(verificaAutenticacao, controller.listaPessoas);
    app.route('/pessoas/:id').get(verificaAutenticacao, controller.obtemPessoa);
};
