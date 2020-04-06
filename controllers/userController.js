var bcrypt = require('bcrypt');
const saltRounds = 10;


//POST REQUESTS
module.exports.postUserLogin = function (req, res, next){
  res.json({status: 200 , message: "PostUserLogin"});
}

module.exports.postUserSignup = function (req, res, next){
  res.json({status: 200 , message: "PostUserSignup"});

  // let { username, password } = req.body;

  // const errors = [];

  // var validationErrors = validation.reqisterValidation(username, password);
  // if(validationErrors.length > 0){
  //   return res.render('pages/signup', {
  //     username: username,
  //     password: password,
  //     errors: validationErrors
  //   });
  // };

  // User.findOne({
  //   username
  // }).then(function(user){
  //   if (user){
  //     errors.push({message:"Username Already In Use"});
  //     return res.render('pages/signup', {
  //       username: username,
  //       password: password,
  //       errors: validationErrors
  //     });
  //   }

  //   //Password hashing
  //   bcrypt.hash(password, saltRounds, function(err, hashedPassword) {

  //     if(err) throw err;

  //     //New User Instance
  //     var newUser = new User({
  //       username: username,
  //       password: hashedPassword
  //     });

  //     //Save user in the DB
  //     newUser.save()
  //     .then(function(){
  //       console.log("User saved successfully")
  //       res.redirect("/");
  //     }).catch(function(err){
  //       console.warn(err)
  //     });

  //   });


  // })
  // .catch(function(err){
  //   console.warn(err);
  // })


}
