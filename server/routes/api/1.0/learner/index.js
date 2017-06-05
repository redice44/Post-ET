const mongoose = require('mongoose');

/* Model */
const User = mongoose.model('User');

exports.get = function (userId, done) {
  const q = {
    ID: userId
  };

  return User.findOne(q);
};

exports.create = function (userData, done) {
  const user = new User(userData);
  return user.save();
};