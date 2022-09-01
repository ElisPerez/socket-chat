const myForm = document.querySelector('form');

// Verify what the host name is to assign it in the var url ternary.
console.log('hostname:', window.location.hostname);
// HTML
const url = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080/api/auth/'
  : 'https://web-rest-server-nodejs.herokuapp.com/api/auth/';

myForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = {};
  for (let element of myForm.elements) {
    if (element.name.length > 0) {
      formData[element.name] = element.value;
      // console.log('formData', formData);
    }
  }

  fetch(url + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
body: JSON.stringify(formData), // The body arguments are email and password but they are already serialized in formData
  })
    .then(res => res.json())
    .then(({msg, token}) => {
      if (msg) {
        return console.error(msg);
      }
      localStorage.setItem('token', token)
    })
    .catch(console.log);
});

// This is the function that calls the google button in the html.
function googleSignIn(response) {
  // In the response comes the data of the google user.
  const { credential: token_google } = response;

  // id_token is necessary to pass it as an argument in the body of the fetch
  const id_token = { id_token: token_google };
  // console.log('token google elis:', id_token);

  // Doing a fetch to the backend sending the google token to return the user's data from the database.
  fetch(url + 'google', {
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
      // console.log('Token from my backend:', { token }); // {token: "eazAEa..."}
      localStorage.setItem('token', token);
    })
    .catch(console.log);
}
