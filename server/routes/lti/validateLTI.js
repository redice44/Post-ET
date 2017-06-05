const oauthSignature = require('oauth-signature');

function validateLTI (params) {
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

  // console.log('Valid');
  // console.log(`lti_message_type: ${params.lti_message_type}`);
  // console.log(`lti_version: ${params.lti_version}`);
  // console.log(`oauth_consumer_key: ${params.oauth_consumer_key}`);
  // console.log(`resource_link_id: ${params.resource_link_id}`);

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

  let consumerSecret = 'secret';

  let method = 'POST';
  let url = 'http://www.bb-lti.com/lti/launch';
  let parameters = Object.assign({}, params);
  delete parameters.oauth_signature
  let sig = oauthSignature.generate(method, url, parameters, consumerSecret, '', { encodeSignature: false });
  if (sig !== params.oauth_signature) {
    console.log('Invalid oauth 1.0 signature');
    return false;
  }
  // console.log(`oauth_callback: ${params.oauth_callback}`);
  // console.log(`oauth_consumer_key: ${params.oauth_consumer_key}`);
  // console.log(`oauth_nonce: ${params.oauth_nonce}`);
  // console.log(`oauth_signature: ${params.oauth_signature}`);
  // console.log(`oauth_signature_method: ${params.oauth_signature_method}`);
  // console.log(`oauth_timestamp: ${params.oauth_timestamp}`);
  // console.log(`oauth_version: ${params.oauth_version}`);
  // console.log('Valid oauth signature');

  return true;
}

function isValidTimestamp (timestamp) {
  const validRange = 60; // Seconds range +/- 
  const diff = Math.abs(timestamp - Math.floor(Date.now() / 1000));

  // console.log(`Difference: ${diff} | Range: ${validRange}`);

  return diff <= validRange;
}

module.exports = validateLTI;
