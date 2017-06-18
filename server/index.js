/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

/* Initialize Models */
require('./models');

const ltiRoutes = require('./routes/lti');
const instructorRoutes = require('./routes/instructor');
const learnerRoutes = require('./routes/learner');
const apiRoutes = require('./routes/api/1.0');

const private = require('../private/index.js');
const appConfig = require('./config');

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
  secret: private.sessionSecret,
  resave: false,
  saveUninitialized: true  
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', (req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use('/lti', ltiRoutes);
app.use('/learner', learnerRoutes);
app.use('/instructor', instructorRoutes);
app.use('/api/1.0/', apiRoutes);

mongoose.Promise = global.Promise;
mongoose.connect(appConfig.dburi);
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(appConfig.appPort, () => {
    console.log(`Listening on port ${appConfig.appPort}`);
  });
});
