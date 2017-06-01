const express = require('express');
const app = express();
const path = require('path');
const request = require('superagent');
const bodyParser = require('body-parser');

const private = require('../private/index.js');
const appPort = 14159;
let token = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.all('*', (req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.post('/', (req, res) => {  
  console.log('body');
  console.log(req.body);

  console.log('params');
  console.log(req.params);

  console.log('query');
  console.log(req.query);

  console.log('cookies');
  console.log(req.cookies);

  console.log('headers');
  console.log(req.headers);

  if (!isLTILaunch(req.body)) {
    res.status(400).send('Bad Request');
  }


  isValidLTI(req.body);

  res.sendFile(path.resolve(__dirname, 'test.html'));
});

function isLTILaunch (params) {
  console.log('Is LTI Launch Request?');

  if (!params.lti_message_type || params.lti_message_type !== 'basic-lti-launch-request') {
    console.log('Missing or Invalid lti_message_type');
    return false;
  }

  if (!params.lti_version || params.lti_version !== 'LTI-1p0') {
    console.log('Missing or Invalid lti_version');
    return false;
  }

  // TODO: Later check to see if it's a valid key in DB
  if (!params.oauth_consumer_key || params.oauth_consumer_key !== 'key') {
    console.log('Missing or Invalid oauth_consumer_key');
    return false;
  }
  
  if (!params.resource_link_id) {
    console.log('Missing resource_link_id');
    return false;
  }

  console.log('Valid');
  console.log(`lti_message_type: ${params.lti_message_type}`);
  console.log(`lti_version: ${params.lti_version}`);
  console.log(`oauth_consumer_key: ${params.oauth_consumer_key}`);
  console.log(`resource_link_id: ${params.resource_link_id}`);

  return true;
}

function isValidLTI (params) {
  console.log('Is Valid LTI Request?');

  if (!params.oauth_callback || params.oauth_callback !== 'about:blank') {
    console.log('Missing or Invalid oauth_callback');
    return false;
  }

  // TODO: Later check to see if it's a valid key in DB
  if (!params.oauth_consumer_key || params.oauth_consumer_key !== 'key') {
    console.log('Missing or Invalid oauth_consumer_key');
    return false;
  }

  if (!params.oauth_nonce) {
    console.log('Missing oauth nonce');
    return false;
  }

  if (!params.oauth_signature) {
    console.log('Missing oauth signature');
    return false;
  }

  if (!params.oauth_signature_method || params.oauth_signature_method !== 'HMAC-SHA1') {
    console.log('Missing or Invalid oauth_signature_method');
    return false;
  }

  if (!params.oauth_timestamp) {
    console.log('Missing oauth_timestamp');
    return false;
  }

  if (!params.oauth_version || params.oauth_version !== '1.0') {
    console.log('Missing or Invalid oauth_version');
    return false;
  }

  console.log('Valid');
  console.log(`oauth_callback: ${params.oauth_callback}`);
  console.log(`oauth_consumer_key: ${params.oauth_consumer_key}`);
  console.log(`oauth_nonce: ${params.oauth_nonce}`);
  console.log(`oauth_signature: ${params.oauth_signature}`);
  console.log(`oauth_signature_method: ${params.oauth_signature_method}`);
  console.log(`oauth_timestamp: ${params.oauth_timestamp}`);
  console.log(`oauth_version: ${params.oauth_version}`);
  return true;
}

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

app.listen(appPort, () => {
  console.log(`Listening on port ${appPort}`);
});
