var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function() {
  var app = express();

  app.set('port', 3000);

  // LOGIN ---
  app.use(cookieParser());
  app.use(session({
    secret: 'mundo mel',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  // FIM LOGIN ---

  // MID SEGURANÇA!
  app.use(helmet());
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.disable('x-powered-by');
  app.use(helmet.hidePoweredBy({
    setTo: 'PHP 5.5.14'
  }));
  // FIM MID SEGURANÇA

  app.use(express.static('./public'));

  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(require('method-override')());

  load('models', {
      cwd: 'app'
    }).then('controllers')
    .then('routes')
    .into(app);

  app.get('*', function(req, res) {
    res.status(404).render('404');
  });


  return app;
};
