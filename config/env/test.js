module.exports = {
  env: 'test',
  db: 'mongodb://localhost/educacaosexual_test',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  sauceTestName: 'Educação Sexual Testing',
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  seleniumUser: process.env.SELENIUM_USER,
  seleniumUserPassword: process.env.SELENIUM_USER_PASSWORD,
  travisJobNumber: process.env.TRAVIS_JOB_NUMBER,
  travisBuild: process.env.TRAVIS_BUILD_NUMBER,
  port: 3000,
  address: 'localhost',
  domain: 'localhost'
};
