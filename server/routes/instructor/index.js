const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Instructor path');
});

module.exports = router;
