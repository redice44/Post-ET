const express = require('express');
const router = express.Router();

const instructorRoutes = require('./instructor');
const learnerRoutes = require('./learner');

router.use('/instructor', instructorRoutes);
router.use('/learner', learnerRoutes);

module.exports = router;
