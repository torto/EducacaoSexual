module.exports = {
  env: 'development',
  db: 'mongodb://localhost/educacaosexual',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  seleniumUser: process.env.SELENIUM_USER,
  seleniumUserPassword: process.env.SELENIUM_USER_PASSWORD,
  port: 3000,
  address: 'localhost',
  domain: 'localhost',
  facebookAppId: process.env.FACEBOOK_ID,
  facebookSecret: process.env.FACEBOOK_SECRET,
  googleId: process.env.GOOGLE_ID,
  googleSecret: process.env.GOOGLE_SECRET
};
