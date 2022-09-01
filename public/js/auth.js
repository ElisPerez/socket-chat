// Verify what the host name is to assign it in the var url ternary.
console.log('hostname:', window.location.hostname);
// HTML
var url = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080/api/auth/google'
  : 'https://web-rest-server-nodejs.herokuapp.com/api/auth/google';

// this function is the same "parseJwt(token)" that is in /function/parse-jwt.js
// function decodeJwtResponse(token) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace('-', '+').replace('_', '/');
//   return JSON.parse(window.atob(base64));
// }

// This is the function that calls the google button in the html.
function handleCredentialResponse(response) {
  // In the response comes the data of the google user.
  const { credential: token_google } = response;

  // User data from Google
  // const userData = decodeJwtResponse(token_google);
  // console.log(userData);

  // console.log('ID: ' + userData.sub);
  // console.log('Full Name: ' + userData.name);
  // console.log('Given Name: ' + userData.given_name);
  // console.log('Family Name: ' + userData.family_name);
  // console.log('Image URL: ' + userData.picture);
  // console.log('Email: ' + userData.email);

  // id_token is necessary to pass it as an argument in the body of the fetch
  const id_token = { id_token: token_google };
  // console.log('token google elis:', id_token);

  // Doing a fetch to the backend sending the google token to return the user's data from the database.
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id_token),
  })
    .then(res => res.json())
    .then(({ token }) => {
      // In the argument the data returned by the backend was destructured
      // console.log('data fetch response:', data);
      console.log('Token from my backend:', { token }); // {token: "eazAEa..."}
    })
    .catch(console.log);
}
