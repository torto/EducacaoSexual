var passport = require('passport');
var mongoose = require('mongoose');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bCrypt = require('bcrypt-nodejs');
var config = require('./config')();


module.exports = function() {

  var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.pass);
  };

  var createHash = function(password){
   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

  var Usuario = mongoose.model('Usuario');
  var gitHubCallBack = 'http://' + config.domain + ':' + config.port + '/auth/github/callback';
  console.log(gitHubCallBack);

  passport.use(new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: gitHubCallBack
  }, function(accessToken, refreshToken, profile, done) {
    Usuario.findOrCreate({
        "login": profile.username
      }, {
        "nome": profile.displayName,
        "email": profile.emails[0].value
      },
      function(erro, usuario, criou) {
        if (erro) {
          console.log(erro);
          return done(erro);
        }
        return done(null, usuario);
      }
    );
  }));

  passport.use(new FacebookStrategy({
    clientID: config.facebookAppId,
    clientSecret: config.facebookSecret,
    callbackURL: 'http://' + config.domain + ':' + config.port + '/auth/facebook/callback',
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    Usuario.findOrCreate({
        "login": profile.id
      }, {
        "nome": profile.displayName
      },
      function(erro, usuario, criou) {
        if (erro) {
          console.log(erro);
          return done(erro);
        }
        return done(null, usuario);
      }
    );
  }
));


passport.use(new GoogleStrategy({
    clientID: config.googleId,
    clientSecret: config.googleSecret,
    callbackURL: 'http://' + config.domain + ':' + config.port + '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    Usuario.findOrCreate({
        "login": profile.id
      }, {
        "nome": profile.displayName
      },
      function(erro, usuario, criou) {
        if (erro) {
          console.log(erro);
          return done(erro);
        }
        return done(null, usuario);
      }
    );
  }
));


passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // Busca usuário pelo nome apresentado
      Usuario.findOne({'login':username},function(err, user) {
        // Em caso de erro, retornar
        if (err){
          console.log('Erro no Registro: '+err);
          return done(err);
        }
        // Usuário existe
        if (user) {
          console.log('Usuário já existe');
          return done(null, false,
             req.flash('message','Usuário já existe'));
        } else {
          // Se não houver usuário com aquele e-mail
          // criaremos o novo usuário
          var newUser = new Usuario();
          // Atribuindo as credenciais locais
          newUser.login = username;
          newUser.pass = createHash(password);
          newUser.email = req.param('email');
          newUser.nome = req.param('firstName') +' '+ req.param('lastName');

          // salva o usuário
          newUser.save(function(err) {
            if (err){
              console.log('Erro ao salvar usuário: '+err);
              throw err;
            }
            console.log('Registro de usuário com sucesso');
            return done(null, newUser);
          });
        }
      });
    };

    // Atrasa a execução do método findOrCreateUser e o executa
    // na próxima oportunidade dentro do loop de eventos
    process.nextTick(findOrCreateUser);
  })
);

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    // verifica no mongo se o nome de usuário existe ou não
    Usuario.findOne({ 'login' :  username },
      function(err, user) {
        // Em caso de erro, retorne usando o método done
        if (err)
          return done(err);
        // Nome de usuário não existe, logar o erro & redirecione de volta
        if (!user){
          console.log('Usuário não encontrado para usuário '+username);
          return done(null, false,
                req.flash('message', 'Usuário não encontrado.'));
        }
        // Usuário existe mas a senha está errada, logar o erro
        if (!isValidPassword(user, password)){
          console.log('Senha Inválida');
          return done(null, false,
              req.flash('message', 'Senha Inválida'));
        }
        // Tanto usuário e senha estão corretos, retorna usuário através
        // do método done, e, agora, será considerado um sucesso
        return done(null, user);
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
