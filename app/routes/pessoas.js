

module.exports = function(app) {
  var util = app.controllers.utils;
    var controller = app.controllers.pessoas;
    app.route('/pessoas').get(util.verificaAutenticacao, controller.listaPessoas);
    app.route('/pessoas/:id').get(util.verificaAutenticacao, controller.obtemPessoa);
};
