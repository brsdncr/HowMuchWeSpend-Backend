module.exports.tokenVerification = function (req, res, next) {

  if (res.locals.user) {
      next();
  } else {
      res.redirect('/login');
  }
};

module.exports.preventWhenLoggedIn = function (req, res, next) {

  if (res.locals.user) {
      res.redirect('/polls');
  } else {
      next();
  }
};
