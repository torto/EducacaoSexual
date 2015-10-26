module.exports = function(app){

  var retorno = {
     verificaAutenticacao: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.status('401').json('Não autorizado');
      }
    }
  };

  return retorno;

};
