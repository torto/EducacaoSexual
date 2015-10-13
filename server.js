var http = require('http');
var app = require('./config/express')();
var spawn = require('child_process').spawn;
require('./config/passport.js')();
require('./config/database.js')('mongodb://localhost/educacaosexual');
var cp;
cp = spawn('grunt',['--force', 'dev']).on('error', function (err) {
  console.log('Erro do windows');
  cp = spawn(process.env.comspec, ['/c', 'grunt dev']).on('error', function (err) {console.log('Error');});
});

cp.stdout.on("data", function(data) {
  console.log(data.toString());
});

cp.stderr.on("data", function(data) {
  console.error(data.toString());
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express Server escutando na porta ' + app.get('port'));
});
