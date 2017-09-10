//requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt-nodejs');

dotenv.config({ verbose: true })

//port
const port = process.env.PORT || 8080;

//db connection

var db = 'mongodb://localhost:27017/voting-app';
mongoose.connect(db, function(err){
  if (err) {
    console.log(err);
  }
});

mongoose.connection.on('connected', function(){
  console.log('succesfully connected to ' + db);
});

mongoose.connection.on('disconnected', function(){
  console.log('succesfully disconnected to ' + db);
});

//express middleware

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
});

//listen call
app.listen(port, function(){
  console.log('server listening on port ' + port);
});
