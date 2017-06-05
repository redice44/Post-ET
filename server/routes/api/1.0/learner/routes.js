const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* Models */
const User = mongoose.model('User');

router.get('/', (req, res) => {
  const q = {
    ID: 'testid'
  };

  User.findOne(q, (err, user) => {
    if (err) {
      return res.status(500).json({ err: err });
    }

    return res.json({ user: user });
  });
});

router.post('/', (req, res) => {
  const user = new User({ ID: 'testid', role: 'Learner' });
  user.save((err, doc) => {
    if (err) {
      return res.status(500).json({ err: 'Unable to save to database.' })
    }

    return res.json({ msg: 'Saved to database' });
  });
});

module.exports = router;
