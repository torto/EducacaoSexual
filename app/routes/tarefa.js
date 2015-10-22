function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
}

module.exports = function(app) {
  var controller = app.controllers.tarefas;
  app.route('/tarefa').get(verificaAutenticacao, controller.getTarefaByUser).
  post(verificaAutenticacao, controller.setTarefaByUser).delete(verificaAutenticacao, controller.excluirTarefa);

  app.route('/tarefaHash').get(verificaAutenticacao, controller.getTarefaByHash).
  post(verificaAutenticacao, controller.salvarHistoriaNaTarefa).delete(verificaAutenticacao, controller.excluirTarefa);



};
