var express = require('express');
var router = express.Router();
var User = require('/Users/TILOOOR/Desktop/HelloUsers/lib/User.js');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myuser');

//assuming app is express Object.
router.get('/',function(req,res){
     res.sendFile('/Users/TILOOOR/Desktop/HelloUsers/views/index.html');
});


/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/



router.post('/login', function(req, res) {
  console.log('We got a POST request to /login!');
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password}, function(err, user) {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }

    if(!user) {
      return res.status(404).send();
    }

    return res.status(200).send();
  })
});

router.get('/dashboard', function(req, res) {
  if(!req.session.user)  {
    return res.status(401).send();
  }
  req.session.user = user;
  return res.status(200).send("Welcome!");
})

router.post('/register', function(req, res) {
  console.log('We got a POST request to /register!');
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.body.firstname);
  console.log(req.body.lastname);
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  var newuser = new User();
  newuser.username = username;
  newuser.password = password;
  newuser.firstname = firstname;
  newuser.lastname = lastname;
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
})


module.exports = router;
