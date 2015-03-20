var pessoas = [{
    _id: 1,
    img: 'branca.png'
}, {
    _id: 2,
    img: 'negra.png'
}];

module.exports = function() {
    var controller = {};

    controller.listaPessoas = function(req, res) {
        res.json(pessoas);
    };

    controller.obtemPessoa = function(req, res) {
        var id = req.params.id;
        var pessoa = pessoas.filter(function(pessoa) {
            return pessoa._id == id;
        })[0];
        pessoa ?
            res.json(pessoa):
            res.status(404).send('Pessoa não encontrada');
    };

    return controller;
};