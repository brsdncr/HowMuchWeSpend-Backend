var userController = require('../controllers/userController');

module.exports = function(app) {

  app.get('/auth/login', userController.postUserLogin);
  app.post('/auth/signup', userController.postUserSignup);

};
