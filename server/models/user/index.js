const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gradeSchema = new Schema({
  score: Number,
  feedback: String
});

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
  post: postSchema,
  grade: gradeSchema
});

let userSchema = new Schema({
  ID: String,
  role: String,
  envUserId: String,
  name: String,
  submissions: [submissionSchema]
});

mongoose.model('User', userSchema);
