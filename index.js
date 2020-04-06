const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

const keys = require('./config/keys');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//require('./config/db');


//Include static files
app.use(express.static(__dirname + '/public'));

//routes
var auth = require('./routes/auth')(app);


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
