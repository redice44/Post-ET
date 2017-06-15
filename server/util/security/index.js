/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const crypto = require('crypto');

function hashSHA256 (str) {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  const sha256 = hash.digest('hex');
  return sha256;
}

function hashUser (params) {
  return hashSHA256(`${params.envId}${params.courseId}${params.userId}`);
}

function hashAssignment (params) {
  return hashSHA256(`${params.envId}${params.courseId}${params.contentId}`);
}

exports.hashAssignment = hashAssignment
exports.hashUser = hashUser
