// module.exports = {
//   env: 'production',
//   db: process.env.OPENSHIFT_MONGODB_DB_URL + 'educaosexual',
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   port: process.env.OPENSHIFT_NODEJS_PORT,
//   address: process.env.OPENSHIFT_NODEJS_IP,
//   domain: process.env.OPENSHIFT_APP_DNS
// };

module.exports = {
  env: 'production',
  db: process.env.OPENSHIFT_MONGODB_DB_URL + 'educao',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  port: process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || 8080,
  address: process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || 'localhost',
  domain: process.env.OPENSHIFT_APP_DNS,
  mongoUser: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
  mongoPass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
};
