const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let submissionSchema = new Schema({
  assignment: String,
  post: String
});

let userSchema = new Schema({
  ID: String,
  role: String,
  envUserId: String,
  name: String,
  submissions: [submissionSchema]
});

mongoose.model('User', userSchema);
