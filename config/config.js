module.exports = function() {
  return require('./env/' + process.env.NODE_ENV + '.js');
};
