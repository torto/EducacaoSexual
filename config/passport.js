var passport = require('passport');
var mongoose = require('mongoose');
var GitHubStrategy = require('passport-github').Strategy;


module.exports = function() {

  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID: '620e75afe3ab01122921',
    clientSecret: '76281b8899694fb67a8599a890a06ef675179517',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {
    Usuario.findOrCreate({
        "login": profile.username
      }, {
        "nome": profile.username
      },
      function(erro, usuario) {
        if (erro) {
          console.log(erro);
          return done(erro);
        }
        return done(null, usuario);
      }
    );
  }));

  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id).exec()
      .then(function(usuario) {
        done(null, usuario);
      });
  });

};
