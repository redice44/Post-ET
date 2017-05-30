const express = require('express');
const app = express();
const path = require('path');
const request = require('superagent');
const private = require('../private/index.js');

const appPort = 4444;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/token', (req, res) => {
  const url = 'localhost:9876/learn/api/public/v1/oauth2/token';

  console.log(`http://${url}`);
  request.post(`http://${url}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .auth(private.key, private.secret)
    .withCredentials()
    .send({ grant_type: 'client_credentials'})
    .end((err, asyncRes) => {
      if (asyncRes.status !== 200) {
        console.log(asyncRes);
        return res.send(`Error code ${asyncRes.status}`);
      }

      var json = JSON.parse(asyncRes.text);
      console.log(json);
      res.send(json);
    });
});

app.listen(appPort, () => {
  console.log(`Listening on port ${appPort}`);
});
