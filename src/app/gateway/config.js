const API_URL  = window.location.origin.replace(/.$/,'1');

/**
 * Handling unsuccessful responses for the fetch
 *   by throwing an error with status statusText
 * @param  {Object} response - fetch response Object
 * @return {Object}          - fetch response Object
 */
const handleErrors = (response) => {
  if (!response.ok) {
    throw new Error(`API ERROR: ${response.statusText}`, response);
  }
  return response;
}

/**
 * Parse body of response into JSON
 * @param  {Object} response          - fetch response Object
 * @return {Object | Array}           - parsed response
 */
const jsonify = (response) => {
  return response.json();
}

export { API_URL, handleErrors, jsonify };