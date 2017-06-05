const express = require('express');
const app = express();
const path = require('path');
const request = require('superagent');
const bodyParser = require('body-parser');
const oauthSignature = require('oauth-signature');
const mongoose = require('mongoose');
const session = require('express-session');

/* Initialize Models */
require('./models');

const ltiRoutes = require('./routes/lti');
const instructorRoutes = require('./routes/instructor');
const learnerRoutes = require('./routes/learner');
const apiRoutes = require('./routes/api/1.0');

const private = require('../private/index.js');
const appPort = 14159;
let token = null;

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

app.get('*', (req, res, next) => {
  console.log('Checking token');
  // or token has expired..figure that out.
  if (!token) {
    var token = getToken();

    token.then((t) => {
      console.log(`Waiting until async is done. Token is ${t}`)
      next();
    }).catch((err) => {
      // Some error
      res.send(err);
    });
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/token', (req, res) => {
  var token = getToken();

  token.then((token) => {
    res.send(token);
  }).catch((err) => {
    res.send(err);
  });
});

app.get('/adduser', (req, res) => {
  const url = 'localhost:9876/learn/api/public/v1/users';
  console.log('[GET] /adduser');

  console.log(token);

  var user = {
    userName: 'johndoe',
    password: '1234',
    name: {
      given: 'John',
      family: 'Doe'
    }
  }

  request.post(url)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(user)
    .end((err, asyncRes) => {
      if (err || asyncRes.status !== 200) {
        console.log(asyncRes);
        return res.send(`Error code ${asyncRes.status}`);
      }

      var json = JSON.parse(asyncRes.text);
      console.log(json);
      res.send(json);
    });
})

app.get('/course', (req, res) => {
  const url = 'localhost:9876/learn/api/public/v1/courses/';
  console.log('[GET] /course');

  console.log(token);

  request.get(url)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    // .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((err, asyncRes) => {
      if (err || asyncRes.status !== 200) {
        console.log(asyncRes);
        return res.send(`Error code ${asyncRes.status}`);
      }

      var json = JSON.parse(asyncRes.text);
      console.log(json);
      res.send(json);
    });
})

app.get('/version', (req, res) => {
  const url = 'localhost:9876/learn/api/public/v1/system/version';
  console.log('[GET] /version');

  console.log(token);

  request.get(url)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((err, asyncRes) => {
      if (err || asyncRes.status !== 200) {
        console.log(asyncRes);
        return res.send(`Error code ${asyncRes.status}`);
      }

      var json = JSON.parse(asyncRes.text);
      console.log(json);
      res.send(json);
    });
})

app.get('/users', (req, res) => {
  const url = 'localhost:9876/learn/api/public/v1/users';
  console.log('[GET] /users');

  console.log(token);

  request.get(url)
    .set('Authorization', `Bearer ${token}`)
    // .set('Content-Type', 'application/json')
    // .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((err, asyncRes) => {
      if (err || asyncRes.status !== 200) {
        console.log(asyncRes);
        return res.send(`Error code ${asyncRes.status}`);
      }

      var json = JSON.parse(asyncRes.text);
      console.log(json);
      res.send(json);
    });
});

mongoose.Promise = global.Promise;

mongoose.connect(private.dburi);
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(appPort, () => {
    console.log(`Listening on port ${appPort}`);
  });
});

function getToken () {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:9876/learn/api/public/v1/oauth2/token';

    request.post(url)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .auth(private.key, private.secret)
      .withCredentials()
      .send({ grant_type: 'client_credentials'})
      .end((err, asyncRes) => {
        if (err || asyncRes.status !== 200) {
          // console.log(asyncRes);
          return reject(`Error code ${asyncRes.status}`);
        }

        var json = JSON.parse(asyncRes.text);
        console.log(json);
        token = json.access_token;
        resolve(json);
      });
  })
}

