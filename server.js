var config = require('./config/config')();
var http = require('http');
var app = require('./config/express')();
require('./config/passport.js')();
require('./config/database.js')(config.db);
console.log('port: '+config.port+' - ip: '+config.address);
http.createServer(app).listen(config.port,config.address, function() {
  console.log('Express Https Server '+ config.address+ ' (' + config.env+ ') escutando na porta ' + config.port);
});
