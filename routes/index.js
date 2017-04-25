var express = require('express');
var router = express.Router();
var User = require('../lib/User.js');
var path = require("path");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// Create a Twilio REST API client for authentication
var accountSid = 'AC114130e22d3f4ce7525ccbdf68c4271f'; // Your Account SID from www.twilio.com/console
var authToken = 'b3b235f645a11041a110df812a590c38';
var client = require("twilio")(accountSid, authToken);

const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/myuser');
mongoose.connect('mongodb://127.0.0.1:27017/myuser');

//mongoose.connect(process.env.MONGO_URL);

// Configure our app
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: 'sessions',
});

//assuming app is express Object.
router.get('/',function(req,res){
     res.sendFile(path.resolve('views/index.html'));
});

router.get('/login2',function(req,res){
  res.sendFile(path.resolve('public/gooey-menu/index.html'));
});

router.get('/SMS', function(req, res){
      client.messages.create({
        to: '+16102564321',
        from: "+14846794948",
        body: "This is the ship that made the Kessel Run in fourteen parsecs?"
    }, function(err, message) {
        if (err) console.log(err);
        res.send("DID THING")
  });
});

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/



router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password}, function(err, user){
    if(err) {
      console.log(err);
      return res.status(500).send();
      return res.redirect('/');
    }

    if(!user) {
      return res.status(404).send();

    }
    return res.redirect('/login2');
    req.session.user = user;
    return res.status(200).send();
  })
})








router.get('/dashboard', function(req, res) {
  if(!req.session.user){
    return res.status(401).send();
  }

  //return res.status(200).send('Welcome to super-secret API');
  return res.status(200).send();

})
/*router.get('/getoout/public/gooey-menu/index.html', function(req, res) {
  if(!req.session.user)  {
    return res.status(401).send();
  }
  req.session.user = user;
  return res.status(200).send("Welcome!");
})*/

router.post('/register', function(req, res) {
  console.log('We got a POST request to /register!');
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.body.number);
  var username = req.body.username;
  var password = req.body.password;
  var number = req.body.number;


  var newuser = new User();
  newuser.username = username;
  newuser.password = password;
  newuser.number = number;
  newuser.save(function(err, savedUser) {
    if(err) {
      console.log(err);
      return res.status(500).send();
      // Kyle adding advice. When there is an error, we' will
      // do something like
      // res.render('index', { errors: arrayOfErrors`` });

    }

    return res.status(200).send();

  })

  res.redirect('/');

})


module.exports = router;
