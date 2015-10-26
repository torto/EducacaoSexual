var passport = require('passport');
module.exports = function(app) {

var redirect = '/#/edicaoUsuario/1';
var fail = '/#/auth';

  // GITHUB LOGIN----------------------------------------------
  app.get('/auth/github', passport.authenticate('github'));
  app.post('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: redirect,
      failureRedirect: fail
    }));


// FACEBOOK LOGIN----------------------------------------------
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.post('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: fail }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect(redirect);
    });

// GOOGLE LOGIN----------------------------------------------
    app.get('/auth/google',
      passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

    app.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: fail }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect(redirect);
      });



      /* Requisição POST para LOGIN */
      app.post('/login', passport.authenticate('login', {
        successRedirect: redirect,
        failureRedirect: fail,
        failureFlash : true
      }));

      /*Requisição GET para página de Registro */
      // router.get('/signup', function(req, res){
      //   res.render('register',{message: req.flash('message')});
      // });

      /* Requisição POST para Registros */
      app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/#/auth',
        failureRedirect: '/#/auth',
        failureFlash : true
      }));



  app.get('/logout', function(req, res) {
    req.logOut(); // exposto pelo passport
    res.redirect('/');
  });
};
