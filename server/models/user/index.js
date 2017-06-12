const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
  ID: String,
  postLink: String,
  type: String,
  width: Number,
  height: Number,
  url: String,
  description: String
});

let submissionSchema = new Schema({
  assignment: String,
  post: postSchema
});

let userSchema = new Schema({
  ID: String,
  role: String,
  envUserId: String,
  name: String,
  submissions: [submissionSchema]
});

mongoose.model('User', userSchema);
