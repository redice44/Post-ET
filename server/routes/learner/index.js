const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Learner path');
});

module.exports = router;
