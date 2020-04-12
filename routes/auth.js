const userController = require('../controllers/userController');

module.exports = function(app) {

  app.post('/auth/login', userController.postUserLogin);
  app.post('/auth/signup', userController.postUserSignup);
  app.post('/auth/logout', userController.postUserLogout);

};
