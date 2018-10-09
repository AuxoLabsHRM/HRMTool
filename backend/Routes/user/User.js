var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false
  },
  roleType: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema, 'User');
// mongoose.model('User', UserSchema);

// module.exports = mongoose.model('User');