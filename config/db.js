const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const keys = require('./keys');

mongoose.connect(keys.MONGO_URI,{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.connection
  .once('open', function(){
    console.log("Connected to database");
    //done();
  })
  .on('error', function(error){
    console.warn('Warning', error);
  });
