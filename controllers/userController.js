var bcrypt = require('bcrypt');
const saltRounds = 10;
const validation = require('../validations/userFormValidation');
const User = require('../models/user');


//GET REQUESTS
module.exports.getUserLogin = function (req, res, next){
  res.render('pages/login')
}

module.exports.getUserSignup = function (req, res, next){
  res.render('pages/signup');
}

module.exports.getUserLogout = function (req, res, next){
  req.logout();
  res.redirect('/polls');
}


//POST REQUESTS
module.exports.postUserLogin = function (req, res, next){
  passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.login(user, function(err){
        if(err){
          console.error(err);
          return next(err);
        }
        return res.redirect('/polls');
      });
    })(req, res, next);
}

module.exports.postUserSignup = function (req, res, next){
  let { username, password } = req.body;

  const errors = [];

  var validationErrors = validation.reqisterValidation(username, password);
  if(validationErrors.length > 0){
    return res.render('pages/signup', {
      username: username,
      password: password,
      errors: validationErrors
    });
  };

  User.findOne({
    username
  }).then(function(user){
    if (user){
      errors.push({message:"Username Already In Use"});
      return res.render('pages/signup', {
        username: username,
        password: password,
        errors: validationErrors
      });
    }

    //Password hashing
    bcrypt.hash(password, saltRounds, function(err, hashedPassword) {

      if(err) throw err;

      //New User Instance
      var newUser = new User({
        username: username,
        password: hashedPassword
      });

      //Save user in the DB
      newUser.save()
      .then(function(){
        console.log("User saved successfully")
        res.redirect("/");
      }).catch(function(err){
        console.warn(err)
      });

    });


  })
  .catch(function(err){
    console.warn(err);
  })


}
