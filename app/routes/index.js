module.exports = function(app) {
  app.get('/', function(req, res) {
    var login = '', id = '';
    if (req.user) {
      login = req.user.login;
      id = req.user.id;
    }
    res.render('index', {
      "usuarioLogado": login,
    });
  });
};
