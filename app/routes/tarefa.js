

module.exports = function(app) {
  var util = app.controllers.utils;
  var controller = app.controllers.tarefas;
  app.route('/tarefa').get(util.verificaAutenticacao, controller.getTarefaByUser).
  post(util.verificaAutenticacao, controller.setTarefaByUser).delete(util.verificaAutenticacao, controller.excluirTarefa);

  app.route('/tarefaHash').get(util.verificaAutenticacao, controller.getTarefaByHash).
  post(util.verificaAutenticacao, controller.salvarHistoriaNaTarefa).delete(util.verificaAutenticacao, controller.excluirTarefa);

  app.route('/tarefaHashOne').get(util.verificaAutenticacao, controller.getOneTarefaByHash);



};
