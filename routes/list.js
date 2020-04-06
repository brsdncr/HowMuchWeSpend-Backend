var listController = require('../controllers/listController');

module.exports = function(app) {

  app.get('/list', listController.getList);

};
