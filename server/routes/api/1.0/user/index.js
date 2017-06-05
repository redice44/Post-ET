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

function getOrCreate (userHash, role) {
  return new Promise((resolve, reject) => {
    get(userHash)
      .then((user) => {
        if (!user) {
          console.log('Creating new user');
          const userData = {
            ID: userHash,
            role: role
          };
          create(userData)
            .then((doc) => {
              return resolve(doc);
              // console.log(doc);
              // req.session.userId = doc.ID;
              // return res.redirect('/learner');
            })
            .catch((err) => {
              console.log(err);
              return reject(err);
              // console.log(err);
              // return res.status(500).json({ err: err });
            });
        } else {
          return resolve(user);
          // console.log(user);
          // req.session.userId = user.ID;
          // return res.redirect('/learner');
        }
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
        // console.log(err);
        // return res.status(500).json({ err: err });
      });
  });
}

exports.get = get;
exports.create = create;
exports.getOrCreate = getOrCreate;
