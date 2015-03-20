module.exports = function(app) {
    var controller = app.controllers.pessoas;
    app.get('/pessoas', controller.listaPessoas);
    app.get('/pessoas/:id', controller.obtemPessoa);
};