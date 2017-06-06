const mongoose = require('mongoose');

/* Model */
const User = mongoose.model('User');

function get (userId) {
  const q = {
    ID: userId
  };

  return User.findOne(q);
}

function create (userData) {
  const user = new User(userData);
  return user.save();
}

function getOrCreate (userHash, userData) {
  return new Promise((resolve, reject) => {
    get(userHash)
      .then((user) => {
        if (!user) {
          console.log('Creating new user');
          create(userData)
            .then((doc) => {
              return resolve(doc);
            })
            .catch((err) => {
              console.log(err);
              return reject(err);
            });
        } else {
          return resolve(user);
        }
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  });
}

exports.get = get;
exports.create = create;
exports.getOrCreate = getOrCreate;
