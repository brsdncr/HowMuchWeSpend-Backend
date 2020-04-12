const express = require('express');
const app = express();
//const cors = require('cors');
const PORT = process.env.PORT || 4000;

const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//Add DB
require('./config/db');


//models
//require('./models/User');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Include static files
app.use(express.static(__dirname + '/public'));

//routes
var auth = require('./routes/auth')(app);
var list = require('./routes/list')(app);


//Handling 404
app.use(function (req, res, next){
  res.json({
    status: "404",
    message: "Not Found"
  });
});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
