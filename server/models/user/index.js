/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

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
