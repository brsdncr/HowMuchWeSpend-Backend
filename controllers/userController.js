const bcrypt = require('bcrypt');
const saltRounds = 10;
const { generateJWTToken, encrypt } = require('../authentication/methods/methods');
const User = require('../models/User');
const errors = require('../responses/errors');

//POST REQUESTS
module.exports.postUserLogin = function (req, res){
  try {
    const { username, password } = req.body.values;
    console.log("Username: ", username);
    console.log("Password: ", password);
    User.findOne({
      username
    }).then(function(user){
      if (user) {
        console.log(user);
        console.log("BCRYPT ONCESI");
        const hashedCurrentPassword = bcrypt.hashSync(password, saltRounds);
        
        bcrypt.compare(password, user.password, function(err, valid) {
          if (err){
            return res.json(errors.UNKNOWN_ERROR);
          }
          else if(valid){
            console.log("BCRYPT SONRASI");
            console.log("TOKEN ONCESI");
            const newToken = generateJWTToken(username);
            console.log("TOKEN SONRASI");
            console.log("New Token: ", newToken);
            return res.json({status: 200 , message: newToken});
          }
          else {
            console.log("Invalid request");
            return res.json(errors.INVALID_USERNAME_PASSWORD);
          }
        });
      }
      else {

        return res.json(errors.USER_NOT_FOUND);
      }
    });
  } catch (error) {
    console.warn("Login process exception");
  }
  //return res.json(errors.UNKNOWN_ERROR);
}

module.exports.postUserSignup = function (req, res){
  try {
    const { username, password } = req.body.values;
    User.findOne({
      username
    }).then(function(user){
      if(user){
        return res.json(errors.USER_EXISTS);
      }
      else {
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        if (!hashedPassword){
          return res.json(errors.USER_CREATION_ERROR)
        }

        const newToken = generateJWTToken(username);

        const newUser = new User({
          username: username,
          password: hashedPassword
        });

        newUser.save()
          .then(() => {
            return res.json({status: 200 , message: newToken})
          })
          .catch((err) => {
            return res.json(errors.USER_CREATION_ERROR)
          });
      }
    });
  } catch (error) {
    console.warn("Signup process exception");
    return res.json(errors.USER_CREATION_ERROR)
  }
}

module.exports.postUserLogout = function (req, res){
  try {
    const newToken = generateJWTToken("DUMMY_STRING", -6000);
    return res.json({status: 200 , message: newToken});

  } catch (error) {
    console.log(error)
    console.warn("Logout process exception");
  }

  res.json(errors.UNKNOWN_ERROR);
}
