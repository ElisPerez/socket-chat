

/**
 * It takes a JWT and returns the decoded JSON object
 * @param token - The JWT token that you want to parse.
 * @returns The token is being decoded and returned as a JSON object.
 */
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}