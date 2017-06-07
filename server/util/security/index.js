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
