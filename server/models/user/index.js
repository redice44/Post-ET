const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  ID: String,
  role: String,
  envUserId: String,
  name: String
});

mongoose.model('User', userSchema);
