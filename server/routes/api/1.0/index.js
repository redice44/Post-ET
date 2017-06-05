const express = require('express');
const router = express.Router();

const userRoutes = require('./user/routes');
const assignmentRoutes = require('./assignment/routes');

router.use('/user', userRoutes);
router.use('/assignment', assignmentRoutes);

module.exports = router;
