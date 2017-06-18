# Post-ET 

An Education Technology LTI that integrates into Blackboard Learn's REST API that provides an integrated solution for Social Media assignments using Instagram. 

### Requirements

**Platforms Used**

1. NodeJS v6.10.3
2. MongoDB v3.4.4
3. Blackboard Learn Developer Environment: Release 3200.0.0-rel.55+62a731a
  - bb-learn-hackboard-expires-july31.box 

### Server Installation and Setup

Clone project.

```shell
$ git clone https://github.com/redice44/Post-ET.git
```

Install dependencies
```shell
$ npm i
```

Setup private variables
```shell
$ mkdir private
$ touch private/index.js
```

The index file holds the Blackboard application key/secret, session secret, Instagram application ID/secret. 
```Javascript
module.exports = {
  key: <Blackboard Application Key>,
  secret: <Blackboard Application Secret>,
  sessionSecret: <Session Secret>,
  instaId: <Instagram Application ID>,
  instaSecret: <Instagram Application Key>
};

```
Start MongoDB
```shell
$ mongod
```
Note: By default the server expects MongoDB to be running on the default port, 27017. However if you would like to change the database that the server connects to, update the dburi property in the server/config/index.js file. 


Start Server
```shell
$ npm start
```
Note: By default the server listens on port 14159. If you would like to change the port, update the appPort property in the server/config/index.js file.

### Blackboard Setup

Register LTI
- Provider Domain: localhost
- Default Configuration: Set globally
  - Tool Provider Key: key
  - Tool Provider Secret: secret
- Send user data over any connection
  - Send Role in course

Manage Placement
- Label: _____
- Type: Content Type
  - Build Content (Create)
  - Do not allow grading
- Tool Provider URL: http://localhost:14159/lti/launch
- Tool Provider Key: key
- Tool Provider Secret: secret

REST API Integration
- Application ID: Your Blackboard application ID
- Learn User: User with administrator privileges

### License

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
