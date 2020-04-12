const listController = require('../controllers/listController');
const { authenticateToken } = require('../authentication/methods/methods');

module.exports = function(app) {

  app.post('/list', authenticateToken, listController.getList);

};
