const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Learner');
});

module.exports = router;
