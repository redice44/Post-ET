/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

const oauthSignature = require('oauth-signature');
const ltiLaunchUrl = 'http://localhost:14159/lti/launch';

function validateLTI (req, res, next) {
  if (!checkLTIRequest(req.body)) {
    return res.status(400).send('Bad Request');
  }

  next();
}

function checkLTIRequest (params) {
  return isLaunchRequest(params) &&
         isValidLTI(params) &&
         isValidTimestamp(params.oauth_timestamp);
}

function isLaunchRequest (params) {
  console.log('Validating LTI Launch Request');

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

  return true;
}

function isValidLTI (params) {
  console.log('Validate LTI Reques');

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

  // TODO: Get secret from DB
  let consumerSecret = 'secret';
  let method = 'POST';
  let parameters = Object.assign({}, params);
  delete parameters.oauth_signature
  let sig = oauthSignature.generate(method, ltiLaunchUrl, parameters, consumerSecret, '', { encodeSignature: false });
  if (sig !== params.oauth_signature) {
    console.log('Invalid oauth 1.0 signature');
    return false;
  }

  return true;
}

function isValidTimestamp (timestamp) {
  const validRange = 60; // Seconds range +/- 
  const diff = Math.abs(timestamp - Math.floor(Date.now() / 1000));

  return diff <= validRange;
}

module.exports = validateLTI;
