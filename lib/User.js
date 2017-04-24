var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  number: {type: Number, required: true},
});


var User = mongoose.model('myuser', userSchema);
module.exports = User;
