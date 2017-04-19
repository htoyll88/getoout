var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true}
});



var User = mongoose.model('myuser', userSchema);
module.exports = User;
